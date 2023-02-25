package commit.admin.dao;

import commit.etc.dao.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class AdminDAO extends AbstractDAO {

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectOrderList(Map<String, Object> map) {

		return selectList("admin.selectOrderList", map);
	}
	
	
	public void updateOrder(Map<String, Object> map) {
		update("admin.updateOrder", map);
	}

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectMemberList(Map<String, Object> map) {
		return (List<Map<String, Object>>) selectList("admin.selectMemberList", map);
	}

	@SuppressWarnings("unchecked")
	public Map<String, Object> selectMemberDetail(Map<String, Object> map) {
		return (Map<String, Object>) selectOne("admin.selectMemberDetail", map);
	}

	public void deleteMember(Map<String, Object> map) {
		update("admin.deleteMember", map);
	}

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectProductList(Map<String, Object> map) {
		return (List<Map<String, Object>>) selectList("admin.selectProductList", map);
	}

	public void insertProduct(Map<String, Object> map) {
		insert("admin.insertProduct", map);

	}

	public void insertSubImage(Map<String, Object> map) {
		insert("admin.insertSubImage", map);

	}

	@SuppressWarnings("unchecked")
	public Map<String, Object> selectProductDetail(Map<String, Object> map) {

		return (Map<String, Object>) selectOne("admin.selectProductDetail", map);
	}

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectSubImageList(Map<String, Object> map) {

		return selectList("admin.selectSubImageList", map);
	}

	public void updateProduct(Map<String, Object> map) {
		update("admin.updateProduct", map);
	}

	public void updateImageList(Map<String, Object> map) {
		update("admin.updateImageList", map);
	}

	public void deleteProduct(Map<String, Object> map) {
		update("admin.deleteProduct", map);
	}

	public void deleteImageList(Map<String, Object> map) {
		update("admin.deleteImageList", map);
	}


	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectProductInfo(Map<String, Object> map) {
		
		return selectList("admin.selectProductInfo", map);
	}

	@SuppressWarnings("unchecked")
	public Map<String, Object> checkCoupon(Map<String, Object> map) {
		return (Map<String, Object>) selectOne("admin.checkCoupon", map);
	}


	public void insertDetail(Map<String, Object> map) {
		insert("admin.insertDetail", map);
		
	}


	public int countMemberRecord(Map<String, Object> map) {
		return (int) selectOne("admin.countMemberRecord",map);
	}


	public int countOrderRecord(Map<String, Object> map) {
		return (int) selectOne("admin.countOrderRecord",map);
	}


	public int countProductRecord(Map<String, Object> map) {
		return (int) selectOne("admin.countProductRecord",map);
	}


	@SuppressWarnings("unchecked")
	public Map<String, Object> selectStuffDetail(Map<String, Object> map) {
		return (Map<String, Object>) selectOne("admin.selectStuffDetail",map);
	}


	public void updateProductDetail(Map<String, Object> map1) {
		update("admin.updateProductDetail", map1);
		
	}

}
