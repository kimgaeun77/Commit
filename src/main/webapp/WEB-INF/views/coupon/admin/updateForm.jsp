<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/include/head.jsp" %>

  <body>
    <section class="coupon-add__form">
      <h1 class="coupon-add__form--title">쿠폰 수정</h1>
      <form action="/coupon/admin/update" method="post" class="coupon__form">
        <div class="coupon-name">
          <label for="coupon-name__name" class="coupon-name__label">쿠폰 이름
            <span class="essential">*</span>
          </label>
          <input type="text" id="coupon-name__name" class="form-input" name="CP_NAME" value="${couponOne.CP_NAME}" />
        </div>
        <div class="coupon-discount">
          <label for="coupon-discount__discount" class="coupon-discount__label">쿠폰 할인율
            <span class="essential">*</span>
          </label>
          <input type="text" id="coupon-discount__discount" class="form-input" name="CP_DISCOUNT" maxlength="3"
            value="${couponOne.CP_DISCOUNT}" />
        </div>
        <div class="coupon-min-date">
          <label for="coupon-date__min" class="coupon-min__label">쿠폰 적용일
            <span class="essential">*</span>
          </label>
          <input type="date" id="coupon-date__min" class="form-input" name="START_DATE"
            value="${couponOne.START_DATE}" />
        </div>
        <div class="coupon-max-date">
          <label for="coupon-date__max" class="coupon-max__label">쿠폰 만료일
            <span class="essential">*</span>
          </label>
          <input type="date" id="coupon-date__max" class="form-input" name="END_DATE" value="${couponOne.END_DATE}" />
        </div>
        <div class="coupon-add__button-wrapper">
          <input type="hidden" class="cp_idx" name="CP_INFO_IDX" value="${couponOne.CP_INFO_IDX}">
          <button type="button" class="btn-secondary coupon-add__button" disabled>
            수정
          </button>
        </div>
      </form>
    </section>
    <script src="https://code.jquery.com/jquery-latest.min.js"></script>
    <script src="/js/coupon.js"></script>
    <script>
      const updateButton = document.querySelector('.coupon-add__button');
      const cp_name = document.querySelector('#coupon-name__name');
      const cp_discount = document.querySelector('#coupon-discount__discount');
      const start_date = document.querySelector('#coupon-date__min');
      const end_date = document.querySelector('#coupon-date__max');
      const cp_idx = document.querySelector('.cp_idx');

      function updateCoupon() {

        const coupon_info = {
          CP_NAME: cp_name.value,
          CP_DISCOUNT: cp_discount.value,
          START_DATE: start_date.value,
          END_DATE: end_date.value,
          CP_INFO_IDX : cp_idx.value
        }

        $.ajax({
          type: 'post',
          url: '/coupon/admin/update',
          data: JSON.stringify(coupon_info),
          contentType: 'application/json; charset=utf-8',
          success: function () {
            alert('쿠폰 수정이 완료되었습니다.');
            window.close();
          },
          error: function () {
            alert('쿠폰 수정에 실패하였습니다.');
          }
        });
      }

      updateButton.addEventListener('click', updateCoupon);


    </script>
  </body>

  </html>