package commit.etc.resolver;

import commit.etc.etc.CommitMap;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;
// 컨트롤러로 들어오는 요청 파라미터를 map으로 받기 위해 HandlerMethodArgumentResolver를 커스텀 한 클래스
public class CustomMapArgumentResolver implements HandlerMethodArgumentResolver {

	@Override
	public boolean supportsParameter(MethodParameter parameter) {

		return CommitMap.class.isAssignableFrom(parameter.getParameterType());
	}

	@Override
	public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
			NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {

		CommitMap commitMap = new CommitMap();

		HttpServletRequest request = (HttpServletRequest) webRequest.getNativeRequest();

		Enumeration<?> enumeration = request.getParameterNames();

		String key = null;
		String[] values = null;

		while (enumeration.hasMoreElements()) {
			key = (String) enumeration.nextElement();
			values = request.getParameterValues(key);
			if (values != null) {

				commitMap.put(key, (values.length > 1) ? values : values[0]);
			}
		}

		return commitMap;
	}

}
