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
              <i class="bi bi-bag-dash-fill"></i>
            </div>
          </div>
        </div>
      </section>

      <section class="my-order__section">
        <h1 class="my-order__title">주문 조회</h1>
        <div class="my-order__wrapper">
          <div class="my-order__header">
            <span class="my-order__header--item"></span>
            <span class="my-order__header--item">상품 정보</span>
            <span class="my-order__header--item">배송 상태</span>
            <span class="my-order__header--item">총 주문 금액</span>
            <span class="my-order__header--item">취소 / 환불 신청</span>
          </div>
         <c:forEach var="row" items="${orderList}" >
          <div class="my-order__main">
            <span class="my-order__main--item">
              <a href="/pro/detail?PRO_IDX=${row.PRO_IDX}">
              	<img src="/uploadImg/${row.MAIN_IMG}" alt="" />
              </a>
            </span>
            <span class="my-order__main--item modal-open my-order__open"
              >${row.NAME}
            </span>
            <span class="my-order__main--item my-order__state">${row.STATE}</span>
            <span class="my-order__main--item">
            	<fmt:formatNumber type="number" value="${row.TOTAL_PRICE}" />원
            </span>
            <span class="my-order__main--item">
              <button
                type="button"
                class="btn-secondary my-order__button"
                data-order_idx="${row.ORDER_IDX}"
                disabled
              >주문취소</button>
            </span>
          </div>
         </c:forEach>
        </div>
      </section>
    </main>
    <jsp:include page="/WEB-INF/include/footer.jsp"></jsp:include>
    <script src="https://code.jquery.com/jquery-latest.min.js"></script>
    <script src="/js/dropdown.js"></script>
    <script src="/js/mypage/myOrderList.js"></script>
  </body>
</html>
