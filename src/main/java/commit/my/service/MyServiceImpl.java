package commit.my.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import commit.etc.helper.Alert;
import commit.etc.helper.SessionHelper;
import commit.my.dao.MyDAO;

@Service
public class MyServiceImpl implements MyService {

    Logger log = Logger.getLogger(this.getClass());

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private SessionHelper sessionHelper;

    @Autowired
    private Alert alert;

    @Autowired
    private MyDAO myDAO;

    @Override
    public void updateInfo(Map<String, Object> map, HttpServletRequest request) throws Exception {

        //map에 mem_id가 있더라도 다시 세션 scope에서 mem_id를 얻어옴
        map = sessionHelper.make(map, request);

        //우편번호
        String zipcode = map.get("ZIPCODE").toString();
        //도로명 주소
        String loadAddress = map.get("ROAD_ADDRESS").toString();
        //상세 주소
        String addressDetail = map.get("ADDRESS_DETAIL").toString();
        //도로명주소 + 상세주소
        String fullAddress;

        //주소를 입력했다면(주소는 필수 값이 아님)
        if (!"".equals(zipcode)) {
            //상세주소도 입력했다면
            if (!"".equals(addressDetail)) {
                // |이 문자열로 분리해서 DB에 저장하고 꺼내올때도 |를 기준으로 꺼내올거임.
                fullAddress = loadAddress + "|" + addressDetail;
            } else {
                fullAddress = loadAddress + "|";
            }
            map.put("ADDRESS", fullAddress);
        }

        //비밀번호 암호화 작업
        String rawPassword = map.get("MEM_PW").toString();
        String encodePassword = encoder.encode(rawPassword);
        map.put("MEM_PW", encodePassword);

        myDAO.updateInfo(map);
    }

    @Override
    public void deleteInfo(Map<String, Object> map, HttpServletRequest request) throws Exception {
        map = sessionHelper.make(map, request);

        myDAO.deleteInfo(map);

        sessionHelper.remove(request);

    }

    @Override
    public List<Map<String, Object>> getOrderList(Map<String, Object> map, HttpServletRequest request) throws Exception {

        map = sessionHelper.make(map, request);

        return myDAO.selectOrderList(map);
    }


    @Override
    public Map<String, Object> getOrderDetail(Map<String, Object> map, HttpServletRequest request,
                                                HttpServletResponse response) throws Exception {

        map = sessionHelper.make(map, request);
        Map<String, Object> orderDetail = new HashMap<>();
        // 얘는 하나의 주문번호에 대한 여러상품 정보를 가져와야하니 list로
        List<Map<String, Object>> order = myDAO.selectFromOrder(map);
        // 얘는 하나의 주문번호에 대한 주문정보 하나만 가져오면 되니 하나의 map으로
        Map<String, Object> orderInfo = myDAO.selectFromOrderInfo(map);

        try {
            // 주문자 정보와 현재 세션에 로그인된 정보가 일치하지 않고 관리자도 아닐때(관리자는 접근 가능하다)
            if (!orderInfo.get("MEM_ID").equals(map.get("MEM_ID")) && map.get("admin") == null) {
                throw new Exception();
            }
        } catch (Exception e) {
            alert.make(response, "잘못된 접근입니다.", "/main");
        }

        orderDetail.put("order", order);
        orderDetail.put("orderInfo", orderInfo);

        return orderDetail;

    }

    @Override
    public List<Map<String, Object>> getQnaList(Map<String, Object> map, HttpServletRequest request) throws Exception {

        map = sessionHelper.make(map, request);

        return myDAO.selectQnaList(map);
    }

    @Override
    public Map<String, Object> getQnaDetail(Map<String, Object> map, HttpServletRequest request,
                                           HttpServletResponse response) throws Exception {

        map = sessionHelper.make(map, request);
        Map<String, Object> qnaDetail = myDAO.selectQnaDetail(map);
        try {
            if (!qnaDetail.get("MEM_ID").equals(map.get("MEM_ID")) && map.get("admin") == null) {
                throw new Exception();
            }
        } catch (Exception e) {

            alert.make(response, "잘못된 접근입니다.", "/main");

        }
        String originalContent = qnaDetail.get("CONTENT").toString();
        String replaceContent = originalContent.replaceAll("<br>", System.lineSeparator());
        qnaDetail.put("CONTENT", replaceContent);


        return qnaDetail;
    }

    @Override
    public List<Map<String, Object>> getCouponList(Map<String, Object> map, HttpServletRequest request)
            throws Exception {

        map = sessionHelper.make(map, request);

        return myDAO.selectCouponList(map);
    }


}