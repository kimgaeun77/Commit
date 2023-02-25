<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/head.jsp" %> 
<body>
 <jsp:include page="/WEB-INF/include/header.jsp"></jsp:include>
    <main>
      <section class="category">
        <h1 class="sr-only">카테고리</h1>
        <div class="category__items">
          <div class="category__item category-gaming">
            <div class="category__item--icon">
              <i class="bi bi-controller"></i>
            </div>
            <span class="category__item--title">Gaming</span>
          </div>
          <div class="category__item category-office">
            <div class="category__item--icon">
              <i class="bi bi-briefcase"></i>
            </div>
            <span class="category__item--title">Office</span>
          </div>
          <div class="category__item category-work">
            <div class="category__item--icon">
              <i class="bi bi-film"></i>
            </div>
            <span class="category__item--title">Work Station</span>
          </div>
        </div>
      </section>
      <section class="computer-form">
        <div class="computer-form__wrapper">
          <h1 class="sr-only">컴퓨터 리스트</h1>
          <div class="computer-search"><%--form태그에서 div로 변경--%>
            <div class="input-group">
              <select class="input-group-select pc-list__select">
                <option value="1">상품명</option>
                <option value="2">상품 번호</option>
              </select>
              <input
                class="form-input select-input pc-list__input"
                type="text"
                placeholder="스토어 검색"
              />
            </div>
            <button type="button" class="pc-list__search">검색</button>
          </div>
          <form class="select-form">
            <div class="select-group">
              <select class="form-select sort-category">
                <option value="PRO_IDX" selected>최신순</option>
                <option value="ORDER_CNT">인기순</option>
                <option value="LOW_PRICE">가격 낮은 순</option>
                <option value="PRICE">가격 높은 순</option>
              </select>
              <i class="bi bi-caret-down-fill"></i>
            </div>
          </form>
        </div>
      </section>
      <section class="computer-list">
        <ul class="pc__items"></ul>
        <ul class="pc__items"></ul>

        <div class="pagination">
          <button class="page-control page-prev">
            <i class="bi bi-chevron-right"></i>
          </button>
          <ol class="page-list">
            <li class="page-item is-active pc-item__page"><span>1</span></li>
            <li class="page-item pc-item__page"><span>2</span></li>
            <li class="page-item pc-item__page"><span>3</span></li>
            <li class="page-item pc-item__page"><span>4</span></li>
            <li class="page-item pc-item__page"><span>5</span></li>
          </ol>
          <button class="page-control page-next">
            <i class="bi bi-chevron-right"></i>
          </button>
        </div>
      </section>
    </main>
    <jsp:include page="/WEB-INF/include/footer.jsp"></jsp:include>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="/js/pcList.js"></script>
    <script src="/js/dropdown.js"></script>
  </body>
</html>
