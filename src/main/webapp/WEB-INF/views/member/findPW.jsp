<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/head.jsp" %>
  <body>
    <div class="search-pw__wrapper">
      <h1 class="search-pw__title">비밀번호 찾기</h1>
      <form action="/member/findPW" method="post">
        <div class="search-pw__id">
          <label for="search-id__id-input">아이디</label>
          <input type="text" id="search-id__id-input" class="form-input" name="MEM_ID"/>
        </div>
        <div class="search-pw__email">
          <label for="search-id__email-input">이메일</label>
          <input type="email" id="search-id__email-input" class="form-input" name="EMAIL"/>
        </div>
        <div class="search-pw__button--wrapper">
          <button type="submit" class="search-pw__button btn-secondary">
            임시 비밀번호 발급
          </button>
        </div>
      </form>
    </div>
  </body>
</html>
