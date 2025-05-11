document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("scroll", () => {
    const start = 0;
    const end = 30;
    const bound = end - start;
    const Y = window.scrollY;
    const el = document.querySelector(".bottom");

    if (Y >= start && Y <= end) {
      const update = (Y - start) / bound;
      const X = update * end;

      el.style.willChange = "transform";
      el.style.transform = `translateX(${X}px)`;
    }
  });
});
