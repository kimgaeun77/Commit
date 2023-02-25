<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/include/head.jsp" %>

    <body>
      <div class="my-qna__wrapper--wrapper">
        <div class="my-qna__wrapper--header">
          <h1>${qnaDetail.TITLE}</h1>
          <span>${qnaDetail.MEM_ID}님 | ${qnaDetail.REG_DATE}</span>
        </div>
        <div class="my-qna__wrapper--main">
          <div class="my-qna__wrapper--main-items">
            <div class="my-qna__wrapper--main-item">${qnaDetail.PRO_IDX}</div>
            <div class="my-qna__wrapper--main-item my-qna__wrapper--main-item-img">
              <img src="/uploadImg/${qnaDetail.MAIN_IMG}" alt="my qna item image" />
            </div>
            <div class="my-qna__wrapper--main-item">
              ${qnaDetail.NAME}
            </div>
            <div class="my-qna__wrapper--main-item">
              <fmt:formatNumber type="number" value="${qnaDetail.PRICE}" /> 원
            </div>
          </div>
          <div class="my-qna__wrapper--main-wrapper">
           <textarea class="my-qna__wrapper—main-content" spellcheck="false" readonly>${qnaDetail.CONTENT}</textarea>
            <div class="my-qna__wrapper--main-buttons">
              <button class="btn-secondary my-qna__button-update" data-qna_idx="${qnaDetail.QNA_IDX}">수정</button>
              <c:if test="${empty sessionScope.admin}"><%--admin일 때는 삭제 버튼 안 보이게--%>
                <button class="btn-secondary my-qna__button-delete">삭제</button>
              </c:if>
            </div>
          </div>
        </div>
        <div class="my-qna__wrapper-close">
          <button class="btn-secondary my-qna__wrapper-close-button">닫기</button>
        </div>
      </div>
      <script src="https://code.jquery.com/jquery-latest.min.js"></script>
      <script src="/js/mypage/myQnaDetail.js"></script>
    </body>

    </html>