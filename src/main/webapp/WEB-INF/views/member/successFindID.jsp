<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/head.jsp" %>
  <body>
    <div class="search-id__wrapper">
      <h1 class="search-id__title">아이디 찾기</h1>
      <form>
        <div class="search-id__id">
          <label for="search-id__id-input">아이디</label>
          <input type="text" id="search-id__id-input" class="form-input" value="${MEM_ID}" readonly />
        </div>
        <div class="search-id__button--wrapper">
          <button type="button" class="search-id__button btn-secondary">닫기</button>
        </div>
      </form>
    </div>
    <script>
      const close_button = document.querySelector('.btn-secondary');
      close_button.addEventListener('click', function(){
        window.close();
      })
    </script>
  </body>
</html>