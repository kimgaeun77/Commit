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
            <i class="bi bi-search"></i>
          </div>
        </div>
      </div>
    </section>
    <section class="notice-detail__section">
      <h1 class="sr-only">공지사항 페이지</h1>
      <div class="notice-detail__post">
        <div class="post__header">
          <h1>${detail.TITLE }</h1>
          <div>
            <span class="idx">${detail.NOTICE_IDX}</span> <span>Commit
              | ${detail.REG_DATE }</span> <span>조회수 ${detail.HIT}회</span>
          </div>
        </div>
        <div class="post__main">
          <span class="post__main--text"> ${detail.CONTENT } </span>
          <div class="post__main--file">
            <h3>첨부파일</h3>
            <c:forEach var="row" items="${list }">
              <a href="/notice/downloadFile?FILE_IDX=${row.FILE_IDX }">${row.ORIGINAL_NAME }</a>
            </c:forEach>
          </div>
        </div>
        <div class="post__buttons">
          <c:set var="admin" value="${sessionScope.admin }" />
          <c:set var="MEM_ID" value="${sessionScope.MEM_ID }" />
          <button type="button" class="btn-secondary list">목록으로</button>
          <c:if test="${not empty admin}">
            <button type="button" class="btn-secondary update">수정</button>
            <button type="button" class="btn-secondary delete">삭제</button>
          </c:if>
        </div>
      </div>
      <div class="notice-detail__comments">
        <h1 class="comment__title">Comments</h1>
        <div class="comment__items--wrapper">
        </div>
        <form class="notice-comment__form" action="/notice/comment/write" method="post">
          <c:if test="${not empty MEM_ID}">
            <span class="notice-comment__nickname">${MEM_ID }</span>
          </c:if>
          <c:if test="${empty MEM_ID}">
            <span class="notice-comment__nickname">로그인 해주세요.</span>
          </c:if>
          <input type="hidden" name="NOTICE_IDX" value="${detail.NOTICE_IDX}">
          <textarea class="comment__form-input" name="CONTENT" placeholder="댓글을 입력 해 주세요" spellcheck="false"></textarea>
          <button type="submit" class="btn-secondary">등록</button>
        </form>
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
      </div>
    </section>
  </main>
  <jsp:include page="/WEB-INF/include/footer.jsp"></jsp:include>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script src="https://code.jquery.com/jquery-latest.min.js"></script>
  <script src="../js/dropdown.js"></script>
  <script src="/js/notice/noticedetail.js"></script>
  </body>

  </html>