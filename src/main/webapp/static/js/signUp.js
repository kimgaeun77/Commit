const idInputEl = document.querySelector("#sign-up__id");
const pwInputEl = document.querySelector(".sign-up__input--pw");
const confirmInputEl = document.querySelector(".sign-up__input--confirm");
const nameInputEl = document.querySelector(".sign-up__input--name");
const warningMessage = document.querySelector(".warning-message");
const signupButton = document.querySelector(".signup__button--disabled");
const emailInputEl = document.querySelector("#sign-up__email");
const selectValue = document.querySelector(".email-select");
const directInput = document.querySelector(".email-direct");

const confirmIdButton = document.querySelector(".btn-secondary");
const confirmEmailButton = document.querySelector(".email-check");

//아이디 특수문자 경고 메시지
const idCheckMessage = document.querySelector(".id-check-message");
const emailCheckMessage = document.querySelector('.email-check-message');

//아이디, 이메일 특수문자 검사할 때 사용
const regex = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/;

//아이디,이메일 한글 검사할 때 사용
const regexKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

let idValue = "";
let pwValue = "";
let confirmValue = "";
let nameValue = "";
let emailValue = "";
let warningState = false;
let idValid = false;
let emailValid = false;

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
        idValue !== "" &&
        pwValue !== "" &&
        confirmValue !== "" &&
        nameValue !== "" &&
        emailValue !== "" &&
        warningState === false &&
        /*아이디(이메일도 마찬가지) 중복 확인 버튼이 비활성화 되어있어야함! -> 중복 확인하고 사용할 수 있으면 비활성화됨
        * 변경하면 다시 활성화 됨. */
        idValid === true &&
        confirmIdButton.disabled === true &&
        emailValid === true &&
        confirmEmailButton.disabled === true
    ) {
        signupButton.disabled = false;
    } else {
        signupButton.disabled = true;
    }
};

function confirmIDRegex(id) {
    //특수문자를 사용했다면
    if (regex.test(id) || regexKorean.test(id)) {
        idCheckMessage.style.display = 'block';
        idCheckMessage.innerHTML = '영문 소문자, 숫자만 사용 가능합니다.';
        idValid = false;
        confirmIdButton.disabled = true;
    } else {
        idCheckMessage.style.display = 'none';
        idCheckMessage.innerHTML = '';
        idValid = true;
        confirmIdButton.disabled = false;
    }
}

idInputEl.addEventListener("input", (e) => {
    confirmIDRegex(e.target.value);
    idValue = e.target.value;
    buttonActive();
});

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

//아이디 중복 확인
confirmIdButton.addEventListener("click", checkId);

function checkId() {
    const inputId = idInputEl.value;
    if (inputId !== "") {
        confirmIdAjax(inputId);
    } else {
        alert("아이디를 입력해주세요.");
        idInputEl.focus();
    }
}

function confirmIdAjax(id) {
    let sendId = { MEM_ID: id };

    $.ajax({
        type: "post",
        url: "/member/confirm/id",
        data: JSON.stringify(sendId),
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        success: function (data) {
            const check = parseInt(data);
            if (check === 1) {
                alert("이미 사용 중인 아이디입니다.");
                confirmIdButton.disabled = false;
                idInputEl.focus();
            } else {
                alert("사용 가능한 아이디입니다.");
                confirmIdButton.disabled = true;
            }
            buttonActive();
        },
        error: function (error) {
            console.log(error.status);
        },
    });
}

//이메일 정규 표현식 포함여부 검사
function confirmEmailRegex(email) {
    //특수문자를 사용했다면
    if (regex.test(email) || regexKorean.test(email)) {
        emailCheckMessage.style.display = 'block';
        emailCheckMessage.innerHTML = '영문 소문자, 숫자만 사용 가능합니다.';
        emailValid = false;
        confirmEmailButton.disabled = true;
    } else {
        emailCheckMessage.style.display = 'none';
        emailCheckMessage.innerHTML = '';
        emailValid = true;
        confirmEmailButton.disabled = false;
    }
}

emailInputEl.addEventListener("input", (e) => {
    confirmEmailRegex(e.target.value);
    emailValue = e.target.value;
    buttonActive();
});

const emailSelect = () => {
    let value = selectValue.options[selectValue.selectedIndex].text;
    confirmEmailButton.disabled = false;
    if (value === "직접입력") {
        directInput.readOnly = false;
        directInput.value = "";
        directInput.focus();
    } else {
        directInput.readOnly = true;
        directInput.value = value;
    }
    buttonActive();
};

selectValue.addEventListener("change", emailSelect);

//직접 입력하고 중복확인 후 다시 바꿀것을 대비.
directInput.addEventListener('input', function (){
    confirmEmailButton.disabled = false;
    buttonActive();
})


//이메일 중복 확인
confirmEmailButton.addEventListener("click", checkEmail);

function checkEmail() {
    const email = emailInputEl.value;
    const at = "@";
    const domain = directInput.value;
    const totalEmail = email + at + domain;

    if (email !== "" && domain !== "") {
        confirmEmailAjax(totalEmail);
    } else {
        alert("이메일을 입력해주세요.");
        email.focus();
    }
}

function confirmEmailAjax(email) {
    const sendEmail = { EMAIL: email };

    $.ajax({
        type: "post",
        url: "/member/confirm/email",
        data: JSON.stringify(sendEmail),
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        success: function (data) {
            const check = parseInt(data);
            if (check === 1) {
                alert("이미 사용 중인 이메일입니다.");
                confirmEmailButton.disabled = false;
                emailInputEl.focus();
            } else {
                alert("사용 가능한 이메일입니다.");
                confirmEmailButton.disabled = true;
            }
            buttonActive();
        },
        error: function (error) {
            console.log(error.status);
        },
    });
}
