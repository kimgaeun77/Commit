const couponName = document.querySelector("#coupon-name__name");
const couponDiscount = document.querySelector("#coupon-discount__discount");
const couponMinDate = document.querySelector("#coupon-date__min");
const couponMaxDate = document.querySelector("#coupon-date__max");
const couponAddButton = document.querySelector(".coupon-add__button");

const warning = document.querySelector('.discount_valid');//쿠폰 할인률 valid 확인
let warningState = false;

const ableButton = () => {
    const nameValue = couponName.value;
    const discountValue = couponDiscount.value;
    const minDateValue = couponMinDate.value;
    const maxDateValue = couponMaxDate.value;
    console.log(nameValue, discountValue, minDateValue, maxDateValue);
    if (
        nameValue !== "" &&
        discountValue !== "" &&
        minDateValue !== "" &&
        maxDateValue !== "" &&
        warningState !== true
    ) {
        couponAddButton.disabled = false;
    }else {
        couponAddButton.disabled = true;
    }
};

const inputEvent = (input) => {
    return input.addEventListener("input", () => {
        ableButton();
    });
};
inputEvent(couponName);
//inputEvent(couponDiscount);
inputEvent(couponMinDate);
inputEvent(couponMaxDate);


couponDiscount.addEventListener('input', (e) => {
    const discount = e.target.value;
    console.log(discount);
    if (discount === '') {
        warning.classList.remove('warning');
    } else {
        if (100 < discount || discount <= 0) {
            warning.classList.add('warning');
            warningState = true;
        } else {
            warning.classList.remove('warning');
            warningState = false;
        }
    }
    ableButton();
});
