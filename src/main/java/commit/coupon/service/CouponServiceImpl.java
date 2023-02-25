package commit.coupon.service;

import commit.coupon.dao.CouponDAO;
import commit.etc.helper.SessionHelper;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

@Service
public class CouponServiceImpl implements CouponService {

    Logger log = Logger.getLogger(this.getClass());

    @Autowired
    private SessionHelper sessionHelper;

    @Autowired
    private CouponDAO couponDAO;

    @Override
    public List<Map<String, Object>> getCouponList() throws Exception {
        return couponDAO.selectCouponList();
    }

    @Override
    public String downloadCoupon(Map<String, Object> map, HttpServletRequest request) throws Exception {

        map = sessionHelper.make(map, request);

        //이미 다운받고 사용한 쿠폰도 다시 다운 못받게 할거임
        int duplicate = couponDAO.checkCoupon(map);

        if (duplicate == 0) {
            couponDAO.downloadCoupon(map);
            return "쿠폰 발급 완료!";

        }

        return "이미 다운로드 받은 쿠폰입니다.";
    }

    @Override
    public void addCoupon(Map<String, Object> map) throws Exception {
        couponDAO.insertCoupon(map);

    }

    @Override
    public Map<String, Object> getCouponDetail(Map<String, Object> map) throws Exception {

        return couponDAO.selectCouponDetail(map);
    }

    @Override
    public void updateCoupon(Map<String, Object> map) throws Exception {

        couponDAO.updateCoupon(map);
    }

    @Override
    public void deleteCoupon(Map<String, Object> map) throws Exception {
        couponDAO.deleteCoupon(map);

    }

}
