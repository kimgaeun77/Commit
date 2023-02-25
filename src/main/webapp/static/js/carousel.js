const carouselItems = document.querySelector(".carousel__items");
const carouselPrev = document.querySelector(".carousel-prev");
const carouselNext = document.querySelector(".carousel-next");
const carouselItem = document.querySelectorAll(".carousel__item");

let currentSlide = 0;

const onClickNextButton = () => {
  if (currentSlide < 2) {
    currentSlide++;
    carouselItems.style.transform = `translateX(-${
        (100 / carouselItem.length) * currentSlide
    }%)`;
  } else {
    currentSlide = 0;
    carouselItems.style.transform = `translateX(-${
        (100 / carouselItem.length) * currentSlide
    }%)`;
  }
};

const onClickPrevButton = () => {
  if (currentSlide > 0) {
    currentSlide--;
    carouselItems.style.transform = `translateX(-${
        (100 / carouselItem.length) * currentSlide
    }%)`;
  } else {
    currentSlide = 2;
    carouselItems.style.transform = `translateX(-${
        (100 / carouselItem.length) * currentSlide
    }%)`;
  }
};

carouselNext.addEventListener("click", onClickNextButton);
carouselPrev.addEventListener("click", onClickPrevButton);
