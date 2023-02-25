package commit.etc.interceptor;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.PrintWriter;


public class LoginInterceptor extends HandlerInterceptorAdapter {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        HttpSession session = request.getSession();
        Object MEM_ID = session.getAttribute("MEM_ID");

        if (MEM_ID == null) {

            //ajax요청일 경우
            if (isAjaxRequest(request)) {
                response.sendError(401);
                return false;
            }

            response.setCharacterEncoding("UTF-8");
            response.setContentType("text/html; charset=UTF-8");

            PrintWriter printwriter = response.getWriter();
            printwriter.print("<script>alert('로그인이 필요합니다.'); location.href='/member/login';</script>");
            printwriter.flush();
            printwriter.close();
            return false;
        }

        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                           ModelAndView modelAndView) throws Exception {
        // TODO Auto-generated method stub
        super.postHandle(request, response, handler, modelAndView);
    }


    private boolean isAjaxRequest(HttpServletRequest request) {

        String header = request.getHeader("AJAX");
		/* 앞에 있는 기준 대상이 null이면 nullPointException 발생 - > 로그인 안되어있는 상태로 내 장바구니 들어가면 MEM_ID가 null이므로 
		 if(isAjaxRequest(request)) 이 구문에 걸리는데 header를 앞에 두면 ajax요청이 아니기 때문에 AJAX라는 헤더도 없으므로
		 null 따라서 널 예외가 발생한다 항상 앞에 있는 비교 대상은 null이 아닌것을 두도록!! */
        if ("true".equals(header)) {
            return true;
        }
        return false;
    }
}
