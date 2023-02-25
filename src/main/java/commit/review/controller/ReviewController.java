package commit.review.controller;

import commit.etc.etc.CommitMap;
import commit.review.service.ReviewService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
// 리뷰
@Controller
@RequestMapping("/review")
public class ReviewController {

    Logger log = Logger.getLogger(this.getClass());

    @Autowired
    private ReviewService reviewService;

    // 마이페이지 - 내가 작성한 리뷰 목록
    @GetMapping("/myReview")
    public ModelAndView getMyReviewList(CommitMap commitMap, HttpServletRequest request) throws Exception {

        List<Map<String, Object>> reviewList = reviewService.getMyReviewList(commitMap.getMap(), request);
        ModelAndView mv = new ModelAndView("/review/myReview");
        mv.addObject("reviewList", reviewList);
        return mv;
    }

    // 작성 페이지
    @GetMapping("/write")              // 주문번호 상품번호
    public ModelAndView writeReviewPage(CommitMap commitMap, HttpServletRequest request) throws Exception {

        //리뷰 작성이 가능한지 체크
        String view = reviewService.checkValid(commitMap.getMap(), request);

        ModelAndView mv = new ModelAndView(view);
        mv.addObject("ORDER_IDX", commitMap.get("ORDER_IDX"));
        mv.addObject("PRO_IDX", commitMap.get("PRO_IDX"));
        return mv;
    }

    // 작성
    @PostMapping("/write")
    public ModelAndView writeReview(CommitMap commitMap, HttpServletRequest request) throws Exception {

        reviewService.writeReview(commitMap.getMap(), request);

        ModelAndView mv = new ModelAndView("/alert/historyBack");
        mv.addObject("msg", "리뷰 작성이 완료되었습니다.");
        mv.addObject("num", -2);
        return mv;
    }

    // 삭제 (ajax)
    @ResponseBody
    @PostMapping(value="/delete", produces = "application/text; charset=utf-8")
    public String deleteReview(@RequestBody Map<String, Object> map, HttpServletRequest request) throws Exception {
        return reviewService.deleteReview(map, request);
    }

}
