<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/head.jsp" %> 
  <body>
    <div class="pro-detail">
      <span class="pro-modal__close"><i class="bi bi-x"></i></span>
      <h1 class="pro-detail__title">상품 등록</h1>
      <div class="pro-detail__wrapper">
        <form action="/admin/pro/add" method="post" enctype="multipart/form-data" class="pro-detail__form" >
          <div class="pro-detail__item">
            <label for="pro-name" name="name">
              상품 이름
              <span class="essential-check">*</span>
            </label>
            <input type="text" id="pro-name" class="form-input" />
          </div>
          <div class="pro-detail__item">
            <label for="pro-group" name="group">
              상품 그룹
              <span class="essential-check">*</span>
            </label>
            <div class="select-group">
              <select id="pro-group" class="form-select">
                <option value="PC">PC</option>
                <option value="STUFF">STUFF</option>
              </select>
              <i class="bi bi-caret-down-fill"></i>
            </div>
          </div>
          <div class="pro-detail__item">
            <label for="pro-category">
              카테고리
              <span class="essential-check">*</span>
            </label>
            <div class="select-group">
              <select
                id="pro-category"
                class="form-select pro-detail__catefory"
                name="CATEGORY"
              >
                <option value="GAMING">GAMING</option>
                <option value="OFFICE">OFFICE</option>
                <option value="WORKSTATION">WORKSTATION</option>
              </select>
              <i class="bi bi-caret-down-fill"></i>
            </div>
          </div>
          <div class="pro-detail__form-category"></div>
          <div class="pro-detail__item main">
            <label for="pro-main-image">
              메인사진
              <span class="essential-check">*</span>
            </label>
            <div class="pro-main__image--wrapper"></div>
          </div>
          <div class="main-image__img"></div>
          <div class="pro-detail__item">
            <label for="pro-stock">
              재고 수량
              <span class="essential-check">*</span>
            </label>
            <input type="number" id="pro-stock" class="form-input" name="STOCK"/>
          </div>
          <div class="pro-detail__item">
            <label for="pro-price">
              상품 가격
              <span class="essential-check">*</span>
            </label>
            <input type="text" id="pro-price" class="form-input" name="PRICE"/>
          </div>
          <div class="pro-detail__item sub">
            <label> 서브사진 </label>
            <div class="pro-sub__image--wrapper"></div>
            <div class="pro-sub__image-button--wrapper">
              <button type="button" class="btn-secondary pro-sub__image-button">
                추가하기
              </button>
            </div>
          </div>
          <div class="pro-detail__button">
            <button
              type="submit"
              class="btn-secondary pro-detail-submit"
              disabled
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
    <script src="/js/addForm.js"></script>
  </body>
</html>
