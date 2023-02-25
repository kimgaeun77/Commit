<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/include/head.jsp" %>

<body>
<!---------------------------- header 영역 --------------------------------------->
<jsp:include page="/WEB-INF/include/header.jsp"></jsp:include>
<!-------------------------------- main 부분 ------------------------------->
<main>

  <section class="carousel-wrapper">
    <h1 class="sr-only">carousel</h1>
    <div class="carousel-prev"><i class="bi bi-chevron-left"></i></div>
    <div class="carousel-next"><i class="bi bi-chevron-right"></i></div>
    <div class="carousel__items">
      <div class="carousel__item" style="background-color: #000000; position : relative;">
        <img class="carousel__item--image" src="/assets/main/검은_배경_화면.PNG" alt="검은_배경_화면" />
        <div style="position: absolute; margin-bottom: 230px; font-weight: bold; color: white; font-size: 50px; margin-left: -175px">
          <p>COMMIT &nbsp;X</p>
        </div>
        <div style="position: absolute;">
          <img src="/assets/main/asus_logo.png" alt="아수스_로고"
               style="margin-bottom: 220px; margin-left: 300px; height: 150px;">
        </div>
        <div style="position: absolute;">
          <img src="/assets/main/아수스_로고2.png" alt="아수스_로고2"
               style="margin-bottom: 350px; margin-left: 300px; height: 70px;">
        </div>
        <div style="position: absolute; margin-bottom: 120px; color: darkorchid; font-size: 20px; margin-left: 45px">
          <p>역대급 콜라보레이션</p>
        </div>
        <div style="position: absolute;">
          <img src="/assets/main/main_banner_img.png" alt="메인배너_컴퓨터사진"
               style="height: 200px; margin-left: -300px; margin-top: 150px;">
        </div>
        <div style="position: absolute;">
          <img src="/assets/main/main_banner_img2.png" alt="메인배너_컴퓨터사진_2"
               style="height: 200px; margin-top: 150px; margin-left: -100px">
        </div>
        <div style="position: absolute;">
          <img src="/assets/main/main_banner_img3.png" alt="메인배너_컴퓨터사진_3"
               style="height: 200px; margin-left: 220px; margin-top: 150px;">
        </div>
        <div style="position: absolute;">
          <img src="/assets/main/main_banner_img4.png" alt="메인배너_컴퓨터사진_4"
               style="height: 210px; margin-left: 520px; margin-top: 150px;">
        </div>
      </div>
      <div class="carousel__item" style="background-color: #7a31b6;">
        <img class="carousel__item--image" src="/assets/main/antec.jpg" alt="main banner image kakao" />
      </div>
      <div class="carousel__item" style="background-color: #becec1;">
        <img class="carousel__item--image" src="/assets/main/zotac.jpg" alt="main banner image zotac" />
      </div>
    </div>
  </section>

  <!-- bestPc 게임용 -->
  <section class="section">
    <div class="pc">
      <div class="pc__desc">
        <h1 class="pc__title">Best Gaming PC</h1>
        <a href="/pro/list?PRO_GROUP=PC">
          <span class="pc__more">더보기</span>
        </a>
      </div>
      <ul class="pc__items">
        <c:forEach var="row" items="${gamingPC}">
          <li>
            <a class="pc__item" href="/pro/detail?PRO_IDX=${row.PRO_IDX}">
              <img class="pc__item--image" src="/uploadImg/${row.MAIN_IMG}" alt="computer" />
              <div class="circle">
                <span><i class="bi bi-lightning-charge-fill"></i></span>
              </div>
              <span class="pc__item--title">${row.NAME}</span>
              <span class="pc__item--price">판매가 :
                      <fmt:formatNumber type="number" value="${row.PRICE}" />원
                    </span>
            </a>
          </li>
        </c:forEach>
      </ul>
    </div>
  </section>

  <!-- Best Pc 사무용 -->
  <section class="section pc-office">
    <div class="pc">
      <div class="pc__desc">
        <h1 class="pc__title">Best Office PC</h1>
        <a href="/pro/list?PRO_GROUP=PC">
          <span class="pc__more">더보기</span>
        </a>
      </div>
      <ul class="pc__items">
        <c:forEach var="row" items="${officePC}">
          <li>
            <a class="pc__item" href="/pro/detail?PRO_IDX=${row.PRO_IDX}">
              <img class="pc__item--image" src="/uploadImg/${row.MAIN_IMG}" alt="computer" />
              <div class="circle">
                <span><i class="bi bi-lightning-charge-fill"></i></span>
              </div>
              <span class="pc__item--title">${row.NAME}</span>
              <span class="pc__item--price">판매가 :
                      <fmt:formatNumber type="number" value="${row.PRICE}" />원
                    </span>
            </a>
          </li>
        </c:forEach>
      </ul>
    </div>
  </section>
</main>
<jsp:include page="/WEB-INF/include/footer.jsp"></jsp:include>
<script src="/js/carousel.js"></script>
<script src="/js/dropdown.js"></script>
</body>

</html>