var pageNumber;
var num;
const prevBT = document.querySelector(".page-prev");
const nextBT = document.querySelector(".page-next");
const noticeList = document.querySelector(".order-list__main");
const page_list = document.querySelector(".page-list");
const search = document.querySelector(".search");

const select = document.querySelector(".input-group-select");
const input = document.querySelector(".select-input");

let savePage;

let inputType = select.value;
let inputKeyword = input.value;

select.addEventListener("change", () => {
   inputType = select.value;
});

input.addEventListener("input", () => {
   inputKeyword = input.value;
});

$(function () {
   axiosCall(1);
});

document
    .querySelector(".member-list__search")
    .addEventListener("submit", (e) => {
       e.preventDefault();
    });

input.addEventListener("keyup", () => {
   console.log(window.event.keyCode);

   if (window.event.keyCode == 13) {
      axiosCall(1, inputType, inputKeyword);
   }
});

prevBT.addEventListener("click", () => {
   axiosCall(Number(num[0].innerHTML) - 5, inputType, inputKeyword);
});
nextBT.addEventListener("click", () => {
   axiosCall(Number(num[0].innerHTML) + 5, inputType, inputKeyword);
});

search.addEventListener("click", () => {
   axiosCall(1, inputType, inputKeyword);
});

function axiosCall(pageNum, type, keyword) {
   if (pageNum == undefined) {
      pageNum = 1;
   }
   var obj;
   if (
       type == undefined ||
       keyword == undefined ||
       type == "" ||
       keyword == "" ||
       type == null ||
       keyword == null
   ) {
      obj = { currentPage: pageNum };
   } else {
      obj = { currentPage: pageNum, TYPE: type, KEYWORD: keyword };
   }

   const objJson = JSON.stringify(obj);

   axios
       .post("/admin/member/list/data", objJson, {
          headers: {
             "Content-Type": "application/json",
          },
       })
       .then((res) => axiosResult(res.data));
}
function axiosResult(data) {
   console.log(data);
   $(".order-list__main--main").remove();
   createContents(data);
   savePage = data[data.length - 1].currentPage;
   if (data[data.length - 1].currentPage % 5 == 1) {
      createPageBlock(data[data.length - 1]);
   }

   //1 6 11
}

function removeActive() {
   const paging = document.querySelectorAll(".page-item");
   paging.forEach((page) => {
      page.classList.remove("is-active");
   });
}
function createContents(res) {
   for (let i = 0; i < res.length - 1; i++) {
      const main_main = document.createElement("div");
      main_main.classList.add("order-list__main--main");
      for (let j = 0; j < 5; j++) {
         const main_item = document.createElement("div");
         main_item.classList.add("order-list__main--item");

         switch (j) {
            case 0:
               main_item.classList.add("member-modal-open");
               main_item.innerHTML = res[i].MEM_IDX;
               break;

            case 1:
               main_item.classList.add("member-id");
               main_item.innerHTML = res[i].MEM_ID;
               break;

            case 2:
               main_item.innerHTML = res[i].MEM_NAME;
               break;

            case 3:
               main_item.innerHTML = res[i].PHONE;
               break;

            case 4:
               main_item.innerHTML = res[i].REG_DATE;
               break;
         }
         main_main.appendChild(main_item);
      }
      noticeList.appendChild(main_main);
   }

   const member_id = document.querySelectorAll(".member-id");
   const member = document.querySelectorAll(".order-list__main--main");

   for (let i = 0; i < member.length; i++) {
      member[i].addEventListener("click", () => {
         window.open(
             "/admin/member/detail?MEM_ID=" + member_id[i].innerHTML,
             "Child",
             "width = 800, height = 600, top = 50, left = 50"
         );
      });
   }
}
function createPageBlock(data) {
   createPageButton(data);
   createPageNum(data);
}

function createPageNum(data) {
   $(".page-item").remove();
   const start_page = data.currentPage;
   var end_page = data.currentPage + 4;
   if (data.currentPage + 4 > data.TOTALPAGE) {
      end_page = data.TOTALPAGE;
   }
   for (let i = start_page; i <= end_page; i++) {
      const li = document.createElement("li");
      li.classList.add("page-item");
      if (i == start_page) {
         li.classList.add("is-active");
      }

      const a = document.createElement("a");
      a.classList.add("num");
      a.innerHTML = i;

      li.appendChild(a);

      page_list.appendChild(li);
   }

   num = document.querySelectorAll(".num");
   pageNumber = document.querySelectorAll(".page-item");
   for (let i = 0; i < pageNumber.length; i++) {
      pageNumber[i].addEventListener("click", () => {
         if (num[i].innerHTML == savePage) {
            return;
         }
         removeActive();
         pageNumber[i].classList.add("is-active");
         axiosCall(Number(num[i].innerHTML), inputType, inputKeyword);
      });
   }
}

function createPageButton(data) {
   if (data.PREV == false) {
      $(".page-prev").css("visibility", "hidden");
   } else {
      $(".page-prev").css("visibility", "visible");
   }

   if (data.NEXT == false) {
      $(".page-next").css("visibility", "hidden");
   } else {
      $(".page-next").css("visibility", "visible");
   }
}
