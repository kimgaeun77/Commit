package commit.member.controller;

import commit.etc.etc.CommitMap;
import commit.etc.helper.Alert;
import commit.etc.helper.SessionHelper;
import commit.member.service.MemberService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Map;

// 회원
@Controller
@RequestMapping("/member")
public class MemberController {

    Logger log = Logger.getLogger(this.getClass());

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private SessionHelper sessionHelper;

    @Autowired
    private MemberService memberService;


    // 회원가입 페이지
    @GetMapping("/join")
    public ModelAndView joinPage(CommitMap commitMap, HttpServletRequest request) throws Exception {

        ModelAndView mv = new ModelAndView();
        String checkRequest = memberService.loginCheck(commitMap.getMap(), request);//로그인이 되어있는 상태인데 회원가입을 또 하려고 하는경우 확인

        if ("correct-request".equals(checkRequest)) {
            mv.setViewName("/member/joinForm");
        }
        // 잘못된 요청이라면
        else {
            mv.addObject("msg", "이미 가입된 회원입니다.");
            mv.addObject("path", "/main");
            mv.setViewName("/alert/alert");
        }
        return mv;

    }

    // 회원가입
    @PostMapping("/join")
    public String joinMember(CommitMap commitMap) throws Exception {

        memberService.joinMember(commitMap.getMap());

        return "redirect:/member/login";

    }

    // 아이디 중복 체크 (ajax)
    @ResponseBody
    @RequestMapping("/confirm/id")
    public int confirmId(@RequestBody Map<String, Object> map) throws Exception {

        return memberService.confirmId(map);

    }

    // 이메일 중복 체크 (ajax)
    @ResponseBody
    @RequestMapping("/confirm/email")
    public int confirmEmail(@RequestBody Map<String, Object> map) throws Exception {

        return memberService.confirmEmail(map);
    }

    // 아이디 찾기 페이지
    @GetMapping("/findID")
    public String findIDPage() {
        return "/member/findID";
    }

    // 아이디 찾기
    @PostMapping("/findID")
    public ModelAndView findID(CommitMap commitMap, HttpServletRequest request) throws Exception {

        int member = memberService.findMemberByInfo(commitMap.getMap(), request);
        ModelAndView mv = new ModelAndView();

        if (member == 0) {
            mv.addObject("msg", "해당 정보를 가진 회원이 없습니다.");
            mv.addObject("path", "/member/findID");
            mv.setViewName("/alert/alert");
        } else {
            String findID = memberService.findID(commitMap.getMap());
            mv.addObject("MEM_ID", findID);
            mv.setViewName("/member/successFindID");
        }
        return mv;
    }

    // 비밀번호 찾기 페이지
    @GetMapping("/findPW")
    public String findPWPage() {
        return "/member/findPW";
    }

    // 비밀번호 찾기
    @PostMapping("/findPW")
    public ModelAndView findPW(CommitMap commitMap, HttpServletRequest request) throws Exception {

        int member = memberService.findMemberByInfo(commitMap.getMap(), request);
        ModelAndView mv = new ModelAndView();

        if (member == 0) {
            mv.addObject("msg", "해당 정보를 가진 회원이 없습니다.");
            mv.addObject("path", "/member/findPW");
            mv.setViewName("/alert/alert");
        } else {
            memberService.sendEmail(commitMap.getMap());
            mv.addObject("msg", "임시 비밀번호가 이메일로 전송되었습니다.");
            mv.setViewName("/alert/windowClose");//팝업창 닫음
        }

        return mv;
    }


    // 로그인 페이지
    @GetMapping("/login")
    public ModelAndView loginPage(CommitMap commitMap, HttpServletRequest request) throws Exception {

                              //로그인 되어있는데 주소를 치고 또 로그인을 시도하는 경우
        String checkRequest = memberService.loginCheck(commitMap.getMap(), request);
        ModelAndView mv = new ModelAndView();

        if ("correct-request".equals(checkRequest)) {
            mv.setViewName("/member/loginForm");
        } else {
            mv.addObject("msg", "로그인 상태입니다.");
            mv.addObject("path", "/main");
            mv.setViewName("/alert/alert");
        }

        return mv;
    }

    // 로그인
    @PostMapping("/login")
    public ModelAndView login(CommitMap commitMap,
                              HttpServletRequest request,
                              HttpSession session) throws Exception {

        ModelAndView mv = new ModelAndView();

        // my서비스에서 checkMember(회원정보 수정할때) 같이 사용하려고 request도 넣어줌
        Map<String, Object> memberInfo = memberService.getMemberDetail(commitMap.getMap(), request);


        //아이디를 잘못 입력했을경우
        if (memberInfo == null) {
            mv.addObject("msg", "아이디 또는 비밀번호를 잘못 입력했습니다.");
            mv.addObject("path", "/member/login");
            mv.setViewName("/alert/alert");
            return mv;
        }

        // oauth 사용자라면(위의 memberInfo가 먼저 널인지 확인해야지 이 로직에서 nullpointexception이 일어나지 않음.)
        if (memberInfo.get("OAUTH") != null) {
            mv.addObject("msg", "간편 로그인을 이용해주세요.");
            mv.addObject("path", "/member/login");
            mv.setViewName("/alert/alert");
            return mv;
        }

        String rowPassword = commitMap.get("MEM_PW").toString();//사용자가 입력한 비밀번호
        String encodePassword = memberInfo.get("MEM_PW").toString();// DB에 저장된 비밀번호

        // 사용자가 입력한 PW를 BCryptPasswordEncoder로 해싱후 DB에 저장된 비밀번호랑 일치하는지 확인
        if (encoder.matches(rowPassword, encodePassword)) {
            if (memberInfo.get("ADMIN").equals("Y")) {//관리자라면
                session.setAttribute("MEM_ID", memberInfo.get("MEM_ID"));
                session.setAttribute("MEM_NAME", memberInfo.get("MEM_NAME"));
                session.setAttribute("admin", memberInfo.get("ADMIN"));
                mv.setViewName("redirect:/admin/main");
            } else {// 일반 회원인 경우
                session.setAttribute("MEM_ID", memberInfo.get("MEM_ID"));
                session.setAttribute("MEM_NAME", memberInfo.get("MEM_NAME"));//마이페이지에서 -님 이름 뽑아내기 위함.
                mv.setViewName("redirect:/main");
            }
        } else {// 비밀번호 불일치
            mv.addObject("msg", "아이디 또는 비밀번호를 잘못 입력했습니다.");
            mv.addObject("path", "/member/login");
            mv.setViewName("/alert/alert");
        }

        return mv;
    }

    // 로그아웃
    @GetMapping("/logout")
    public ModelAndView logout(CommitMap commitMap, HttpServletRequest request) {

        Map<String, Object> map = sessionHelper.make(commitMap.getMap(), request);
        ModelAndView mv = new ModelAndView();

        // 로그인이 안되어있는데 로그아웃을 시도하는 경우
        if (map.get("MEM_ID") == null) {
            mv.addObject("msg", "로그인이 필요합니다.");
            mv.addObject("path", "/member/login");
        } else {
            sessionHelper.remove(request);
            mv.addObject("msg", "로그아웃 되었습니다.");
            mv.addObject("path", "/main");
        }
        mv.setViewName("/alert/alert");

        return mv;

    }

}
