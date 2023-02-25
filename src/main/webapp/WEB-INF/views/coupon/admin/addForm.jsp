<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/include/head.jsp" %>
  <body>
    <section class="coupon-add__form">
      <h1 class="coupon-add__form--title">쿠폰 등록</h1>
      <form class="coupon__form">
        <div class="coupon-name">
          <label for="coupon-name__name" class="coupon-name__label">쿠폰 이름
            <span class="essential">*</span>
          </label>
          <input type="text" id="coupon-name__name" class="form-input" name="CP_NAME" />
        </div>
        <div class="coupon-discount">
          <label for="coupon-discount__discount" class="coupon-discount__label">쿠폰 할인율
            <span class="essential">*</span>
          </label>
          <input type="number" id="coupon-discount__discount" class="form-input" name="CP_DISCOUNT"/>
          <span class="discount_valid">1부터 100까지의 숫자를 입력해주세요.</span>
        </div>
        <div class="coupon-min-date">
          <label for="coupon-date__min" class="coupon-min__label">쿠폰 적용일
            <span class="essential">*</span>
          </label>
          <input type="date" id="coupon-date__min" class="form-input" name="START_DATE" />
        </div>
        <div class="coupon-max-date">
          <label for="coupon-date__max" class="coupon-max__label">쿠폰 만료일
            <span class="essential">*</span>
          </label>
          <input type="date" id="coupon-date__max" class="form-input" name="END_DATE" />
        </div>
        <div class="coupon-add__button-wrapper">
          <button type="button" class="btn-secondary coupon-add__button" disabled>
            등록
          </button>
        </div>
      </form>
    </section>
    <script src="https://code.jquery.com/jquery-latest.min.js"></script>
    <script src="/js/coupon.js"></script>
    <script>

      const addButton = document.querySelector('.coupon-add__button');
      const cp_name = document.querySelector('#coupon-name__name');
      const cp_discount = document.querySelector('#coupon-discount__discount');
      const start_date = document.querySelector('#coupon-date__min');
      const end_date = document.querySelector('#coupon-date__max');

      function addCoupon() {

        const coupon_info = {
          CP_NAME : cp_name.value,
          CP_DISCOUNT : cp_discount.value,
          START_DATE : start_date.value,
          END_DATE : end_date.value
        }

        $.ajax({
          type: 'post',
          url: '/coupon/admin/add',
          data: JSON.stringify(coupon_info),
          contentType: 'application/json; charset=utf-8',
          success: function () {
            alert('쿠폰 등록이 완료되었습니다.');
            window.opener.location.href="/coupon/admin/list";
            window.close();
          },
          error: function () {
            alert('쿠폰 등록에 실패하였습니다.');
          }
        });
      }

      addButton.addEventListener('click', addCoupon);


    </script>
  </body>

  </html>