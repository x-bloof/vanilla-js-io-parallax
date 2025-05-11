const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.isIntersecting
        ? entry.target.classList.add("visible")
        : entry.target.classList.remove("visible");
    });
  },
  { threshold: 0.5 }
);

const targets = document.querySelectorAll("p");
targets.forEach((el) => observer.observe(el));
