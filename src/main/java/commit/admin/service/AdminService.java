package commit.admin.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

public interface AdminService {

	List<Map<String, Object>> getOrderList(Map<String, Object> map) throws Exception;
	
	void updateOrder(Map<String, Object> map) throws Exception;

	List<Map<String, Object>> getMemberList(Map<String, Object> map) throws Exception;

	Map<String, Object> getMemberDetail(Map<String, Object> map) throws Exception;

	void deleteMember(Map<String, Object> map) throws Exception;

	List<Map<String, Object>> getProductList(Map<String, Object> map) throws Exception;

	void addProduct(Map<String, Object> map, HttpServletRequest request) throws Exception;

	Map<String, Object> getProductDetail(Map<String, Object> map) throws Exception;

	void updateProduct(Map<String, Object> map, HttpServletRequest request) throws Exception;

	void deleteProduct(Map<String, Object> map, HttpServletResponse response) throws Exception;

}
