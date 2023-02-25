package commit.admin.service;

import commit.admin.dao.AdminDAO;
import commit.etc.etc.Paging;
import commit.etc.utils.ImageUtils;
import commit.product.dao.ProductDAO;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminServiceImpl implements AdminService {

    Logger log = Logger.getLogger(this.getClass());

    @Autowired
    private AdminDAO adminDAO;

    @Autowired
    private ProductDAO productDAO;

    @Autowired
    private ImageUtils imageUtils;

    @Autowired
    private Paging paging;

    @Override
    public List<Map<String, Object>> getOrderList(Map<String, Object> map) throws Exception {

        map.put("totalRecord", adminDAO.countOrderRecord(map));
        Map<String, Object> calcResult = paging.calc(map, 10);
        List<Map<String, Object>> orderList = adminDAO.selectOrderList(calcResult);
        orderList.add(calcResult);
        return orderList;
    }

    @Override
    public void updateOrder(Map<String, Object> map) throws Exception {

        // map 안에는 주문 번호랑 state가 담겨있고 만약 state가 환불 완료(F)라면
        List<Map<String, Object>> orderList;

        // 주문번호에 대한 상태는 변경시켜주고
        adminDAO.updateOrder(map);

        // 만약 주문 상태가 F 환불완료라면 주문한 수량만큼 상품재고를 다시 +, 쿠폰사용했으면 다시 원래대로
        if (map.get("STATE").equals("F")) {

            // pro_order 테이블로부터 정보를 꺼내옴
            orderList = adminDAO.selectProductInfo(map);
            for (Map<String, Object> order : orderList) {
                order.put("cancel", "orderCancel");
                productDAO.updateProductStock(order);
            }

            // order_info 테이블로부터 정보를 꺼내옴
            Map<String, Object> checkResult = adminDAO.checkCoupon(map);
            if (checkResult.get("CP_IDX") != null) {
                checkResult.put("cancel", "orderCancel");
                productDAO.updateMemberCoupon(checkResult);
            }

        }
    }

    @Override
    public List<Map<String, Object>> getMemberList(Map<String, Object> map) throws Exception {

        map.put("totalRecord", adminDAO.countMemberRecord(map));
        Map<String, Object> calcResult = paging.calc(map, 10);
        List<Map<String, Object>> memberList = adminDAO.selectMemberList(calcResult);
        memberList.add(calcResult);
        return memberList;
    }

    @Override
    public Map<String, Object> getMemberDetail(Map<String, Object> map) throws Exception {

        Map<String, Object> memberDetail = adminDAO.selectMemberDetail(map);

        if (memberDetail != null && memberDetail.get("ZIPCODE") != null) {//가입된 회원이거나 주소를 입력했을때만
            String address = memberDetail.get("ADDRESS").toString();
            int division = address.indexOf("|");
            if (division != -1) {
                memberDetail.put("ROAD_ADDRESS", address.substring(0, division));
                memberDetail.put("ADDRESS_DETAIL", address.substring(division + 1));
            }
        }

        return memberDetail;
    }

    @Override
    public void deleteMember(Map<String, Object> map) throws Exception {
        adminDAO.deleteMember(map);
    }

    @Override
    public List<Map<String, Object>> getProductList(Map<String, Object> map) throws Exception {

        map.put("totalRecord", adminDAO.countProductRecord(map));
        Map<String, Object> calcResult = paging.calc(map, 10);
        List<Map<String, Object>> productList = adminDAO.selectProductList(calcResult);
        productList.add(calcResult);
        return productList;
    }

    @Override
    public void addProduct(Map<String, Object> map, HttpServletRequest request) throws Exception {

        Map<String, Object> productInfo = imageUtils.parseInsertMainImg(map, request);

        // 상품 등록 + 메인 사진
        adminDAO.insertProduct(productInfo);

        if ("STUFF".equals(productInfo.get("PRO_GROUP"))) {
            adminDAO.insertDetail(productInfo);
        }

        List<Map<String, Object>> subImageList = imageUtils.parseInsertSubImage(map, request);

        for (Map<String, Object> subImage : subImageList) {
            adminDAO.insertSubImage(subImage);
        }

    }

    @Override
    public Map<String, Object> getProductDetail(Map<String, Object> map) throws Exception {

        Map<String, Object> totalProductInfo = new HashMap<>();
        Map<String, Object> productDetail = adminDAO.selectProductDetail(map);
        if ("STUFF".equals(productDetail.get("PRO_GROUP"))) {
            Map<String, Object> stuffDetail = adminDAO.selectStuffDetail(map);
            totalProductInfo.put("stuffDetail", stuffDetail);
        }
        List<Map<String, Object>> subImageList = adminDAO.selectSubImageList(map);

        totalProductInfo.put("proInfo", productDetail);
        totalProductInfo.put("proImage", subImageList);

        return totalProductInfo;
    }

    @Override
    public void updateProduct(Map<String, Object> map, HttpServletRequest request) throws Exception {

        Map<String, Object> productInfo = imageUtils.parseInsertMainImg(map, request);

        // 메인 이미지는 필수이기 때문에 삭제 처리 필요없음(새로 업데이트한 메인 사진 파일이 없다면 기존에 있는 파일을 사용하면 된다.
        // 상품정보 변경
        adminDAO.updateProduct(productInfo);

        if ("STUFF".equals(productInfo.get("PRO_GROUP"))) {
            adminDAO.updateProductDetail(productInfo);
        }

        // 기존에 있었던 이미지 삭제 처리
        adminDAO.deleteImageList(map);

        List<Map<String, Object>> subImageList = imageUtils.parseUpdateSubImage(map, request);

        for (Map<String, Object> subImage : subImageList) {
            if (subImage.get("NEW_FILE").equals("Y")) {
                adminDAO.insertSubImage(subImage);
            } else {
                adminDAO.updateImageList(subImage);
            }

        }

    }

    @Override
    public void deleteProduct(Map<String, Object> map, HttpServletResponse response) throws Exception {

        adminDAO.deleteProduct(map);
        adminDAO.deleteImageList(map);

    }
}
