package commit.product.service;

import commit.basket.dao.BasketDAO;
import commit.etc.helper.SessionHelper;
import commit.product.dao.ProductDAO;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.management.ObjectName;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProductServiceImpl implements ProductService {

    Logger log = Logger.getLogger(this.getClass());

    @Autowired
    private ProductDAO productDAO;

    @Autowired
    private BasketDAO basketDAO;

    @Autowired
    private SessionHelper sessionHelper;

    @Override
    public List<Map<String, Object>> getProductList(Map<String, Object> map) throws Exception {

        return productDAO.selectProductList(map);
    }

    @Override
    public Map<String, Object> getProductDetail(Map<String, Object> map) throws Exception {

        Map<String, Object> productDetails = new HashMap<>();
        Map<String, Object> detail = productDAO.selectProductDetail(map);
        List<Map<String, Object>> image = productDAO.selectProductImage(map);
        List<Map<String, Object>> review = productDAO.selectProductReview(map);
        List<Map<String, Object>> qna = productDAO.selectProductQna(map);

        productDetails.put("detail", detail);
        productDetails.put("image", image);
        productDetails.put("review", review);
        productDetails.put("qna", qna);
        return productDetails;
    }

    @Override
    public List<Map<String, Object>> getProductInfo(String[] PRO_IDX, String[] AMOUNT) {

        List<Map<String, Object>> productInfoList = new ArrayList<>();
        Map<String, Object> productInfo;
        Map<String, Object> orderProduct = new HashMap<>();
        int orderAmount;
        int stockAmount;

        for (int i = 0; i < PRO_IDX.length; i++) {

            orderProduct.put("PRO_IDX", PRO_IDX[i]);
            orderProduct.put("AMOUNT", AMOUNT[i]);
            productInfo = productDAO.selectProductDetail(orderProduct);
            orderAmount = Integer.parseInt(orderProduct.get("AMOUNT").toString());// 주문수량
            stockAmount = Integer.parseInt(productInfo.get("STOCK").toString());// 상품재고
            // 상품 재고보다 주문 수량이 많을때
            if (orderAmount > stockAmount) {
                return new ArrayList<>();
            }
            productInfo.put("AMOUNT", AMOUNT[i]);
            productInfoList.add(productInfo);

        }


        return productInfoList;
    }

    @Override
    @SuppressWarnings("unchecked")
    public void order(Map<String, Object> map, HttpServletRequest request)
            throws Exception {

        // 주문정보(배송지 + 주문자 이름 + 요청사항 등..)
        Map<String, Object> orderInfoMap = (Map<String, Object>) map.get("info");

        // 현재 로그인 되어있는 사용자의 아이디를 session 영역에서 얻어옴
        orderInfoMap = sessionHelper.make(orderInfoMap, request);
        // 주문 정보 insert
        productDAO.insertOrderInfo(orderInfoMap);

        // 쿠폰 사용 여부 확인
        if (orderInfoMap.get("CP_IDX") != null) {
            // 사용자가 쿠폰을 사용했다면 쿠폰 사용 완료 처리
            productDAO.updateMemberCoupon(orderInfoMap);
        }

        // 주문 상품정보(상품번호 + 주문 수량)
        List<Map<String, Object>> productList = (List<Map<String, Object>>) map.get("pro");

        for (Map<String, Object> product : productList) {

            product.put("ORDER_IDX", orderInfoMap.get("ORDER_IDX")); // 주문 정보를 insert할때 꺼내온 selectKey(ORDER_IDX)동일하게 사용
            productDAO.insertOrderProduct(product); // 주문 번호, 상품 번호, 주문 수량 컬럼만 있는 테이블에 insert
            productDAO.updateProductStock(product); // 상품 재고 업데이트 및 주문 횟수 증가

            product.put("MEM_ID", orderInfoMap.get("MEM_ID"));
            int check = basketDAO.checkBasket(product); // 구매 상품 중 장바구니에 담겨있는 상품이 있는지 확인

            if (check != 0) {
                // 담겨있다면 장바구니에서 삭제
                basketDAO.deleteBasket(product);
            }

        }
    }

    @Override
    public int cancelOrder(Map<String, Object> map, HttpServletRequest request) {

        map = sessionHelper.make(map, request);

        Map<String, Object> orderState = productDAO.checkOrderState(map);

        // 주문 상태가 배송 대기고 주문자 아이디와 현재 로그인된 아이디가 일치할 때
        if (orderState.get("STATE").equals("B") && orderState.get("MEM_ID").equals(map.get("MEM_ID"))) {
            productDAO.cancelOrder(map);
            return 1;
        }

        return -1;
    }

}
