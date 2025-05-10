window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll(".h-screen");

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();

    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      const localScrollY = rect.top * -0.15;

      const parallaxItems = section.querySelectorAll(".parallax");
      parallaxItems.forEach((item) => {
        item.style.transform = `translate3d(0, ${localScrollY}px, 0)`;
      });
    }
  });
});

const debounce = (f, delay) => {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      f.apply(this, args);
    }, delay);
  };
};

const throttle = (f, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      f.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const throttled = throttle(scrollY, 16); // 60 FPS
