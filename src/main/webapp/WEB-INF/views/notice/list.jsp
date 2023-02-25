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
            <i class="bi bi-menu-up"></i>
          </div>
        </div>
      </div>
    </section>
    <section class="notice-section">
      <h1 class="sr-only">공지사항 페이지</h1>
      <div class="notice-wrapper">
        <h1 class="notice-title">커밋 소식</h1>
        <div class="notice-board">
          <div class="notice-board__header">
            <div class="notice-board__header--item">글 번호</div>
            <div class="notice-board__header--item">제목</div>
            <div class="notice-board__header--item">작성자</div>
            <div class="notice-board__header--item">등록일</div>
          </div>
          <div class="notice-board__main-wrapper"></div>
        </div>
      </div>
      <c:set var="admin" value="${sessionScope.admin }" />
      <c:if test="${not empty admin}">
        <div class="notice-write__button">
          <a href="/notice/admin/write" class="btn-secondary btn-32">글
            작성하기</a>
        </div>
      </c:if>
      <div class="pagination">
        <button class="page-control page-prev">
          <i class="bi bi-chevron-right"></i>
        </button>
        <ol class="page-list">
        </ol>
        <button class="page-control page-next">
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </section>
  </main>
  <jsp:include page="/WEB-INF/include/footer.jsp"></jsp:include>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script src="https://code.jquery.com/jquery-latest.min.js"></script>
  <script src="/js/notice/noticelist.js"></script>
  <script src="../js/dropdown.js"></script>
  </body>

  </html>