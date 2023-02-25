const proGroupSelect = document.querySelector("#pro-group");
const proCategories = document.querySelector(".pro-detail__catefory");
const proAddButton = document.querySelector(".pro-detail-submit");
const updateForm = document.querySelector('.pro-detail__form');

let totalSubImage;

$(".disable").css("display", "none");
const categories = {
  PC: ["GAMING", "OFFICE", "WORKSTATION"],
  STUFF: ["CPU", "RAM", "GPU", "SSD", "COOLER", "BOARD", "POWER", "CASE"],
};

const stuffDetail = {
  CPU: [
    ["INTEL", "AMD"],
    ["i3", "i5", "i7", "i9", "RYZEN3", "RYZEN5", "RYZEN7", "RYZEN9"],
    ["2코어", "4코어", "6코어", "8코어"],
    ["4쓰레드", "8쓰레드", "16쓰레드", "32쓰레드"],
  ],
  RAM: [
    ["삼성", "G.SKILL", "GEIL"],
    ["DDR3", "DDR4"],
    ["2666MHz", "3000MHz", "3200MHz"],
    ["4GB", "8GB", "16GB"],
  ],
  BOARD: [
    ["ASUS", "MSI", "GIGABYTE"],
    ["INTEL", "AMD"],
    ["Z690", "H670", "B660", "X570", "B550", "A520"],
    ["ATX", "M-ATX"],
  ],
  GPU: [
    ["MSI", "ASUS", "GALAXY", "GIGABYTE"],
    ["NVDIA", "AMD"],
    ["RTX 30", "RTX 20", "GTX 16"],
    ["RTX 3090", "RTX 3080", "RTX 3070", "GTX 1660", "GTX 1650"],
  ],
  SSD: [
    ["삼성", "마이크론", "WD"],
    ["2.5형", "M.2"],
    ["SATA3", "PCle4.0", "PCle3.0"],
    ["128GB", "256GB", "500GB", "1TB"],
  ],
  COOLER: [
    ["DEEPCOOL", "NZXT", "darkFlash"],
    ["CPU 쿨러", "시스템 쿨러"],
    ["공랭", "수랭"],
    ["3열", "2열"],
  ],
  POWER: [
    ["시소닉", "마이크로닉스", "잘만"],
    ["ATX", "M-ATX"],
    ["500W", "700W", "1000W"],
    ["티타늄", "플레티넘", "골드", "실버"],
  ],
  CASE: [
    ["앱코", "darkFlash", "마이크로닉스", "3RSYS"],
    ["ATX", "M-ATX", "미니ITX"],
    ["빅타워", "미들타워"],
    ["ATX", "M-ATX", "ITX"],
  ],
};

const makeCategoryClass = (item, index) => {
  const proDetailItem = document.createElement("div");
  proDetailItem.classList.add("pro-detail__item");
  const proCategoryLabel = document.createElement("label");
  proCategoryLabel.classList.add("pro-category");
  proCategoryLabel.innerHTML = "상품 분류";
  const essentialCheck = document.createElement("span");
  essentialCheck.classList.add("essential-check");
  essentialCheck.innerHTML = "*";
  proCategoryLabel.appendChild(essentialCheck);
  proDetailItem.appendChild(proCategoryLabel);
  const selectGroupClass = document.createElement("div");
  selectGroupClass.classList.add("select-group");
  const selectGroupSelect = document.createElement("select");
  selectGroupSelect.classList.add("form-select");
  selectGroupSelect.classList.add("pro-detail__category");
  selectGroupSelect.name = `DETAIL${index + 1}`;
  const selectGroupSelectIcon = document.createElement("i");
  selectGroupSelectIcon.classList.add("bi");
  selectGroupSelectIcon.classList.add("bi-caret-down-fill");
  selectGroupClass.appendChild(selectGroupSelect);
  selectGroupClass.appendChild(selectGroupSelectIcon);
  proDetailItem.appendChild(selectGroupClass);
  const proDetailWrapper = document.querySelector(".pro-detail__form-category");
  proDetailWrapper.appendChild(proDetailItem);
  item.map((item) => {
    const selectOption = document.createElement("option");
    selectOption.setAttribute("value", item);
    selectOption.innerHTML = item;
    selectGroupSelect.appendChild(selectOption);
  });
  console.log(item);
};

const fn1 = (value) => {
  const value2 = value;
  localStorage.removeItem("stuffDetailItem");
  localStorage.setItem("stuffDetailItem", JSON.stringify(stuffDetail[value2]));
};

proCategories.addEventListener("change", (e) => {
  fn1(e.target.value);
  let value = proGroupSelect.value;
  if (value === "STUFF") {
    const proDetailWrapper = document.querySelector(
        ".pro-detail__form-category"
    );
    proDetailWrapper.innerHTML = "";
    for (let i = 0; i < 4; i++) {
      const localItem = JSON.parse(localStorage.getItem("stuffDetailItem"));
      makeCategoryClass(localItem[i], i);
    }
  }
});

const onChangeGroup = (detail = "CPU") => {
  let value = proGroupSelect.value;
  if (value === "PC") {
    proCategories.innerHTML = "";
    categories.PC.map((category) => {
      let selectOption = document.createElement("option");
      selectOption.setAttribute("value", category);
      selectOption.innerHTML = category;
      proCategories.appendChild(selectOption);
      const proDetailWrapper = document.querySelector(
          ".pro-detail__form-category"
      );
      proDetailWrapper.innerHTML = "";
    });
  } else if (value === "STUFF") {
    proCategories.innerHTML = "";
    categories.STUFF.map((category) => {
      let selectOption = document.createElement("option");
      selectOption.setAttribute("value", category);
      selectOption.innerHTML = category;
      proCategories.appendChild(selectOption);
    });

    for (let i = 0; i < 4; i++) {
      console.log(detail);
      localStorage.removeItem("stuffDetailItem");
      localStorage.setItem(
          "stuffDetailItem",
          JSON.stringify(stuffDetail[detail])
      );
      const localItem = JSON.parse(localStorage.getItem("stuffDetailItem"));
      makeCategoryClass(localItem[i], i);
    }
  }
};

proGroupSelect.addEventListener("change", () => onChangeGroup());

const onClickAddButton = () => {
  console.log("add");
  // 상품 추가 ajax 요청
};
proAddButton.addEventListener("click", onClickAddButton);

// 버튼 active 검사

const proName = document.querySelector("#pro-name");
const proStock = document.querySelector("#pro-stock");
const proPrice = document.querySelector("#pro-price");

let nameValue = "";
let mainImageValue = 0;
let stockValue = "";
let priceValue = "";

proName.addEventListener("input", (e) => {
  nameValue = e.target.value;
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
  console.log(nameValue, mainImageValue, stockValue, priceValue);
  if (
      nameValue !== "" &&
      mainImageValue !== 0 &&
      stockValue !== "" &&
      priceValue !== ""
  ) {
    proAddButton.disabled = false;
  } else {
    proAddButton.disabled = false;
  }
};

const getUpdate = async () => {
  const proName = document.getElementById("pro-name");
  const PRO_IDX = proName.dataset.idx;
  console.log(PRO_IDX);
  const res = await axios.get("/admin/pro/update/data/" + PRO_IDX, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = res.data;
  const nameEl = document.querySelector("#pro-name");
  nameEl.value = data.proInfo.NAME;
  nameValue = data.proInfo.NAME;
  const stockEl = document.querySelector("#pro-stock");
  stockEl.value = data.proInfo.STOCK;
  stockValue = data.proInfo.STOCK;
  stockEl.name = "STOCK";
  const priceEl = document.querySelector("#pro-price");
  priceEl.value = data.proInfo.PRICE;
  priceValue = data.proInfo.PRICE;
  priceEl.name = "PRICE";
  const renderMainImage = (data) => {
    const mainImageWrapper = document.querySelector(
        ".pro-main__image--wrapper"
    );
    const mainImageItem = document.createElement("div");
    mainImageItem.classList.add("pro-main__image--wrapper-item");
    const mainImageLabel = document.createElement("span");
    const image = document.createElement("img");
    image.src = `/uploadImg/${data.proInfo.MAIN_IMG}`;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.classList.add("main-image__input");
    input.name = `main_img`;
    mainImageLabel.appendChild(image);
    mainImageItem.appendChild(mainImageLabel);
    mainImageItem.appendChild(input);
    mainImageWrapper.appendChild(mainImageItem);
    mainImageValue = 1;
    mainImageLabel.addEventListener("click", () => {
      input.click();
    });
    input.addEventListener("change", (e) => {
      if (e.target.files[0] === undefined) {
        mainImageLabel.textContent = "+";
      } else if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();

        reader.onload = (e) => {
          image.src = e.target.result;
          mainImageLabel.innerHTML = "";
          mainImageLabel.appendChild(image);
        };
        mainImageValue = 1;
        buttonActive();

        reader.readAsDataURL(input.files[0]);
      }
    });
    //메인사진을 수정하지 않았을때 원래 기본값을 가지고 감!
    const mainImg = document.createElement('input');
    mainImg.type = "hidden";
    mainImg.name = "MAIN_IMG";
    mainImg.value = data.proInfo.MAIN_IMG;
    updateForm.appendChild(mainImg);

    const originalImg = document.createElement('input');
    originalImg.type = "hidden";
    originalImg.name = "ORIGINAL_NAME";
    originalImg.value = data.proInfo.ORIGINAL_NAME;
    updateForm.appendChild(originalImg);

  };
  renderMainImage(data);
/*여기서부터가 서브사진 그려주는 곳*/
  const subImageWrapper = document.querySelector(".pro-sub__image--wrapper");
  const renderSubImageBlock = (imageURL, imageIdx, index) => {

    const subImageItem = document.createElement("div");
    subImageItem.classList.add("pro-sub__image--wrapper-item");
    const subImageLabel = document.createElement("span");
    if (imageURL === "add") {
      subImageLabel.textContent = "+";
    } else {
      const image = document.createElement("img");
      image.src = `/uploadImg/${imageURL}`;
      subImageLabel.appendChild(image);
    }
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.classList.add("sub-image__input");
    input.name = `sub_img_${index}`;
    subImageItem.appendChild(subImageLabel);
    subImageItem.appendChild(input);
    subImageWrapper.appendChild(subImageItem);
    subImageLabel.addEventListener("click", () => {
      input.click();
    });
    input.addEventListener("change", (e) => {
      if (e.target.files[0] === undefined) {
        subImageWrapper.removeChild(subImageItem);
      } else if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const image = document.createElement("img");
          image.src = e.target.result;
          subImageLabel.innerHTML = "";
          subImageLabel.appendChild(image);
        };
        buttonActive();
        reader.readAsDataURL(input.files[0]);
      }
    });
    //sub image들의 index 값들
    const subImage = document.createElement('input');
    subImage.type = 'hidden';
    subImage.name = `img_${index}`;
    subImage.value = imageIdx;

    updateForm.appendChild(subImage);

  };

  data.proImage.map((item, index) => {
    renderSubImageBlock(item.STORED_NAME, item.IMG_IDX, index);
  });

  const subAddButton = document.querySelector(".pro-sub__image-button");
  subAddButton.addEventListener("click", () => {
    const subImageIndex = document.querySelectorAll(
        ".pro-sub__image--wrapper-item"
    );

    console.log(subImageIndex.length);
    totalSubImage = subImageIndex.length - 1;
    totalSubImage++;
    renderSubImageBlock("add", null, totalSubImage);
  });
  if (data.proInfo.PRO_GROUP === "STUFF") {
    // 나중에 axios요청 데이터로 변경
    proGroupSelect.value = "STUFF";
    onChangeGroup(data.proInfo.CATEGORY);
    const proCategory = document.getElementById("pro-category");
    for (const category of proCategory.options) {
      if (category.value === data.proInfo.CATEGORY) {
        category.selected = true;
      }
    }
    const productDetailCategory = document.querySelectorAll(
        ".pro-detail__category"
    );
    for (let i = 0; i < productDetailCategory.length; i++) {
      switch (i) {
        case 0:
          for (const category of productDetailCategory[i].options) {
            if (category.value === data.stuffDetail.DETAIL1) {
              category.selected = true;
            }
          }
          break;
        case 1:
          for (const category of productDetailCategory[i].options) {
            if (category.value === data.stuffDetail.DETAIL2) {
              category.selected = true;
            }
          }
          break;
        case 2:
          for (const category of productDetailCategory[i].options) {
            if (category.value === data.stuffDetail.DETAIL3) {
              category.selected = true;
            }
          }
          break;
        case 3:
          for (const category of productDetailCategory[i].options) {
            if (category.value === data.stuffDetail.DETAIL4) {
              category.selected = true;
            }
          }
          break;
      }
    }
  } else if (data.proInfo.PRO_GROUP === "PC") {
    const proCategory = document.getElementById("pro-category");
    proGroupSelect.value = "PC";
    for (const category of proCategory.options) {
      console.log(category);
      if (category.value === data.proInfo.CATEGORY) {
        category.selected = true;
      }
    }
  }
};

window.addEventListener("load", () => {
  getUpdate();
  buttonActive();
});
