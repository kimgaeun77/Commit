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
              <i class="bi bi-shield-fill-exclamation"></i>
            </div>
          </div>
        </div>
      </section>
      <section class="order-list__section">
        <h1 class="order-list__title">주문관리페이지</h1>
        <div class="order-list__wrapper">
		 <jsp:include page="/WEB-INF/include/adminAside.jsp"></jsp:include>
          <div class="order-list__main">
            <div class="order-list__main--header">
              <div class="order-list__header--item">주문번호</div>
              <div class="order-list__header--item">주문자 ID</div>
              <div class="order-list__header--item">배송 상태</div>
              <div class="order-list__header--item">총 주문 금액</div>
              <div class="order-list__header--item">결제 방법</div>
            </div>    
          </div>
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
	<script src="https://code.jquery.com/jquery-latest.min.js"></script>
    <script src="/js/admin/aside.js"></script>
    <script src="/js/admin/orderList.js"></script>
    <script src="/js/dropdown.js"></script>
    <script>
      const orderDetailOpen = document.querySelectorAll('.modal-open');
      for (const orderOpen of orderDetailOpen) {
        orderOpen.addEventListener('click', () => {
          window.open(
            '/admin/order/detail',
            'Child',
            'width = 800, height = 1200, top = 50, left = 50'
          );
        });
      }
    </script>
  </body>
</html>