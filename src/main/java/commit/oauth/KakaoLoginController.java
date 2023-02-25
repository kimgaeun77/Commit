package commit.oauth;

import commit.etc.etc.CommitMap;
import commit.member.service.MemberService;
import commit.oauth.model.KakaoUserInfo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

// 카카오 로그인
@Controller
public class KakaoLoginController {

    private final KakaoLoginService kaKaoLoginService;

    private final MemberService memberService;


    public KakaoLoginController(KakaoLoginService kaKaoLoginService, MemberService memberService) {

        this.kaKaoLoginService = kaKaoLoginService;
        this.memberService = memberService;
    }

    @GetMapping("/oauth/login")//인가코드를 받을 때 쿼리스트링으로 code를 전달하기에 get 메소드로 받아야 함!
    public String oAuthLogin(String code, Model model, HttpSession session, HttpServletRequest request) throws Exception {


        //인가코드를 통해 사용자 정보에 액세스할 수 있는 액세스 토큰 발급받기
        String accessToken = kaKaoLoginService.getAccessToken(code);
        //액세스 토큰을 통해 userInfo 얻기
        KakaoUserInfo userInfo = kaKaoLoginService.getUserInfo(accessToken);
        //가입된 회원인지 확인
        int result = kaKaoLoginService.joinCheck(userInfo);

        // 가입된 회원이 아님
        if (result == 0) {
            model.addAttribute("userInfo", userInfo);
            return "member/oauthJoinForm";
            //가입된 회원
        } else {
            //회원 정보 찾아서 map에서 꺼내오기
            //로그인 시키기
            Map<String, Object> memberID = kaKaoLoginService.makeUserId(userInfo);
            Map<String, Object> memberInfo = memberService.getMemberDetail(memberID, request);
            if (memberInfo != null) {
                kaKaoLoginService.kakaoLogin(memberInfo, session);
            }

            return "redirect:/";
        }

    }

    // 회원가입후 로그인 하고 세션 영역에 등록해줘야 함
    @PostMapping("/oauth/member/join")
    public String join(CommitMap commitMap, HttpSession session) throws Exception {

        kaKaoLoginService.join(commitMap.getMap());
        kaKaoLoginService.kakaoLogin(commitMap.getMap(), session);

        return "redirect:/";
    }
}
