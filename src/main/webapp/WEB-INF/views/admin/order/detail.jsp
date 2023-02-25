<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
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
            <c:if test="${orderInfo.PAY_TYPE eq 'CC'}">
            <span class="order-detail__right">신용카드</span>
            </c:if>
            <c:if test="${orderInfo.PAY_TYPE eq 'DB'}">
            <span class="order-detail__right">무통장입금</span>
            </c:if>
            <c:if test="${orderInfo.PAY_TYPE eq 'BT'}">
            <span class="order-detail__right">계좌이체</span>
            </c:if>
            
            
          </div>
          <div class="order-detail__item">
            <span class="order-detail__left">주문상태</span>
            <c:if test="${orderInfo.STATE eq 'A'}">
            <span class="order-detail__right">취소 처리중</span>
            </c:if>
             <c:if test="${orderInfo.STATE eq 'B'}">
            <span class="order-detail__right">배송대기</span>
            </c:if>
             <c:if test="${orderInfo.STATE eq 'C'}">
            <span class="order-detail__right">배송중</span>
            </c:if>
             <c:if test="${orderInfo.STATE eq 'D'}">
            <span class="order-detail__right">배송완료</span>
            </c:if>
             <c:if test="${orderInfo.STATE eq 'E'}">
            <span class="order-detail__right">교환완료</span>
            </c:if>
             <c:if test="${orderInfo.STATE eq 'F'}">
            <span class="order-detail__right">환불완료</span>
            </c:if>
            
            
          </div>
        </div>
        <div class="order-product__info">
          <h1 class="order-product__info--title">상품 정보</h1>
          <c:forEach items="${order }" var="row">
	          <div class="product__info--item">
	            <div class="product__info--img">
	              <img src="/uploadImg/${row.MAIN_IMG}" alt="" />
	            </div>
	            <span class="product__info--name"
	              >${row.NAME}</span
	            >
	            <span class="product__info--quantity">${row.AMOUNT}개</span>
	            <span class="product__info--price"><fmt:formatNumber type="number" value="${row.PRICE}"/>원</span>
	          </div>
		</c:forEach>
        </div>
        <div class="order-pay__info">
          <div class="order-pay__info-item">
            <span class="pay__info-item--left">쿠폰</span>
            <span class="pay__info-item--right">${orderInfo.CP_NAME} ${orderInfo.CP_DISCOUNT}%</span>
          </div>
          <div class="order-pay__info-item">
            <span class="pay__info-item--left">총 상품 가격</span>
            <span class="pay__info-item--right"><fmt:formatNumber type="number" value="${orderInfo.TOTAL_PRICE}"/>원</span>
          </div>
          <div class="order-detail__close--button">
            <button class="btn-secondary">닫기</button>
          </div>
        </div>
      </div>
    </div>

    <script>
      const closeButton = document.querySelector(
        '.order-detail__close--button'
      );
      closeButton.addEventListener('click', () => {
        window.close();
      });
    </script>
  </body>
</html>
