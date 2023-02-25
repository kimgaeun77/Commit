package commit.my.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

public interface MyService {

    void updateInfo(Map<String, Object> map, HttpServletRequest request) throws Exception;

    void deleteInfo(Map<String, Object> map, HttpServletRequest request) throws Exception;

    List<Map<String, Object>> getOrderList(Map<String, Object> map, HttpServletRequest request) throws Exception;

    Map<String, Object> getOrderDetail(Map<String, Object> map, HttpServletRequest request, HttpServletResponse response) throws Exception;

    List<Map<String, Object>> getQnaList(Map<String, Object> map, HttpServletRequest request) throws Exception;

    Map<String, Object> getQnaDetail(Map<String, Object> map, HttpServletRequest request, HttpServletResponse response) throws Exception;

    List<Map<String, Object>> getCouponList(Map<String, Object> map, HttpServletRequest request) throws Exception;


}
