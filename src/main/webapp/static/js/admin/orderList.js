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

	obj = { currentPage: pageNum };

	const objJson = JSON.stringify(obj);

	axios
		.post("/admin/order/list/data", objJson, {
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
					main_item.classList.add("modal-open");
					main_item.innerHTML = res[i].ORDER_IDX;
					break;

				case 1:
					main_item.innerHTML = res[i].MEM_ID;
					break;

				case 2:
					const selectState = document.createElement("select");
					selectState.classList.add("selectOrder");
					createOption(selectState);
					console.log(res[i].STATE);
					for (let s = 0; s < selectState.options.length; s++) {
						if (selectState.options[s].value == res[i].STATE) {
							selectState.options[s].selected = true;
						}
					}
					main_item.appendChild(selectState);
					break;

				case 3:
					main_item.innerHTML = res[i].TOTAL_PRICE.toLocaleString() + "원";
					break;

				case 4:
					let pay_type;
					if (res[i].PAY_TYPE == "CC") {
						pay_type = "신용카드";
					} else if (res[i].PAY_TYPE == "DB") {
						pay_type = "무통장입금";
					} else {
						pay_type = "계좌이체";
					}

					main_item.innerHTML = pay_type;
					break;
			}
			main_main.appendChild(main_item);
		}
		noticeList.appendChild(main_main);
	}

	const selectBox = document.querySelectorAll(".selectOrder");
	const order_idx = document.querySelectorAll(".modal-open");

	for (let i = 0; i < order_idx.length; i++) {
		order_idx[i].addEventListener("click", () => {
			window.open(
				"/admin/order/detail?ORDER_IDX=" + order_idx[i].innerHTML,
				"Child",
				"width = 800, height = 600, top = 50, left = 50"
			);
		});
	}

	for (let i = 0; i < selectBox.length; i++) {
		selectBox[i].addEventListener("change", () => {
			console.log(selectBox[i].value);
			const obj = {
				ORDER_IDX: order_idx[i].innerHTML,
				STATE: selectBox[i].value,
			};
			const objJson = JSON.stringify(obj);

			axios
				.post("/admin/order/update", objJson, {
					headers: {
						"Content-Type": "application/json",
					},
				})
				.then(() => axiosCall(savePage));
		});
	}
}
function createOption(selectState) {
	$(selectState).append("<option value='A'>취소 처리중</option>");
	$(selectState).append("<option value='B'>배송대기</option>");
	$(selectState).append("<option value='C'>배송중</option>");
	$(selectState).append("<option value='D'>배송 완료</option>");
	$(selectState).append("<option value='E'>교환 완료</option>");
	$(selectState).append("<option value='F'>취소 완료</option>");
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
