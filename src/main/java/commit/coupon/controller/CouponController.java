package commit.coupon.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import commit.coupon.service.CouponService;
import commit.etc.etc.CommitMap;

// 쿠폰
@Controller
@RequestMapping("/coupon")
public class CouponController {

    Logger log = Logger.getLogger(this.getClass());

    @Autowired
    private CouponService couponService;

    // 쿠폰 목록 페이지 
    @GetMapping(value = {"/list", "/admin/list"})
    public ModelAndView getCouponList(HttpServletRequest request) throws Exception {

        List<Map<String, Object>> couponList = couponService.getCouponList();

        ModelAndView mv = new ModelAndView();
        mv.addObject("couponList", couponList);

        String eventPath = "/coupon/list";

        if (eventPath.equals(request.getRequestURI())) {
            mv.setViewName("/coupon/member/list");
        } else {
            mv.setViewName("/coupon/admin/list");
        }

        return mv;
    }

    // 쿠폰 다운로드 (ajax)
    @ResponseBody
    @PostMapping(value = "/download", produces = "application/text; charset=utf-8")
    public String couponDownload(@RequestBody Map<String, Object> map, HttpServletRequest request)
            throws Exception {

        return couponService.downloadCoupon(map, request);

    }

    // 쿠폰 등록 페이지
    @GetMapping("/admin/add")
    public String addCouponPage() {
        return "/coupon/admin/addForm";
    }

    // 쿠폰 등록 (ajax)
    @ResponseBody
    @PostMapping("/admin/add")
    public void addCoupon(@RequestBody Map<String, Object> map) throws Exception {

        couponService.addCoupon(map);

    }

    // 쿠폰 수정 페이지
    @GetMapping("/admin/update")
    public ModelAndView updateCouponPage(CommitMap commitMap) throws Exception {

        Map<String, Object> couponDetail = couponService.getCouponDetail(commitMap.getMap());
        ModelAndView mv = new ModelAndView("/coupon/admin/updateForm");
        mv.addObject("couponOne", couponDetail);
        return mv;
    }

    // 쿠폰 수정 (ajax)
    @ResponseBody
    @PostMapping("/admin/update")
    public void updateCoupon(@RequestBody Map<String, Object> map) throws Exception {

        couponService.updateCoupon(map);

    }

    // 쿠폰 삭제 (ajax)
    @ResponseBody
    @PostMapping("/admin/delete")
    public void deleteCoupon(@RequestBody Map<String, Object> map) throws Exception {

        couponService.deleteCoupon(map);

    }

}
