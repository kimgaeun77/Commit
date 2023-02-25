package commit.notice.dao;

import commit.etc.dao.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class NoticeDAO extends AbstractDAO{
	
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectNoticeList(Map<String, Object> map) throws Exception{
		return (List<Map<String, Object>>)selectList("notice.selectNoticeList", map);
	}
	
	
	
	public void insertNotice(Map<String, Object> map) throws Exception{
		insert("notice.insertNotice", map);
	}
	
	
	
	public void updateHitCount(Map<String, Object> map) throws Exception{
		update("notice.updateHitCount", map);
	}
	
	
	
	@SuppressWarnings("unchecked")
	public Map<String, Object> selectNoticeDetail(Map<String, Object> map) throws Exception{
		return (Map<String, Object>) selectOne("notice.selectNoticeDetail", map);
	}
	
	
	
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectCommentList(Map<String, Object> map) throws Exception{
		return (List<Map<String, Object>>)selectList("notice.selectCommentList", map);
	}
	
	
	
	public void updateNotice(Map<String, Object> map) throws Exception{
		update("notice.updateNotice", map);
	}

	
	
	public void deleteNotice(Map<String, Object> map) throws Exception{
		update("notice.deleteNotice", map);
	}
	
	
	@SuppressWarnings("unchecked")
	public Map<String, Object> selectFileInfo(Map<String, Object> map) throws Exception{
		return (Map<String, Object>)selectOne("notice.selectFileInfo", map);
	}

	
	
	public void insertFile(Map<String, Object> map) {
		insert("notice.insertFile", map);
	}
	
	
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectFileList(Map<String, Object> map) {
		return (List<Map<String, Object>>)selectList("notice.selectFileList", map);
	}

	
	
	public void deleteFileList(Map<String, Object> map) {
		update("notice.deleteFileList", map);
		
	}

	
	
	public void updateFile(Map<String, Object> map) {
		update("notice.updateFile", map);
		
	}
	
	

	public void insertComment(Map<String, Object> map) {
		insert("notice.insertComment", map);
	}
	
	

	public void deleteComment(Map<String, Object> map) {
		update("notice.deleteComment", map);
		
	}


	public int countRecord(Map<String, Object> map) {
		return (int) selectOne("notice.countRecord",map);
	}



	public int countCommentRecord(Map<String, Object> map) {
		return (int) selectOne("notice.countCommentRecord",map);
	}
}
