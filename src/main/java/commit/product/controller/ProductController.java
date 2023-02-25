package commit.product.controller;

import commit.etc.etc.CommitMap;
import commit.member.service.MemberService;
import commit.my.service.MyService;
import commit.product.service.ProductService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;
// 상품 상세 및 주문
@Controller
@RequestMapping("/pro")
public class ProductController {

    Logger log = Logger.getLogger(this.getClass());

    @Autowired
    private ProductService productService;

    @Autowired
    private MemberService memberService;

    @Autowired
    private MyService myService;


    // 상품 목록 페이지
    @GetMapping("/list")
    public String listPage(CommitMap commitMap) {

        String view;

        if (commitMap.get("PRO_GROUP").equals("PC")) {
            view = "/pro/pcList";
        } else {
            view = "/pro/psList";
        }
        return view;

    }

    // 상품 목록 데이터 (ajax)
    @ResponseBody
    @PostMapping("/list/data")
    public List<Map<String, Object>> getProductList(@RequestBody Map<String, Object> map) throws Exception {
        return productService.getProductList(map);
    }

    // 상품 상세 페이지
    @GetMapping("/detail")
    public ModelAndView getProductDetailPage(String PRO_IDX) {

        // 사용자가 주소창에 주소를 치고 접근하는 경우(쿼리스트링이 날라오지 않았을 때)
        if(PRO_IDX == null || "".equals(PRO_IDX)){
            throw new RuntimeException();
        }
        ModelAndView mv = new ModelAndView("/pro/detail");
        mv.addObject("PRO_IDX", PRO_IDX);
        return mv;
    }

    // 상품 상세 데이터 (ajax)
    @ResponseBody
    @PostMapping("/detail")
    public Map<String, Object> getProductDetail(@RequestBody Map<String, Object> map) throws Exception {

        return productService.getProductDetail(map);
    }

    // 상품 주문 페이지(장바구니 + 상품 디테일 바로 구매에서 같이 사용)
    @GetMapping("/order")
    public ModelAndView orderPage(
            String[] PRO_IDX,
            String[] AMOUNT,
            CommitMap commitMap,
            HttpServletRequest request) throws Exception {

        ModelAndView mv = new ModelAndView();
        List<Map<String, Object>> productInfoList = productService.getProductInfo(PRO_IDX, AMOUNT);

        if (productInfoList.isEmpty()) {

            mv.addObject("msg", "해당 상품의 재고가 부족합니다.");
            mv.addObject("num", -1);
            mv.setViewName("/alert/historyBack");
            return mv;
        }
        Map<String, Object> myInfo = memberService.getMemberDetail(commitMap.getMap(), request);

        List<Map<String, Object>> couponList = myService.getCouponList(commitMap.getMap(), request);

        mv.addObject("proInfoList", productInfoList);
        mv.addObject("myInfo", myInfo);
        mv.addObject("couponList", couponList);
        mv.setViewName("/pro/order/form");
        return mv;
    }

    // 주문
    @ResponseBody
    @PostMapping("/order")     // json 문자열로 데이터를 받음
    public void order(@RequestBody Map<String, Object> map, HttpServletRequest request) throws Exception {

        productService.order(map, request);

    }

    // 주문 취소 요청 (ajax)
    @ResponseBody
    @PostMapping("/order/cancel")
    public int cancelOrder(@RequestBody Map<String, Object> map, HttpServletRequest request) throws Exception {
        //1이면 취소 성공 -1이면 취소불가
        return productService.cancelOrder(map, request);
    }

    @ExceptionHandler(RuntimeException.class)
    public String handleError(Model model){

        model.addAttribute("msg","잘못된 접근입니다.");
        model.addAttribute("path", "/main");
        return "alert/alert";

    }


}