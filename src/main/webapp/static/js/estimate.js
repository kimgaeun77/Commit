const estimateItem = {
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

let currentItem = "CPU";
const initialEstimateCart = {
  CPU: [],
  RAM: [],
  BOARD: [],
  GPU: [],
  SSD: [],
  COOLER: [],
  POWER: [],
  CASE: [],
};

const loadEstimateHeader = async () => {
  const res = await axios.get("/estimate/data");
  const data = res.data;
  console.log(data);
  const estimateHeaderItem = [...estimateItem[currentItem]];
  const estimateHeaderWrapper = document.querySelector(
      ".estimate-left__header"
  );
  estimateHeaderWrapper.innerHTML = "";
  const estimateHeaderTitle = document.createElement("span");
  estimateHeaderTitle.classList.add("estimate-left__title");
  estimateHeaderTitle.innerHTML = currentItem;
  estimateHeaderWrapper.appendChild(estimateHeaderTitle);
  estimateHeaderItem.map((item, index) => {

    console.log(item);
    console.log(index);

    const estimateLeftItems = document.createElement("div");
    estimateLeftItems.classList.add("estimate-left__items");
    const estimateLeftName = document.createElement("span");
    estimateLeftName.innerHTML = "제조사";
    estimateLeftName.classList.add("estimate-left__name");
    estimateLeftItems.appendChild(estimateLeftName);
    const estiamteLeftWrapper = document.createElement("div");
    estiamteLeftWrapper.classList.add("estimate-left__wrapper");
    estimateLeftItems.appendChild(estiamteLeftWrapper);

    item.map((item, index2) => {
      const inputWrapper = document.createElement("div");
      inputWrapper.classList.add("estimate-left__item-wrapper");
      const inputitem = document.createElement("input");
      inputitem.setAttribute("type", "checkbox");
      inputitem.id = `estimate-left__item${index + 1}-${index2 + 1}`;
      inputitem.classList.add(`estimate-left__item${index + 1}`);
      inputitem.classList.add("check-box");
      inputitem.value = item;

      const inputLabel = document.createElement("label");
      inputLabel.htmlFor = inputitem.id;
      inputLabel.innerHTML = item;
      inputWrapper.appendChild(inputitem);
      inputWrapper.appendChild(inputLabel);
      estiamteLeftWrapper.appendChild(inputWrapper);
    });
    estimateHeaderWrapper.appendChild(estimateLeftItems);
  });
  const estimateLeftName = document.querySelectorAll(".estimate-left__name");
  const estimateLeftNameChange = (category, first, second, third) => {
    if (currentItem === category) {
      estimateLeftName[1].innerHTML = first;
      estimateLeftName[2].innerHTML = second;
      estimateLeftName[3].innerHTML = third;
    }
  };
  estimateLeftNameChange("CPU", "제품명", "코어", "쓰레드");
  estimateLeftNameChange("RAM", "버전", "쿨럭", "메모리 용량");
  estimateLeftNameChange("BOARD", "CPU 종류", "칩셋", "폼팩터");
  estimateLeftNameChange("GPU", "칩셋 제조사", "시리즈", "칩셋");
  estimateLeftNameChange("SSD", "폼팩터", "인터페이스", "용량");
  estimateLeftNameChange("COOLER", "종류", "냉각 방식", "라디에이터");
  estimateLeftNameChange("POWER", "분류", "출력", "80PLUS");
  estimateLeftNameChange("CASE", "분류", "크기", "보드구격");

  for (let i = 0; i < 4; i++) {
    const checkedEvent = document.querySelectorAll(
        `.estimate-left__item${i + 1}`
    );

    const defaultCheck = document.querySelectorAll(
        `#estimate-left__item${i + 1}-1`
    );

    for (const defaultItem of defaultCheck) {
      defaultItem.checked = true;
    }

    for (const checked of checkedEvent) {
      checked.addEventListener("click", (e) => {
        checkedEvent.forEach((v) => {
          v.checked = false;
        });
        e.target.checked = true;
        renderItem(data);
      });
    }
  }
  renderItem(data);
};

const renderItem = (data) => {
  const checkedItems = document.querySelectorAll(".check-box");
  const checkItem = [...checkedItems].filter((checked) => checked.checked);
  const filteredList = [...data].filter(
      (item) => item.CATEGORY === currentItem
  );
  let newList = [...filteredList];
  console.log(newList);
  for (let i = 0; i < checkItem.length; i++) {
    if (i === 0) {
      newList = newList.filter((v) => v.DETAIL1 === checkItem[i].value);
      console.log(checkItem[i].value);
    }
    if (i === 1) {
      newList = newList.filter((v) => v.DETAIL2 === checkItem[i].value);
      console.log(checkItem[i].value);
    }
    if (i === 2) {
      newList = newList.filter((v) => v.DETAIL3 === checkItem[i].value);
      console.log(checkItem[i].value);
    }
    if (i === 3) {
      newList = newList.filter((v) => v.DETAIL4 === checkItem[i].value);
      console.log(checkItem[i].value);
    }
  }
  const estimateLeftPros = document.querySelector(".estimate-left__main");
  estimateLeftPros.innerHTML = "";
  const sliceList = [...newList].slice(0, 7);
  sliceList.map((item) => {
    const estimateLeftPro = document.createElement("div");
    estimateLeftPro.classList.add("estimate-left__item");

    const estimateLeftItemImage = document.createElement("img");
    estimateLeftItemImage.classList.add("estimate-left__item-img");
    estimateLeftItemImage.src = "/uploadImg/" + item.MAIN_IMG;

    //상품 디테일
    const aLink = document.createElement("a");
    aLink.href = "/pro/detail?PRO_IDX=" + item.PRO_IDX;
    aLink.appendChild(estimateLeftItemImage);
    estimateLeftPro.appendChild(aLink);

    const estimateLeftItemTitle = document.createElement("h3");
    estimateLeftItemTitle.classList.add("estimate-left__item-name");
    estimateLeftItemTitle.innerHTML = item.NAME;
    estimateLeftPro.appendChild(estimateLeftItemTitle);

    const estimateLeftItemWrapper = document.createElement("div");
    estimateLeftItemWrapper.classList.add("estimate-left__item-wrapper");
    estimateLeftPro.appendChild(estimateLeftItemWrapper);

    const estimateLeftItemPrice = document.createElement("span");
    estimateLeftItemPrice.classList.add("estimate-left__item-price");
    estimateLeftItemPrice.innerHTML = `${item.PRICE.toLocaleString()} 원`;
    estimateLeftItemWrapper.appendChild(estimateLeftItemPrice);

    const estimateLeftItemButton = document.createElement("button");
    estimateLeftItemButton.classList.add("btn-secondary");
    estimateLeftItemButton.classList.add("estimate-left__item-button");
    estimateLeftItemButton.innerHTML = "담기";
    estimateLeftItemWrapper.appendChild(estimateLeftItemButton);
    estimateLeftPros.appendChild(estimateLeftPro);

    estimateLeftItemButton.addEventListener("click", () => {
      initialEstimateCart[currentItem].push({
        name: item.NAME,
        price: item.PRICE,
        quan: 1,
        idx: item.PRO_IDX,
        category: item.CATEGORY,
      });
      renderCart();
      deleteButton();
    });
  });
  const estimateLeftscrollEvent = document.querySelector(
      ".estimate-left__main"
  );
  estimateLeftscrollEvent.scrollTop = 0;
  let scrollIndex = 1;
  estimateLeftscrollEvent.addEventListener("scroll", () => {
    if (
        estimateLeftscrollEvent.scrollTop +
        estimateLeftscrollEvent.clientHeight >=
        estimateLeftscrollEvent.scrollHeight - 10
    ) {
      scrollIndex++;
      const sliceList = [...newList].slice(
          7 * scrollIndex,
          7 * (scrollIndex * 2)
      );
      sliceList.map((item) => {
        const estimateLeftPro = document.createElement("div");
        estimateLeftPro.classList.add("estimate-left__item");

        const estimateLeftItemImage = document.createElement("img");
        estimateLeftItemImage.classList.add("estimate-left__item-img");
        estimateLeftItemImage.src = item.MAIN_IMG;
        estimateLeftPro.appendChild(estimateLeftItemImage);

        const estimateLeftItemTitle = document.createElement("h3");
        estimateLeftItemTitle.classList.add("estimate-left__item-name");
        estimateLeftItemTitle.innerHTML = item.NAME;
        estimateLeftPro.appendChild(estimateLeftItemTitle);

        const estimateLeftItemWrapper = document.createElement("div");
        estimateLeftItemWrapper.classList.add("estimate-left__item-wrapper");
        estimateLeftPro.appendChild(estimateLeftItemWrapper);

        const estimateLeftItemPrice = document.createElement("span");
        estimateLeftItemPrice.classList.add("estimate-left__item-price");
        estimateLeftItemPrice.innerHTML = `${item.PRICE.toLocaleString()} 원`;
        estimateLeftItemWrapper.appendChild(estimateLeftItemPrice);

        const estimateLeftItemButton = document.createElement("button");
        estimateLeftItemButton.classList.add("btn-secondary");
        estimateLeftItemButton.classList.add("estimate-left__item-button");
        estimateLeftItemButton.innerHTML = "담기";
        estimateLeftItemWrapper.appendChild(estimateLeftItemButton);
        estimateLeftPros.appendChild(estimateLeftPro);

        estimateLeftItemButton.addEventListener("click", () => {
          initialEstimateCart[currentItem].push({
            name: item.NAME,
            price: item.PRICE,
            quan: 1,
            idx: item.PRO_IDX,
            category: item.CATEGORY,
          });
          renderCart();
          deleteButton();
        });
      });
    }
  });
};

const renderCart = () => {
  const cartmenu = document.querySelectorAll(".estiamte-menu");
  for (const menu of cartmenu) {
    menu.innerHTML = "";
  }
  Object.keys(initialEstimateCart).map((key) => {
    initialEstimateCart[key].map((item, index) => {
      console.log(item);
      const cartWrapper = document.querySelector(
          `.estimate-right-${item.category}`
      );
      const estimateRightPro = document.createElement("div");
      estimateRightPro.classList.add("estimate-right__item--pro");
      const estimateRightName = document.createElement("h3");
      estimateRightName.innerHTML = item.name;
      estimateRightPro.appendChild(estimateRightName);
      const estimateRightPrice = document.createElement("p");
      estimateRightPrice.innerHTML = `${item.price.toLocaleString()} 원`;
      estimateRightPro.appendChild(estimateRightPrice);
      cartWrapper.appendChild(estimateRightPro);

      const estimateAddWrapper = document.createElement("div");
      estimateAddWrapper.classList.add("product-add__wrapper");

      const estimateAddMinus = document.createElement("div");
      estimateAddMinus.classList.add("product-add__button");
      estimateAddMinus.classList.add("product-add__minus");
      estimateAddMinus.innerHTML = "-";
      estimateAddWrapper.appendChild(estimateAddMinus);

      const estimateQuan = document.createElement("input");
      estimateQuan.classList.add("product-quantity");
      estimateQuan.value = item.quan;
      estimateQuan.readOnly = true;
      estimateAddWrapper.appendChild(estimateQuan);

      const estimateAddPlus = document.createElement("div");
      estimateAddPlus.classList.add("product-add__button");
      estimateAddPlus.classList.add("product-add__plus");
      estimateAddPlus.innerHTML = "+";
      estimateAddWrapper.appendChild(estimateAddPlus);
      estimateRightPro.appendChild(estimateAddWrapper);

      const estimateDelete = document.createElement("span");
      estimateDelete.classList.add("estimate-right__item--delete");
      estimateDelete.innerHTML = "x";
      estimateRightPro.appendChild(estimateDelete);

      estimateAddMinus.addEventListener("click", () => {
        if (item.quan > 1) {
          item.quan--;
          estimateQuan.value = item.quan;
          totalPrice();
        }
      });

      estimateAddPlus.addEventListener("click", () => {
        item.quan++;
        estimateQuan.value = item.quan;
        totalPrice();
      });
    });
    totalPrice();
  });
};

const totalPrice = () => {
  let totalPrice = 0;
  for (const price in initialEstimateCart) {
    initialEstimateCart[price].map((item) => {
      totalPrice += item.price * item.quan;
    });
  }
  const total = document.querySelector(".estimate-right__price-price");
  total.innerHTML = `${totalPrice.toLocaleString()} 원`;
};

const estimateRightMenu = document.querySelectorAll(
    ".estimate-right__item--menu"
);
for (const menu of estimateRightMenu) {
  menu.addEventListener("click", (e) => {
    currentItem = e.target.innerHTML;
    loadEstimateHeader();
  });
}

const deleteButton = () => {
  const deleteEl = document.querySelectorAll(".estimate-right__item--delete");
  let category = "";
  deleteEl.forEach((v) => {
    v.addEventListener("click", (e) => {
      console.log(e.target);
      const proName = e.target.parentNode.childNodes[0].innerHTML;
      Object.keys(initialEstimateCart).map((key) => {
        initialEstimateCart[key].map((item, index) => {
          if (item.name === proName) {
            initialEstimateCart[key].splice(index, 1);
            category = item.category;
            return;
          }
        });
      });
      renderCart();
      deleteButton();
    });
  });
};

const buyButton = document.querySelector(".estimate-right__price-button");

buyButton.addEventListener("click", () => {
  let pro_idx = [];
  let pro_amount = [];
  console.log(initialEstimateCart);
  console.log(
      Object.keys(initialEstimateCart).map((v) => {
        initialEstimateCart[v];
      })
  );
  Object.keys(initialEstimateCart).map((v) => {
    initialEstimateCart[v].map((item) => {
      pro_idx.push(item.idx);
      pro_amount.push(item.quan);
    });
  });
  const PRO_IDX = pro_idx.join();
  const AMOUNT = pro_amount.join();
  sendData("/pro/order", { PRO_IDX: PRO_IDX, AMOUNT: AMOUNT }, "get");
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
  }
  form.submit();
}

window.addEventListener("load", loadEstimateHeader);
