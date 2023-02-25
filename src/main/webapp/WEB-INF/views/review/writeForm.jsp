<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/head.jsp" %> 
  <body>
    <div class="review-write__wrapper">
      <h1 class="review-write__title">상품 리뷰</h1>
      <form action="/review/write" method="post">
        <input
          type="text"
          name="TITLE"
          placeholder="제목을 입력하세요"
          class="review-write__input--title form-input"
        />
        <textarea class="review-wirte__input--main form-input" name="CONTENT"></textarea>
        <input type="hidden" name="ORDER_IDX" value="${ORDER_IDX}">
        <input type="hidden" name="PRO_IDX" value="${PRO_IDX}">
        <button type="submit" class="btn-secondary">작성하기</button>
      </form>
    </div>
  </body>
</html>
