const fileAddButton = document.querySelector(
	".notice-write__form--button-left"
);
const listSize = document.querySelector(".list-size");
const fileDelete = document.querySelectorAll(".bi-x");
const notice_file = document.querySelectorAll(".notice-file");

for (let i = 0; i < fileDelete.length; i++) {
	fileDelete[i].addEventListener("click", function (e) {
		let answer = confirm("삭제하시겠습니까?");
		if (answer === true) {
			notice_file[i].remove();
		}
	});
}

$(".list-size").css("display", "none");

let fileInputIndex = listSize.innerHTML;

fileAddButton.addEventListener("click", () => {
	const noticeWriteFooter = document.querySelector(
		".notice-write__form--footer"
	);
	const inputFile = document.createElement("input");
	inputFile.type = "file";
	inputFile.setAttribute("name", `file_${fileInputIndex}`);
	fileInputIndex++;
	noticeWriteFooter.appendChild(inputFile);
});
