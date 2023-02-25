package commit.etc.helper;

import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@Component
public class Alert {

    public void make(HttpServletResponse response, String message, String path) throws IOException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html; charset=UTF-8");

        PrintWriter printwriter = response.getWriter();

        printwriter.print("<script>alert('" + message + "'); location.href='" + path + "';</script>");
        printwriter.flush();
        printwriter.close();

    }

    public void make(HttpServletResponse response, String message) throws IOException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html; charset=UTF-8");

        PrintWriter printwriter = response.getWriter();

        printwriter.print("<script>alert('" + message + "');</script>");
        printwriter.flush();
        printwriter.close();

    }


}
