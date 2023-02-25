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
        <h1 class="order-list__title">상품관리</h1>
        <form class="member-list__search">
          <div class="input-group">
            <select class="input-group-select">
              <option value="PRO_IDX">상품번호</option>
              <option value="NAME">상품이름</option>
            </select>
            <input class="form-input select-input" type="text" />
          </div>
          <button type="button" class="search">검색</button>
        </form>
        <div class="order-list__wrapper">
        <jsp:include page="/WEB-INF/include/adminAside.jsp"></jsp:include>
          <div class="order-list__main">
            <div class="order-list__pro--header">
              <div class="order-list__header--item">번호</div>
              <div class="order-list__header--item">사진</div>
              <div class="order-list__header--item pro">이름</div>
              <div class="order-list__header--item">카테고리</div>
              <div class="order-list__header--item">재고</div>
              <div class="order-list__header--item">가격</div>
              <div class="order-list__header--item">삭제</div>
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
    <script src="/js/admin/proList.js"></script>
    <script src="/js/dropdown.js"></script>
    <script>
      const updateFormLink = document.querySelectorAll('.pro-detail__name');
      const updateFormOpen = () => {
        window.open(
          "/admin/pro/updateForm",
          "Child",
          "width = 800, height = 600, top = 50, left = 50"
        )
      }
    </script>
  </body>
</html>