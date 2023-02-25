const fileAddButton = document.querySelector(
    ".notice-write__form--button-left"
);

let fileInputIndex = 1;

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
