package commit.qna.controller;

import commit.etc.etc.CommitMap;
import commit.qna.service.QnaService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
// QNA(회원, 관리자)
@Controller
@RequestMapping("/qna")
public class QnaController {

    Logger log = Logger.getLogger(this.getClass());

    @Autowired
    private QnaService qnaService;

    // 작성 페이지
    @GetMapping("/write")
    public ModelAndView writeQnaPage(CommitMap commitMap) {

        ModelAndView mv = new ModelAndView("/qna/writeForm");
        mv.addObject("PRO_IDX", commitMap.get("PRO_IDX"));
        // 관리자가 답변을 달때만 존재하는 값
        mv.addObject("ROOT_IDX", commitMap.get("ROOT_IDX"));

        return mv;
    }

    // 작성
    @PostMapping("/write")
    public ModelAndView writeQna(CommitMap commitMap, HttpServletRequest request) throws Exception {

        qnaService.writeQna(commitMap.getMap(), request);

        ModelAndView mv = new ModelAndView("/alert/windowClose");
        mv.addObject("msg", "게시글이 등록되었습니다.");
        return mv;

    }

    // 수정 (ajax)
    @ResponseBody
    @PostMapping("/update")
    public void updateQna(@RequestBody Map<String, Object> map) throws Exception {

        qnaService.updateQna(map);

    }

    // 삭제 (ajax)
    @ResponseBody
    @PostMapping("/delete")
    public void deleteQna(@RequestBody Map<String, Object> map, HttpServletRequest request) throws Exception {

        qnaService.deleteQna(map, request);

    }

}
