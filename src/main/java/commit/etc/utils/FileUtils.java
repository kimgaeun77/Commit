package commit.etc.utils;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.*;

// 파일 업로드 또는 수정을 처리해주는 클래스
@Component
public class FileUtils {

    public List<Map<String, Object>> parseInsertFileInfo(Map<String, Object> map, HttpServletRequest request) throws Exception {
        MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest) request;
        Iterator<String> iterator = multipartHttpServletRequest.getFileNames();
        String filePath = request.getSession().getServletContext().getRealPath("/") + "static/uploadFile/";
        MultipartFile multipartFile;
        String originalFileName;
        String originalFileExtension;
        String storedFileName;

        List<Map<String, Object>> fileList = new ArrayList<>();
        Map<String, Object> fileInfo;

        String noticeIdx = map.get("NOTICE_IDX").toString();

        File file = new File(filePath);
        if (!file.exists()) {
            file.mkdirs();
        }

        while (iterator.hasNext()) {
            multipartFile = multipartHttpServletRequest.getFile(iterator.next());
            if (!multipartFile.isEmpty()) {
                originalFileName = multipartFile.getOriginalFilename();
                originalFileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
                storedFileName = CommitUtils.getRandomString() + originalFileExtension;

                file = new File(filePath + storedFileName);
                multipartFile.transferTo(file);

                fileInfo = new HashMap<>();
                fileInfo.put("NOTICE_IDX", noticeIdx);
                fileInfo.put("ORIGINAL_NAME", originalFileName);
                fileInfo.put("STORED_NAME", storedFileName);
                fileInfo.put("FILE_SIZE", multipartFile.getSize());
				fileList.add(fileInfo);
            }
        }
        return fileList;
    }

    public List<Map<String, Object>> parseUpdateFileInfo(Map<String, Object> map, HttpServletRequest request) throws Exception {
        MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest) request;
        Iterator<String> iterator = multipartHttpServletRequest.getFileNames();
        String filePath = request.getSession().getServletContext().getRealPath("/") + "static/uploadFile/";
        MultipartFile multipartFile;
        String originalFileName;
        String originalFileExtension;
        String storedFileName;

        List<Map<String, Object>> fileList = new ArrayList<>();
        Map<String, Object> fileInfo;

        String noticeIdx = map.get("NOTICE_IDX").toString();
        String requestName;
        String idx;


        while (iterator.hasNext()) {
            multipartFile = multipartHttpServletRequest.getFile(iterator.next());
            if (!multipartFile.isEmpty()) {
                originalFileName = multipartFile.getOriginalFilename();
                originalFileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
                storedFileName = CommitUtils.getRandomString() + originalFileExtension;

                multipartFile.transferTo(new File(filePath + storedFileName));

                fileInfo = new HashMap<>();
                fileInfo.put("IS_NEW", "Y");
                fileInfo.put("NOTICE_IDX", noticeIdx);
                fileInfo.put("ORIGINAL_NAME", originalFileName);
                fileInfo.put("STORED_NAME", storedFileName);
                fileInfo.put("FILE_SIZE", multipartFile.getSize());
				fileList.add(fileInfo);
            } else {
                requestName = multipartFile.getName();
                idx = "IDX_" + requestName.substring(requestName.indexOf("_") + 1);
                if (map.containsKey(idx) && !"".equals(map.get(idx))) {
                    fileInfo = new HashMap<>();
                    fileInfo.put("IS_NEW", "N");
                    fileInfo.put("FILE_IDX", map.get(idx));
					fileList.add(fileInfo);
                }

            }
        }
        return fileList;
    }
}
