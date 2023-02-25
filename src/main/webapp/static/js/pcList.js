const pcItems = document.querySelectorAll('.pc__items');

const gamingCategory = document.querySelector('.category-gaming');
const officeCategory = document.querySelector('.category-office');
const workCategory = document.querySelector('.category-work');

const pcListSelect = document.querySelector('.pc-list__select');
const pcListInput = document.querySelector('.pc-list__input');
const pcListSearch = document.querySelector('.pc-list__search');

const sortCategory = document.querySelector('.sort-category');

let onSearch = false;
let searchList = [];

const initialCategory = 'all';
const initialSort = 'PRO_IDX';
let currentCategory = initialCategory;
let currentPage = 1;
let currentSort = initialSort;

const renderList = async () => {
  const res = await axios.post('/pro/list/data', {
    PRO_GROUP: 'PC',
  });
  const pcList = res.data;
  const slicePcList = (list) => {
    if (currentPage === 1) {
      const sliceList = list.slice(currentPage - 1, currentPage + 7);
      return sliceList;
    } else {
      const sliceList = list.slice((currentPage - 1) * 8, currentPage * 8);
      return sliceList;
    }
  };

  const renderItem = (list) => {
    const renderItemList = slicePcList(list);
    const pcPagenation = document.querySelectorAll('.pc-item__page');
    for (let i = 0; i < pcPagenation.length; i++) {
      if (currentPage === 1) {
        pcPagenation[0].classList.add('is-active');
      }
    }
    for (let i = 0; i < pcItems.length; i++) {
      pcItems[i].innerHTML = '';
      if (i === 0) {
        const itemList = renderItemList.slice(0, 4);
        itemList.map((pcListItem) => {
          const aLink = document.createElement('a');
          aLink.href = `/pro/detail?PRO_IDX=${pcListItem.PRO_IDX}`;
          const pcItem = document.createElement('li');
          pcItem.classList.add('pc__item');
          // li
          const pcItemImageWrapper = document.createElement('div');
          const pcItemImage = document.createElement('img');
          pcItemImageWrapper.classList.add('pc__item--image');
          pcItemImage.src = `/uploadImg/${pcListItem.MAIN_IMG}`;
          const circle = document.createElement('div');
          circle.classList.add('circle');
          const circleIcon = document.createElement('span');
          circle.appendChild(circleIcon);
          const circleIconCharge = document.createElement('i');
          circleIconCharge.classList.add('bi');
          circleIconCharge.classList.add('bi-lightning-charge-fill');
          circleIcon.appendChild(circleIconCharge);
          //circle
          const pcItemTitle = document.createElement('span');
          pcItemTitle.classList.add('pc__item--title');
          pcItemTitle.innerHTML = pcListItem.NAME;
          //title
          const pcItemPrice = document.createElement('span');
          pcItemPrice.classList.add('pc__item--price');
          pcItemPrice.innerHTML = `${parseInt(
            pcListItem.PRICE
          ).toLocaleString()} 원`;
          //price
          pcItemImageWrapper.appendChild(pcItemImage);
          aLink.appendChild(pcItemImageWrapper);
          aLink.appendChild(circle);
          aLink.appendChild(pcItemTitle);
          aLink.appendChild(pcItemPrice);
          pcItem.appendChild(aLink);
          pcItems[i].appendChild(pcItem);
        });
      }
      if (i === 1) {
        const itemList = renderItemList.slice(4, 8);
        itemList.map((pcListItem) => {
          const aLink = document.createElement('a');
          aLink.href = `/pro/detail?PRO_IDX=${pcListItem.PRO_IDX}`;
          const pcItem = document.createElement('li');
          pcItem.classList.add('pc__item');
          // li
          const pcItemImageWrapper = document.createElement('div');
          const pcItemImage = document.createElement('img');
          pcItemImageWrapper.classList.add('pc__item--image');
          pcItemImage.src = '/uploadImg/' + pcListItem.MAIN_IMG;
          //img
          const circle = document.createElement('div');
          circle.classList.add('circle');
          const circleIcon = document.createElement('span');
          circle.appendChild(circleIcon);
          const circleIconCharge = document.createElement('i');
          circleIconCharge.classList.add('bi');
          circleIconCharge.classList.add('bi-lightning-charge-fill');
          circleIcon.appendChild(circleIconCharge);
          //circle
          const pcItemTitle = document.createElement('span');
          pcItemTitle.classList.add('pc__item--title');
          pcItemTitle.innerHTML = pcListItem.NAME;
          //title
          const pcItemPrice = document.createElement('span');
          pcItemPrice.classList.add('pc__item--price');
          pcItemPrice.innerHTML = `${parseInt(
            pcListItem.PRICE
          ).toLocaleString()} 원`;
          //price
          pcItemImageWrapper.appendChild(pcItemImage);
          aLink.appendChild(pcItemImageWrapper);
          aLink.appendChild(circle);
          aLink.appendChild(pcItemTitle);
          aLink.appendChild(pcItemPrice);
          pcItem.appendChild(aLink);
          pcItems[i].appendChild(pcItem);
        });
      }
    }
  };

  const renderPageBlock = (list) => {
    const pagenationBlock = document.querySelector('.page-list');
    pagenationBlock.innerHTML = '';
    const pageBlockLength = Math.ceil(
      JSON.parse(localStorage.getItem('pcList')).length / 8
    );
    const totalPageBlock = Math.ceil(pageBlockLength / 5);
    let currentPageBlock = 0;
    for (let i = 0; i < pageBlockLength; i++) {
      const pageItem = document.createElement('li');
      pageItem.classList.add('page-item');
      pageItem.classList.add('pc-item__page');
      const pageItemSpan = document.createElement('span');
      pageItemSpan.textContent = i + 1;
      pageItem.appendChild(pageItemSpan);
      pagenationBlock.appendChild(pageItem);
    }
    const pcPagenation = document.querySelectorAll('.pc-item__page');
    if (currentPageBlock === 0) {
      for (let i = 0; i < pcPagenation.length; i++) {
        pcPagenation[i].style.display = 'none';
        pcPagenation[0].classList.add('is-active');
        if (i < 5) {
          pcPagenation[i].style.display = 'block';
        }
      }
    }
    for (const pagenation of pcPagenation) {
      pagenation.addEventListener('click', (e) => {
        const pcList = JSON.parse(localStorage.getItem('pcList'));
        onClickPagenation(pcList, e);
      });
    }
    const pageNextButton = document.querySelector('.page-next');
    pageNextButton.addEventListener('click', () => {
      if (currentPageBlock < totalPageBlock - 1) {
        pcPagenation.forEach((v) => {
          v.style.display = 'none';
          v.classList.remove('is-active');
        });
        currentPageBlock++;
        currentPage = currentPageBlock * 5 + 1;
        renderItem(JSON.parse(localStorage.getItem('pcList')));
        for (
          let i = currentPageBlock * 5;
          i < (currentPageBlock + 1) * 5;
          i++
        ) {
          if (i < pcPagenation.length) {
            pcPagenation[i].style.display = 'block';
            pcPagenation[currentPage - 1].classList.add('is-active');
          }
        }
      } else {
        return;
      }
    });
    const pagePrevButton = document.querySelector('.page-prev');
    pagePrevButton.addEventListener('click', () => {
      if (currentPageBlock > 0) {
        pcPagenation.forEach((v) => {
          v.style.display = 'none';
        });
        currentPageBlock--;
        currentPage = currentPageBlock * 5 + 1;
        renderItem(JSON.parse(localStorage.getItem('pcList')));
        for (
          let i = currentPageBlock * 5;
          i < (currentPageBlock + 1) * 5;
          i++
        ) {
          if (i < pcPagenation.length) {
            pcPagenation[i].style.display = 'block';
            pcPagenation[currentPage - 1].classList.add('is-active');
          }
        }
      } else {
        return;
      }
    });
  };

  const onClickPagenation = (PcList, e) => {
    if (currentPage !== parseInt(e.target.innerHTML)) {
      currentPage = parseInt(e.target.innerHTML);
      renderItem(PcList);
      const pcPagenation = document.querySelectorAll('.pc-item__page');
      for (let i = 0; i < pcPagenation.length; i++) {
        pcPagenation[i].classList.remove('is-active');
        pcPagenation[currentPage - 1].classList.add('is-active');
      }
    }
  };

  const renderPage = (list) => {
    const renderPcList = list;
    if (currentCategory === 'all' && currentSort === 'PRO_IDX') {
      renderItem(renderPcList);
      localStorage.removeItem('pcList');
      localStorage.setItem('pcList', JSON.stringify(renderPcList));
      renderPageBlock();
    }
    if (currentCategory === 'all' && currentSort === 'ORDER_CNT') {
      const sortPcList = renderPcList.sort((a, b) => b.ORDER_CNT - a.ORDER_CNT);
      renderItem(sortPcList);
      localStorage.removeItem('pcList');
      localStorage.setItem('pcList', JSON.stringify(sortPcList));
      renderPageBlock();
    }
    if (currentCategory === 'all' && currentSort === 'LOW_PRICE') {
      const sortPcList = renderPcList.sort((a, b) => a.PRICE - b.PRICE);
      renderItem(sortPcList);
      localStorage.removeItem('pcList');
      localStorage.setItem('pcList', JSON.stringify(sortPcList));
      renderPageBlock();
    }
    if (currentCategory === 'all' && currentSort === 'PRICE') {
      const sortPcList = renderPcList.sort((a, b) => b.PRICE - a.PRICE);
      renderItem(sortPcList);
      localStorage.removeItem('pcList');
      localStorage.setItem('pcList', JSON.stringify(sortPcList));
      renderPageBlock();
    }

    if (currentCategory === 'GAMING' && currentSort === 'PRO_IDX') {
      const gamingPcList = renderPcList.filter(
        (item) => item.CATEGORY === 'GAMING'
      );
      renderItem(gamingPcList);
      localStorage.removeItem('pcList');
      localStorage.setItem('pcList', JSON.stringify(gamingPcList));
      renderPageBlock();
    }
    if (currentCategory === 'GAMING' && currentSort === 'ORDER_CNT') {
      const gamingPcList = renderPcList
        .filter((item) => item.CATEGORY === 'GAMING')
        .sort((a, b) => b.ORDER_CNT - a.ORDER_CNT);
      renderItem(gamingPcList);
      localStorage.removeItem('pcList');
      localStorage.setItem('pcList', JSON.stringify(gamingPcList));
      renderPageBlock();
    }
    if (currentCategory === 'GAMING' && currentSort === 'LOW_PRICE') {
      const gamingPcList = renderPcList
        .filter((item) => item.CATEGORY === 'GAMING')
        .sort((a, b) => a.PRICE - b.PRICE);
      renderItem(gamingPcList);
      localStorage.removeItem('pcList');
      localStorage.setItem('pcList', JSON.stringify(gamingPcList));
      renderPageBlock();
    }
    if (currentCategory === 'GAMING' && currentSort === 'PRICE') {
      const gamingPcList = renderPcList
        .filter((item) => item.CATEGORY === 'GAMING')
        .sort((a, b) => b.PRICE - a.PRICE);
      renderItem(gamingPcList);
      localStorage.removeItem('pcList');
      localStorage.setItem('pcList', JSON.stringify(gamingPcList));
    }

    if (currentCategory === 'OFFICE' && currentSort === 'PRO_IDX') {
      const gamingPcList = renderPcList.filter(
        (item) => item.CATEGORY === 'OFFICE'
      );
      renderItem(gamingPcList);
      localStorage.removeItem('pcList');
      localStorage.setItem('pcList', JSON.stringify(gamingPcList));
      renderPageBlock();
    }
    if (currentCategory === 'OFFICE' && currentSort === 'ORDER_CNT') {
      const gamingPcList = renderPcList
        .filter((item) => item.CATEGORY === 'OFFICE')
        .sort((a, b) => b.ORDER_CNT - a.ORDER_CNT);
      renderItem(gamingPcList);
      localStorage.removeItem('pcList');
      localStorage.setItem('pcList', JSON.stringify(gamingPcList));
      renderPageBlock();
    }
    if (currentCategory === 'OFFICE' && currentSort === 'LOW_PRICE') {
      const gamingPcList = renderPcList
        .filter((item) => item.CATEGORY === 'OFFICE')
        .sort((a, b) => a.PRICE - b.PRICE);
      renderItem(gamingPcList);
      localStorage.removeItem('pcList');
      localStorage.setItem('pcList', JSON.stringify(gamingPcList));
      renderPageBlock();
    }
    if (currentCategory === 'OFFICE' && currentSort === 'PRICE') {
      const gamingPcList = renderPcList
        .filter((item) => item.CATEGORY === 'OFFICE')
        .sort((a, b) => b.PRICE - a.PRICE);
      renderItem(gamingPcList);
      localStorage.removeItem('pcList');
      localStorage.setItem('pcList', JSON.stringify(gamingPcList));
      renderPageBlock();
    }

    if (currentCategory === 'WORKSTATION' && currentSort === 'PRO_IDX') {
      const workPcList = renderPcList.filter(
        (item) => item.CATEGORY === 'WORKSTATION'
      );
      renderItem(workPcList);
      localStorage.removeItem('pcList');
      localStorage.setItem('pcList', JSON.stringify(workPcList));
      renderPageBlock();
    }
    if (currentCategory === 'WORKSTATION' && currentSort === 'ORDER_CNT') {
      const workPcList = renderPcList
        .filter((item) => item.CATEGORY === 'WORKSTATION')
        .sort((a, b) => b.ORDER_CNT - a.ORDER_CNT);
      renderItem(workPcList);
      localStorage.removeItem('pcList');
      localStorage.setItem('pcList', JSON.stringify(workPcList));
      renderPageBlock();
    }
    if (currentCategory === 'WORKSTATION' && currentSort === 'LOW_PRICE') {
      const workPcList = renderPcList
        .filter((item) => item.CATEGORY === 'WORKSTATION')
        .sort((a, b) => a.PRICE - b.PRICE);
      renderItem(workPcList);
      localStorage.removeItem('pcList');
      localStorage.setItem('pcList', JSON.stringify(workPcList));
      renderPageBlock();
    }
    if (currentCategory === 'WORKSTATION' && currentSort === 'PRICE') {
      const workPcList = renderPcList
        .filter((item) => item.CATEGORY === 'WORKSTATION')
        .sort((a, b) => b.PRICE - a.PRICE);
      renderItem(workPcList);
      localStorage.removeItem('pcList');
      localStorage.setItem('pcList', JSON.stringify(workPcList));
      renderPageBlock();
    }
  };

  const onClickGamingCategory = () => {
    const pcPagenation = document.querySelectorAll('.pc-item__page');
    for (const pagenation of pcPagenation) {
      pagenation.classList.remove('is-active');
    }
    currentPage = 1;
    currentCategory = 'GAMING';
    onSearch = false;
    searchList = [];
    pcListInput.value = '';
    currentSort = initialSort;
    sortCategory.options[0].selected = true;
    pcListSelect.options[0].selected = true;
    renderPage([...pcList]);
  };

  const onClickOfficeCategory = () => {
    const pcPagenation = document.querySelectorAll('.pc-item__page');
    for (const pagenation of pcPagenation) {
      pagenation.classList.remove('is-active');
    }
    currentPage = 1;
    currentCategory = 'OFFICE';
    onSearch = false;
    searchList = [];
    pcListInput.value = '';
    currentSort = initialSort;
    sortCategory.options[0].selected = true;
    pcListSelect.options[0].selected = true;
    renderPage([...pcList]);
  };

  const onClickWorkCategory = () => {
    const pcPagenation = document.querySelectorAll('.pc-item__page');
    for (const pagenation of pcPagenation) {
      pagenation.classList.remove('is-active');
    }
    currentPage = 1;
    currentCategory = 'WORKSTATION';
    onSearch = false;
    searchList = [];
    pcListInput.value = '';
    currentSort = initialSort;
    sortCategory.options[0].selected = true;
    pcListSelect.options[0].selected = true;
    renderPage([...pcList]);
  };

  const onChangeSort = (e) => {
    const pcPagenation = document.querySelectorAll('.pc-item__page');
    for (const pagenation of pcPagenation) {
      pagenation.classList.remove('is-active');
    }
    currentPage = 1;
    currentSort = e.target.value;
    if (onSearch) {
      renderPage(searchList);
    } else {
      renderPage([...pcList]);
    }
  };

  const searchPcList = () => {
    const searchSelected = pcListSelect.options.selectedIndex;
    const inputValue = pcListInput.value.toUpperCase();//소문자로 입력해도 대문자로 변환
    if (searchSelected === 0) {
      const searchResList = [...pcList].filter((item) =>{
            const upperName = item.NAME.toUpperCase();
            return upperName.includes(inputValue);
      }
      );
      onSearch = true;
      searchList = searchResList;
      renderPage(searchList);
    }
    if (searchSelected === 1) {
      const searchResList = [...pcList].filter((item) =>
        item.PRO_IDX.toString().includes(inputValue)
      );
      onSearch = true;
      searchList = searchResList;
      renderPage(searchList);
    }
  };

  gamingCategory.addEventListener('click', onClickGamingCategory);
  officeCategory.addEventListener('click', onClickOfficeCategory);
  workCategory.addEventListener('click', onClickWorkCategory);

  sortCategory.addEventListener('change', onChangeSort);

  pcListSearch.addEventListener('click', searchPcList);
  renderPage([...pcList]);
};

window.addEventListener('load', renderList);
