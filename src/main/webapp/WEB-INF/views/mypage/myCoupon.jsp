<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/include/head.jsp" %>
  <body>
    <div class="my-coupon__wrapper">
      <h1 class="my-coupon__title">보유 쿠폰</h1>
      <div class="my-coupon__table">
        <div class="my-coupon__header">
          <div class="my-coupon__header--item">쿠폰 이름</div>
          <div class="my-coupon__header--item">할인율</div>
          <div class="my-coupon__header--item">적용일</div>
          <div class="my-coupon__header--item">만료일</div>
        </div>
       <c:forEach var="row" items="${couponList}">
        <div class="my-coupon__main">
          <div class="my-coupon__main--item">${row.CP_NAME}</div>
          <div class="my-coupon__main--item">${row.CP_DISCOUNT}%</div>
          <div class="my-coupon__main--item">${row.START_DATE}</div>
          <div class="my-coupon__main--item">${row.END_DATE}</div>
        </div>
       </c:forEach>
      </div>
      <div class="my-coupon__close">
        <button type="button" class="btn-secondary my-coupon__close--button">
          닫기
        </button>
      </div>
    </div>
    <script>
      const couponClose = document.querySelector('.my-coupon__close--button');
      couponClose.addEventListener('click', () => {
        window.close();
      });
    </script>
  </body>
</html>
