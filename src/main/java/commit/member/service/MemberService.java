package commit.member.service;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

public interface MemberService {

	Map<String, Object> getMemberDetail(Map<String, Object> map, HttpServletRequest request) throws Exception;

	int confirmId(Map<String, Object> map) throws Exception;

	int confirmEmail(Map<String, Object> map) throws Exception;

	void joinMember(Map<String, Object> map) throws Exception;

	String loginCheck(Map<String, Object> map, HttpServletRequest request) throws Exception;

	String findID(Map<String, Object> map) throws Exception;

	void sendEmail(Map<String, Object> map) throws Exception;

	int findMemberByInfo(Map<String, Object> map, HttpServletRequest request);
}
