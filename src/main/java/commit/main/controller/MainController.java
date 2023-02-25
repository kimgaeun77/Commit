package commit.main.controller;

import commit.main.service.MainService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.Map;

// 메인 페이지
@Controller
public class MainController {

	Logger log = Logger.getLogger(this.getClass());

	@Autowired
	private MainService mainService;

	// best PC 목록
	@GetMapping("/main")
	public ModelAndView getBestPC() throws Exception {

		Map<String, Object> bestPCList = mainService.getBestPC();
		ModelAndView mv = new ModelAndView("/main/main");
		mv.addObject("gamingPC", bestPCList.get("gamingPC"));
		mv.addObject("officePC", bestPCList.get("officePC"));
		return mv;
	}
}
