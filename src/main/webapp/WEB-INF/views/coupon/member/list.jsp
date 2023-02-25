<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/include/head.jsp" %>

<body>
  <!---------------------------- header 영역 --------------------------------------->
<jsp:include page="/WEB-INF/include/header.jsp"></jsp:include>

  <main>
    <section class="category">
      <h1 class="sr-only">카테고리</h1>
      <div class="category__items">
        <div class="category__item">
          <div class="category__item--icon">
            <i class="bi bi-tags"></i>
          </div>
        </div>
      </div>
    </section>
    <!-------------------------- 쿠폰 영역 ------------------------------->
    <section class="event-page">
      <h1 class="sr-only">할인쿠폰</h1>
      <div class="event-page__wrapper">
        <h3 class="event-page__title">쇼핑지원 할인쿠폰</h3>
        <div class="event-page__container">
          <c:forEach var="row" items="${couponList}">
            <div class="event-page__item">
              <div class="event-page__item--wrapper">

                <div class="event-page__item--coupon">
                  <img src="/assets/event/coupon.png" alt="coupon_background" />
                  <div class="event-page__item--info">
                    <span class="info__top">
                      <h2>${row.CP_DISCOUNT}%</h2>
                      <p>${row.CP_NAME}</p>
                    </span>
                    <span class="info__bottom">
                      <c:set var="end_date" value="${row.END_DATE}" />
                      <c:set var="end_date_format" value="${fn:replace(end_date, '-', '.')}" />
                      <h3>${end_date_format} 까지</h3>
                    </span>
                  </div>
                </div>

                <div class="event-page__item-button">
                  <button type="button" class="btn-secondary" data-cp-idx="${row.CP_INFO_IDX}">
                    쿠폰다운받기
                    <i class="bi bi-download"></i>
                  </button>
                </div>
              </div>
            </div>
          </c:forEach>
        </div>
      </div>
    </section>
  </main>
  <jsp:include page="/WEB-INF/include/footer.jsp"></jsp:include>
  <script src="https://code.jquery.com/jquery-latest.min.js"></script>
  <script src="/js/download-coupon.js"></script>
  <script src="/js/dropdown.js"></script>
</body>

</html>

