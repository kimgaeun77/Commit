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
                    <i class="bi bi-chat-right-dots-fill"></i>
                </div>
            </div>
        </div>
    </section>

    <section class="my-review__section">
        <h1 class="my-review__title">Review</h1>
        <div class="my-review__wrapper">
            <div class="my-review__header">
                <div class="my-review__header--item"></div>
                <div class="my-review__header--item">상품 정보</div>
                <div class="my-review__header--item">내용</div>
                <div class="my-review__header--item">작성일</div>
            </div>
            <c:forEach var="row" items="${reviewList}">
                <div class="my-review__main">
                    <div class="my-review__main--item">
                        <a href="/pro/detail?PRO_IDX=${row.PRO_IDX}">
                            <img src="/uploadImg/${row.MAIN_IMG}" alt=""/>
                        </a>
                    </div>
                    <div class="my-review__main--item open">
                            ${row.NAME}
                    </div>
                    <div class="my-review__main--item">
                            ${row.CONTENT}
                    </div>
                    <div class="my-review__main--item">${row.REG_DATE}</div>
                </div>
            </c:forEach>
        </div>
    </section>
</main>
<jsp:include page="/WEB-INF/include/footer.jsp"></jsp:include>
<script src="/js/dropdown.js"></script>
</body>
</html>
