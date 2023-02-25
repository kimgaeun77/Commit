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
                <i class="bi bi-shield-fill-exclamation"></i>
              </div>
            </div>
          </div>
        </section>

        <section class="order-list__section">
          <h1 class="order-list__title">쿠폰 관리</h1>
          <div class="order-list__wrapper">
            <!------------ aside쪽 -------------->
            <jsp:include page="/WEB-INF/include/adminAside.jsp"></jsp:include>
            <div class="coupon-list">
              <div class="coupon-list__header">
                <span class="coupon-list__header--item">
                  번호
                </span>
                <span class="coupon-list__header--item">
                  이름
                </span>
                <span class="coupon-list__header--item">
                  할인률
                </span>
                <span class="coupon-list__header--item">
                  적용일
                </span>
                <span class="coupon-list__header--item">
                  만료일
                </span>
                <span class="coupon-list__header--item">
                  삭제
                </span>
              </div>
              <c:forEach var="row" items="${couponList}">
                <div class="coupon-list__main">
                  <span class="coupon-list__main--item cp-idx">${row.CP_INFO_IDX}</span>
                  <span class="coupon-list__main--item coupon-update-open">${row.CP_NAME}</span>
                  <span class="coupon-list__main--item">${row.CP_DISCOUNT} %</span>
                  <span class="coupon-list__main--item">${row.START_DATE}</span>
                  <span class="coupon-list__main--item">${row.END_DATE}</span>
                  <span class="coupon-list__main--item coupon-list__main--item-delete">
                    <i class="bi bi-x"></i>
                  </span>
                </div>
              </c:forEach>
            </div>
          </div>
        </section>
      </main>
      <jsp:include page="/WEB-INF/include/footer.jsp"></jsp:include>
      <script src="https://code.jquery.com/jquery-latest.min.js"></script>
      <script src="/js/dropdown.js"></script>
      <script src="/js/admin/aside.js"></script>
      <script>

      //쿠폰수정
        const updateCouponLink = document.querySelectorAll('.coupon-update-open');
        const cp_idx = document.querySelectorAll('.cp-idx');

        for (let i = 0; i < updateCouponLink.length; i++) {
          updateCouponLink[i].addEventListener('click', () => {
            let couponNum = cp_idx[i].innerHTML;
            window.open(
              "/coupon/admin/update?CP_INFO_IDX=" + couponNum,
              "Child",
              "width = 800, height = 600, top = 50, left = 50"
            )
          })
        }
      //쿠폰 삭제
        const deleteButton = document.querySelectorAll('.coupon-list__main--item-delete');

        function deleteCoupon(couponNum) {
          let cpNum = {CP_INFO_IDX : couponNum}

          $.ajax({
            type: 'post',
            url: '/coupon/admin/delete',
            data: JSON.stringify(cpNum),
            contentType: 'application/json; charset=utf-8',
            success: function () {
              alert('쿠폰 삭제가 완료되었습니다.');
              window.location.reload(); 
            },
            error: function () {
              alert('쿠폰 삭제에 실패하였습니다.');
            }
          });
        }

        for (let i = 0; i < deleteButton.length; i++) {
          deleteButton[i].addEventListener('click', function () {

            let result = confirm('쿠폰을 삭제하시겠습니까?');
            if (result === true) {//확인버튼을 눌렀을때
              let couponNum = cp_idx[i].innerHTML;
              deleteCoupon(couponNum);
            } 
          });
        }

      </script>
    </body>

    </html>