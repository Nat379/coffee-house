const burgerMenu = document.querySelector('.burger-menu');
const openBurgerMenu = document.querySelector('.open-burger-menu');
const menuLinks = document.querySelectorAll('.nav-link');

// burger-menu
burgerMenu.addEventListener('click', () => {
  burgerMenu.classList.toggle('active');
  openBurgerMenu.classList.toggle('active');
});

menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    burgerMenu.classList.remove('active');
    openBurgerMenu.classList.remove('active');
  });
});

// slider

const slider = document.querySelector('.row-slider');
const leftBtn = document.getElementById('btn-left');
const rightBtn = document.getElementById('btn-right');
const slides = document.querySelectorAll('.slide-1');
const controls = document.querySelectorAll('.control');

let currentSlide = 0;
let interval = null;
let autoScrollInterval = 5000;
let isPaused = false;

leftBtn.addEventListener('click', () => {
  if (currentSlide > 0) {
    currentSlide--;
    slider.style.transform = `translateX(-${currentSlide * 33.3}%)`;
  }
  updateActiveControl();
  resetInterval();
});

rightBtn.addEventListener('click', () => {
  const slidesCount = document.querySelectorAll('.slide').length;
  if (currentSlide < slidesCount - 1) {
    currentSlide++;
    slider.style.transform = `translateX(-${currentSlide * 33.3}%)`;
  }
  updateActiveControl();
  resetInterval();
});


function moveSlide() {
  if (!isPaused) {
    const slidesCount = document.querySelectorAll('.slide').length;
    if (currentSlide < slidesCount - 1) {
      currentSlide++;
    } else {
      currentSlide = 0;
    }
    slider.style.transform = `translateX(-${currentSlide * 33.3}%)`;
    updateActiveControl();
  }
}

function startInterval() {
  interval = setInterval(moveSlide, autoScrollInterval);
}

function resetInterval() {
  clearInterval(interval);
  startInterval();
}

function updateActiveControl() {
  controls.forEach((control, index) => {
    control.classList.remove('active');
    if (index === currentSlide) {
      control.classList.add('active');
    }
  });
}

slider.addEventListener('mouseover', () => {
  isPaused = true;
  clearInterval(interval);
});

slider.addEventListener('mouseout', () => {
  isPaused = false;
  startInterval();
});

function startInterval() {
  interval = setInterval(() => {
    if (!isPaused) {
      moveSlide();
    }
  }, autoScrollInterval);
}

startInterval();