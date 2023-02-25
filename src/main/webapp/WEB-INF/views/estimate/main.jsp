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
              <i class="bi bi-wrench"></i>
            </div>
          </div>
        </div>
      </section>
      <section class="estimate-section">
        <h1 class="sr-only">견적페이지</h1>
        <div class="estimate-left">
          <div class="estimate-left__header">
            <span class="estimate-left__title"></span>
          </div>
          <div class="estimate-left__main">
          </div>
        </div>
        <div class="estimate-right">
          <div class="estimate-right__item">
            <span class="estimate-right__item--menu">CPU</span>
            <div class="estimate-right-CPU estiamte-menu"></div>
          </div>
          <div class="estimate-right__item">
            <span class="estimate-right__item--menu">RAM</span>
            <div class="estimate-right-RAM estiamte-menu"></div>
          </div>
          <div class="estimate-right__item">
            <span class="estimate-right__item--menu">BOARD</span>
            <div class="estimate-right-BOARD estiamte-menu"></div>
          </div>
          <div class="estimate-right__item">
            <span class="estimate-right__item--menu">GPU</span>
            <div class="estimate-right-GPU estiamte-menu"></div>
          </div>
          <div class="estimate-right__item">
            <span class="estimate-right__item--menu">SSD</span>
            <div class="estimate-right-SSD estiamte-menu"></div>
          </div>
          <div class="estimate-right__item">
            <span class="estimate-right__item--menu">COOLER</span>
            <div class="estimate-right-COOLER estiamte-menu"></div>
          </div>
          <div class="estimate-right__item">
            <span class="estimate-right__item--menu">POWER</span>
            <div class="estimate-right-POWER estiamte-menu"></div>
          </div>
          <div class="estimate-right__item">
            <span class="estimate-right__item--menu">CASE</span>
            <div class="estimate-right-CASE estiamte-menu"></div>
          </div>
          <div class="estimate-right__price">
            <h1>총 합계금액</h1>
            <span class="estimate-right__price-price">0 원</span>
            <button class="estimate-right__price-button btn-outlined" type="button">
              구매하기
            </button>
          </div>
        </div>
      </section>
    </main>
    <jsp:include page="/WEB-INF/include/footer.jsp"></jsp:include>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="/js/dropdown.js"></script>
    <script src="/js/estimate.js"></script>
  </body>

  </html>