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
              <i class="bi bi-currency-dollar"></i>
            </div>
          </div>
        </div>
      </section>
      <section class="order-form__section">
        <form>
          <h1 class="sr-only">order-form</h1>
          <div class="order-form__title">주문 / 결제</div>
          <div class="order-form__member-info">
            <div class="order-form__orderer-info">
              <span class="orderer-info__title">주문자 정보</span>
              <div class="orderer-info__items">
                <span class="orderer-info__item left">이름</span>
                <span class="orderer-info__item right">${myInfo.MEM_NAME}</span>
              </div>
              <div class="orderer-info__items">
                <span class="orderer-info__item left">전화번호</span>
                <input class="orderer-info__item right" value="${myInfo.PHONE}" />
              </div>
            </div>
            <div class="order-form__receiver-info">
              <span class="receiver-info__title">배송 정보</span>
              <div class="receiver-info__items">
                <span class="receiver-info__item left">이름</span>
                <input
                  type="text"
                  class="receiver-info__item right info-name"
                  placeholder="받으시는 분"
                  spellcheck="false"
                />
              </div>
              <div class="receiver-info__items">
                <span type="text" class="receiver-info__item left"
                  >전화번호</span
                >
                <input
                  type="text"
                  class="receiver-info__item right info-phone"
                  placeholder="휴대전화"
                  spellcheck="false"
                />
              </div>
              <div class="receiver-info__items">
                <span type="text" class="receiver-info__item left"
                  >배송 주소</span
                >
                <input
                  type="text"
                  class="receiver-info__item right info-adress"
                  placeholder="배송지"
                  spellcheck="false"
                />
              </div>
              <div class="receiver-info__items">
                <span type="text" class="receiver-info__item left"
                  >요청사항</span
                >
                <input
                  type="text"
                  class="receiver-info__item right info-request"
                  placeholder="요청사항"
                  spellcheck="false"
                />
              </div>
            </div>
          </div>
          <div class="order-form__pro-info">
            <h1 class="order-form__pro-title">상품 정보</h1>
            <c:set var="TOTAL_PRICE" value="0"/>
            <c:forEach var="row" items="${proInfoList}" >
             <div class="order-form__pro-items">
              <div class="order-pro__image order-form__pro-item">
                <img src="/uploadImg/${row.MAIN_IMG}" alt="" />
              </div>
              <span
                class="order-pro__name order-form__pro-item order-form__pro-idx"
                data-idx="${row.PRO_IDX}"
                data-amount="${row.AMOUNT}"
                >${row.NAME}
              </span>
              <span class="order-pro__quan order-form__pro-item">${row.AMOUNT}개</span>
              <fmt:parseNumber var="price" type="number" value="${row.PRICE}" />
	          <fmt:parseNumber var="amount" type="number" value="${row.AMOUNT}" />
              <span class="order-pro__price order-form__pro-item">
              	<fmt:formatNumber type="number" value="${price * amount}" /> 원
              </span>
            </div>
            <c:set var="temp_price" value="${price * amount}"/>
	        <c:set var="TOTAL_PRICE" value="${TOTAL_PRICE + temp_price}"/>
           </c:forEach>
          </div>
          <div class="order-form__pay">
            <div class="order-form__pay-info">
              <span class="pay-info__title">결제 정보</span>
              <div class="pay-info__items">
                <span class="pay-info__item left">총 상품 가격</span>
                <span class="pay-info__item right order-form__total-price">
                	<fmt:formatNumber type="number" value="${TOTAL_PRICE}" /> 원
                </span>
              </div>
              <div class="pay-info__items">
                <span class="pay-info__item left">할인쿠폰</span>
                <span class="pay-info__item right">
                  <span class="coupon-name"></span>
                  <button class="btn-secondary select-coupon" type="button">
                    쿠폰 선택
                  </button>
                </span>
              </div>
              <div class="pay-info__items">
                <span class="pay-info__item left">배송비</span>
                <span class="pay-info__item right">2,500원</span>
              </div>
              <div class="pay-info__items">
                <span class="pay-info__item left">총 결제 금액</span>
                <span
                  class="pay-info__item right order-form__total-payment">
                  	<fmt:formatNumber type="number" value="${TOTAL_PRICE + 2500}" /> 원
                </span>
              </div>
              <div class="pay-info__items">
                <span class="pay-info__item left">결제 방법</span>
                <span class="pay-info__item right pay">
                  <input
                    type="radio"
                    class="payment-info"
                    id="credit-card"
                    name="order-pay"
                    value="CC"
                    checked
                  />
                  <label for="credit-card">신용카드</label>
                  <input
                    type="radio"
                    class="payment-info"
                    id="no-bankbook"
                    name="order-pay"
                    value="DB"
                  />
                  <label for="no-bankbook">무통장입금</label>
                  <input
                    type="radio"
                    class="payment-info"
                    id="account"
                    name="order-pay"
                    value="BT"
                  />
                  <label for="acoount">계좌이체</label>
                </span>
              </div>
            </div>
          </div>
          <div class="order-form__button-wrapper">
            <button type="button" class="order-form__button btn-secondary">
              결제하기
            </button>
          </div>
        </form>
      </section>
      <div class="estimate-coupon__modal--wrapper">
        <div class="estimate-coupon__modal">
          <h1 class="coupon__modal--title">보유 쿠폰</h1>
          <div class="estimate-coupon__modal--header">
            <span class="coupon-modal__header--item"></span>
            <span class="coupon-modal__header--item">쿠폰이름</span>
            <span class="coupon-modal__header--item">할인률</span>
            <span class="coupon-modal__header--item">적용일</span>
            <span class="coupon-modal__header--item">만료일</span>
          </div>
         <c:forEach var="row" items="${couponList}" >
          <div class="estimate-coupon__modal--main">
            <span class="coupon-modal__main--item">
              <input
                type="radio"
                value="${row.CP_DISCOUNT}"
                class="coupon-radio"
                data-cpidx="${row.CP_IDX}"
                name="coupon"
              />
            </span>
            <span class="coupon-modal__main--item">${row.CP_NAME}</span>
            <span class="coupon-modal__main--item">${row.CP_DISCOUNT}%</span>
            <span class="coupon-modal__main--item">${row.START_DATE}</span>
            <span class="coupon-modal__main--item">${row.END_DATE}</span>
          </div>
         </c:forEach>
          <div class="coupon-modal__button">
            <button
              type="button"
              class="btn-secondary coupon-modal__button--button"
            >
              적용
            </button>
          </div>
        </div>
      </div>
    </main>
    <jsp:include page="/WEB-INF/include/footer.jsp"></jsp:include>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="/js/dropdown.js"></script>
    <script src="/js/order-form.js"></script>
  </body>
</html>
