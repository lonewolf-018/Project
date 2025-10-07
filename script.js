// Dynamic Image Slider with Advanced Features

const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dotsContainer = document.querySelector('.dots');

let currentIndex = 0;
let autoplayInterval = null;
const AUTOPLAY_DELAY = 4000;

// Create dots dynamically
slides.forEach((_, idx) => {
  let dot = document.createElement('span');
  dot.classList.add('dot');
  if (idx === 0) dot.classList.add('active');
  dot.addEventListener('click', () => gotoSlide(idx));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function gotoSlide(index) {
  slides[currentIndex].classList.remove('active');
  dots[currentIndex].classList.remove('active');
  currentIndex = index;
  slides[currentIndex].classList.add('active');
  dots[currentIndex].classList.add('active');
  resetAutoplay();
}

function gotoPrev() {
  let index = currentIndex - 1;
  if (index < 0) index = slides.length - 1;
  gotoSlide(index);
}

function gotoNext() {
  let index = currentIndex + 1;
  if (index >= slides.length) index = 0;
  gotoSlide(index);
}

prevBtn.addEventListener('click', gotoPrev);
nextBtn.addEventListener('click', gotoNext);

function autoplay() {
  autoplayInterval = setInterval(gotoNext, AUTOPLAY_DELAY);
}
function stopAutoplay() {
  clearInterval(autoplayInterval);
}
function resetAutoplay() {
  stopAutoplay();
  autoplay();
}

// Pause autoplay on hover, resume on leave
document.querySelector('.slider-container').addEventListener('mouseenter', stopAutoplay);
document.querySelector('.slider-container').addEventListener('mouseleave', autoplay);

// Advanced: Keyboard navigation
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') gotoNext();
  if (e.key === 'ArrowLeft') gotoPrev();
});

// Advanced: Swipe navigation
let startX = null;
document.querySelector('.slider').addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});
document.querySelector('.slider').addEventListener('touchmove', (e) => {
  if (startX === null) return;
  let diffX = e.touches[0].clientX - startX;
  if (Math.abs(diffX) > 60) {
    if (diffX > 0) gotoPrev();
    else gotoNext();
    startX = null;
  }
});
document.querySelector('.slider').addEventListener('touchend', () => {
  startX = null;
});

// Start autoplay initially
autoplay();
