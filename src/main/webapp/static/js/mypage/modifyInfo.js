const pwInputEl = document.querySelector(".sign-up__input--pw");
const confirmInputEl = document.querySelector(".sign-up__input--confirm");
const nameInputEl = document.querySelector(".sign-up__input--name");
const warningMessage = document.querySelector(".warning-message");
const signupButton = document.querySelector(".signup__button--disabled");
const resignButton = document.querySelector(".resign--button");

let pwValue = "";
let confirmValue = "";
let nameValue = "";
let warningState = false;

const confirmPassword = () => {
  const passWordValue = pwInputEl.value;
  const passWordConfirmValue = confirmInputEl.value;

  if (passWordValue !== passWordConfirmValue) {
    warningMessage.classList.add("warning");
    warningState = true;
  } else {
    warningMessage.classList.remove("warning");
    warningState = false;
  }
};

const buttonActive = () => {
  if (
      pwValue !== "" &&
      confirmValue !== "" &&
      nameValue !== "" &&
      warningState === false
  ) {
    signupButton.disabled = false;
  } else {
    signupButton.disabled = true;
  }
};

pwInputEl.addEventListener("input", (e) => {
  confirmPassword();
  pwValue = e.target.value;
  buttonActive();
});

confirmInputEl.addEventListener("input", (e) => {
  confirmPassword();
  confirmValue = e.target.value;
  buttonActive();
});

nameInputEl.addEventListener("input", (e) => {
  nameValue = e.target.value;
  buttonActive();
});

window.addEventListener("load", () => {
  const value = document.querySelector(".sign-up__input--name").value;
  nameValue = value;
  buttonActive();
});
//회원탈퇴
resignButton.addEventListener("click", function () {
  const answer = confirm("정말로 탈퇴하시겠습니까?");
  if (answer === true) {
    $.ajax({
      url: "/mypage/myInfo/del",
      type: "post",
      success: function () {
        alert("정상적으로 회원탈퇴 되었습니다.\n이용해 주셔서 감사합니다.");
        window.location.href = "/main";
      },
      error: function () {
        alert("회원 탈퇴에 실패하였습니다.");
      },
    });
  }
});
