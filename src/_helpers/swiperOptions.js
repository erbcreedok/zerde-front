export const blogsSwiperOptions = {
  slidesPerView: 4,
  preventClicks: false,
  spaceBetween: 24,
  breakpoints: {
    600 : {
      slidesPerView: 'auto',
      spaceBetween: 0
    },
    
    1176 : {
      slidesPerView: 2,
      spaceBetween: 24
    }
  }
};

export const blogsAutoPlayOptions = {
  ...blogsSwiperOptions,
  speed: 400,
  preventClicks: false,
  freeMode: true,
  autoplay: {
    delay: 1500,
  }
};
