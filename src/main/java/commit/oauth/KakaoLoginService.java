package commit.oauth;

import commit.member.service.MemberService;
import commit.oauth.model.AccessTokenInfo;
import commit.oauth.model.KakaoUserInfo;
import commit.oauth.model.Oauth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Service
public class KakaoLoginService {

    private final RestTemplate restTemplate;
    private final HttpHeaders header;

    @Autowired
    private MemberService memberService;

    @Value("${kakao.clientId}")
    private String clientId;

    @Value("${kakao.redirectURI}")
    private String redirectURI;


    public KakaoLoginService(RestTemplate restTemplate, HttpHeaders header){
        this.restTemplate = restTemplate;
        this.header = header;
    }

    @SuppressWarnings("unchecked")
    public String getAccessToken(String code) {

        //토큰 발급을 위한 요청 주소
        String requestURI = "https://kauth.kakao.com/oauth/token";

        //사실상 content-type은 지정안해도 resttemplate 문서를 보면 message converter가 보내는 object를 보고 content type을 찾을 수 있다고 했음.
        header.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        //test 해본결과 header에 Authorization나 필요있지않은 데이터가 있어도 필수 값만 있다면 상관없는듯! 카카오api에서 그냥 content-type이 urlencoded인지만 확인

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", clientId);
        body.add("redirect_uri", redirectURI);
        body.add("code", code);

        //요청 주소에 보낼 entity
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, header);

        //responseBody안에는 String,Integer의 값이 들어있음
        AccessTokenInfo tokenInfo = restTemplate.exchange(requestURI, HttpMethod.POST, request, AccessTokenInfo.class).getBody();

        return tokenInfo.getAccess_token();
    }

    @SuppressWarnings("unchecked")
    public KakaoUserInfo getUserInfo(String accessToken) {


        String requestURI = "https://kapi.kakao.com/v2/user/me";

        header.add("Authorization","Bearer "+accessToken);

        //액세스 토큰을 받아올때 이미 content-type을 urlencoded로 설정하기 때문에 아직 남아있음. 객체를 하나로 같이 쓰기 때문!

        HttpEntity<MultiValueMap<String,String>> request = new HttpEntity<>(header);

        KakaoUserInfo userInfo = restTemplate.exchange(requestURI, HttpMethod.GET, request, KakaoUserInfo.class).getBody();
        header.clear();
        return userInfo;
    }


    public int joinCheck(KakaoUserInfo userInfo) throws Exception {

        Map<String, Object> map = makeUserId(userInfo);

        //회원가입이 되어있는지 확인 후 가입이 되어있으면 로그인 -> 결과값 1
        //회원가입이 안되어있다면 회원가입 페이지로 -> 결과값 0

        return memberService.confirmId(map);

    }


    // 액세스 토큰으로 받은 user정보를 통해 회원가입시 입력시킬 회원 아이디를 자동 생성해주는 메소드(카카오 로그인시에만 해당)
    // 우리가 아이디를 생성해줘야 하는이유 -> 카카오톡 로그인을 사용할 경우 우리가 아이디와 비밀번호 받을 방법이 없다.
    // 따라서 카카오톡 프로필 정보를 기반해 (우리가)아이디를 생성해 만들어진 아이디로 회원정보를 조회후 조회가 정상적으로
    // 이루어졌다면 그 아이디를 session영역에 저장시켜야 로그인 로직이 완성이된다.
    public Map<String,Object> makeUserId(KakaoUserInfo userInfo){

        Map<String, Object> map = new HashMap<>();
        String memId = userInfo.getId() +"_"+ userInfo.getProperties().getNickname() +"_"+ "oauth";
        map.put("MEM_ID", memId);
        return map;

    }

    public void join(Map<String, Object> map) throws Exception {
        
        //아이디 생성(id, nickname 활용)
        String id = map.get("ID").toString();//id는 카카오 로그인 api를 통해 사용자 정보 가져오기를 하면 필수로 줌.
        String mem_name = map.get("MEM_NAME").toString();
        String mem_id = id +"_"+ mem_name +"_oauth";
        map.put("MEM_ID", mem_id);

        
        //oauth 필드
        map.put("OAUTH", Oauth.KAKAO);

        memberService.joinMember(map);

    }


    public void kakaoLogin(Map<String, Object> map, HttpSession session) {

        session.setAttribute("MEM_ID",map.get("MEM_ID"));
        session.setAttribute("MEM_NAME", map.get("MEM_NAME"));
    }
}
