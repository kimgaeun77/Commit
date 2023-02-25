<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
   <header class="header">
     <h1 class="header__logo">
       <a href="/main"><img src="/assets/main/commit_logo.PNG" alt="logo" /></a>
     </h1>
     <nav class="header__navbar">
       <ul class="header__navbar--items">
         <li><a href="/pro/list?PRO_GROUP=PC">컴퓨터</a></li>
         <li><a href="/pro/list?PRO_GROUP=STUFF">부품</a></li>
         <li><a href="/estimate/main">견적</a></li>
         <li><a href="/notice/list">커밋소식</a></li>
         <li><a href="/coupon/list">이벤트</a></li>
       </ul>
     </nav>

     <ul class="header__icons">
       <li>
         <a href="/basket/main"><i class="bi bi-cart-fill"></i></a>
       </li>
       <li>
         <div class="header-icon-drop">
           <i class="bi bi-person-fill"></i>
           <i class="bi bi-caret-down-fill icons-caret"></i>
         </div>
         <!-- 아이콘 2번째 드롭다운 박스 ul 태그 중첩 -->
         <div class="header-dropdown">
           <ul>
             <c:set var="session" value="${sessionScope.MEM_ID}" />
             <c:if test="${empty session}">
               <!-- 로그인이 되어있지 않은경우에만 보임 -->
               <li>
                 <a href="/member/login">
                   <i class="bi bi-box-arrow-in-right"></i>
                   <span>로그인</span>
                 </a>
               </li>

               <li>
                 <a href="/member/join">
                   <i class="bi bi-person-plus"></i>
                   <span>회원가입</span>
                 </a>
               </li>
            </c:if>

             <c:set var="admin" value="${sessionScope.admin}" />
             <c:if test="${not empty admin}">
              <li>
                <a href="/admin/main">
                  <i class="bi bi-shield-exclamation"></i>
                  <span>관리자 페이지</span>
                </a>
              </li>
             </c:if>
             <c:set var="session" value="${sessionScope.MEM_ID}" /><!-- 로그인이 되어있는 경우에만 보임 -->
             <c:if test="${not empty session}">
               <li>
                 <a href="/mypage/main">
                   <i class="bi bi-house-door"></i>
                   <span> 마이페이지 </span>
                 </a>
               </li>
             </c:if>
             <c:set var="session" value="${sessionScope.MEM_ID}" /><!-- 로그인이 되어있는 경우에만 보임 -->
             <c:if test="${not empty session}">
               <li>
                 <a href="/member/logout">
                   <i class="bi bi-box-arrow-right"></i>
                   <span> 로그아웃 </span>
                 </a>
               </li>
             </c:if>
           </ul>
         </div>
       </li>
     </ul>
   </header>