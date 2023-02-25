package commit.qna.service;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

public interface QnaService {

	void updateQna(Map<String, Object> map)throws Exception;

	void deleteQna(Map<String, Object> map, HttpServletRequest request)throws Exception;

	void writeQna(Map<String, Object> map, HttpServletRequest request);

}
