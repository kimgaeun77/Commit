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
              <i class="bi bi-cpu-fill"></i>
            </div>
          </div>
          <ul class="category-select">
            <li class="category-select__item is-active">전체보기</li>
            <li class="category-select__item">CPU</li>
            <li class="category-select__item">RAM</li>
            <li class="category-select__item">GPU</li>
            <li class="category-select__item">SSD</li>
            <li class="category-select__item">쿨러</li>
            <li class="category-select__item">보드</li>
            <li class="category-select__item">파워</li>
            <li class="category-select__item">케이스</li>
          </ul>
        </div>
      </section>
      <section class="computer-form">
        <div class="computer-form__wrapper">
          <h1 class="sr-only">부품 리스트</h1>
          <div class="computer-search"><%--form태그에서 div로 변경--%>
            <div class="input-group">
              <select class="input-group-select">
                <option value="1">상품명</option>
                <option value="2">상품 번호</option>
              </select>
              <input
                class="form-input select-input"
                type="text"
                placeholder="스토어 검색"
              />
            </div>
            <button type="button" class="stuff-search__button">검색</button>
          </div>
          <form class="select-form">
            <div class="select-group">
              <select class="form-select stuff-sort__category">
                <option value="PRO_IDX">최신순</option>
                <option value="ORDER_CNT">인기순</option>
                <option value="LOW_PRICE">가격낮은순</option>
                <option value="PRICE">가격높은순</option>
              </select>
              <i class="bi bi-caret-down-fill"></i>
            </div>
          </form>
        </div>
      </section>
      <section class="part-section">
        <h1 class="sr-only">부품</h1>
        <div class="part-wrapper">
          <div class="part-items"></div>
          <div class="part-items"></div>
          <div class="part-items"></div>
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
    <script src="/js/dropdown.js"></script>
    <script src="/js/stuffList.js"></script>
  </body>
</html>

