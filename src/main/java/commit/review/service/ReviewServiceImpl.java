package commit.review.service;

import commit.etc.helper.SessionHelper;
import commit.review.dao.ReviewDAO;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@Service
public class ReviewServiceImpl implements ReviewService {

    Logger log = Logger.getLogger(this.getClass());

    @Autowired
    private SessionHelper sessionHelper;

    @Autowired
    private ReviewDAO reviewDAO;

    @Override
    public List<Map<String, Object>> getMyReviewList(Map<String, Object> map, HttpServletRequest request)
            throws Exception {

        map = sessionHelper.make(map, request);

        return reviewDAO.selectMyReviewList(map);
    }

    @Override
    public String checkValid(Map<String, Object> map, HttpServletRequest request) throws Exception {

        String view;

        map = sessionHelper.make(map, request);
        // 유효성 검사 = 해당 주문 번호가 배송 완료 상태인지 확인 + 주소를 치고 리뷰를 작성하려고 할때(주문하지도 않고) 우선순위 1
        int check = reviewDAO.checkValid(map);
        // 유효성 검사를 통과했다면
        if(check == 1){
            // 이미 작성한 리뷰인지 확인(중복 검사)
            int overlap = reviewDAO.checkOverlap(map);
            if(overlap == 0){
                view = "/review/writeForm";
            }else{
                view = "/alert/overlapReview";
            }
            return view;
        }
        view = "/alert/invalidReview";
        return view;

    }

    @Override
    public void writeReview(Map<String, Object> map, HttpServletRequest request) throws Exception {
        map = sessionHelper.make(map, request);

        reviewDAO.insertReview(map);

    }

    @Override
    public String deleteReview(Map<String, Object> map, HttpServletRequest request) throws Exception {

        map = sessionHelper.make(map, request);

        String message;
        String currentUser;
        String reviewWriter;

        Map<String, Object> reviewOne = reviewDAO.selectReview(map);
        currentUser = map.get("MEM_ID").toString();
        reviewWriter = reviewOne.get("MEM_ID").toString();

        if(currentUser.equals(reviewWriter)){
            reviewDAO.deleteReview(map);
            message = "삭제되었습니다.";
        }else {
            message = "삭제할 수 없습니다.";
        }

        return message;
    }


}
