package commit.coupon.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

public interface CouponService {

    List<Map<String, Object>> getCouponList() throws Exception;

    String downloadCoupon(Map<String, Object> map, HttpServletRequest request) throws Exception;

    void addCoupon(Map<String, Object> map) throws Exception;

    Map<String, Object> getCouponDetail(Map<String, Object> map) throws Exception;

    void updateCoupon(Map<String, Object> map) throws Exception;

    void deleteCoupon(Map<String, Object> map) throws Exception;


}
