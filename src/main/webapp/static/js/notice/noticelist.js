var pageNumber;
var num;
const prevBT = document.querySelector(".page-prev");
const nextBT = document.querySelector(".page-next");
const noticeList = document.querySelector(".notice-board__main-wrapper");
const page_list = document.querySelector(".page-list");
var savePage;
$(function () {
	axiosCall(1);
});

prevBT.addEventListener("click", () => {
	axiosCall(Number(num[0].innerHTML) - 5);
});
nextBT.addEventListener("click", () => {
	axiosCall(Number(num[0].innerHTML) + 5);
});

function axiosCall(pageNum) {
	if (pageNum == undefined) {
		pageNum = 1;
	}
	const obj = { currentPage: pageNum };
	const objJson = JSON.stringify(obj);

	axios
		.post("/notice/list/data", objJson, {
			headers: {
				"Content-Type": "application/json",
			},
		})
		.then((res) => axiosResult(res.data));
}
function axiosResult(data) {
	$(".notice-board__main-items").remove();
	createContents(data);
	savePage = data[data.length - 1].currentPage;
	if (data[data.length - 1].currentPage % 5 == 1) {
		createPageBlock(data[data.length - 1]);
	}
}

function removeActive() {
	const paging = document.querySelectorAll(".page-item");
	paging.forEach((page) => {
		page.classList.remove("is-active");
	});
}
function createContents(res) {
	for (let i = 0; i < res.length - 1; i++) {
		const noticeItems = document.createElement("div");
		noticeItems.classList.add("notice-board__main-items");

		const noticeItemIdx = document.createElement("div");
		noticeItemIdx.classList.add("notice-board__main-item");
		noticeItemIdx.classList.add("idx");
		noticeItemIdx.innerHTML = res[i].NOTICE_IDX;
		const noticeItemTitle = document.createElement("div");
		noticeItemTitle.classList.add("notice-board__main-item");

		const aTitle = document.createElement("a");
		aTitle.classList.add("title");
		aTitle.innerHTML = res[i].TITLE;
		noticeItemTitle.appendChild(aTitle);

		const noticeItemWriter = document.createElement("div");
		noticeItemWriter.classList.add("notice-board__main-item");
		noticeItemWriter.innerHTML = "Commit";
		const noticeItemDate = document.createElement("div");
		noticeItemDate.classList.add("notice-board__main-item");
		noticeItemDate.innerHTML = res[i].REG_DATE;

		noticeItems.appendChild(noticeItemIdx);
		noticeItems.appendChild(noticeItemTitle);
		noticeItems.appendChild(noticeItemWriter);
		noticeItems.appendChild(noticeItemDate);

		noticeList.appendChild(noticeItems);
	}
	const idx = document.querySelectorAll(".idx");
	const title = document.querySelectorAll(".title");

	for (let i = 0; i < title.length; i++) {
		title[i].addEventListener("click", () => {
			location.href = "/notice/detail?NOTICE_IDX=" + idx[i].innerHTML;
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
	var end_page = data.currentPage + 5;
	if (data.currentPage + 4 > data.TOTALPAGE) {
		end_page = data.TOTALPAGE + 1;
	}
	for (let i = start_page; i < end_page; i++) {
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
			axiosCall(Number(num[i].innerHTML));
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
