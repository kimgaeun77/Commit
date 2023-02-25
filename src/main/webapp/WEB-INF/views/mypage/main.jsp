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
              <i class="bi bi-person-square"></i>
            </div>
          </div>
        </div>
      </section>

      <section class="my-page__section">
        <h1 class="my-page__title">My Page</h1>
        <div class="my-page__wrapper">
          <div class="my-page__header">
            <h2 class="my-page__header-left">${sessionScope.MEM_NAME } 님</h2>
            <div class="my-page__header-right my-coupon__open">
              <span>내 쿠폰함</span>
              <i class="bi bi-postcard"></i>
            </div>
          </div>
          <div class="my-page__main">
            <div class="my-page__main-left">
              <a href="/mypage/myOrder">주문 조회</a>
            </div>
            <div class="my-page__main-right">
              <a href="/mypage/myQna">문의 내역</a>
            </div>
          </div>
          <div class="my-page__main">
            <div class="my-page__main-left">
              <a href="/review/myReview">내 상품리뷰</a>
            </div>
            <div class="my-page__main-right confirm-pw__open">
              <span>정보 수정</span>
            </div>
          </div>
        </div>
        <!-- 비밀번호 확인창 모달 -->
        <div class="confirm-pw__modal">
          <div class="confirm-pw__wrapper">
            <form action="/mypage/myInfo" method="post">
              <div class="confirm-form">
                <label for="confirm-pw"> 비밀번호 </label>
                <input type="password" name="MEM_PW" class="form-input" id="confirm-pw" />
              </div>
              <div class="confirm-pw__button">
                <button
                  type="submit"
                  class="btn-secondary confirm-pw__button--confirm"
                >
                  비밀번호 확인
                </button>
              </div>
            </form>
            <span class="confirm-pw__close">x</span>
          </div>
        </div>
      </section>
    </main>
    <jsp:include page="/WEB-INF/include/footer.jsp"></jsp:include>
    <script src="/js/dropdown.js"></script>
    <script src="/js/mypage/main.js"></script>
    <script></script>
  </body>
</html>
