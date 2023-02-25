package commit.my.dao;

import commit.etc.dao.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class MyDAO extends AbstractDAO {

	public void updateInfo(Map<String, Object> map) {
		update("my.updateInfo", map);

	}

	public void deleteInfo(Map<String, Object> map) {
		update("my.deleteInfo", map);
		
	}

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectOrderList(Map<String, Object> map) {
		
		return selectList("my.selectOrderList", map);
	}

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectFromOrder(Map<String, Object> map) {

		return selectList("my.selectFromOrder", map);
	}

	@SuppressWarnings("unchecked")
	public Map<String, Object> selectFromOrderInfo(Map<String, Object> map) {

		return (Map<String, Object>) selectOne("my.selectFromOrderInfo", map);
	}

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectQnaList(Map<String, Object> map) {
		
		return selectList("my.selectQnaList", map);
	}

	@SuppressWarnings("unchecked")
	public Map<String, Object> selectQnaDetail(Map<String, Object> map) {
		
		return (Map<String, Object>) selectOne("my.selectQnaDetail", map);
	}

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectCouponList(Map<String, Object> map) {
		
		return selectList("my.selectCouponList", map);
	}

}