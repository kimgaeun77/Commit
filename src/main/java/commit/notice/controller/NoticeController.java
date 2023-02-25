package commit.notice.controller;

import commit.etc.etc.CommitMap;
import commit.notice.service.NoticeService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


// 공지사항
@Controller
@RequestMapping("/notice")
public class NoticeController {

    Logger log = Logger.getLogger(this.getClass());

    @Autowired
    private NoticeService noticeService;


    // 목록
    @GetMapping("/list")
    public String noticeListPage() {

        return "/notice/list";
    }

    // 목록 데이터 (ajax)
    @ResponseBody
    @PostMapping("/list/data")
    public List<Map<String, Object>> getNoticeList(@RequestBody Map<String, Object> map) throws Exception {
        return noticeService.getNoticeList(map);
    }

    // 상세
    @GetMapping("/detail")
    public ModelAndView getNoticeDetail(CommitMap commitMap, HttpServletRequest request) throws Exception {

        Map<String, Object> noticeDetail = noticeService.getNoticeDetail(commitMap.getMap(), request, "detail");
        ModelAndView mv = new ModelAndView("/notice/detail");

        if (noticeDetail.isEmpty()) {
            mv.addObject("msg", "삭제된 게시글입니다.");
            mv.addObject("path", "/notice/list");
            mv.setViewName("/alert/alert");
        } else {
            mv.addObject("detail", noticeDetail.get("detail"));
            mv.addObject("list", noticeDetail.get("list"));

        }
        return mv;
    }

    // 댓글 목록 데이터 (ajax)
    @ResponseBody
    @PostMapping("/comment/data/{NOTICE_IDX}/{PAGE}")
    public List<Map<String, Object>> getCommentList(@PathVariable String NOTICE_IDX,
                                                    @PathVariable int PAGE,
                                                    CommitMap commitMap) throws Exception {

        commitMap.put("NOTICE_IDX", NOTICE_IDX);
        commitMap.put("currentPage", PAGE);
        return noticeService.getCommentList(commitMap.getMap());
    }


    // 댓글 작성
    @PostMapping("/comment/write")
    public ModelAndView writeComment(CommitMap commitMap, HttpServletRequest request) throws Exception {
        noticeService.writeComment(commitMap.getMap(), request);
        ModelAndView mv = new ModelAndView("redirect:/notice/detail");
        mv.addObject("NOTICE_IDX", commitMap.get("NOTICE_IDX"));
        return mv;
    }

    // 댓글 삭제
    @PostMapping("/comment/delete")
    public ModelAndView deleteComment(CommitMap commitMap) throws Exception {
        noticeService.deleteComment(commitMap.getMap());
        ModelAndView mv = new ModelAndView("redirect:/notice/detail");
        mv.addObject("NOTICE_IDX", commitMap.get("NOTICE_IDX"));
        return mv;
    }

    // 작성 페이지
    @GetMapping("/admin/write")
    public String writeNoticePage() {
        return "/notice/writeForm";
    }

    // 작성
    @PostMapping("/admin/write")
    public String writeNotice(CommitMap commitMap, HttpServletRequest request) throws Exception {

        noticeService.writeNotice(commitMap.getMap(), request);
        return "redirect:/notice/list";
    }

    // 수정 페이지
    @GetMapping("/admin/update")
    public ModelAndView updateNoticePage(CommitMap commitMap, HttpServletRequest request) throws Exception {

        Map<String, Object> noticeDetail = noticeService.getNoticeDetail(commitMap.getMap(), request, "update");
        ModelAndView mv = new ModelAndView("/notice/updateForm");
        mv.addObject("detail", noticeDetail.get("detail"));
        mv.addObject("list", noticeDetail.get("list"));
        return mv;
    }

    // 수정
    @PostMapping("/admin/update")
    public ModelAndView updateNotice(CommitMap commitMap, HttpServletRequest request) throws Exception {

        noticeService.updateNotice(commitMap.getMap(), request);
        ModelAndView mv = new ModelAndView("redirect:/notice/detail");
        mv.addObject("NOTICE_IDX", commitMap.get("NOTICE_IDX"));
        return mv;
    }

    // 삭제
    @PostMapping("/admin/delete")
    public String deleteNotice(@RequestBody Map<String, Object> map) throws Exception {

        noticeService.deleteNotice(map);
        return "redirect:/notice/list";
    }

    // 파일 다운로드
    @GetMapping("/downloadFile")
    public void downloadFile(CommitMap commitMap, HttpServletResponse response, HttpServletRequest request) throws Exception {

        noticeService.downloadFile(commitMap.getMap(), response, request);
    }
}
