document
    .querySelector('.my-qna__wrapper-close-button')
    .addEventListener('click', () => {
        window.close();
    });

//qna 수정
const updateButton = document.querySelector('.my-qna__button-update');
//qna 삭제
const deleteButton = document.querySelector('.my-qna__button-delete');

const content = document.querySelector('.my-qna__wrapper—main-content');

updateButton.addEventListener('click', function () {
    content.readOnly = false;
    const length = content.value.length;
    content.focus();
    content.setSelectionRange(length, length);
    updateButton.innerText = '저장';
    updateButton.classList.add('save-button');

    const saveButton = document.querySelector('.save-button');//저장버튼을 클릭했을때
    saveButton.addEventListener('click', function () {
        const updateContent = content.value;
        const qna_idx = updateButton.dataset.qna_idx;
        const updateQna = { CONTENT: updateContent, QNA_IDX: qna_idx }

        $.ajax({
            type: 'post',
            url: '/qna/update',
            data: JSON.stringify(updateQna),
            contentType: 'application/json; charset=utf-8',
            success: function () {
                alert('게시글 수정이 완료 되었습니다.');
                location.reload();
                opener.location.reload();

            },
            error: function (error) {
                alert('게시글 수정에 실패하였습니다.');
            }
        });
    })
});

deleteButton.addEventListener('click', function () {
    const answer = confirm('게시물을 삭제하시겠습니까?');
    if (answer === true) {
        const qna_idx = updateButton.dataset.qna_idx;
        const deleteQna = {REF : qna_idx}
        $.ajax({
            type: 'post',
            url: '/qna/delete',
            data: JSON.stringify(deleteQna),
            contentType: 'application/json; charset=utf-8',
            success: function () {
                alert('게시글 삭제가 완료 되었습니다.');
                opener.location.reload();
                window.close();
            },
            error: function (error) {
                alert('게시글 삭제에 실패하였습니다.');
            }
        });
    } else {
        return false;
    }
});