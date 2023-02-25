package commit.etc.utils;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.*;

// 사진 업로드 또는 수정을 처리해주는 클래스
@Component
public class ImageUtils {


    public Map<String, Object> parseInsertMainImg(Map<String, Object> map, HttpServletRequest request)
            throws IllegalStateException, IOException {

        String imagePath = request.getSession().getServletContext().getRealPath("/") + "static/uploadImg/";

        MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest) request;
        Iterator<String> iterator = multipartHttpServletRequest.getFileNames();

        MultipartFile multipartFile = null;
        String originalFileName = null;// 원본이름
        String originalFileExtension = null;
        String storedFileName = null;// 파일이 DB에 저장될 이름
        String paramName = null;// form에서 input type 태그의 name값을 확인해주는 역할

        File file = new File(imagePath);
        if (!file.exists()) {
            file.mkdirs();
        }

        while (iterator.hasNext()) {
            multipartFile = multipartHttpServletRequest.getFile(iterator.next());
            paramName = multipartFile.getName();
            if (paramName.equals("main_img")) {
                if (!multipartFile.isEmpty()) {
                    originalFileName = multipartFile.getOriginalFilename();
                    originalFileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
                    storedFileName = CommitUtils.getRandomString() + originalFileExtension;
                    file = new File(imagePath + storedFileName);
                    multipartFile.transferTo(file);
                    map.put("MAIN_IMG", storedFileName);
                    map.put("ORIGINAL_NAME", originalFileName);
                    return map;
                }

            }
        }

        return map;
    }

    public List<Map<String, Object>> parseInsertSubImage(Map<String, Object> map, HttpServletRequest request)
            throws IllegalStateException, IOException {

        String imagePath = request.getSession().getServletContext().getRealPath("/") + "static/uploadImg/";

        MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest) request;
        Iterator<String> iterator = multipartHttpServletRequest.getFileNames();

        MultipartFile multipartFile = null;
        String originalFileName = null;
        String originalFileExtension = null;
        String storedFileName = null;
        String paramName = null;
        int step = 0;

        List<Map<String, Object>> imageList = new ArrayList<Map<String, Object>>();

        Map<String, Object> imageMap = null;

        File file = new File(imagePath);
        if (!file.exists()) {
            file.mkdirs();
        }
        while (iterator.hasNext()) {// MAIN_IMG, IMG_0, IMG_1, IMG_2
            multipartFile = multipartHttpServletRequest.getFile(iterator.next());
            paramName = multipartFile.getName();
            if (!paramName.equals("main_img")) {
                if (!multipartFile.isEmpty()) {
                    originalFileName = multipartFile.getOriginalFilename();
                    originalFileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
                    storedFileName = CommitUtils.getRandomString() + originalFileExtension;
                    file = new File(imagePath + storedFileName);
                    multipartFile.transferTo(file);

                    imageMap = new HashMap<>();
                    imageMap.put("PRO_IDX", map.get("PRO_IDX"));
                    imageMap.put("ORIGINAL_NAME", originalFileName);
                    imageMap.put("STORED_NAME", storedFileName);
                    imageMap.put("STEP", step);

                    imageList.add(imageMap);
                    step++;
                }


            }

        }

        return imageList;
    }

    public List<Map<String, Object>> parseUpdateSubImage(Map<String, Object> map, HttpServletRequest request)
            throws IllegalStateException, IOException {


        String imagePath = request.getSession().getServletContext().getRealPath("/") + "static/uploadImg/";

        MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest) request;
        Iterator<String> iterator = multipartHttpServletRequest.getFileNames();

        MultipartFile multipartFile = null;
        String originalFileName = null;
        String originalFileExtension = null;
        String storedFileName = null;
        String paramName = null;
        String idx = null;
        int step = 0;// 사진 순서

        List<Map<String, Object>> imageList = new ArrayList<Map<String, Object>>();

        Map<String, Object> imageMap = null;


        File file = new File(imagePath);
        if (!file.exists()) {
            file.mkdirs();
        }
        while (iterator.hasNext()) {// main_img, sub_img_0, sub_img_1,
            multipartFile = multipartHttpServletRequest.getFile(iterator.next());
            paramName = multipartFile.getName();
            if (!paramName.equals("main_img")) {
                if (!multipartFile.isEmpty()) {

                    originalFileName = multipartFile.getOriginalFilename();
                    originalFileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
                    storedFileName = CommitUtils.getRandomString() + originalFileExtension;
                    file = new File(imagePath + storedFileName);
                    multipartFile.transferTo(file);

                    imageMap = new HashMap<String, Object>();
                    imageMap.put("NEW_FILE", "Y");
                    imageMap.put("PRO_IDX", map.get("PRO_IDX"));
                    imageMap.put("ORIGINAL_NAME", originalFileName);
                    imageMap.put("STORED_NAME", storedFileName);
                    imageMap.put("STEP", step);

                    imageList.add(imageMap);
                    step++;
                } else {// 파일이 비어있다면 또는 파일을 수정하지 않았다면
                    idx = "img_" + paramName.substring(paramName.lastIndexOf("_") + 1);
                    if (map.containsKey(idx) && !"".equals(map.get(idx))) {
                        imageMap = new HashMap<String, Object>();
                        imageMap.put("NEW_FILE", "N");
                        imageMap.put("IMG_IDX", map.get(idx));
                        imageMap.put("STEP", step);
                        imageList.add(imageMap);
                        step++;
                    }

                }

            }

        }
        return imageList;
    }
}
