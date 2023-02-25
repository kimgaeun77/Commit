var pageNumber;
var num;
const prevBT = document.querySelector(".page-prev");
const nextBT = document.querySelector(".page-next");
const proList = document.querySelector(".order-list__main");
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

$(function () {
	axiosCall(1);
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
		.post("/admin/pro/list/data", objJson, {
			headers: {
				"Content-Type": "application/json",
			},
		})
		.then((res) => axiosResult(res.data));
}
function axiosResult(data) {
	console.log(data);
	$(".order-list__pro--main").remove();
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
		main_main.classList.add("order-list__pro--main");
		for (let j = 0; j < 7; j++) {
			const main_item = document.createElement("div");
			main_item.classList.add("order-list__pro--item");

			switch (j) {
				case 0:
					main_item.classList.add("pro_idx");
					main_item.innerHTML = res[i].PRO_IDX;
					break;

				case 1:
					const img = document.createElement("img");
					img.src = "/uploadImg/" + res[i].MAIN_IMG;
					main_item.appendChild(img);
					break;

				case 2:
					main_item.classList.add("pro-detail__name");
					main_item.classList.add("pro");
					main_item.innerHTML = res[i].NAME;
					break;

				case 3:
					const ptag = document.createElement("p");
					main_item.appendChild(ptag);
					ptag.innerHTML = res[i].CATEGORY;
					break;

				case 4:
					main_item.innerHTML = res[i].STOCK + "개";
					break;

				case 5:
					main_item.innerHTML = res[i].PRICE.toLocaleString() + "원";
					break;

				case 6:
					const button = document.createElement("button");
					button.classList.add("order-list__delete-button");
					const icon = document.createElement("i");
					icon.classList.add("bi");
					icon.classList.add("bi-x");
					button.appendChild(icon);
					main_item.appendChild(button);
					break;
			}
			main_main.appendChild(main_item);
		}
		proList.appendChild(main_main);
	}

	const pro_idx = document.querySelectorAll(".pro_idx");
	const pro = document.querySelectorAll(".pro-detail__name");
	const deleteButton = document.querySelectorAll(".bi-x");

	for (let i = 0; i < deleteButton.length; i++) {
		deleteButton[i].addEventListener("click", () => {
			let answer = confirm("삭제하시겠습니까?");
			if (answer === true) {
				const deleteObj = { PRO_IDX: pro_idx[i].innerHTML };
				axios
					.post("/admin/pro/delete/", JSON.stringify(deleteObj), {
						headers: {
							"Content-Type": "application/json",
						},
					})
					.then((res) => axiosResult(res.data))
				alert("삭제되었습니다.");
				location.href = "/admin/pro/list";
			}
		});
	}

	for (let i = 0; i < pro.length; i++) {
		pro[i].addEventListener("click", () => {
			window.open(
				"/admin/pro/update?PRO_IDX=" + pro_idx[i].innerHTML,
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
