const closeButton = document.querySelector('.my-order__close');
closeButton.addEventListener('click', function(){
    window.close();
})

//배송 상태 + 결제 type 값에 따라 값 설정
$(function () {
    // 결제 방법
    const payType = document.querySelector('.pay-type');

    switch (payType.innerText) {
        case 'CC':
            payType.innerText = '카드 결제';
            break;

        case 'DB':
            payType.innerText = '무통장입금';
            break;

        case 'BT':
            payType.innerText = '계좌이체';
            break;
    }

    //주문 상태
    const orderState = document.querySelector('.order-state');

    switch (orderState.innerText) {
        case 'A':
            orderState.innerText = '교환 환불 처리중';
            break;

        case 'B':
            orderState.innerText = '배송 준비중';
            break;

        case 'C':
            orderState.innerText = '배송중';
            break;

        case 'D':
            orderState.innerText = '배송 완료';
            break;

        case 'E':
            orderState.innerText = '교환 환불 완료';
            break;
    }
});

const reviewButton = document.querySelectorAll('.write-review');

for(let i = 0; i < reviewButton.length; i++){
    reviewButton[i].addEventListener('click', function() {
        const order_idx = reviewButton[i].dataset.order_idx;
        const pro_idx = reviewButton[i].dataset.pro_idx;
        window.open(
            '/review/write?ORDER_IDX=' + order_idx + '&PRO_IDX='+ pro_idx,
            'Child',
            'width = 800, height = 1000, top = 50, left = 50'
        );
    });
}