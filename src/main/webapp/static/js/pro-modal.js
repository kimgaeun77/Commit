const proModalOpen = document.querySelectorAll(".pro-detail__name");
const proModalClose = document.querySelector(".pro-modal__close");
const proModalBox = document.querySelector(".pro-modal-box ");
const proGroupSelect = document.querySelector("#pro-group");
const proCategories = document.querySelector(".pro-detail__catefory");
const proAddButton = document.querySelector(".pro-detail-submit");

const categories = {
  pc: ["GAMING", "OFFICE", "WORKSTATION"],
  stuff: ["CPU", "RAM", "GPU", "SSD", "쿨러", "보드", "파워", "케이스"],
};

for (let i = 0; i < proModalOpen.length; i++) {
  proModalOpen[i].addEventListener("click", () => {
    proModalBox.classList.add("open");
  });
}

proModalClose.addEventListener("click", () => {
  proModalBox.classList.remove("open");
});

const onChangeGroup = () => {
  let value = proGroupSelect.value;
  if (value === "pc") {
    proCategories.innerHTML = "";
    categories.pc.map((category) => {
      let selectOption = document.createElement("option");
      selectOption.setAttribute("value", category);
      selectOption.innerHTML = category;
      proCategories.appendChild(selectOption);
    });
  } else if (value === "stuff") {
    proCategories.innerHTML = "";
    categories.stuff.map((category) => {
      let selectOption = document.createElement("option");
      selectOption.setAttribute("value", category);
      selectOption.innerHTML = category;
      proCategories.appendChild(selectOption);
    });
  }
};

proGroupSelect.addEventListener("change", onChangeGroup);

const onClickAddButton = () => {
  console.log("add");
  // 상품 추가 ajax 요청
  proModalBox.classList.remove("open");
};
proAddButton.addEventListener("click", onClickAddButton);

// 버튼 active 검사

const proName = document.querySelector("#pro-name");
const proStock = document.querySelector("#pro-stock");
const proMainImage = document.querySelector("#pro-main-image");
const proPrice = document.querySelector("#pro-price");

let nameValue = "";
let mainImageValue = 0;
let stockValue = "";
let priceValue = "";

proName.addEventListener("input", (e) => {
  nameValue = e.target.value;
  buttonActive();
});

proMainImage.addEventListener("input", (e) => {
  mainImageValue = e.target.files.length;
  buttonActive();
});

proStock.addEventListener("input", (e) => {
  stockValue = e.target.value;
  buttonActive();
});

proPrice.addEventListener("input", (e) => {
  priceValue = e.target.value;
  buttonActive();
});

const buttonActive = () => {
  if (
      nameValue !== "" &&
      mainImageValue !== 0 &&
      stockValue !== "" &&
      priceValue !== ""
  ) {
    proAddButton.disabled = false;
  } else {
    proAddButton.disabled = true;
  }
};
