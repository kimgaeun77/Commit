<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/head.jsp" %>
<body>
<div class="pro-detail">
  <span class="pro-modal__close"><i class="bi bi-x"></i></span>
  <h1 class="pro-detail__title">상품 수정</h1>
  <div class="pro-detail__wrapper">
    <form class="pro-detail__form" action="/admin/pro/update" method="post" enctype="multipart/form-data">
      <div class="pro-detail__item">
        <label for="pro-name">
          상품 이름
          <span class="essential-check">*</span>
        </label>
        <input
                type="text"
                id="pro-name"
                class="form-input"
                data-idx="${PRO_IDX}"
                name="NAME"
        />
      </div>
      <div class="pro-detail__item">
        <label for="pro-group">
          상품 그룹
          <span class="essential-check">*</span>
        </label>
        <div class="select-group">
          <select id="pro-group" class="form-select product-group" name="PRO_GROUP" disabled>
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
            <option value="WORK">WORKSTATION</option>
          </select>
          <i class="bi bi-caret-down-fill"></i>
        </div>
      </div>
      <div class="pro-detail__form-category"></div>
      <div class="pro-detail__item main">
        <label>
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
          수정
        </button>
      </div>
      <input type="hidden" name="PRO_IDX" value="${PRO_IDX}">
    </form>
  </div>
</div>
<script src="https://code.jquery.com/jquery-latest.min.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="/js/editForm.js"></script>
<script>

  const updateButton = document.querySelector('.pro-detail-submit');
  const selectProGroup = document.querySelector('.product-group');

  updateButton.addEventListener('click', function () {
    selectProGroup.disabled = false;
  })

</script>
</body>
</html>
