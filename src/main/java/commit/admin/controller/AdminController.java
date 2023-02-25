package commit.admin.controller;

import commit.admin.service.AdminService;
import commit.etc.etc.CommitMap;
import commit.my.service.MyService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;


// 관리자 페이지
@Controller
@RequestMapping("/admin")
public class AdminController {

    Logger log = Logger.getLogger(this.getClass());

    @Autowired
    private AdminService adminService;

    @Autowired
    private MyService myService;

    // 메인
    @GetMapping("/main")
    public String main() {

        return "forward:/admin/order/list";
    }


    // 주문 목록 페이지
    @GetMapping("/order/list")
    public String orderListPage() {

        return "/admin/order/list";
    }

    // 주문 목록 데이터 (ajax)
    @ResponseBody
    @PostMapping("/order/list/data")
    public List<Map<String, Object>> getOrderList(@RequestBody Map<String, Object> map) throws Exception {
        return adminService.getOrderList(map);
    }

	
	// 주문 상태 변경
    @ResponseBody
    @PostMapping("/order/update")
    public void updateOrder(@RequestBody Map<String, Object> map) throws Exception {

        adminService.updateOrder(map);

    }

	// 주문 상세 조회
    @GetMapping("/order/detail")
    public ModelAndView getOrderDetail(CommitMap commitMap, HttpServletRequest request, HttpServletResponse response)
            throws Exception {

        Map<String, Object> orderDetail = myService.getOrderDetail(commitMap.getMap(), request, response);

        ModelAndView mv = new ModelAndView();
        mv.addObject("order", orderDetail.get("order"));
        mv.addObject("orderInfo", orderDetail.get("orderInfo"));
        mv.setViewName("/admin/order/detail");
        return mv;

    }

    // 회원 목록
    @GetMapping("/member/list")
    public String memberListPage() {

        return "/admin/member/list";
    }

	// 회원 목록 데이터 (ajax)
    @ResponseBody
    @PostMapping("/member/list/data")
    public List<Map<String, Object>> getMemberList(@RequestBody Map<String, Object> map) throws Exception {

        return adminService.getMemberList(map);
    }

	// 회원 상세
    @GetMapping("/member/detail")
    public ModelAndView getMemberDetail(CommitMap commitMap) throws Exception {

        Map<String, Object> memberDetail = adminService.getMemberDetail(commitMap.getMap());

        ModelAndView mv = new ModelAndView("/admin/member/detail");
        mv.addObject("memberInfo", memberDetail);
        return mv;
    }

	// 회원 삭제
    @ResponseBody
    @PostMapping("/member/delete")
    public void deleteMember(@RequestBody Map<String, Object> map) throws Exception {

        adminService.deleteMember(map);

    }

    // 상품 목록 페이지
    @GetMapping("/pro/list")
    public String productListPage() {

        return "/admin/pro/list";
    }

	// 상품 목록 데이터 (ajax)
    @ResponseBody
    @PostMapping("/pro/list/data")
    public List<Map<String, Object>> getProductList(@RequestBody Map<String, Object> map) throws Exception {

        return adminService.getProductList(map);
    }

	// 상품 등록 페이지
    @GetMapping("/pro/add")
    public String addProductPage() {

        return "/admin/pro/addForm";
    }

    // 상품 등록
    @PostMapping("/pro/add")
    public ModelAndView addProduct(CommitMap commitMap, HttpServletRequest request) throws Exception {

        adminService.addProduct(commitMap.getMap(), request);

        ModelAndView mv = new ModelAndView();
        mv.addObject("msg", "상품 등록이 완료되었습니다.");
        mv.addObject("path", "/admin/pro/list");
        mv.setViewName("/alert/closeAndHref");

        return mv;
    }

    // 상품 수정 페이지
    @GetMapping("/pro/update")
    public ModelAndView updateProductPage(String PRO_IDX) {

        ModelAndView mv = new ModelAndView("/admin/pro/updateForm");
        mv.addObject("PRO_IDX", PRO_IDX);
        return mv;

    }

    // 상품 상세 데이터 (ajax)
    @ResponseBody
    @GetMapping("/pro/update/data/{PRO_IDX}")
    public Map<String, Object> getProductDetail(@PathVariable String PRO_IDX, CommitMap commitMap) throws Exception {

        commitMap.put("PRO_IDX", PRO_IDX);
        // 디테일 프로에서는 상품 정보와 상품 이미지들을 가져와야함.
        return adminService.getProductDetail(commitMap.getMap());
    }

    // 상품 수정
    @PostMapping("/pro/update")
    public ModelAndView updateProduct(CommitMap commitMap, HttpServletRequest request) throws Exception {

        adminService.updateProduct(commitMap.getMap(), request);

        ModelAndView mv = new ModelAndView();
        mv.addObject("msg", "상품 수정이 완료되었습니다");
        mv.addObject("path", "/admin/pro/list");
        mv.setViewName("/alert/closeAndHref");

        return mv;

    }

    // 상품 삭제 (ajax)
    @ResponseBody
    @PostMapping("/pro/delete")
    public void deleteProduct(@RequestBody Map<String, Object> map, HttpServletResponse response) throws Exception {

        adminService.deleteProduct(map, response);

    }

}
