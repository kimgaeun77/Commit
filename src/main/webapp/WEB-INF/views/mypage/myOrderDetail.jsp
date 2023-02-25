<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/include/head.jsp" %>
  <body>
    <div class="order-detail">
      <h1 class="order-detail__title">주문상세</h1>
      <div class="order-detail__wrapper">
        <div class="order-detail__info">
          <h3 class="order-info__title">주문정보</h3>
          <div class="order-detail__item">
            <span class="order-detail__left">주문번호</span>
            <span class="order-detail__right">${orderInfo.ORDER_IDX}</span>
          </div>
          <div class="order-detail__item">
            <span class="order-detail__left">아이디</span>
            <span class="order-detail__right">${orderInfo.MEM_ID}</span>
          </div>
          <div class="order-detail__item">
            <span class="order-detail__left">이름</span>
            <span class="order-detail__right">${orderInfo.NAME}</span>
          </div>
          <div class="order-detail__item">
            <span class="order-detail__left">전화번호</span>
            <span class="order-detail__right">${orderInfo.PHONE}</span>
          </div>
          <div class="order-detail__item">
            <span class="order-detail__left">주소</span>
            <span class="order-detail__right">${orderInfo.ADDRESS}</span>
          </div>
          <div class="order-detail__item">
            <span class="order-detail__left">요청사항</span>
            <span class="order-detail__right">${orderInfo.REQUEST}</span>
          </div>
          <div class="order-detail__item">
            <span class="order-detail__left">주문 날짜</span>
            <span class="order-detail__right">${orderInfo.ORDER_DATE}</span>
          </div>
          <div class="order-detail__item">
            <span class="order-detail__left">결제방법</span>
            <span class="order-detail__right pay-type">${orderInfo.PAY_TYPE}</span>
          </div>
          <div class="order-detail__item">
            <span class="order-detail__left">주문상태</span>
            <span class="order-detail__right order-state">${orderInfo.STATE}</span>
          </div>
        </div>

        <div class="order-product__info">
          <h1 class="order-product__info--title">상품 정보</h1>
         <c:forEach var="row" items="${order}">
          <div class="product__info--item">
            <div class="product__info--img">
              <a href="/pro/detail?PRO_IDX=${row.PRO_IDX}" class="detail-pro"><img src="/uploadImg/${row.MAIN_IMG}" alt="" /></a>
            </div>
            <span class="product__info--name"
              >${row.NAME}</span
            >
            <span class="product__info--quantity">${row.AMOUNT}개</span>
            <span class="product__info--price">
            	<fmt:formatNumber type="number" value="${row.AMOUNT_PRICE}" />원
            </span>
            <span class="product__info--button">
              <button 
                  type="button" 
                  class="btn-secondary write-review"
                  data-order_idx="${row.ORDER_IDX}"
                  data-pro_idx="${row.PRO_IDX}"
                >
                리뷰쓰기
              </button></span
            >
          </div>
         </c:forEach>
        </div>

        <div class="order-pay__info">
          <div class="order-pay__info-item">
            <span class="pay__info-item--left">쿠폰</span>
            <c:choose>
              <c:when test="${empty orderInfo.CP_IDX}">
                <span class="pay__info-item--right">미사용</span>
              </c:when>
              <c:otherwise>
                <span class="pay__info-item--right">${orderInfo.CP_NAME} ${orderInfo.CP_DISCOUNT}%</span>
              </c:otherwise>
            </c:choose>
          </div>
          <div class="order-pay__info-item">
            <span class="pay__info-item--left">배송비</span>
            <span class="pay__info-item--right">2,500 원</span>
          </div>
          <div class="order-pay__info-item">
            <span class="pay__info-item--left">총 상품 가격</span>
            <span class="pay__info-item--right">
            	<fmt:formatNumber type="number" value="${orderInfo.TOTAL_PRICE}" />원
            </span>
          </div>
          <div class="order-detail__close--button">
            <button class="btn-secondary my-order__close">닫기</button>
          </div>
        </div>
      </div>
    </div>
    <script src="https://code.jquery.com/jquery-latest.min.js"></script>
    <script src="/js/mypage/myOrderDetail.js"></script>
  </body>
</html>
