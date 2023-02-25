$(function () {
	axiosCall(1);
});

$(".idx").css("display", "none");
const updateButton = document.querySelector(".update");
const deleteButton = document.querySelector(".delete");
const listButton = document.querySelector(".list");
const page_list = document.querySelector(".page-list");
const comment = document.querySelector(".comment__items--wrapper");
const loginName = document.querySelector(".notice-comment__nickname");
const title = document.querySelector(".comment__title");
const prevBT = document.querySelector(".page-prev");
const nextBT = document.querySelector(".page-next");
const notice_idx = document.querySelector(".idx");
var deleteComment = document.querySelectorAll(".bi-x");
var pageNumber;
var num;
var savePage;

listButton.addEventListener("click", () => {
	location.href = "/notice/list";
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

	axios
		.post("/notice/comment/data/" + notice_idx.innerHTML + "/" + pageNum)
		.then((res) => axiosResult(res.data));
}
function axiosResult(data) {
	$(".comment_idx").remove();
	$(".comment__items").remove();
	//clearComment();
	createComments(data);
	savePage = data[data.length - 1].currentPage;
	createPageBlock(data[data.length - 1]);

	deleteC();
	$(".disable").css("display", "none");
}

if (updateButton != null) {
	updateButton.addEventListener("click", () => {
		location.href = "/notice/admin/update?NOTICE_IDX=" + notice_idx.innerHTML;
	});
}

if (deleteButton != null) {
	deleteButton.addEventListener("click", () => {
		let answer = confirm("삭제하시겠습니까?");
		if (answer === true) {
			const obj = { NOTICE_IDX: notice_idx.innerHTML };
			const objJson = JSON.stringify(obj);
			$.ajax({
				type: "POST",
				url: "/notice/admin/delete",
				data: objJson,
				dataType: "json",
				contentType: "application/json",
				success: function (res) {},
				error: function (error) {},
			});
			location.href = "/notice/list";
		} else {
			return false;
		}
	});
}

function clearComment() {
	const contents = document.querySelectorAll(".comment_idx");
	const item = document.querySelectorAll(".comment__items");

	contents.forEach((content) => {
		content.remove();
	});
	item.forEach((item) => {
		item.remove();
	});
}

function removeActive() {
	const paging = document.querySelectorAll(".page-item");
	paging.forEach((page) => {
		page.classList.remove("is-active");
	});
}

function createComments(res) {
	for (let i = 0; i < res.length - 1; i++) {
		const idx = document.createElement("span");
		idx.classList.add("comment_idx");
		idx.innerHTML = res[i].COM_IDX;
		const item = document.createElement("div");
		item.classList.add("comment__items");
		const name = document.createElement("span");
		name.classList.add("comment__item");
		name.classList.add("comment__item--name");
		name.innerHTML = res[i].MEM_ID;
		const title = document.createElement("span");
		title.classList.add("comment__item");
		title.classList.add("comment__item--title");
		title.innerHTML = res[i].CONTENT;

		const wrapper = document.createElement("div");
		wrapper.classList.add("comment__item");
		wrapper.classList.add("comment__item--wrapper");

		const span = document.createElement("span");
		span.innerHTML = res[i].REG_DATE;

		const img = document.createElement("i");
		img.classList.add("bi");
		img.classList.add("bi-x");
		if (loginName.innerHTML != res[i].MEM_ID) {
			img.classList.add("disable");
		}
		wrapper.appendChild(span);
		wrapper.appendChild(img);

		item.appendChild(name);
		item.appendChild(title);
		item.appendChild(wrapper);

		comment.appendChild(item);

		comment.appendChild(idx);
		$(".comment_idx").css("display", "none");
		deleteComment = document.querySelectorAll(".bi-x");
	}
}

function createPageBlock(data) {
	if (data.currentPage % 5 == 1) {
		createPageButton(data);

		const item = document.querySelectorAll(".page-item");
		item.forEach((content) => {
			content.remove();
		});
		createPageNum(data);
	}
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

function deleteC() {
	const com_idx = document.querySelectorAll(".comment_idx");
	for (let i = 0; i < deleteComment.length; i++) {
		deleteComment[i].addEventListener("click", () => {
			if (deleteComment[i].classList.contains("disable") == false) {
				let answer = confirm("삭제하시겠습니까?");
				if (answer === true) {
					sendData(
						"/notice/comment/delete",
						{ COM_IDX: com_idx[i].innerHTML, NOTICE_IDX: notice_idx.innerHTML },
						"post"
					);
				}
			} else {
				alert("본인이 작성한 댓글만 삭제할 수 있습니다.");
			}
		});
	}
}

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
