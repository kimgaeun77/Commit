<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/include/head.jsp" %>
<body>
  <jsp:include page="/WEB-INF/include/header.jsp"></jsp:include>
    <main>
      <section class="category">
        <h1 class="sr-only">카테고리</h1>
        <div class="category__items">
          <div class="category__item">
            <div class="category__item--icon">
              <i class="bi bi-question-lg"></i>
            </div>
          </div>
        </div>
      </section>
      
      <section class="my-qna__section">
        <h1 class="my-qna__title">Q&A</h1>
        <div class="my-qna__wrapper">
          <div class="my-qna__header">
            <span class="my-qna__header--item">Q&A 번호</span>
            <span class="my-qna__header--item">문의유형</span>
            <span class="my-qna__header--item">제목</span>
            <span class="my-qna__header--item">작성일</span>
            <span class="my-qna__header--item">답변상태</span>
          </div>
         <c:forEach var="row" items="${qnaList}" >
          <div class="my-qna__main">
            <span class="my-qna__main--item">${row.QNA_IDX}</span>
            <span class="my-qna__main--item qna-type">${row.QNA_TYPE}</span>
            <span class="my-qna__main--item my-qna__main--item-content" data-qna_idx="${row.QNA_IDX}">${row.TITLE}</span>
            <span class="my-qna__main--item">${row.REG_DATE}</span>
            <span class="my-qna__main--item answer-state">${row.STATE}</span>
          </div>
         </c:forEach>
        </div>
      </section>
    </main>
    <jsp:include page="/WEB-INF/include/footer.jsp"></jsp:include>
	<script src="https://code.jquery.com/jquery-latest.min.js"></script>
    <script src="/js/dropdown.js"></script>
    <script src="/js/mypage/myQnaList.js"></script>
  </body>
</html>
