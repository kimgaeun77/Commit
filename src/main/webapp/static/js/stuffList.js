let currentCategory = "전체보기";
let currnetSort = "PRO_IDX";
let currentPage = 1;
let onSearch = false;
let searchList = [];

const renderData = async () => {
  const res = await axios.post("/pro/list/data", {
    PRO_GROUP: "STUFF",
  });
  const stuffList = res.data;
  const renderPageItem = (list) => {
    const partItemsList = document.querySelectorAll(".part-items");
    for (let i = 0; i < partItemsList.length; i++) {
      partItemsList[i].innerHTML = "";
      if (i === 0) {
        const sliceList = list.slice(0, 3);
        sliceList.map((item) => {
          const partItem = document.createElement("a");
          partItem.classList.add("part-item");
          partItem.href = `/pro/detail?PRO_IDX=${item.PRO_IDX}`;
          const partItemImage = document.createElement("div");
          partItemImage.classList.add("part-item__image");
          partItem.appendChild(partItemImage);
          const partImg = document.createElement("img");
          partImg.setAttribute("src", "/uploadImg/" + item.MAIN_IMG);
          partItemImage.appendChild(partImg);
          const partItemInfo = document.createElement("div");
          partItemInfo.classList.add("part-item__info");
          const partItemInfoP = document.createElement("p");
          partItemInfoP.innerHTML = `[${item.CATEGORY}]`;
          const partItemInfoTitle = document.createElement("h1");
          partItemInfoTitle.innerHTML = `${item.NAME}`;
          const partItemInfoSpan = document.createElement("span");
          partItemInfoSpan.innerHTML = `${item.PRICE.toLocaleString()} 원`;
          partItemInfo.appendChild(partItemInfoP);
          partItemInfo.appendChild(partItemInfoTitle);
          partItemInfo.appendChild(partItemInfoSpan);
          partItem.appendChild(partItemInfo);
          partItemsList[i].appendChild(partItem);
        });
      }
      if (i === 1) {
        const sliceList = list.slice(3, 6);
        sliceList.map((item) => {
          const partItem = document.createElement("a");
          partItem.classList.add("part-item");
          partItem.href = `/pro/detail?PRO_IDX=${item.PRO_IDX}`;
          const partItemImage = document.createElement("div");
          partItemImage.classList.add("part-item__image");
          partItem.appendChild(partItemImage);
          const partImg = document.createElement("img");
          partImg.setAttribute("src", "/uploadImg/" + item.MAIN_IMG);
          partItemImage.appendChild(partImg);
          const partItemInfo = document.createElement("div");
          partItemInfo.classList.add("part-item__info");
          const partItemInfoP = document.createElement("p");
          partItemInfoP.innerHTML = `[${item.CATEGORY}]`;
          const partItemInfoTitle = document.createElement("h1");
          partItemInfoTitle.innerHTML = `${item.NAME}`;
          const partItemInfoSpan = document.createElement("span");
          partItemInfoSpan.innerHTML = `${item.PRICE.toLocaleString()} 원`;
          partItemInfo.appendChild(partItemInfoP);
          partItemInfo.appendChild(partItemInfoTitle);
          partItemInfo.appendChild(partItemInfoSpan);
          partItem.appendChild(partItemInfo);
          partItemsList[i].appendChild(partItem);
        });
      }
      if (i === 2) {
        const sliceList = list.slice(6, 9);
        sliceList.map((item) => {
          const partItem = document.createElement("a");
          partItem.classList.add("part-item");
          partItem.href = `/pro/detail?PRO_IDX=${item.PRO_IDX}`;
          const partItemImage = document.createElement("div");
          partItemImage.classList.add("part-item__image");
          partItem.appendChild(partItemImage);
          const partImg = document.createElement("img");
          partImg.setAttribute("src", "/uploadImg/" + item.MAIN_IMG);
          partItemImage.appendChild(partImg);
          const partItemInfo = document.createElement("div");
          partItemInfo.classList.add("part-item__info");
          const partItemInfoP = document.createElement("p");
          partItemInfoP.innerHTML = `[${item.CATEGORY}]`;
          const partItemInfoTitle = document.createElement("h1");
          partItemInfoTitle.innerHTML = `${item.NAME}`;
          const partItemInfoSpan = document.createElement("span");
          partItemInfoSpan.innerHTML = `${item.PRICE.toLocaleString()} 원`;
          partItemInfo.appendChild(partItemInfoP);
          partItemInfo.appendChild(partItemInfoTitle);
          partItemInfo.appendChild(partItemInfoSpan);
          partItem.appendChild(partItemInfo);
          partItemsList[i].appendChild(partItem);
        });
      }
    }
  };

  const slicePageItems = (list) => {
    if (currentPage === 1) {
      console.log(currentPage);
      const sliceList = list.slice(0, 9);
      return sliceList;
    } else {
      console.log(currentPage);
      const sliceList = list.slice((currentPage - 1) * 9, currentPage * 9);
      return sliceList;
    }
  };

  const renderPage = (category, list) => {
    const stuffItem = list;
    if (currentCategory === "전체보기" && currnetSort === "PRO_IDX") {
      const categoryList = [...stuffItem];
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", JSON.stringify(categoryList));
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
      console.log(categoryList);
    }

    if (currentCategory === "전체보기" && currnetSort === "ORDER_CNT") {
      const categoryList = [...stuffItem].sort(
          (a, b) => b.ORDER_CNT - a.ORDER_CNT
      );
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", JSON.stringify(categoryList));
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
    }

    if (currentCategory === "전체보기" && currnetSort === "LOW_PRICE") {
      const categoryList = [...stuffItem].sort((a, b) => a.PRICE - b.PRICE);
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", JSON.stringify(categoryList));
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
    }

    if (currentCategory === "전체보기" && currnetSort === "PRICE") {
      const categoryList = [...stuffItem].sort((a, b) => b.PRICE - a.PRICE);
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", JSON.stringify(categoryList));
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
    }
    if (currentCategory === "CPU" && currnetSort === "PRO_IDX") {
      const categoryList = [...stuffItem].filter(
          (item) => item.CATEGORY === "CPU"
      );
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", JSON.stringify(categoryList));
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
    }
    if (currentCategory === "CPU" && currnetSort === "ORDER_CNT") {
      const categoryList = stuffItem
          .filter((item) => item.CATEGORY === "CPU")
          .sort((a, b) => b.ORDER_CNT - a.ORDER_CNT);
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", categoryList);
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
    }
    if (currentCategory === "CPU" && currnetSort === "LOW_PRICE") {
      const categoryList = stuffItem
          .filter((item) => item.CATEGORY === "CPU")
          .sort((a, b) => a.PRICE - b.PRICE);
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", categoryList);
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
    }
    if (currentCategory === "CPU" && currnetSort === "PRICE") {
      const categoryList = stuffItem
          .filter((item) => item.CATEGORY === "CPU")
          .sort((a, b) => b.PRICE - a.PRICE);
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", categoryList);
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
    }
    if (category === "RAM" && currnetSort === "PRO_IDX") {
      const categoryList = stuffItem.filter((item) => item.CATEGORY === "RAM");
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", categoryList);
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
    }
    if (category === "RAM" && currnetSort === "ORDER_CNT") {
      const categoryList = stuffItem
          .filter((item) => item.CATEGORY === "RAM")
          .sort((a, b) => b.ORDER_CNT - a.ORDER_CNT);
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", categoryList);
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
    }
    if (category === "RAM" && currnetSort === "LOW_PRICE") {
      const categoryList = stuffItem
          .filter((item) => item.CATEGORY === "RAM")
          .sort((a, b) => a.PRICE - b.PRICE);
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", categoryList);
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
    }
    if (category === "RAM" && currnetSort === "PRICE") {
      const categoryList = stuffItem
          .filter((item) => item.CATEGORY === "RAM")
          .sort((a, b) => b.PRICE - a.PRICE);
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", categoryList);
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
    }
    if (category === "GPU" && currnetSort === "PRO_IDX") {
      const categoryList = stuffItem.filter((item) => item.CATEGORY === "GPU");
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", categoryList);
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
    }
    if (category === "GPU" && currnetSort === "ORDER_CNT") {
      const categoryList = stuffItem
          .filter((item) => item.CATEGORY === "GPU")
          .sort((a, b) => b.ORDER_CNT - a.ORDER_CNT);
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", categoryList);
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
    }
    if (category === "GPU" && currnetSort === "LOW_PRICE") {
      const categoryList = stuffItem
          .filter((item) => item.CATEGORY === "GPU")
          .sort((a, b) => a.PRICE - b.PRICE);
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", categoryList);
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
    }
    if (category === "GPU" && currnetSort === "PRICE") {
      const categoryList = stuffItem
          .filter((item) => item.CATEGORY === "GPU")
          .sort((a, b) => b.PRICE - a.PRICE);
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", categoryList);
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
    }

    if (category === "SSD" && currnetSort === "PRO_IDX") {
      const categoryList = stuffItem.filter((item) => item.CATEGORY === "SSD");
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", categoryList);
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
    }
    if (category === "SSD" && currnetSort === "ORDER_CNT") {
      const categoryList = stuffItem
          .filter((item) => item.CATEGORY === "SSD")
          .sort((a, b) => b.ORDER_CNT - a.ORDER_CNT);
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", categoryList);
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
    }
    if (category === "SSD" && currnetSort === "LOW_PRICE") {
      const categoryList = stuffItem
          .filter((item) => item.CATEGORY === "SSD")
          .sort((a, b) => a.PRICE - b.PRICE);
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", categoryList);
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
    }
    if (category === "SSD" && currnetSort === "PRICE") {
      const categoryList = stuffItem.filter((item) => item.CATEGORY === "SSD");
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", categoryList);
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
    }
    if (category === "쿨러" && currnetSort === "PRO_IDX") {
      const categoryList = stuffItem.filter(
          (item) => item.CATEGORY === "COOLER"
      );
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", categoryList);
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
    }
    if (category === "쿨러" && currnetSort === "ORDER_CNT") {
      const categoryList = stuffItem
          .filter((item) => item.CATEGORY === "COOLER")
          .sort((a, b) => b.ORDER_CNT - a.ORDER_CNT);
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", categoryList);
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
    }
    if (category === "쿨러" && currnetSort === "LOW_PRICE") {
      const categoryList = stuffItem
          .filter((item) => item.CATEGORY === "COOLER")
          .sort((a, b) => a.PRICE - b.PRICE);
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", categoryList);
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
    }
    if (category === "쿨러" && currnetSort === "PRICE") {
      const categoryList = stuffItem
          .filter((item) => item.CATEGORY === "COOLER")
          .sort((a, b) => b.PRICE - a.PRICE);
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", categoryList);
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
    }
    if (category === "보드" && currnetSort === "PRO_IDX") {
      const categoryList = stuffItem.filter(
          (item) => item.CATEGORY === "BOARD"
      );
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", categoryList);
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
    }
    if (category === "보드" && currnetSort === "ORDER_CNT") {
      const categoryList = stuffItem
          .filter((item) => item.CATEGORY === "BOARD")
          .sort((a, b) => b.ORDER_CNT - a.ORDER_CNT);
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", categoryList);
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
    }
    if (category === "보드" && currnetSort === "LOW_PRICE") {
      const categoryList = stuffItem
          .filter((item) => item.CATEGORY === "BOARD")
          .sort((a, b) => a.PRICE - b.PRICE);
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", categoryList);
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
    }
    if (category === "보드" && currnetSort === "PRICE") {
      const categoryList = stuffItem
          .filter((item) => item.CATEGORY === "BOARD")
          .sort((a, b) => b.PRICE - a.PRICE);
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", categoryList);
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
    }
    if (category === "파워" && currnetSort === "PRO_IDX") {
      const categoryList = stuffItem.filter(
          (item) => item.CATEGORY === "POWER"
      );
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", categoryList);
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
    }
    if (category === "파워" && currnetSort === "ORDER_CNT") {
      const categoryList = stuffItem
          .filter((item) => item.CATEGORY === "POWER")
          .sort((a, b) => b.ORDER_CNT - a.ORDER_CNT);
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", categoryList);
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
    }
    if (category === "파워" && currnetSort === "LOW_PRICE") {
      const categoryList = stuffItem
          .filter((item) => item.CATEGORY === "POWER")
          .sort((a, b) => a.PRICE - b.PRICE);
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", categoryList);
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
    }
    if (category === "파워" && currnetSort === "PRICE") {
      const categoryList = stuffItem
          .filter((item) => item.CATEGORY === "POWER")
          .sort((a, b) => b.PRICE - a.PRICE);
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", categoryList);
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
    }

    if (category === "케이스" && currnetSort === "PRO_IDX") {
      const categoryList = stuffItem.filter((item) => item.CATEGORY === "CASE");
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", categoryList);
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
    }
    if (category === "케이스" && currnetSort === "ORDER_CNT") {
      const categoryList = stuffItem
          .filter((item) => item.CATEGORY === "CASE")
          .sort((a, b) => b.ORDER_CNT - a.ORDER_CNT);
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", categoryList);
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
    }
    if (category === "케이스" && currnetSort === "LOW_PRICE") {
      const categoryList = stuffItem
          .filter((item) => item.CATEGORY === "CASE")
          .sort((a, b) => a.PRICE - b.PRICE);
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", categoryList);
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
    }
    if (category === "케이스" && currnetSort === "PRICE") {
      const categoryList = stuffItem
          .filter((item) => item.CATEGORY === "CASE")
          .sort((a, b) => b.PRICE - a.PRICE);
      localStorage.removeItem("stuffList");
      localStorage.setItem("stuffList", categoryList);
      const sliceList = slicePageItems(categoryList);
      renderPageItem(sliceList);
      renderPageBlock(categoryList);
    } else {
      return;
    }
  };

  const category = document.querySelectorAll(".category-select__item");

  for (const categoryItem of category) {
    categoryItem.addEventListener("click", (e) => {
      for (let i = 0; i < category.length; i++) {
        category[i].classList.remove("is-active");
      }
      e.target.classList.add("is-active");
      currentCategory = e.target.innerHTML;
      currnetSort = "PRO_IDX";
      currentPage = 1;
      sortCategory.options[0].selected = true;
      renderPage(currentCategory, [...stuffList]);
    });
  }

  const sortCategory = document.querySelector(".stuff-sort__category");

  const onClickSort = (e) => {
    currnetSort = e.target.value;
    if (onSearch) {
      currentPage = 1;
      renderPage(currentCategory, [...searchList]);
    }
    if (!onSearch) {
      currentPage = 1;
      renderPage(currentCategory, [...stuffList]);
    }
  };

  const stuffListSearchButton = document.querySelector(".stuff-search__button");
  const onClickSearch = () => {
    const stuffListSearchInput = document.querySelector(".select-input");
    const stuffListSort = document.querySelector(".input-group-select");
    const searchSelected = stuffListSort.options.selectedIndex;
    const inputValue = stuffListSearchInput.value.toUpperCase();//소문자로 입력해도 대문자로 변환
    if (searchSelected === 0 && inputValue !== "") {
      const stuffListSearch = [...stuffList].filter((item) =>{
            const upperName = item.NAME.toUpperCase();
            return upperName.includes(inputValue);
      }
      );
      searchList = stuffListSearch;
      onSearch = true;
      stuffListSearchInput.value = "";
      currentPage = 1;
      renderPage(currentCategory, stuffListSearch);
    }
    if (searchSelected === 1 && inputValue !== "") {
      const stuffListSearch = [...stuffList].filter((item) =>
          item.PRO_IDX.toString().includes(inputValue)
      );
      searchList = stuffListSearch;
      onSearch = true;
      stuffListSearchInput.value = "";
      currentPage = 1;
      renderPage(currentCategory, stuffListSearch);
    }
  };

  stuffListSearchButton.addEventListener("click", onClickSearch);
  sortCategory.addEventListener("change", (e) => onClickSort(e));

  const renderPageBlock = (data) => {
    const pageBlockWrapper = document.querySelector(".page-list");
    pageBlockWrapper.innerHTML = "";
    console.log(data);
    const totalPageItem = Math.ceil(data.length / 9);
    const totalPageBlock = Math.ceil(totalPageItem / 5);
    console.log(totalPageBlock);
    let currentPageBlock = 0;
    currentPage = 1;
    console.log(totalPageBlock, totalPageItem);
    for (let i = 0; i < totalPageItem; i++) {
      const pageItem = document.createElement("li");
      pageItem.classList.add("page-item");
      pageBlockWrapper.appendChild(pageItem);
      if (i === 0) {
        pageItem.classList.add("is-active");
      }
      const pageItemSpan = document.createElement("span");
      pageItemSpan.textContent = i + 1;
      pageItem.appendChild(pageItemSpan);
    }
    const pageItems = document.querySelectorAll(".page-item");
    if (currentPageBlock === 0) {
      pageItems.forEach((v) => {
        v.style.display = "none";
      });
      for (let i = currentPageBlock * 5; i < (currentPageBlock + 1) * 5; i++) {
        if (i < pageItems.length) {
          pageItems[i].style.display = "block";
        }
      }
    }
    for (const pageItem of pageItems) {
      pageItem.addEventListener("click", (e) => {
        for (let i = 0; i < pageItems.length; i++) {
          pageItems[i].classList.remove("is-active");
        }
        currentPage = parseInt(e.target.innerHTML);
        pageItem.classList.add("is-active");
        const sliceList = slicePageItems(data);
        renderPageItem(sliceList);
      });
    }
    const nextButton = document.querySelector(".page-next");
    nextButton.addEventListener("click", () => {
      if (currentPageBlock < totalPageBlock - 1) {
        pageItems.forEach((v) => {
          v.style.display = "none";
          v.classList.remove("is-active");
        });
        currentPageBlock++;
        currentPage = currentPageBlock * 5 + 1;
        const sliceList = slicePageItems(data);
        renderPageItem(sliceList);
        for (
            let i = currentPageBlock * 5;
            i < (currentPageBlock + 1) * 5;
            i++
        ) {
          if (i < pageItems.length) {
            pageItems[i].style.display = "block";
            pageItems[currentPage - 1].classList.add("is-active");
          }
        }
      }
    });
    const prevButton = document.querySelector(".page-prev");
    prevButton.addEventListener("click", () => {
      if (currentPageBlock > 0) {
        pageItems.forEach((v) => {
          v.style.display = "none";
          v.classList.remove("is-active");
        });
        currentPageBlock--;
        currentPage = currentPageBlock * 5 + 1;
        const sliceList = slicePageItems(data);
        renderPageItem(sliceList);
        for (
            let i = currentPageBlock * 5;
            i < (currentPageBlock + 1) * 5;
            i++
        ) {
          if (i < pageItems.length) {
            pageItems[i].style.display = "block";
            pageItems[currentPage - 1].classList.add("is-active");
          }
        }
      }
    });
  };

  const pagenationItem = document.querySelectorAll(".page-item");
  for (const pageItem of pagenationItem) {
    pageItem.addEventListener("click", (e) => {
      if (currentPage !== parseInt(e.target.innerHTML)) {
        currentPage = parseInt(e.target.innerHTML);
        const pageList = JSON.parse(localStorage.getItem("stuffList"));
        renderPage(currentCategory, pageList);

        for (let i = 0; i < pagenationItem.length; i++) {
          pagenationItem[i].classList.remove("is-active");
          pageItem.classList.add("is-active");
        }
      }
    });
  }
  renderPage("전체보기", [...stuffList]);
};

window.addEventListener("load", renderData);
