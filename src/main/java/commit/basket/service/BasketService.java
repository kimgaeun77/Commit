package commit.basket.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

public interface BasketService {

    List<Map<String, Object>> getBasketList(Map<String, Object> map, HttpServletRequest request) throws Exception;

    void updateBasket(Map<String, Object> map, HttpServletRequest request) throws Exception;

    void deleteBasket(Map<String, Object> map, HttpServletRequest request) throws Exception;

    void clearBasket(Map<String, Object> map, HttpServletRequest request) throws Exception;

    void addBasket(Map<String, Object> map, HttpServletRequest request) throws Exception;


}
