package commit.basket.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import commit.basket.service.BasketService;
import commit.etc.etc.CommitMap;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

// 장바구니
@Controller
@RequestMapping("/basket")
public class BasketController {

    Logger log = Logger.getLogger(this.getClass());

    @Autowired
    private BasketService basketService;

    // 내 장바구니 목록
    @GetMapping("/main")
    public ModelAndView getBasketList(CommitMap commitMap, HttpServletRequest request) throws Exception {

        List<Map<String, Object>> basketList = basketService.getBasketList(commitMap.getMap(), request);
        ModelAndView mv = new ModelAndView("/basket/main");
        mv.addObject("list", basketList);
        return mv;
    }

    // 상품 개수 수정 (ajax)
    @ResponseBody
    @PostMapping("/update")
    public void updateBasket(@RequestBody Map<String, Object> map, HttpServletRequest request) throws Exception {

        basketService.updateBasket(map, request);

    }

    // 상품 선택 삭제 (ajax)
	@ResponseBody
    @PostMapping("/delete")
    public void deleteBasket(@RequestBody Map<String, Object> map, HttpServletRequest request) throws Exception {

        basketService.deleteBasket(map, request);

    }

    // 상품 전체 비우기 (ajax)
    @ResponseBody
    @GetMapping("/clear")
    public void clearBasket(CommitMap commitMap, HttpServletRequest request) throws Exception {

        basketService.clearBasket(commitMap.getMap(), request);

    }

    // 상품 추가 (ajax)
    @ResponseBody
    @PostMapping("/add")   //상품 번호와 수량을 받아와서 session에 있는 아이디에 장바구니 목록 추가
    public void addBasket(@RequestBody Map<String, Object> map, HttpServletRequest request) throws Exception {

        basketService.addBasket(map, request);

    }


}
