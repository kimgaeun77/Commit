<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/head.jsp" %> 
 <body>
  <c:set var="admin" value="${sessionScope.admin }"/>
  <c:if test="${empty admin }">
    <form class="qna-write__form" action="/qna/write" method="post">
      <h1 class="qna-write__title">상품 문의</h1>
      <div class="qna-write__wrapper">
        <div class="select-form">
          <div class="select-group">
            <select class="form-select qna-write__select" name="QNA_TYPE">
              <option value="P">상품 문의</option>
              <option value="D">배송 문의</option>
              <option value="E">기타 문의</option>
            </select>
            <i class="bi bi-caret-down-fill"></i>
          </div>
        </div>
        <input
          type="text"
          placeholder="제목을 입력해 주세요"
          class="form-input qna-write__input"
          name="TITLE"
          spellcheck="false"
        />
        <textarea class="qna-write__textarea" name="CONTENT" spellcheck="false"></textarea>
        <input type="hidden" name="PRO_IDX" value="${PRO_IDX}"/>
        <div class="qna-write__button">
          <button type="submit" class="btn-secondary">작성하기</button>
        </div>
      </div>
    </form>
    </c:if>
      <c:if test="${not empty admin }">
    <form class="qna-write__form" action="/qna/write" method="post">
      <h1 class="qna-write__title">상품 문의</h1>
      <div class="qna-write__wrapper">
        <input
          type="text"
          placeholder="제목을 입력해 주세요"
          value="[COMMIT]답변입니다."
          class="form-input qna-write__input"
          name="TITLE"
          spellcheck="false"
        />
        <textarea class="qna-write__textarea" name="CONTENT" spellcheck="false"></textarea>
        <input type="hidden" name="PRO_IDX" value="${PRO_IDX}"/>
        <input type="hidden" name="ROOT_IDX" value="${ROOT_IDX}"/>
        <div class="qna-write__button">
          <button type="submit" class="btn-secondary">답변달기</button>
        </div>
      </div>
    </form>
    </c:if>
  </body>
</html>
