<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/include/head.jsp" %>
  <body>
   <jsp:include page="/WEB-INF/include/header.jsp"></jsp:include>
    <main>
      <section class="category">
        <h1 class="sr-only">카테고리</h1>
        <div class="category__items">
          <div class="category__item">
            <div class="category__item--icon">
              <i class="bi bi-emoji-smile"></i>
            </div>
          </div>
        </div>
      </section>
      
      <section class="signup-section">
        <h1 class="sr-only">정보수정 페이지</h1>
        <div class="signup-wrapper">
          <form action="/mypage/myInfo/update" method="post">
            <h1 class="signup__title">정보수정</h1>
           <c:if test="${myInfo.OAUTH == null}"><%--oauth로 로그인한 user라면 우리가 임의적으로 생성한 아이디를 보여주지 않음. oauth가 null일때만 아이디를 보여줌.--%>
            <div class="signup-form__id signup-form">
                  <label for="sign-up__id"
                    >아이디
                    <span>*</span>
                  </label>
                  <input
                    id="sign-up__id"
                    type="text"
                    class="sign-up__input sign-up__input--id resive__id"
                    value="${myInfo.MEM_ID}"
                    readonly
                  />
                </div>
           </c:if>
            <div class="signup-form signup-form__pw">
              <label for="sign-up__pw"
                >비밀번호
                <span>*</span>
              </label>
              <input
                type="password"
                id="sign-up__pw"
                name="MEM_PW"
                class="sign-up__input sign-up__input--pw form-input"
                minlength="8"
                maxlength="20"
                placeholder="8~20자의 영문 소문자, 숫자"
              />
            </div>
            <div class="signup-form__confirm signup-form">
              <label for="sign-up__confirm"
                >비밀번호 확인
                <span>*</span>
              </label>
              <input
                type="password"
                id="sign-up__confirm"
                class="sign-up__input sign-up__input--confirm form-input"
                minlength="8"
                maxlength="20"
                placeholder="8~20자의 영문 소문자, 숫자"
              />
              <span class="warning-message">비밀번호가 일치하지 않습니다 </span>
            </div>
            <div class="signup-form__pw signup-form">
              <label for="sign-up__pw"
                >이름
                <span>*</span>
              </label>
              <input
                type="text"
                id="sign-up__name"
                name="MEM_NAME"
                class="sign-up__input sign-up__input--name form-input"
                value="${myInfo.MEM_NAME}"
              />
            </div>
            <div class="signup-form__phone signup-form">
              <label for="sign-up__phone">휴대전화</label>
              <input
                type="text"
                id="sign-up__phone"
                name="PHONE"
                class="sign-up__input form-input"
                value="${myInfo.PHONE}"
              />
            </div>
            <div class="signup-form__adress signup-form">
              <label for="sign-up__adress">주소</label>
              <div class="sign-up__adress--wrapper">
                <input
                  type="text"
                  name="ZIPCODE"
                  class="form-input sign-up__adress__zipcode"
                  value="${myInfo.ZIPCODE}"
                  readonly
                />
                <button type="button" class="btn-secondary sign-up__button">
                  우편번호
                </button>
              </div>
            </div>
            <div class="adress__detail--wrapper">
              <input
                type="text"
                NAME="ROAD_ADDRESS"
                class="form-input sign-up__input--adress"
                value="${myInfo.ROAD_ADDRESS}"
                readonly
              />
            </div>
            <div class="adress__detail--wrapper">
              <input
                type="text"
                NAME="ADDRESS_DETAIL"
                class="form-input adress__detail"
                value="${myInfo.ADDRESS_DETAIL}"
                placeholder="상세주소"
              />
            </div>
            <div class="signup-form__email signup-form">
              <label for="sign-up__email"
                >이메일
                <span>*</span>
              </label>
              <div class="sign-up__email--wrapper">
                <input
                  id="sign-up__email"
                  type="text"
                  class="sign-up__input resive__id"
                  value="${myInfo.EMAIL}"
                  readonly
                />
              </div>
            </div>
            <div class="signup-form__radio signup-form">
              <span class="radio-label"
                >이메일 수신 동의
                <span>*</span>
              </span>
              <c:if test="${myInfo.EMAIL_AGREE eq 'Y'}">
			  <div class="radio-wrapper">
			    <div class="radio-wrapper-label">
			      <input 
			      	type="radio" 
			      	id="email-recaption-yes" 
			      	name="EMAIL_AGREE" 
			      	value="Y" 
			      	checked />
			      <label for="email-recaption-yes">예</label>
			    </div>
			    <div class="radio-wrapper-label">
			      <input 
			      	type="radio" 
			      	id="email-recaption-no" 
			      	name="EMAIL_AGREE" 
			      	value="N" />
			      <label for="email-recaption-no">아니오</label>
			    </div>
			  </div>
			</c:if>
			 <c:if test="${myInfo.EMAIL_AGREE eq 'N'}">
			  <div class="radio-wrapper">
			    <div class="radio-wrapper-label">
			      <input 
			      	type="radio" 
			      	id="email-recaption-yes" 
			      	name="EMAIL_AGREE" 
			      	value="Y" />
			      <label for="email-recaption-yes">예</label>
			    </div>
			    <div class="radio-wrapper-label">
			      <input 
			      	type="radio" 
			      	id="email-recaption-no" 
			      	name="EMAIL_AGREE" 
			      	value="N" 
			      	checked />
			      <label for="email-recaption-no">아니오</label>
			    </div>
			  </div>
			</c:if>
           </div>
            <div class="signup__button">
              <button
                class="btn-secondary signup__button--disabled"
                type="submit"
                disabled
              >
                정보 수정
              </button>
             <button class="btn-secondary resign--button" type="button">탈퇴</button>
            </div>
          </form>
        </div>
      </section>
    </main>
    <jsp:include page="/WEB-INF/include/footer.jsp"></jsp:include>
    <script src="https://code.jquery.com/jquery-latest.min.js"></script>
    <script src="/js/mypage/modifyInfo.js"></script>
    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
    <script>
      const searchAdress = () => {
        new daum.Postcode({
          oncomplete: function (data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            let addr = ''; // 주소 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') {
              // 사용자가 도로명 주소를 선택했을 경우
              addr = data.roadAddress;
            } else {
              // 사용자가 지번 주소를 선택했을 경우(J)
              addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.querySelector('.sign-up__adress__zipcode').value =
              data.zonecode;
            document.querySelector('.sign-up__input--adress').value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.querySelector('.adress__detail').focus();
          },
        }).open();
      };

      document
        .querySelector('.sign-up__button')
        .addEventListener('click', searchAdress);
    </script>
    <script src="/js/dropdown.js"></script>
  </body>
</html>
