package commit.product.dao;

import commit.etc.dao.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public class ProductDAO extends AbstractDAO{

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectProductList(Map<String, Object> map) {
	
		return selectList("product.selectProductList", map);
	}
	
	@SuppressWarnings("unchecked")
	public Map<String, Object> selectProductDetail(Map<String, Object> map) {
		return (Map<String, Object>)selectOne("product.selectProductDetail", map);
	}

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectProductImage(Map<String, Object> map) {
		return (List<Map<String, Object>>)selectList("product.selectProductImage", map);
	}

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectProductReview(Map<String, Object> map) {
		return (List<Map<String, Object>>)selectList("product.selectProductReview", map);
	}

	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectProductQna(Map<String, Object> map) {
		return (List<Map<String, Object>>)selectList("product.selectProductQna", map);
	}

	public void insertOrderProduct(Map<String, Object> map) {
		insert("product.insertOrderProduct", map);
		
	}

	public void insertOrderInfo(Map<String, Object> map) {
		insert("product.insertOrderInfo", map);
		
	}

	public void updateProductStock(Map<String, Object> map) {
		update("product.updateProductStock", map);
		
	}

	public void updateMemberCoupon(Map<String, Object> map) {
		update("product.updateMemberCoupon", map);
		
	}

	public void cancelOrder(Map<String, Object> map) {
		update("product.cancelOrder", map);
	}

	
	@SuppressWarnings("unchecked")
	public Map<String, Object> checkOrderState(Map<String, Object> map) {
		return (Map<String, Object>) selectOne("product.selectOrderState", map);
	}



}
