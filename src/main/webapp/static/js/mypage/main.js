const myCouponModalOpen = document.querySelector(".my-coupon__open");
const confirmPwModalOpen = document.querySelector(".confirm-pw__open");
const confirmPwModalClose = document.querySelector(".confirm-pw__close");
const confirmPwModalBox = document.querySelector(".confirm-pw__modal");

confirmPwModalOpen.addEventListener("click", () => {
  confirmPwModalBox.classList.add("open");
});

confirmPwModalClose.addEventListener("click", () => {
  confirmPwModalBox.classList.remove("open");
});

myCouponModalOpen.addEventListener("click", () => {
  window.open(
      "/mypage/myCoupon",
      "Child",
      "width = 800, height = 600, top = 50, left = 50"
  );
});
