<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/include/head.jsp" %>

<body>
<!---------------------------- header 영역 --------------------------------------->
<jsp:include page="/WEB-INF/include/header.jsp"></jsp:include>
<!-------------------------------- main ------------------------------>
<main>
    <section class="category">
        <h1 class="sr-only">카테고리</h1>
        <div class="category__items">
            <div class="category__item">
                <div class="category__item--icon">
                    <i class="bi bi-people-fill"></i>
                </div>
            </div>
        </div>
    </section>

    <section class="login-section">
        <h1 class="sr-only">로그인페이지</h1>
        <div class="login-wrapper">
            <h1 class="login-title">Login</h1>
            <form action="/member/login" method="post" class="login-form">
                <div class="login-form__login">
                    <label for="logIn">아이디</label>
                    <input
                            type="text"
                            id="logIn"
                            name="MEM_ID"
                            class="form-input login-form__input"
                    />
                </div>
                <div class="login-form__password">
                    <label for="passWord">비밀번호</label>
                    <input
                            type="password"
                            id="passWord"
                            name="MEM_PW"
                            class="form-input login-form__input"
                    />
                </div>
                <div class="login-form__search">
                    <a class="search-id">아이디 찾기</a>
                    <span>|</span>
                    <a class="search-pw">비밀번호 찾기</a>
                </div>
                <div class="login-form__buttons">
                    <a id="kakao_login_button" href="https://kauth.kakao.com/oauth/authorize?client_id=679b462da7d00b233a77a81e5981a3c5&redirect_uri=http://commitshop.kro.kr/oauth/login&response_type=code">
                        <img id="kakao_login_img" src="/assets/main/카카오_로그인_버튼.png" alt="카카오_로그인_버튼" >
                    </a>
                    <button class="btn-secondary login-button" type="submit">
                        로그인
                    </button>
                    <button class="btn-secondary signup-button" type="button">
                        <a href="/member/join">회원가입</a>
                    </button>
                </div>
            </form>
        </div>
    </section>
</main>
<jsp:include page="/WEB-INF/include/footer.jsp"></jsp:include>
<script src="/js/dropdown.js"></script>
<script>
    document.querySelector('.search-id').addEventListener('click', () => {
        window.open(
            '/member/findID',
            'Child',
            'width = 800, height = 300, top = 50, left = 50'
        );
    });
    document.querySelector('.search-pw').addEventListener('click', () => {
        window.open(
            '/member/findPW',
            'Child',
            'width = 800, height = 300, top = 50, left = 50'
        );
    });
</script>
</body>
</html>
