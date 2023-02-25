package commit.product.service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

public interface ProductService {

    List<Map<String, Object>> getProductList(Map<String, Object> map) throws Exception;

    Map<String, Object> getProductDetail(Map<String, Object> map) throws Exception;

    void order(Map<String, Object> map, HttpServletRequest request) throws Exception;

    int cancelOrder(Map<String, Object> map, HttpServletRequest request);

    List<Map<String, Object>> getProductInfo(String[] PRO_IDX, String[] AMOUNT);


}
