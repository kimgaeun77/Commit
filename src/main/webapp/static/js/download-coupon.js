const downloadButtons = document.querySelectorAll(".btn-secondary");
//console.log(downloadButtons);

for (let i = 0; i < downloadButtons.length; i++) {
	downloadButtons[i].addEventListener("click", function (e) {
		let couponNumber = downloadButtons[i].dataset.cpIdx;
		console.log(couponNumber);
		let downloadCoupon = { CP_IDX: couponNumber };

		//console.log("쿠폰 번호는 "+ couponNumber);
		$.ajax({
			type: "post",
			url: "/coupon/download",
			data: JSON.stringify(downloadCoupon),
			contentType: "application/json; charset=utf-8",
			beforeSend: function (xhr) {
				xhr.setRequestHeader("AJAX", "true");
			},
			success: function (resp) {
				alert(resp);
			},
			error: function (request) {
				console.log(request.status.data);
				if (request.status === 401) {
					alert("로그인이 필요합니다.");
					location.href = "/member/login";
				}
				if(request.status === 500){
					alert("잠시 후 다시 시도해 주세요.");
				}
			},
		});
	});
}
