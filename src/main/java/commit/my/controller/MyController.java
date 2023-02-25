package commit.my.controller;

import commit.etc.etc.CommitMap;
import commit.member.service.MemberService;
import commit.my.service.MyService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;


// 마이페이지
@Controller
@RequestMapping("/mypage")
public class MyController {

    Logger log = Logger.getLogger(this.getClass());

    @Autowired
    BCryptPasswordEncoder encoder;

    @Autowired
    private MyService myService;

    @Autowired
    private MemberService memberService;


    // 메인 페이지
    @GetMapping("/main")
    public String main() {

        return "/mypage/main";
    }

    // 내 정보
    @PostMapping("/myInfo")
    public ModelAndView getInfo(CommitMap commitMap, HttpServletRequest request) throws Exception {

        ModelAndView mv = new ModelAndView();
        Map<String, Object> myInfo = memberService.getMemberDetail(commitMap.getMap(), request);

        String rowPassword = commitMap.get("MEM_PW").toString();//사용자가 입력한 pw
        String encodePassword = myInfo.get("MEM_PW").toString();//암호화되어 db에 저장된 pw

        if (encoder.matches(rowPassword, encodePassword)) {
            mv.addObject("myInfo", myInfo);
            mv.setViewName("/mypage/modifyInfo");
        } else {
            mv.addObject("msg", "비밀번호가 일치하지 않습니다.");
            mv.addObject("num", -1);
            mv.setViewName("/alert/historyBack");
        }
        return mv;

    }


    // 내 정보 수정
    @PostMapping("/myInfo/update")
    public ModelAndView updateInfo(CommitMap commitMap, HttpServletRequest request) throws Exception {

        myService.updateInfo(commitMap.getMap(), request);

        ModelAndView mv = new ModelAndView("/alert/alert");
        mv.addObject("msg", "회원정보 수정이 완료되었습니다.");
        mv.addObject("path", "/mypage/main");
        return mv;

    }

    // 회원 탈퇴 (ajax)
    @ResponseBody
    @PostMapping("/myInfo/del")
    public void deleteInfo(CommitMap commitMap, HttpServletRequest request) throws Exception {

        myService.deleteInfo(commitMap.getMap(), request);

    }

    // 내 주문 목록
    @GetMapping("/myOrder")
    public ModelAndView getOrderList(CommitMap commitMap, HttpServletRequest request) throws Exception {

        List<Map<String, Object>> orderList = myService.getOrderList(commitMap.getMap(), request);
        ModelAndView mv = new ModelAndView("/mypage/myOrderList");
        mv.addObject("orderList", orderList);
        return mv;

    }

    // 내 주문 상세
    @GetMapping("/myOrderDetail")
    public ModelAndView getOrderDetail(CommitMap commitMap, HttpServletRequest request, HttpServletResponse response) throws Exception {

        Map<String, Object> orderDetail = myService.getOrderDetail(commitMap.getMap(), request, response);

        ModelAndView mv = new ModelAndView("/mypage/myOrderDetail");
        mv.addObject("order", orderDetail.get("order"));
        mv.addObject("orderInfo", orderDetail.get("orderInfo"));
        return mv;

    }

    // 내 qna 목록
    @GetMapping("/myQna")
    public ModelAndView getQnaList(CommitMap commitMap, HttpServletRequest request) throws Exception {

        List<Map<String, Object>> qnaList = myService.getQnaList(commitMap.getMap(), request);
        ModelAndView mv = new ModelAndView("/mypage/myQna");
        mv.addObject("qnaList", qnaList);
        return mv;
    }

    // 내 qna 상세
    @GetMapping("/myQnaDetail")
    public ModelAndView getQnaDetail(CommitMap commitMap, HttpServletRequest request, HttpServletResponse response) throws Exception {

        Map<String, Object> qnaDetail = myService.getQnaDetail(commitMap.getMap(), request, response);

        ModelAndView mv = new ModelAndView("/mypage/myQnaDetail");
        mv.addObject("qnaDetail", qnaDetail);
        return mv;

    }

    // 내 쿠폰 목록
    @GetMapping("/myCoupon")
    public ModelAndView getCouponList(CommitMap commitMap, HttpServletRequest request) throws Exception {
        List<Map<String, Object>> couponList = myService.getCouponList(commitMap.getMap(), request);
        ModelAndView mv = new ModelAndView("/mypage/myCoupon");
        mv.addObject("couponList", couponList);
        return mv;
    }

}