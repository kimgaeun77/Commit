const myOrderState = document.querySelectorAll(".my-order__state");
const myOrderButton = document.querySelectorAll(".my-order__button");
const myOrderOpenModal = document.querySelectorAll(".my-order__open");

//페이지 로딩시 배송상태 + 배송 상태에 따른 취소/환불 신청
$(function () {
  for (let i = 0; i < myOrderState.length; i++) {
    switch (myOrderState[i].innerText) {
      case "A":
        myOrderState[i].innerText = "교환 환불 처리중";
        break;

      case "B":
        myOrderState[i].innerText = "배송 준비 중";
        myOrderButton[i].disabled = false;
        break;

      case "C":
        myOrderState[i].innerText = "배송중";
        break;

      case "D":
        myOrderState[i].innerText = "배송 완료";
        break;

      case "E":
        myOrderState[i].innerText = "교환 환불 완료";
        break;
    }
  }
});

for (let i = 0; i < myOrderButton.length; i++) {
  myOrderButton[i].addEventListener("click", function () {
    const answer = confirm("주문을 취소하시겠습니까?");

    if (answer === true) {
      const order_idx = myOrderButton[i].dataset.order_idx;
      const cancelOrder = { ORDER_IDX: order_idx };
      $.ajax({
        type: "post",
        url: "/pro/order/cancel",
        data: JSON.stringify(cancelOrder),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
          if (data === 1) {
            alert("주문 취소 요청이 정상적으로 접수되었습니다.");
            window.location.reload();
          } else {
            alert("해당 주문 건은 취소가 불가합니다.");
          }
        },
        error: function (error) {
          alert(error.status);
        },
      });
    } else {
      return false;
    }
  });
}

//주문 상세 보기
for (let i = 0; i < myOrderOpenModal.length; i++) {
  myOrderOpenModal[i].addEventListener("click", function () {
    const order_idx = myOrderButton[i].dataset.order_idx;
    window.open(
        "/mypage/myOrderDetail?ORDER_IDX=" + order_idx,
        "Child",
        "width = 800, height = 1000, top = 50, left = 50"
    );
  });
}
