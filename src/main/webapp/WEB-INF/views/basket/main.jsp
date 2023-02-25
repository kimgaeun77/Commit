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
                    <i class="bi bi-cart2"></i>
                </div>
            </div>
        </div>
    </section>

    <section class="basket-section">
        <h1 class="sr-only">장바구니 페이지</h1>
        <div class="basket-wrapper">
            <h3 class="basket-title">장바구니</h3>
            <div class="basket-container">
                <div class="basket-header">
                    <span class="basket-header__item">상품명</span>
                    <span class="basket-header__item">수량</span>
                    <span class="basket-header__item">금액</span>
                    <span class="basket-header__item">수정 / 삭제</span>
                </div>
                <c:set var="TOTAL_PRICE" value="0" />
                <c:forEach var="row" items="${list}">
                    <div class="basket-container__item-wrapper">
                  <span class="basket-container__item">
                    <a href="/pro/detail?PRO_IDX=${row.PRO_IDX}">
                      <img src="/uploadImg/${row.MAIN_IMG}" alt="" />
                    </a>
                    <span class="product-name" data-value="${row.PRO_IDX}">${row.NAME}</span>
                    <span class="sr-only product-price">${row.PRICE}</span>
                  </span>
                        <span class="basket-container__item">
                    <div class="product-add__wrapper">
                      <div class="product-add__minus product-add__button">-</div>
                      <div class="product-quantity">${row.AMOUNT}</div>
                      <div class="product-add__plus product-add__button">+</div>
                    </div>
                  </span>
                        <span class="basket-container__item product-total-price">
                    <fmt:formatNumber type="number" value="${row.PRICE * row.AMOUNT}" />원
                  </span>
                        <span class="basket-container__item">
                    <button class="edit"><i class="bi bi-pencil"></i></button>
                    <button class="trash"><i class="bi bi-trash3"></i></button>
                  </span>
                    </div>
                    <fmt:parseNumber var="price" type="number" value="${row.PRICE}" />
                    <fmt:parseNumber var="amount" type="number" value="${row.AMOUNT}" />
                    <c:set var="temp_price" value="${price * amount}" />
                    <c:set var="TOTAL_PRICE" value="${TOTAL_PRICE + temp_price}" />
                </c:forEach>
                <div class="basket-footer">
                    <div class="basket-footer__item basket-footer__item--info">
                        <h3>결제 금액</h3>
                    </div>
                    <div class="basket-footer__item basket-footer__item--buy">
                  <span class="basket-total-price">
                    <fmt:formatNumber type="number" value="${TOTAL_PRICE}" />원
                  </span>
                        <button type="button" class="btn-secondary buy-button">
                            구매하기
                        </button>
                    </div>
                </div>
                <div class="basket-remove-all">
                    <button type="button" class="btn-secondary total-remove">
                        장바구니 비우기
                    </button>
                </div>
            </div>
        </div>
    </section>
</main>
<jsp:include page="/WEB-INF/include/footer.jsp"></jsp:include>
<script src="https://code.jquery.com/jquery-latest.min.js"></script>
<script src="/js/dropdown.js"></script>
<script src="/js/basket.js"></script>
</body>

</html>