const plusButton = document.querySelector(".product-add__plus");
const minusButton = document.querySelector(".product-add__minus");
const productQuantity = document.querySelector(".product-quantity");
const productPrice = document.querySelector(".product-price__price");
const addToCart = document.querySelector(".add-to__cart");
const addToBuy = document.querySelector(".add-to__buy");
const productNumber = document.querySelector(".product-number");
const qnaItemTitle = document.querySelectorAll(".qna-item__title");
const qnaWrite = document.querySelector(".qna_write");
const memId = document.querySelector(".mem_id");
const admin = document.querySelector(".admin");

qnaWrite.addEventListener("click", () => {
    window.open(
        "/qna/write?PRO_IDX=" + productNumber.value,
        "Child",
        "width = 800, height = 800"
    );
});

let initialQuantity = 1;
const regax = /[^0-9]/g;

productQuantity.value = initialQuantity;

const calcPrice = () => {
    console.log(productPrice.innerHTML);
    let price = parseInt(productPrice.innerHTML.replace(regax, ""));
    let productAddTotalPrice = document.querySelector(
        ".product-add__total-price"
    );
    let totalPrice = (price * initialQuantity).toLocaleString();
    productAddTotalPrice.innerHTML = `${totalPrice} 원`;
    let productTotalPrice = document.querySelector(".product-total__total-price");
    productTotalPrice.innerHTML = `${totalPrice} 원`;
};

const onClickPlusButton = () => {
    initialQuantity++;
    productQuantity.value = initialQuantity;
    calcPrice();
};

const onClickMinusButton = () => {
    if (initialQuantity > 1) {
        initialQuantity--;
        productQuantity.value = initialQuantity;
        calcPrice();
    }
};

plusButton.addEventListener("click", onClickPlusButton);

minusButton.addEventListener("click", onClickMinusButton);

addToCart.addEventListener("click", async () => {
    const productNum = parseInt(productNumber.value);
    const obj = {AMOUNT: initialQuantity, PRO_IDX: productNum};
    const objJson = JSON.stringify(obj);
    $.ajax({
        type: "POST",
        url: "/basket/add",
        data: objJson,
        contentType: "application/json",
        beforeSend: function (xmlHttpRequest) {
            xmlHttpRequest.setRequestHeader("AJAX", "true");
        },
        success: function () {
            let answer = confirm(
                "장바구니에 추가되었습니다. 장바구니로 이동하시겠습니까?"
            );
            if (answer === true) {
                location.href = "/basket/main";
            }
        },
        error: function (error) {
            if (error.status == 400) {
                alert("로그인이 필요합니다");
                location.href = "/member/login";
            }
        },
    });
});

addToBuy.addEventListener("click", () => {
    const data_pro = parseInt(productNumber.value);
    const data_amount = initialQuantity;
    sendData("/pro/order", {PRO_IDX: data_pro, AMOUNT: data_amount}, "get");
});

function sendData(path, parameters, method) {
    const form = document.createElement("form");
    form.method = method;
    form.action = path;
    document.body.appendChild(form);

    for (const key in parameters) {
        const formField = document.createElement("input");
        formField.type = "hidden";
        formField.name = key;
        formField.value = parameters[key];

        form.appendChild(formField);
    }
    form.submit();
}

for (const qnaTitle of qnaItemTitle) {
    qnaTitle.addEventListener("click", () => {
        const wrapper = document.querySelector(
            ".product-info__footer-qna--main-content"
        );
        wrapper.classList.toggle("open");
    });
}
/*---------------------------- 상품 정보 및 상품 사진 그려주는 곳 ---------------------*/
const renderDetailPage = async () => {
    const postData = {
        PRO_IDX: parseInt(productNumber.value)
    };
    let reviewCurrentPage = 1;
    let qnaCurrentPage = 1;
    try {
        const res = await axios.post("/pro/detail", JSON.stringify(postData), {
            headers: {"Content-Type": `application/json`},
        });
        const data = res.data;
        // 받아온 데이터가 아예 없을 때
        if(data.detail === null){
            alert('잘못된 접근입니다.');
            location.href = '/main';
            return;
        }
        
        if (data.detail.STOCK === 0) {
            addToBuy.innerText = '　품절　';
            addToBuy.disabled = true;
        }

        const {image, qna, review, detail} = data;

        const detailMainImageWrapper = document.querySelector(
            ".product-detail__img"
        );
        const detailMainImage = document.createElement("img");
        detailMainImage.src = "/uploadImg/" + detail.MAIN_IMG;
        detailMainImageWrapper.appendChild(detailMainImage);
        // 디테일 메인 가격
        productPrice.textContent = `${detail.PRICE.toLocaleString()} 원`;
        // 디테일 이름
        const detailTitle = document.querySelector(".product-detail__title");
        detailTitle.textContent = detail.NAME;
        //디테일 서브이름
        const detailSubTitle = document.querySelector(".product-sub-title");
        detailSubTitle.textContent = detail.NAME;
        //상품추가 토탈 가격
        const detailAddTotalPrice = document.querySelector(
            ".product-add__total-price"
        );
        detailAddTotalPrice.textContent = `${detail.PRICE.toLocaleString()} 원`;
        //디데일 토탈 가격
        const detailTotalPrice = document.querySelector(
            ".product-total__total-price"
        );
        detailTotalPrice.textContent = `${detail.PRICE.toLocaleString()} 원`;
        //디테일 상세정보 이미지
        const detailDetailImageWrapper = document.querySelector(
            ".product-info__footer-image"
        );
        image.map((image) => {
            const detailDetailImage = document.createElement("img");
            detailDetailImage.src = `/uploadImg/${image.STORED_NAME}`;
            detailDetailImageWrapper.appendChild(detailDetailImage);
        });
/*---------------------------- 상품 리뷰 그려주는 곳 ------------------------*/
   
        const detailReviewWrapper = document.querySelector(
            ".product-info__footer-review"
        );

        const renderReview = (reviewData) => {
            if (reviewData.length === 0) {
                const reviewPrev = document.querySelector(".review-page-prev");
                const reviewNext = document.querySelector(".review-page-next");

                reviewPrev.style.display = "none";
                reviewNext.style.display = "none";

                const noReview = document.createElement("div");
                noReview.classList.add("no_data_text");
                noReview.innerHTML = "작성된 리뷰가 없습니다.";
                const target = document.querySelector(".product-info__footer-review");
                target.appendChild(noReview);
                return;
            }

            reviewData.map((item) => {
                const reviewItemWrapper = document.createElement("div");
                reviewItemWrapper.classList.add("product-info__footer-review--item");
                const reviewItemTitle = document.createElement("div");
                reviewItemTitle.classList.add("review--item__title");
                const title = document.createElement("h3");
                title.textContent = item.MEM_ID;
                const titleCenter = document.createElement("span");
                titleCenter.textContent = "|";
                const titleDate = document.createElement("p");
                titleDate.textContent = item.REG_DATE;

                reviewItemTitle.appendChild(title);
                reviewItemTitle.appendChild(titleCenter);
                reviewItemTitle.appendChild(titleDate);

                const reviewItemMain = document.createElement("div");
                reviewItemMain.classList.add("review--item__main");
                const reviewTitle = document.createElement("h1");
                reviewTitle.textContent = item.TITLE;
                const reviewContent = document.createElement("span");
                reviewContent.textContent = item.CONTENT;
                //세션에 로그인 되어있는 사용자와 리뷰 작성자가 같을 경우에만 리뷰 삭제 표시
                if (memId.innerHTML == item.MEM_ID) {

                    const reviewDeleteButton = document.createElement("div");
                    reviewDeleteButton.classList.add("review--item__delete");
                     reviewDeleteButton.dataset.reviewIdx = item.REVIEW_IDX;
                    const reviewDeleteButtonIcon = document.createElement("i");
                    reviewDeleteButtonIcon.classList.add("bi-trash3");
                    reviewDeleteButtonIcon.classList.add("bi");

                    reviewDeleteButton.appendChild(reviewDeleteButtonIcon);
                    reviewItemMain.appendChild(reviewDeleteButton);
                }
                reviewItemMain.appendChild(reviewTitle);
                reviewItemMain.appendChild(reviewContent);
                reviewItemWrapper.appendChild(reviewItemTitle);
                reviewItemWrapper.appendChild(reviewItemMain);
                detailReviewWrapper.appendChild(reviewItemWrapper);
            });
            $(".disable").css("display", "none");
            const deleteReviewButton = document.querySelectorAll(".review--item__delete");
            for (let i = 0; i < deleteReviewButton.length; i++) {
                deleteReviewButton[i].addEventListener("click", () => {
                    let answer = confirm("삭제하시겠습니까?");
                    if (answer === true) {
                        const index = deleteReviewButton[i].dataset.reviewIdx;
                        const data = {REVIEW_IDX: index};
                        axios.post("/review/delete", JSON.stringify(data), {
                            headers: {"Content-Type": `application/json`},
                        }).then((res) =>{
                            alert(res.data);//삭제되었는지, 삭제되지 않았는지 나오는 알림창
                            location.reload();
                        }).catch(error =>{
                            console.log(error);
                        });

                    }
                });
            }
        };
        if (reviewCurrentPage === 1) {
            const data = [...review].slice(0, 8);// 한 페이지 당 8개씩 보여줌.
            renderReview(data);
        }
        renderPageList([...review], reviewCurrentPage, renderReview);
        /*----------------------------- 리뷰 페이징 그려주는 곳 2 --------------------------------*/
        const reviewPaginationItem = document.querySelectorAll(".review-page-item");
        if (reviewPaginationItem.length > 0) {
            reviewPaginationItem[0].classList.add("is-active");
            for (const pageItem of reviewPaginationItem) {
                pageItem.addEventListener("click", () => {
                    reviewPaginationItem.forEach((v) => v.classList.remove("is-active"));
                    pageItem.classList.add("is-active");
                    reviewCurrentPage = parseInt(pageItem.childNodes[0].innerHTML);
                    console.log(reviewCurrentPage);
                    if (reviewCurrentPage === 1) {
                        detailReviewWrapper.innerHTML =
                            '<h1 class="product-info__footer-review--title">Review</h1>';
                        const data = [...review].slice(
                            reviewCurrentPage - 1,
                            reviewCurrentPage * 8
                        );
                        renderReview(data);
                    } else {
                        const data2 = [...review].slice(
                            (reviewCurrentPage - 1) * 8,
                            reviewCurrentPage * 8
                        );
                        console.log(data2);
                        detailReviewWrapper.innerHTML =
                            '<h1 class="product-info__footer-review--title">Review</h1>';
                        renderReview(data2);
                    }
                });
            }
        }
/*---------------------------- 상품 qna 그려주는 곳 ---------------------*/
        const detailQnaWrapper = document.querySelector(
            ".product-info__footer-main-wrapper"
        );

        //원 본
        const qnaQnaList = [...qna].filter((v) => v.RE_STEP === 0);
        //답 변
        const qnaComment = [...qna].filter((comment) => comment.RE_STEP === 1);
        qnaComment.map((comment) => {
            qnaQnaList.map((qna) => {
                if (comment.REF === qna.REF) {
                    qna.comment = comment;
                }
            });
        });
        console.log(qnaQnaList);

        const renderQna = (qna) => {
            if (qna.length === 0) {
                const qnaPrev = document.querySelector(".qna-page-prev");
                const qnaNext = document.querySelector(".qna-page-next");

                qnaPrev.style.display = "none";
                qnaNext.style.display = "none";

                const noQna = document.createElement("div");
                noQna.classList.add("no_data_text");
                noQna.innerHTML = "작성된 Q&A가 없습니다.";
                const target = document.querySelector(".product-info__footer-qna");
                target.appendChild(noQna);
                return;
            }

            const renderQnaWrapper = document.querySelector(
                ".product-info__footer-qna"
            );
            const qnaWrapper = document.querySelector(
                ".product-info__footer-main-wrapper"
            );
            qna.map((item, index) => {
                const qnaMainWrapper = document.createElement("div");
                qnaMainWrapper.classList.add("product-info__footer-qna-main");
                qnaWrapper.appendChild(qnaMainWrapper);
                const qnaMainItems = document.createElement("div");
                qnaMainItems.classList.add("product-info__footer-qna--main-items");
                qnaMainWrapper.appendChild(qnaMainItems);
                for (let i = 0; i < 5; i++) {
                    const qnaMainItem = document.createElement("div");
                    qnaMainItem.classList.add("product-info__footer-qna--main-item");
                    if (i === 0) {
                        qnaMainItem.textContent = item.MEM_ID;
                    } else if (i === 1) {
                        if (item.QNA_TYPE === "D") {
                            qnaMainItem.textContent = "배송";
                        } else if (item.QNA_TYPE === "E") {
                            qnaMainItem.textContent = "기타";
                        } else if (item.QNA_TYPE === "P") {
                            qnaMainItem.textContent = "상품";
                        }
                    } else if (i === 2) {
                        qnaMainItem.textContent = item.TITLE;
                        qnaMainItem.classList.add("qna-item__title");
                        qnaMainItem.addEventListener("click", () => {
                            const qnaMainContent = document.querySelectorAll(
                                ".product-info__footer-qna--main-content"
                            );
                            qnaMainContent[index].classList.toggle("open");
                        });
                    } else if (i === 3) {
                        qnaMainItem.textContent = item.REG_DATE;
                    } else if (i === 4) {
                        qnaMainItem.textContent = item.QNA_IDX;
                        qnaMainItem.classList.add("root_idx");
                        qnaMainItem.classList.add("disable");
                    }
                    qnaMainItems.appendChild(qnaMainItem);
                }
                $(".disable").css("display", "none");
                const qnaMainContent = document.createElement("div");
                qnaMainContent.classList.add("product-info__footer-qna--main-content");
                const qnaMainContentTitle = document.createElement("span");
                qnaMainContentTitle.textContent = item.CONTENT;
                qnaMainContent.appendChild(qnaMainContentTitle);
                if (admin.innerHTML == "Y") {
                    const qnaMainContentButton = document.createElement("button");
                    qnaMainContentButton.type = "button";
                    qnaMainContentButton.classList.add("btn-secondary");
                    qnaMainContentButton.classList.add("qna-content-add");
                    qnaMainContentButton.textContent = "답변 달기";
                    qnaMainContent.appendChild(qnaMainContentButton);
                }

                qnaMainWrapper.appendChild(qnaMainContent);
                if (item.comment !== undefined) {
                    const qnaCommentWrapper = document.createElement("div");
                    qnaCommentWrapper.classList.add(
                        "product-info__footer-qna--commnet-items"
                    );
                    for (let i = 0; i < 4; i++) {
                        const qnaCommentItem = document.createElement("div");
                        qnaCommentItem.classList.add(
                            "product-info__footer-qna--comment-item"
                        );
                        switch (i) {
                            case 0:
                                qnaCommentItem.textContent = item.comment.MEM_ID;
                                break;
                            case 1:
                                qnaCommentItem.textContent = "답변";
                                break;
                            case 2:
                                qnaCommentItem.textContent = `[답변] ${item.comment.TITLE}`;
                                qnaCommentItem.classList.add("qna-item__title");
                                qnaCommentItem.addEventListener("click", (e) => {
                                    e.target.parentNode.parentNode.childNodes[3].classList.toggle(
                                        "open"
                                    );
                                });
                                break;
                            case 3:
                                qnaCommentItem.textContent = item.comment.REG_DATE;
                                break;
                        }
                        qnaCommentWrapper.appendChild(qnaCommentItem);
                    }
                    const qnaCommentArrow = document.createElement("div");
                    qnaCommentArrow.classList.add("comment-arrow");
                    const arrow = document.createElement("i");
                    arrow.classList.add("bi-arrow-return-right");
                    arrow.classList.add("bi");
                    qnaCommentArrow.appendChild(arrow);
                    const qnaCommentContent = document.createElement("div");
                    qnaCommentContent.classList.add(
                        "product-info__footer-qna--comment-content"
                    );
                    const qnaCommentContentTitle = document.createElement("span");
                    qnaCommentContentTitle.innerHTML = item.comment.CONTENT;
                    qnaCommentWrapper.appendChild(qnaCommentArrow);
                    qnaCommentContent.appendChild(qnaCommentContentTitle);

                    if (admin.innerHTML == "Y") {

                        //관리자 답변 삭제 버튼 생성
                        const qnaDeleteButton = document.createElement("div");
                        qnaDeleteButton.classList.add("qna--item__delete");
                        qnaDeleteButton.dataset.ref =  item.comment.REF;
                        const qnaDeleteButtonIcon = document.createElement("i");
                        qnaDeleteButtonIcon.classList.add("bi");
                        qnaDeleteButtonIcon.classList.add("bi-trash3");
                        qnaDeleteButtonIcon.classList.add("qna-delete");
                        qnaDeleteButton.appendChild(qnaDeleteButtonIcon);
                        qnaCommentContent.appendChild(qnaDeleteButton);


                        //관리자 답변 수정 버튼 생성
                        const qnaUpdateButton = document.createElement("div");
                        qnaUpdateButton.classList.add("qna--item__update");
                        qnaUpdateButton.dataset.qnaIdx =  item.comment.QNA_IDX;
                        const qnaUpdateButtonIcon = document.createElement("i");
                        qnaUpdateButtonIcon.classList.add("bi");
                        qnaUpdateButtonIcon.classList.add("bi-pencil");
                        qnaUpdateButtonIcon.classList.add("qna-update");
                        qnaUpdateButton.appendChild(qnaUpdateButtonIcon);
                        qnaCommentContent.appendChild(qnaUpdateButton);

                    }

                    qnaMainWrapper.appendChild(qnaCommentWrapper);
                    qnaMainWrapper.appendChild(qnaCommentContent);
                }
            });

            //관리자 답변 삭제
            const qnaDeleteButton = document.querySelectorAll('.qna--item__delete');
            for(let i = 0; i < qnaDeleteButton.length; i++){
                qnaDeleteButton[i].addEventListener('click',()=>{
                    const qnaIdx = qnaDeleteButton[i].dataset.ref;
                    const deleteQna = {REF : qnaIdx}
                    const answer = confirm('삭제하시겠습니까?');
                    if (answer === true) {
                        $.ajax({
                            type: 'post',
                            url: '/qna/delete',
                            data: JSON.stringify(deleteQna),
                            contentType: 'application/json; charset=utf-8',
                            success: function () {
                                alert('삭제되었습니다.');
                                location.reload();
                            },
                            error: function (error) {
                                alert('삭제에 실패하였습니다.');
                            }
                        });
                    } else {
                        return false;
                    }

                })
            }
            //관리자 답변 수정
            const qnaUpdateButton = document.querySelectorAll('.qna--item__update');

            for (let i = 0; i < qnaUpdateButton.length; i++) {
                qnaUpdateButton[i].addEventListener("click", function () {
                    const qna_idx = qnaUpdateButton[i].dataset.qnaIdx;
                    window.open(
                        "/mypage/myQnaDetail?QNA_IDX=" + qna_idx,
                        "Child",
                        "width = 800, height = 600, top = 50, left = 50"
                    );
                });
            }
            //관리자 답변 달기
            const answerButton = document.querySelectorAll(".qna-content-add");
            const root_idx = document.querySelectorAll(".root_idx");
            for (let i = 0; i < answerButton.length; i++) {
                answerButton[i].addEventListener("click", () => {
                    window.open(
                        "/qna/write?PRO_IDX=" +
                        productNumber.value +
                        "&ROOT_IDX=" +
                        root_idx[i].innerHTML,
                        "Child",
                        "width = 800, height = 800"
                    );
                });
            }

            renderQnaWrapper.appendChild(qnaWrapper);
        };


        if (qnaCurrentPage === 1) {
            //detailQnaWrapper.innerHTML = '';
            const data = [...qnaQnaList].slice(0, 8);
            renderQna(data);
        }

        renderQnaPageList([...qnaQnaList], qnaCurrentPage, renderQna);
        const qnaPaginationItem = document.querySelectorAll(".qna-page-item");

        if (qnaPaginationItem.length > 0) {
            qnaPaginationItem[0].classList.add("is-active");
            for (const pageItem of qnaPaginationItem) {
                pageItem.addEventListener("click", () => {
                    qnaPaginationItem.forEach((v) => v.classList.remove("is-active"));
                    pageItem.classList.add("is-active");
                    qnaCurrentPage = parseInt(pageItem.childNodes[0].innerHTML);
                    console.log(qnaCurrentPage);
                    if (qnaCurrentPage === 1) {
                        detailQnaWrapper.innerHTML = "";
                        const data = [...qnaQnaList].slice(
                            qnaCurrentPage - 1,
                            qnaCurrentPage * 8
                        );
                        renderQna(data);
                    } else {
                        console.log(qnaCurrentPage);
                        console.log((qnaCurrentPage - 1) * 8, qnaCurrentPage * 8);
                        const data2 = [...qnaQnaList].slice(
                            (qnaCurrentPage - 1) * 8,
                            qnaCurrentPage * 8
                        );
                        console.log(data2);
                        detailQnaWrapper.innerHTML = "";
                        renderQna(data2);
                    }
                });
            }
        }
    } catch (err) {
        console.error(err);
    }
};
/*----------------------------- 리뷰 페이징 그려주는 곳 1 --------------------------------*/
const renderPageList = (list, reviewCurrentPage, renderReview) => {
    const newList = [...list];

    if (newList.length === 0) {
        return;
    }

    const total_Block = Math.ceil(newList.length / 8); //21 -> 3
    console.log(total_Block);

    const reviewPrev = document.querySelector(".review-page-prev");
    const reviewNext = document.querySelector(".review-page-next");

    if (total_Block <= 5) {//전체 블럭이 5보다 작다면
        reviewPrev.style.display = "none";
        reviewNext.style.display = "none";
    }
    const renderPageItem = (i) => {
        const reviewPageOl = document.querySelector(".review-page-list");
        //ol 태그에 넣을 li태그 생성 및 페이징 넘버생성
        const pageListItem = document.createElement("li");
        pageListItem.classList.add("page-item");
        pageListItem.classList.add("pc-item__page");
        pageListItem.classList.add(`review-page-item`);
        const pageListSpan = document.createElement("span");
        pageListSpan.textContent = i + 1;
        pageListItem.appendChild(pageListSpan);
        reviewPageOl.appendChild(pageListItem);
    };

    for (let i = 0; i < total_Block; i++) {//리뷰 페이지 블럭을 그려줌
        renderPageItem(i);
    }

    const reviewPageItem = document.querySelectorAll(".review-page-item");
    const reviewPageBlock = Math.ceil(total_Block / 5);//total page block이 6이라면 review블럭은 총 2가 나옴
    console.log(reviewPageBlock);
    let reviewCurrentBlock = 0;
    const nextButton = document.querySelector(".review-page-next");
    const prevButton = document.querySelector(".review-page-prev");

    reviewPageItem.forEach((v) => {
        v.style.display = "none";
    });

    if (reviewPageBlock > 1) {//6페이지 이상 있다면
        for (let i = 0; i < 5; i++) {
            reviewPageItem[i].style.display = "block";
        }
    } else if (reviewPageBlock === 1) {
        for (let i = 0; i < reviewPageItem.length; i++) {
            reviewPageItem[i].style.display = "block";
        }
    }

    nextButton.addEventListener("click", () => {
        if (reviewCurrentBlock < reviewPageBlock - 1) { // 0 2-1
            reviewPageItem.forEach((v) => {
                v.style.display = "none";
                v.classList.remove("is-active");
            });
        }
        if (reviewCurrentBlock < reviewPageBlock - 1) {
            reviewCurrentBlock++;//1
            reviewCurrentPage = reviewCurrentBlock * 5 + 1;//6
            const detailReviewWrapper = document.querySelector(
                ".product-info__footer-review"
            );
            const data2 = [...list].slice(
                (reviewCurrentPage - 1) * 8,
                reviewCurrentPage * 8
            );
            detailReviewWrapper.innerHTML =
                '<h1 class="product-info__footer-qna--title">Review</h1>';
            renderReview(data2);
            reviewPageItem[reviewCurrentPage - 1].classList.add("is-active");
            for (
                let i = reviewCurrentBlock * 5;//5
                i < (reviewCurrentBlock + 1) * 5;//10
                i++
            ) {
                if (i < reviewPageItem.length) {//7
                    reviewPageItem[i].style.display = "block";
                }
            }
        } else {
            return;
        }
    });
    prevButton.addEventListener("click", () => {
        if (reviewCurrentBlock > 0) {
            reviewCurrentBlock--;
            console.log(reviewCurrentBlock);
            reviewPageItem.forEach((v) => {
                v.style.display = "none";
                v.classList.remove("is-active");
            });
            reviewCurrentPage = reviewCurrentBlock * 5 + 1;
            const detailReviewWrapper = document.querySelector(
                ".product-info__footer-review"
            );
            const data2 = [...list].slice(
                (reviewCurrentPage - 1) * 8,
                reviewCurrentPage * 8
            );
            detailReviewWrapper.innerHTML =
                '<h1 class="product-info__footer-qna--title">Review</h1>';
            renderReview(data2);
            reviewPageItem[reviewCurrentPage - 1].classList.add("is-active");
            for (
                let i = reviewCurrentBlock * 5;
                i < (reviewCurrentBlock + 1) * 5;
                i++
            ) {
                reviewPageItem[i].style.display = "block";
            }
        } else {
            return;
        }
    });
};
/*------------------------------ qna 페이징 그려주는 곳 --------------------------*/
const renderQnaPageList = (list, qnaCurrentPage, renderQna) => {
    if (list.length === 0) {
        return;
    }
    const totalPageItem = Math.ceil(list.length / 8);

    console.log(totalPageItem);

    const qnaPrev = document.querySelector(".qna-page-prev");
    const qnaNext = document.querySelector(".qna-page-next");

    if (totalPageItem <= 5) {
        //총 페이지 블럭이 5개라도 <> 는 그려줌.
        qnaPrev.style.display = "none";
        qnaNext.style.display = "none";
    }

    const qnaPageOl = document.querySelector(".qna-page-list");

    //li태그 생성
    for (let i = 0; i < totalPageItem; i++) {
        const pageListItem = document.createElement("li");
        pageListItem.classList.add("page-item");
        pageListItem.classList.add("pc-item__page");
        pageListItem.classList.add(`qna-page-item`);
        const pageListSpan = document.createElement("span");
        pageListSpan.textContent = i + 1;
        pageListItem.appendChild(pageListSpan);
        qnaPageOl.appendChild(pageListItem);
    }

    const qnaPageItem = document.querySelectorAll(".qna-page-item");
    const qnaPageBlock = Math.ceil(qnaPageItem.length / 5);
    let qnaCurrentBlock = 0;
    const nextButton = document.querySelector(".qna-page-next");
    const prevButton = document.querySelector(".qna-page-prev");
    qnaPageItem.forEach((v) => {
        v.style.display = "none";
    });

    if (qnaPageBlock > 1) {
        for (let i = 0; i < 5; i++) {
            qnaPageItem[i].style.display = "block";
        }
    } else if (qnaPageBlock === 1) {
        for (let i = 0; i < qnaPageItem.length; i++) {
            qnaPageItem[i].style.display = "block";
        }
    }
    nextButton.addEventListener("click", () => {
        if (qnaCurrentBlock < qnaPageBlock - 1) {
            qnaPageItem.forEach((v) => {
                v.style.display = "none";
                v.classList.remove("is-active");
            });
        }
        if (qnaCurrentBlock < qnaPageBlock - 1) {

            qnaCurrentBlock++;
            qnaCurrentPage = qnaCurrentBlock * 5 + 1;
            const detailQnaWrapper = document.querySelector(
                ".product-info__footer-main-wrapper"
            );
            const data2 = [...list].slice(
                (qnaCurrentPage - 1) * 8,
                qnaCurrentPage * 8
            );
            detailQnaWrapper.innerHTML = "";
            renderQna(data2);
            qnaPageItem[qnaCurrentPage - 1].classList.add("is-active");
            for (
                let i = qnaCurrentBlock * 5;
                 i < (qnaCurrentBlock + 1) * 5;
                 i++
                )
            {
                if (i < qnaPageItem.length) {
                    qnaPageItem[i].style.display = "block";
                }
            }
        } else {
            return;
        }
        prevButton.addEventListener("click", () => {
            if (qnaCurrentBlock > 0) {
                qnaCurrentBlock--;
                qnaPageItem.forEach((v) => {
                    v.style.display = "none";
                    v.classList.remove("is-active");
                });
                qnaCurrentPage = qnaCurrentBlock * 5 + 1;
                const detailQnaWrapper = document.querySelector(
                    ".product-info__footer-main-wrapper"
                );
                const data2 = [...list].slice(
                    (qnaCurrentPage - 1) * 8,
                    qnaCurrentPage * 8
                );
                detailQnaWrapper.innerHTML = "";
                renderQna(data2);
                qnaPageItem[qnaCurrentPage - 1].classList.add("is-active");
                for (let i = qnaCurrentBlock * 5; i < (qnaCurrentBlock + 1) * 5; i++) {
                        qnaPageItem[i].style.display = "block";
                }
            } else {
                return;
            }
        });
    });
};
$(".disable").css("display", "none");
window.addEventListener("load", renderDetailPage);
