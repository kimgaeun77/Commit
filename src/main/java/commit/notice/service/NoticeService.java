package commit.notice.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

public interface NoticeService {

	List<Map<String, Object>> getNoticeList(Map<String, Object> map) throws Exception;

	void writeNotice(Map<String, Object> map, HttpServletRequest request) throws Exception;

	Map<String, Object> getNoticeDetail(Map<String, Object> map, HttpServletRequest request, String state) throws Exception;

	List<Map<String, Object>> getCommentList(Map<String, Object> map) throws Exception;

	void updateNotice(Map<String, Object> map, HttpServletRequest request) throws Exception;

	void deleteNotice(Map<String, Object> map) throws Exception;

	void downloadFile(Map<String, Object> map, HttpServletResponse response, HttpServletRequest request) throws Exception;

	void writeComment(Map<String, Object> map, HttpServletRequest request) throws Exception;

	void deleteComment(Map<String, Object> map)throws Exception;





}
