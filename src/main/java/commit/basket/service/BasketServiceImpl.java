package commit.basket.service;

import commit.basket.dao.BasketDAO;
import commit.etc.helper.SessionHelper;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;


@Service
public class BasketServiceImpl implements BasketService {
    Logger log = Logger.getLogger(this.getClass());

    @Autowired
    private SessionHelper sessionHelper;

    @Autowired
    private BasketDAO basketDAO;

    @Override
    public List<Map<String, Object>> getBasketList(Map<String, Object> map, HttpServletRequest request) throws Exception {
        map = sessionHelper.make(map, request);

        return basketDAO.selectBasketList(map);
    }

    @Override
    public void updateBasket(Map<String, Object> map, HttpServletRequest request) throws Exception {
        map = sessionHelper.make(map, request);
        basketDAO.updateBasket(map);

    }

    @Override
    public void deleteBasket(Map<String, Object> map, HttpServletRequest request) throws Exception {
        map = sessionHelper.make(map, request);
        basketDAO.deleteBasket(map);
    }


    @Override
    public void clearBasket(Map<String, Object> map, HttpServletRequest request) throws Exception {
        map = sessionHelper.make(map, request);
        basketDAO.clearBasket(map);
    }


    @Override
    public void addBasket(Map<String, Object> map, HttpServletRequest request) throws Exception {

        map = sessionHelper.make(map, request);

		// 장바구니에 이미 해당 상품이 있는지 체크
        int duplicate = basketDAO.checkBasket(map);

        if (duplicate == 0) {
            basketDAO.insertBasket(map);
        } else {
            basketDAO.updateAmount(map);
        }

    }

}
