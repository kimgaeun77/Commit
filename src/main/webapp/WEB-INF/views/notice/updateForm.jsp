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
    <section class="notice-write__section">
      <form class="notice-write__form" enctype="multipart/form-data" action="/notice/admin/update" method="post">
        <div class="notice-write__form--header">
          <span class="list-size">${fn:length(list)}</span><%--notice수정시 파일 추가 할 가능성이 있어 file size 필요--%>
          <input type="text" placeholder="제목" class="form-input notice-write__form--header-input" name="TITLE"
            value="${detail.TITLE }" />
        </div>
        <div class="notice-write__form--main">
          <textarea class="notice-write__form--main-input" name="CONTENT" spellcheck="false" >${detail.CONTENT }</textarea>
        </div>
        <div class="notice-write__form--footer">
          <span class="notice-write__form--footer-title">첨부파일</span>
          <c:forEach var="row" items="${list}" varStatus="var">
            <div class="notice-file">
              <span>${row.ORIGINAL_NAME }</span>
              <input type="file" name="file_${var.index }" value="${row.FILE_IDX}" /><i class="bi bi-x"></i>
              <input type="hidden" id="FILE_IDX" name="IDX_${var.index }" value="${row.FILE_IDX }">
            </div>
          </c:forEach>
        </div>
        <div class="notice-write__form--button-wrapper">
          <button type="button" class="btn-secondary notice-write__form--button-left">
            파일 추가
          </button>
          <button type="submit" class="btn-secondary notice-write__form--button-right">
            수정
          </button>
        </div>
        <input type="hidden" name="NOTICE_IDX" value="${detail.NOTICE_IDX }" />
      </form>
    </section>
  </main>
  <script src="https://code.jquery.com/jquery-latest.min.js"></script>
  <script src="/js/dropdown.js"></script>
  <script src="/js/notice/noticeupdate.js"></script>
  </body>

  </html>