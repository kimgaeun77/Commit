package commit.estimate.controller;

import commit.estimate.service.EstimateService;
import commit.etc.etc.CommitMap;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

// 견적
@Controller
@RequestMapping("/estimate")
public class EstimateController {

	Logger log = Logger.getLogger(this.getClass());

	@Autowired
	private EstimateService estimateService;

	// 메인 페이지
	@GetMapping("/main")
	public String main(){
		return "/estimate/main";
	}


	// 부품 목록 데이터 (ajax)
	@ResponseBody
	@RequestMapping("/data")
	public List<Map<String, Object>> getEstimateList() throws Exception {

		return estimateService.getEstimateList();
	}

}
