package commit.member.service;

import commit.etc.helper.SessionHelper;
import commit.etc.mail.Mail;
import commit.etc.utils.CommitUtils;
import commit.member.dao.MemberDAO;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Service("memberService")
public class MemberServiceImpl implements MemberService {

    Logger log = Logger.getLogger(this.getClass());

    @Autowired
    private SessionHelper sessionHelper;

    @Autowired
    private MemberDAO memberDAO;

    @Autowired//임시비밀번호 메일 전송 관련 서비스
    private Mail mailService;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Override
    public int confirmId(Map<String, Object> map) throws Exception {
        return memberDAO.confirmId(map);
    }

    @Override
    public int confirmEmail(Map<String, Object> map) throws Exception {
        return memberDAO.confirmEmail(map);
    }

    @Override
    public void joinMember(Map<String, Object> map) throws Exception {

        //우편번호(회원이 값을 적지 않아도 null이 아닌 빈문자열이므로 예외 발생 X)
        String zipcode = map.get("ZIPCODE").toString();
        //도로명 주소
        String loadAddress = map.get("ROAD_ADDRESS").toString();
        //상세 주소
        String addressDetail = map.get("ADDRESS_DETAIL").toString();
        //도로명주소 + 상세주소
        String fullAddress;

        //주소를 입력했다면(주소는 필수 값이 아님)
        if (!"".equals(zipcode)) {
            //상세주소도 입력했다면
            if (!"".equals(addressDetail)) {
                fullAddress = loadAddress + "|" + addressDetail;// |이 문자열로 분리해서 DB에 저장하고 꺼내올때도 |를 기준으로 꺼내올거임.
            } else {
                fullAddress = loadAddress + "|";
            }
            map.put("ADDRESS", fullAddress);
        }
        //주소 입력 안했으면 위의 if문에 걸리지 않고 마이바티스 insert 쿼리문에 걸림. ADDRESS라는 값이 null이게 된다.(애초에 form에 ADDRESS라는 name은 없음)

        //이메일 합치는 작업
        String emailId = map.get("EMAIL_ID").toString();
        String domain = map.get("EMAIL_DOMAIN").toString();
        String email = emailId + "@" + domain;
        map.put("EMAIL", email);

        //비밀번호 암호화 작업
        String rawPassword = map.get("MEM_PW").toString();
        String encodePassword = encoder.encode(rawPassword);
        map.put("MEM_PW", encodePassword);

        memberDAO.insertMember(map);

    }

    @Override
    public Map<String, Object> getMemberDetail(Map<String, Object> map, HttpServletRequest request) throws Exception {

        //로그인할때만(일반 로그인, 카카오 로그인 둘 다 해당!) null이 아님 다른곳에서 사용할때는 request를 통해 세션에서 MEM_ID를 얻어옴
        if (map.get("MEM_ID") == null) {
            map = sessionHelper.make(map, request);
        }

        Map<String, Object> memberInfo = memberDAO.selectMemberDetail(map);

        if (memberInfo != null) {
            if (memberInfo.get("ZIPCODE") != null && !"".equals(memberInfo.get("ZIPCODE").toString())) {
                //주소 분리해서 map에 담아주기
                String totalAddress = memberInfo.get("ADDRESS").toString();
                int index = totalAddress.indexOf("|");
                String loadAddress = totalAddress.substring(0, index);//address의 |앞까지 잘라옴
                String addressDetail = totalAddress.substring(index + 1);

                memberInfo.put("ROAD_ADDRESS", loadAddress);
                memberInfo.put("ADDRESS_DETAIL", addressDetail);

            }

        }

        return memberInfo;

    }

    @Override
    public String loginCheck(Map<String, Object> map, HttpServletRequest request){

        // 이 기능을 로그인과 회원가입에서도 사용하려고 함
        map = sessionHelper.make(map, request);
        String checkRequest;

        // 이미 로그인 되어있는 상태라면
        if (map.get("MEM_ID") == null) {
            checkRequest = "correct-request";

        } else {
            checkRequest = "bad-request";

        }
        return checkRequest;
    }


    @Override
    public int findMemberByInfo(Map<String, Object> map, HttpServletRequest request) {

        String requestURI =  request.getRequestURI();
        if("/member/findID".equals(requestURI)){
            map.put("findID", "findID");
        }

        return memberDAO.selectMemberByInfo(map);
    }

    @Override
    public String findID(Map<String, Object> map) throws Exception {
        return memberDAO.findID(map);
    }

    @Override
    public void sendEmail(Map<String, Object> map) throws Exception {

        String tempPW = CommitUtils.getRandomString().substring(0, 10);
        //비밀번호 해싱
        String encodePassword = encoder.encode(tempPW);
        map.put("TEMP_PW", encodePassword);
        memberDAO.updateTempPW(map);

        String lineSeparator = System.lineSeparator() + System.lineSeparator();
        String email = map.get("EMAIL").toString();
        String commitEmail = "commitpcShop@gmail.com";
        String title = "[Commit] 🔑 임시비밀번호 보내드립니다.";
        String content = "안녕하세요 Commit입니다." + lineSeparator + "발급된 임시비밀번호를 보내드립니다." + lineSeparator + tempPW;
        mailService.sendEmail(email, commitEmail, title, content);
    }


}
