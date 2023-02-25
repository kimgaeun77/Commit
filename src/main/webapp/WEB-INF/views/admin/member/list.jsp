<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/head.jsp" %> 
<body>
  <jsp:include page="/WEB-INF/include/header.jsp"></jsp:include>
    <main>
      <section class="category">
        <h1 class="sr-only">카테고리</h1>
        <div class="category__items">
          <div class="category__item">
            <div class="category__item--icon">
              <i class="bi bi-shield-fill-exclamation"></i>
            </div>
          </div>
        </div>
      </section>
      <section class="order-list__section">
        <h1 class="order-list__title">회원관리</h1>
        <form class="member-list__search">
          <div class="input-group">
            <select class="input-group-select" name="type">
              <option value="MEM_NAME">이름</option>
              <option value="MEM_ID">아이디</option>
            </select>
            <input class="form-input select-input" type="text" />
          </div>
          <button type="button" class="search">검색</button>
        </form>
        <div class="order-list__wrapper">
        <jsp:include page="/WEB-INF/include/adminAside.jsp"></jsp:include> 
          <div class="order-list__main">
            <div class="order-list__main--header">
              <div class="order-list__header--item">회원번호</div>
              <div class="order-list__header--item">아이디</div>
              <div class="order-list__header--item">이름</div>
              <div class="order-list__header--item">전화번호</div>
              <div class="order-list__header--item">가입일</div>
            </div>
          </div>
        </div>
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
    <script src="/js/admin/aside.js"></script>
    <script src="/js/dropdown.js"></script>
    <script src="/js/admin/memberList.js"></script>
  </body>
</html>
