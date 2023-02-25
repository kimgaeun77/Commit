const myQnaDetailModalOpen = document.querySelectorAll(
    ".my-qna__main--item-content"
);
const qnaType = document.querySelectorAll(".qna-type");
const answerState = document.querySelectorAll(".answer-state");

for (let i = 0; i < myQnaDetailModalOpen.length; i++) {
  myQnaDetailModalOpen[i].addEventListener("click", function () {
    const qna_idx = myQnaDetailModalOpen[i].dataset.qna_idx;
    window.open(
        "/mypage/myQnaDetail?QNA_IDX=" + qna_idx,
        "Child",
        "width = 800, height = 600, top = 50, left = 50"
    );
  });
}

// 페이지 로딩시 답변상태값을 가져와서 답변완료/답변전으로 구분을 해줌
// + 문의유형값을 가져와서 배송문의 / 상품문의 / 기타문의로 구분을 해줌
$(function () {
  //문의유형
  for (let i = 0; i < qnaType.length; i++) {
    switch (qnaType[i].innerText) {
      case "D":
        qnaType[i].innerText = "배송";
        break;

      case "P":
        qnaType[i].innerText = "상품";
        break;

      case "E":
        qnaType[i].innerText = "기타";
        break;
    }
  }
  //답변상태
  for (let i = 0; i < answerState.length; i++) {
    switch (answerState[i].innerText) {
      case "N":
        answerState[i].innerText = "답변전";
        break;

      case "Y":
        answerState[i].innerText = "답변완료";
        break;
    }
  }
});
