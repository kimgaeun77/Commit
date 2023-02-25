package commit.etc.helper;

import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

// 요청자의 세션을 가져와 파라미터로 받은 map에 담아주는 클래스
@Component
public class SessionHelper {

    public Map<String, Object> make(Map<String, Object> map, HttpServletRequest request) {

        HttpSession session = request.getSession();
        String MEM_ID = (String) session.getAttribute("MEM_ID");
        String admin = (String) session.getAttribute("admin");

        // 로그인 상태라면
        if (MEM_ID != null) {

            map.put("MEM_ID", MEM_ID);
            if (admin != null) {
                map.put("admin", admin);
            }

        }
        return map;

    }


    public void remove(HttpServletRequest request) {

        HttpSession session = request.getSession();
        session.removeAttribute("MEM_ID");
        session.removeAttribute("MEM_NAME");
        session.removeAttribute("admin");
    }

}
