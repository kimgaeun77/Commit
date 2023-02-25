const addPro = document.querySelector(".addpro");
const addCoupon = document.querySelector(".addcoupon");

addPro.addEventListener("click", () => {
	window.open(
		"/admin/pro/add",
		"Child",
		"width = 800, height = 600, top = 50, left = 50"
	);
});
addCoupon.addEventListener("click", () => {
	window.open(
		"/coupon/admin/add",
		"Child",
		"width = 800, height = 600, top = 50, left = 50"
	);
});
