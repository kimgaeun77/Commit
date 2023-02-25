package commit.review.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

public interface ReviewService {

	List<Map<String, Object>> getMyReviewList(Map<String, Object> map,HttpServletRequest request)throws Exception;

	String checkValid(Map<String, Object> map, HttpServletRequest request) throws Exception;

	void writeReview(Map<String, Object> map, HttpServletRequest request)throws Exception;

	String deleteReview(Map<String, Object> map, HttpServletRequest request)throws Exception;

}
