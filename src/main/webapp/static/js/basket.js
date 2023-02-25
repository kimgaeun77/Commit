const productPlusButton = document.querySelectorAll(".product-add__plus");
const productMinusButton = document.querySelectorAll(".product-add__minus");
const productTotalPrice = document.querySelectorAll(".product-total-price");
const productPrice = document.querySelectorAll(".product-price");
const productQuantity = document.querySelectorAll(".product-quantity");
const basketTotalPrice = document.querySelector(".basket-total-price");
const productName = document.querySelectorAll(".product-name");
const trashButton = document.querySelectorAll(".trash");//장바구니 삭제
const editButton = document.querySelectorAll(".edit");//장바구니 수정
const removeAllButton = document.querySelector(".total-remove");

for (let i = 0; i < editButton.length; i++) {
  editButton[i].addEventListener("click", function (e) {
    const editData = {
      PRO_IDX: productName[i].dataset.value,
      AMOUNT: productQuantity[i].innerHTML,
    };
    //console.log(editData);
    $.ajax({
      type: "post",
      url: "/basket/update",
      data: JSON.stringify(editData),
      contentType: "application/json; charset=utf-8",
      success: function () {
        alert("선택 상품이 수정되었습니다.");
        window.location.reload();
      },
      error: function () {
        alert("선택 상품 수정에 실패하였습니다.");
      },
    });
  });
}

for (let i = 0; i < trashButton.length; i++) {
  trashButton[i].addEventListener("click", function (e) {
    let answer = confirm("삭제하시겠습니까?");
    if (answer === true) {
      const deleteData = { PRO_IDX: productName[i].dataset.value };
      $.ajax({
        type: "post",
        url: "/basket/delete",
        data: JSON.stringify(deleteData),
        contentType: "application/json; charset=utf-8",
        success: function () {
          alert("선택 상품이 삭제되었습니다.");
          window.location.reload();
        },
        error: function () {
          alert("선택 상품 삭제에 실패하였습니다.");
        },
      });
    } else {
      return false;
    }
  });
}

let initialQuantity = 1;

const onClickPlusButton = (i) => {
  let quantity = productQuantity[i].innerHTML;
  quantity++;
  productQuantity[i].innerHTML = quantity;
  calcPrice(i, quantity);
};

const onClickMinusButton = (i) => {
  if (productQuantity[i].innerHTML > 1) {
    let quantity = productQuantity[i].innerHTML;
    quantity--;
    productQuantity[i].innerHTML = quantity;
    calcPrice(i, quantity);
  }
};

const calcPrice = (i, quantity) => {
  const regax = /[^0-9]/g;
  let price = parseInt(productPrice[i].innerHTML.replace(regax, ""));
  let totalPrice = (price * quantity).toLocaleString();
  productTotalPrice[i].innerHTML = `${totalPrice}원`;
  let basketTotal = 0;
  for (let i = 0; i < productTotalPrice.length; i++) {
    basketTotal += parseInt(productTotalPrice[i].innerHTML.replace(regax, ""));
  }
  basketTotalPrice.innerHTML = `${basketTotal.toLocaleString()}원`;
};

for (let i = 0; i < productPlusButton.length; i++) {
  productPlusButton[i].addEventListener("click", () => onClickPlusButton(i));
  productMinusButton[i].addEventListener("click", () => onClickMinusButton(i));
}

console.log(productTotalPrice, productPrice);

const buyButton = document.querySelector(".buy-button");

buyButton.addEventListener("click", () => {
  if (productName.length == 0) {
    return false;
  }

  let data_pro = [];
  let data_amount = [];
  for (let i = 0; i < productName.length; i++) {
    data_pro.push(productName[i].dataset.value);
    data_amount.push(productQuantity[i].innerHTML);
  }
  //console.log(data_pro.join());
  //console.log(data_amount.join());
  sendData("/pro/order", { PRO_IDX: data_pro, AMOUNT: data_amount }, "get"); //상품 주문 폼으로 주문상품번호와, 수량을 전송
});

function sendData(path, parameters, method) {
  const form = document.createElement("form");
  form.method = method;
  form.action = path;
  document.body.appendChild(form);

  for (const key in parameters) {
    const formField = document.createElement("input");
    formField.type = "hidden";
    formField.name = key;
    formField.value = parameters[key];

    form.appendChild(formField);
    console.log(formField);
  }
  form.submit();
}

removeAllButton.addEventListener("click", function () {
  const answer = confirm("장바구니를 비우시겠습니까?");
  console.log(answer);
  if (answer === true) {
    $.ajax({
      url: "/basket/clear",
      success: function () {
        alert("장바구니 비우기가 완료되었습니다.");
        window.location.reload();
      },
      error: function () {
        alert("장바구니 비우기가 실패하였습니다.");
      },
    });
  } else {
    return false;
  }
});
