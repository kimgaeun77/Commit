const couponModalOpen = document.querySelector(".select-coupon");
couponModalOpen.addEventListener("click", () => {
  document
      .querySelector(".estimate-coupon__modal--wrapper")
      .classList.add("open");
});
const couponModalButton = document.querySelector(
    ".coupon-modal__button--button"
);
const couponList = document.querySelectorAll('.coupon-radio');
for(let i = 0; i < couponList.length; i++){
  couponList[i].addEventListener('click', (e) =>{
    if(e.target.classList.contains('selected')){
      e.target.checked = false;
      e.target.classList.remove('selected');
    }
    else{
      reset();
      e.target.classList.add('selected');
    }
  })
}

const reset = () => {
  for (let i = 0; i < couponList.length; i++) {
    couponList[i].classList.remove('selected');
  }
};

couponModalButton.addEventListener("click", () => {
  const couponinput = document.querySelectorAll(".coupon-radio");
  let couponValue = 0;
  for (const input of couponinput) {
    if (input.checked) {
      couponValue = input.value;
      const sale = input.parentNode.parentElement.childNodes[5].textContent;
      const couponName =
          input.parentNode.parentElement.childNodes[3].textContent;
      const couponNameEl = document.querySelector(".coupon-name");
      couponNameEl.innerHTML = "";
      couponNameEl.textContent = `${sale} ${couponName}`;
      break;
    }
    else{
      const couponNameEl = document.querySelector(".coupon-name");
      couponNameEl.innerHTML = "";
      couponNameEl.textContent = "";
    }
  }
  document
      .querySelector(".estimate-coupon__modal--wrapper")
      .classList.remove("open");
  const regex = /[^0-9]/g;
  const totalPriceEl = document.querySelector(".order-form__total-price");
  const totalPaymentEl = document.querySelector(".order-form__total-payment");
  const totalPrice = parseInt(totalPriceEl.innerHTML.replace(regex, ""));
  const salePrice = Math.ceil(totalPrice - (totalPrice / 100) * couponValue);
  totalPaymentEl.innerHTML = (salePrice + 2500).toLocaleString() + " 원";
});

const orderFormButton = document.querySelector(".order-form__button");
orderFormButton.addEventListener("click", async () => {
  const regex = /[^0-9]/g;
  const NAME_EL = document.querySelector(".info-name");
  const NAME = NAME_EL.value;
  const PHONE_EL = document.querySelector(".info-phone");
  const PHONE = PHONE_EL.value;
  const ADDRESS_EL = document.querySelector(".info-adress");
  const ADDRESS = ADDRESS_EL.value;
  const REQUEST_EL = document.querySelector(".info-request");
  const REQUEST = REQUEST_EL.value;
  const coupon = document.querySelectorAll(".coupon-radio");
  const pay_check = document.querySelectorAll(".payment-info");
  let CP_IDX;
  for (const couponChecked of coupon) {
    if (couponChecked.checked) {
      CP_IDX = couponChecked.dataset.cpidx;
    }
  }
  console.log(CP_IDX);
  const TOTAL_PRICE_EL = document.querySelector(
      ".order-form__total-payment"
  ).innerHTML;
  const TOTAL_PRICE = parseInt(TOTAL_PRICE_EL.replace(regex, ""));
  console.log(TOTAL_PRICE);
  let PAY_TYPE = "";
  for (const payCheckEl of pay_check) {
    if (payCheckEl.checked) {
      PAY_TYPE = payCheckEl.value;
    }
  }
  console.log(PAY_TYPE);
  const data = {
    info: {},
    pro: [],
  };
  data.info = { NAME, PHONE, ADDRESS, REQUEST, CP_IDX, TOTAL_PRICE, PAY_TYPE };
  const proEl = document.querySelectorAll(".order-form__pro-idx");
  for (const product of proEl) {
    data.pro.push({
      PRO_IDX: product.dataset.idx,
      AMOUNT: product.dataset.amount,
    });
  }

  console.log(data);
  const jsonData = JSON.stringify(data);
  console.log(jsonData);
  try {
    const res = await axios.post("/pro/order", jsonData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    alert("주문이 완료되었습니다.");
    window.location.href = "/mypage/myOrder";
  } catch (err) {
    console.error(err);
  }
});
