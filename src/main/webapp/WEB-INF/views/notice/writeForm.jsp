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
            <i class="bi bi-pencil-fill"></i>
          </div>
        </div>
      </div>
    </section>
    <section class="notice-write__section">
      <form class="notice-write__form" enctype="multipart/form-data" action="/notice/admin/write" method="post">
        <div class="notice-write__form--header">
          <span class="idx">${detail.NOTICE_IDX}</span>
          <input type="text" placeholder="제목" class="form-input notice-write__form--header-input" name="TITLE" />
        </div>
        <div class="notice-write__form--main">
          <textarea class="notice-write__form--main-input" name="CONTENT" spellcheck="false" ></textarea>
        </div>
        <div class="notice-write__form--footer">
          <span class="notice-write__form--footer-title">첨부파일</span>
          <input type="file" name="file_0" />
        </div>
        <div class="notice-write__form--button-wrapper">
          <button type="button" class="btn-secondary notice-write__form--button-left">
            파일 추가
          </button>
          <button type="submit" class="btn-secondary notice-write__form--button-right">
            작성
          </button>
        </div>
      </form>
    </section>
  </main>
  <script src="https://code.jquery.com/jquery-latest.min.js"></script>
  <script src="/js/dropdown.js"></script>
  <script src="/js/notice/notice.js"></script>
  </body>

  </html>