
// hero slideshow


const slidesContainer = document.querySelector('.slides');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

fetch('slides.json')
  .then(res => res.json())
  .then(data => {
    data.forEach((slide, i) => {
      const slideDiv = document.createElement('div');
      slideDiv.classList.add('slide');
      if (i === 0) slideDiv.classList.add('active');

  slideDiv.innerHTML = `
  <img src="${slide.image}" alt="${slide.title}">
  <div class="overlay-text">
    <div class="text-box">
      <h1>${slide.title}</h1>
    </div><br>
    <div class="text-box">
      <p>${slide.text}</p>
    </div>
  </div>
`;
      slidesContainer.appendChild(slideDiv);
    });

    // Slideshow logik startes først når slides er i DOM
    const slides = document.querySelectorAll('.slide');
    let current = 0;
    let slideInterval = setInterval(nextSlide, 5000);

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    }

    function nextSlide() {
      current = (current + 1) % slides.length;
      showSlide(current);
    }

    function prevSlide() {
      current = (current - 1 + slides.length) % slides.length;
      showSlide(current);
    }

    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetInterval();
    });

    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetInterval();
    });

    function resetInterval() {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000);
    }
  });
