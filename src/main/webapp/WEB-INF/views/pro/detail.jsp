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
              <i class="bi bi-search"></i>
            </div>
          </div>
        </div>
      </section>
      <section class="product-show">
        <div class="product-wrapper">
          <h1 class="product-detail__title" >
          </h1>
          <div class="product-detail">
            <div class="product-detail__img">
              
            </div>
            <div  class="product-detail__desc">
              <div class="product-price">
                <span>판매가</span>
                <c:set var="MEM_ID" value="${sessionScope.MEM_ID }" />
                <c:set var="admin" value="${sessionScope.admin }" />
                <span class="mem_id disable">${MEM_ID}</span>
                <span class="admin disable">${admin}</span>
                <h3 class="product-price__price"></h3>
              </div>
              <div class="product-as">
                <span>제조사</span>
                <h3>Commit</h3>
              </div>
              <div class="product-delivery">
                <span>배송비</span>
                <h3>2,500 원</h3>
              </div>
              <div class="product-add">
                <h2 class="product-sub-title"></h2>
                <div>
                  <div class="product-add__wrapper">
                    <div class="product-add__button product-add__minus">-</div>
                    <input class="product-quantity"></input>
                    <div class="product-add__button product-add__plus">+</div>
                  </div>
                  <span class="product-add__total-price"></span>
                </div>
              </div>
              <div class="product-total">
                <p>총 합계 금액</p>
                <input class="product-number" type="hidden" value="${PRO_IDX }">
                <h1 class="product-total__total-price"></h1>
              </div>
              <div class="product-button">
                <button type="button" class="btn-cart add-to__cart">장바구니</button>
                <button type="button" class="btn-primary add-to__buy">구매하기</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="product-info">
        <h1 class="sr-only">상품정보</h1>
        <div class="product-info__tab">
          <div>
            <a href="#detail">
              <h3 id="detail">상품 상세정보</h3>
            </a>
          </div>
          <div>
            <a href="#review">
              <h3>상품 후기</h3>
            </a>
          </div>
          <div>
            <a href="#qna">
              <h3>상품 문의</h3>
            </a>
          </div>
        </div>
        <div class="product-info__footer-wrapper">
          <div class="product-info__footer-image">
            
          </div>
          <div id="review" class="product-info__footer-review">
            <h1 class="product-info__footer-review--title">
            Review
            </h1>
          </div>
          <div class="pagination review-pagination">
            <button class="page-control page-prev review-page-prev">
              <i class="bi bi-chevron-right"></i>
            </button>
            <ol class="page-list review-page-list">
            </ol>
            <button class="page-control page-next review-page-next">
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>
          <div class="product-info__footer-qna">
            <h1 id="qna" class="product-info__footer-qna--title">Q&A</h1>
            <div class="product-info__footer-qna--header">
              <div class="product-info__footer-qna--header-item">ID</div>
              <div class="product-info__footer-qna--header-item">문의유형</div>
              <div class="product-info__footer-qna--header-item">제목</div>
              <div class="product-info__footer-qna--header-item">작성일자</div>
            </div>
            <div class="product-info__footer-main-wrapper">
            </div>
          </div>
          <div class="product-info__footer-qna-footer">
            <div class="product-info__add">
              <button class="btn-secondary qna_write" type="button">작성하기</button>
            </div>
            <div class="pagination qna-pagination">
              <button class="page-control page-prev qna-page-prev">
                <i class="bi bi-chevron-right"></i>
              </button>
              <ol class="page-list qna-page-list">
              </ol>
              <button class="page-control page-next qna-page-next">
                <i class="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
    <jsp:include page="/WEB-INF/include/footer.jsp"></jsp:include>
    <script src="https://code.jquery.com/jquery-latest.min.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="/js/dropdown.js"></script>
    <script src="/js/product-detail.js"></script>
  </body>
</html>
 