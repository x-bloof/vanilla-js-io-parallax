(useParallax = () => {
  document.addEventListener("DOMContentLoaded", () => {
    let ticking = false;
    const parse = (el) => {
      const config = {};
      const dataset = el.dataset.parallax;
      const pairs = dataset.split(";");

      for (let i = 0; i < pairs.length; i++) {
        const [k, v] = pairs[i].split(":");
        if (v !== undefined) {
          config[k.trim()] = isNaN(v) ? v.trim() : parseFloat(v);
        }
      }
      return config;
    };

    const updateParallax = () => {
      const sections = document.querySelectorAll(".h-screen");
      const h = window.innerHeight;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= h && rect.bottom >= 0) {
          const parallax = section.querySelectorAll("[data-parallax]");
          parallax.forEach((item) => {
            const { axis = "y", inertia = 0.12 } = parse(item);
            if (!item.style.willChange) {
              item.style.willChange = "transform";
            }
            const offset =
              (item.closest(".h-screen")?.getBoundingClientRect().top || 0) *
              inertia;
            const x = axis === "x" ? offset : 0;
            const y = axis === "y" ? offset : 0;

            item.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          });
        }
      });
      ticking = false;
    };

    const updateNavigation = () => {
      const end = 30;
      const y = window.scrollY;
      const el = document.querySelector(".bottom");

      if (y <= end) {
        const x = y;
        el.style.willChange = "transform";
        el.style.transform = `translateX(${x}px)`;
      }
    };

    const onScrollY = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          updateParallax();
          updateNavigation();
          ticking = false;
        });
      }
    };
    window.addEventListener("scroll", onScrollY);
  });
})();
