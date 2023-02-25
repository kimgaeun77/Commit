<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/head.jsp" %>
  <body>
    <div class="search-id__wrapper">
      <h1 class="search-id__title">아이디 찾기</h1>
      <form action="/member/findID" method="post">
        <div class="search-id__id">
          <label for="search-id__id-input">이름</label>
          <input type="text" id="search-id__id-input" class="form-input" name="MEM_NAME" />
        </div>
        <div class="search-id__number">
          <label for="search-id__number-input">전화번호</label>
          <input type="text" id="search-id__number-input" class="form-input" name="PHONE"/>
        </div>
        <div class="search-id__button--wrapper">
          <button type="submit" class="search-id__button btn-secondary">아이디 찾기</button>
        </div>
      </form>
    </div>
  </body>
</html>
