package commit.qna.service;

import commit.etc.helper.SessionHelper;
import commit.qna.dao.QnaDAO;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Service
public class QnaServiceImpl implements QnaService{

	Logger log = Logger.getLogger(this.getClass());

	@Autowired
	private SessionHelper sessionHelper;

	@Autowired
	private QnaDAO qnaDAO;

	@Override
	public void updateQna(Map<String, Object> map) throws Exception {

		String originalContent = map.get("CONTENT").toString();
		String replaceContent = originalContent.replaceAll("\n", "<br>");
		map.put("CONTENT", replaceContent);

		qnaDAO.updateQna(map);
		
	}

	@Override
	public void deleteQna(Map<String, Object> map, HttpServletRequest request) throws Exception {

		// 관리자일 경우 RE_STEP이 1인 게시글만 삭제(session 값으로 확인)
		map = sessionHelper.make(map, request);
		
		qnaDAO.deleteQna(map);

	}

	@Override
	public void writeQna(Map<String, Object> map, HttpServletRequest request) {

		map = sessionHelper.make(map, request);


		String originalContent = map.get("CONTENT").toString();
		String replaceContent = originalContent.replaceAll(System.lineSeparator(), "<br>");
		map.put("CONTENT", replaceContent);
		
		// 관리자가 답변
		if(map.get("admin")!= null) {
			qnaDAO.insertAnswer(map);
			//루트 글 답변 상태 업데이트 시킴
			qnaDAO.updateState(map);
		//회원이 문의
		}else {
			qnaDAO.insertQuestion(map);
		}
		
	}

}
