package commit.notice.service;

import commit.etc.etc.Paging;
import commit.etc.helper.SessionHelper;
import commit.etc.utils.FileUtils;
import commit.notice.dao.NoticeDAO;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class NoticeServiceImpl implements NoticeService {

    Logger log = Logger.getLogger(this.getClass());

    @Autowired
    private NoticeDAO noticeDAO;

    @Autowired
    private SessionHelper sessionHelper;

    @Autowired
    private FileUtils fileUtils;

    @Autowired
    private Paging paging;

    @Override
    public List<Map<String, Object>> getNoticeList(Map<String, Object> map) throws Exception {

        map.put("totalRecord", noticeDAO.countRecord(map));

        Map<String, Object> calcResult = paging.calc(map, 10);
        List<Map<String, Object>> noticeList = noticeDAO.selectNoticeList(calcResult);
        noticeList.add(calcResult);
        return noticeList;
    }

    @Override
    public Map<String, Object> getNoticeDetail(Map<String, Object> map, HttpServletRequest request, String state) throws Exception {

        map = sessionHelper.make(map, request);

        if (map.get("admin") == null) {
            noticeDAO.updateHitCount(map);
        }
        // 게시글 (게시글 상세 내용과 파일 리스트를 포함한)
        Map<String, Object> notice = new HashMap<>();
        // 게시글 상세
        Map<String, Object> detail = noticeDAO.selectNoticeDetail(map);
        if (detail != null) {
            if (state.equals("update")) {
                String originalContent = detail.get("CONTENT").toString();
                String replaceContent = originalContent.replaceAll("<br>", System.lineSeparator());
                detail.put("CONTENT", replaceContent);
            }

            List<Map<String, Object>> fileList = noticeDAO.selectFileList(map);
            notice.put("detail", detail);
            notice.put("list", fileList);
        }
        return notice;
    }

    @Override
    public List<Map<String, Object>> getCommentList(Map<String, Object> map) throws Exception {

        map.put("totalRecord", noticeDAO.countCommentRecord(map));
        Map<String, Object> calcResult = paging.calc(map, 10);
        List<Map<String, Object>> commentList = noticeDAO.selectCommentList(calcResult);
        commentList.add(calcResult);
        return commentList;
    }


    @Override
    public void writeNotice(Map<String, Object> map, HttpServletRequest request) throws Exception {

        String originalContent = map.get("CONTENT").toString();
        String replaceContent = originalContent.replaceAll(System.lineSeparator(), "<br>");
        map.put("CONTENT", replaceContent);

        noticeDAO.insertNotice(map);

        List<Map<String, Object>> fileList = fileUtils.parseInsertFileInfo(map, request);

        //파일을 추가했다면
        if (!fileList.isEmpty()) {
            for (Map<String, Object> file : fileList) {
                noticeDAO.insertFile(file);
            }
        }
    }


    @Override
    public void writeComment(Map<String, Object> map, HttpServletRequest request) throws Exception {
        map = sessionHelper.make(map, request);
        noticeDAO.insertComment(map);
    }


    @Override
    public void deleteComment(Map<String, Object> map) throws Exception {
        noticeDAO.deleteComment(map);
    }


    @Override
    public void updateNotice(Map<String, Object> map, HttpServletRequest request) throws Exception {

        String originalContent = map.get("CONTENT").toString();
        String replaceContent = originalContent.replaceAll(System.lineSeparator(), "<br>");
        map.put("CONTENT", replaceContent);

        noticeDAO.updateNotice(map);
        noticeDAO.deleteFileList(map);
        List<Map<String, Object>> fileList = fileUtils.parseUpdateFileInfo(map, request);

        for (Map<String, Object> file : fileList) {
            if (file.get("IS_NEW").equals("Y")) {
                noticeDAO.insertFile(file);
            } else {
                noticeDAO.updateFile(file);
            }
        }

    }


    @Override
    public void deleteNotice(Map<String, Object> map) throws Exception {
        noticeDAO.deleteNotice(map);//글 삭제
        noticeDAO.deleteFileList(map);//파일 삭제

    }


    @Override
    public void downloadFile(Map<String, Object> commitMap, HttpServletResponse response, HttpServletRequest request) throws Exception {

        Map<String, Object> fileInfo = noticeDAO.selectFileInfo(commitMap);

        String storedFileName = fileInfo.get("STORED_NAME").toString();
        String originalFileName = fileInfo.get("ORIGINAL_NAME").toString();
        String filePath = request.getSession().getServletContext().getRealPath("/") + "static/uploadFile/";

        byte[] fileByte = org.apache.commons.io.FileUtils.readFileToByteArray(new File(filePath + storedFileName));

        response.setContentType("application/octet-stream");
        response.setContentLength(fileByte.length);
        response.setHeader("Content-Disposition", "attachment; fileName=\"" + URLEncoder.encode(originalFileName, StandardCharsets.UTF_8) + "\";");
        response.setHeader("Content-Transfer-Encoding", "binary");
        response.getOutputStream().write(fileByte);
        response.getOutputStream().flush();
        response.getOutputStream().close();
    }


}
