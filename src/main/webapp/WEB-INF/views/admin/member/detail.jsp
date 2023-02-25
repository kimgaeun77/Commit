<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/head.jsp" %> 
  <body>
    <div class="member-detail">
      <h1 class="member-detail__title">회원 상세</h1>
      <div class="member-detail__wrapper">
        <div class="member-detail__item">
          <span class="member-item__left">회원번호</span>
          <span class="member-item__right">${memberInfo.MEM_IDX }</span>
        </div>
        <div class="member-detail__item">
          <span class="member-item__left">아이디</span>
          <span class="member-item__right member-id">${memberInfo.MEM_ID }</span>
        </div>
        <div class="member-detail__item">
          <span class="member-item__left">이름</span>
          <span class="member-item__right">${memberInfo.MEM_NAME }</span>
        </div>
        <div class="member-detail__item">
          <span class="member-item__left">전화번호</span>
          <span class="member-item__right">${memberInfo.PHONE }</span>
        </div>
        <div class="member-detail__item">
          <span class="member-item__left">주소</span>
          <span class="member-item__right">${memberInfo.ROAD_ADDRESS } ${memberInfo.ADDRESS_DETAIL }</span>
        </div>
        <div class="member-detail__item">
          <span class="member-item__left">이메일</span>
          <span class="member-item__right">${memberInfo.EMAIL }</span>
        </div>
        <div class="member-detail__item">
          <span class="member-item__left">가입일</span>
          <span class="member-item__right">${memberInfo.REG_DATE }</span>
        </div>
      </div>
      <div class="member-detail__delete">
        <button class="btn-secondary">회원삭제</button>
      </div>
      <div class="member-detail__close">
        <button class="btn-secondary">닫기</button>
      </div>
    </div>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script>
      const closeButton = document.querySelector('.member-detail__close');
      const deleteButton = document.querySelector('.member-detail__delete');
      const member_id = document.querySelector('.member-id');
      closeButton.addEventListener('click', () => {
        window.close();
      });
      
      deleteButton.addEventListener('click', () => {
          let answer = confirm(
        	         '삭제하시겠습니까?'
        	      );  
          if (answer === true) {
  		obj = { MEM_ID: member_id.innerHTML};

  		const objJson = JSON.stringify(obj);

	  	axios
	  		.post('/admin/member/delete', objJson, {
	  			headers: {
	  				'Content-Type': 'application/json',
	  			},
	  		})
	  		.then((res) => axiosResult(res.data)
	  		);
	    	  alert('삭제되었습니다.');
	          window.close();
	          opener.location.reload();
	          
          }
	        });
    </script>
  </body>
</html>
