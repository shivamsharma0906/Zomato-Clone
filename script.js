// script.js

// DOM Elements
const header = document.getElementById('main-header');
const heroSection = document.querySelector('.hero');
const statsSection = document.querySelector('.stats');
const appFeaturesSection = document.querySelector('.app-features');

// Debounce utility for performance optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Header scroll effect
window.addEventListener('scroll', debounce(() => {
  header.classList.toggle('scrolled', window.scrollY > 50);
}, 100));

// Smooth scrolling for download app link
document.querySelector('.download-app').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('download-app').scrollIntoView({ behavior: 'smooth' });
});

// Animation on scroll for sections
document.addEventListener('DOMContentLoaded', () => {
  const animateOnScroll = debounce(() => {
    const sections = document.querySelectorAll('.stats, .app-features, .features, .popular-cities, .testimonials, .collections');
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      if (sectionTop < screenPosition) {
        section.classList.add('animate');
      }
    });
  }, 100);

  // Initial check
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
});

// Back-to-top button
const backToTop = document.createElement('button');
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTop.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: none;
  z-index: 1000;
`;
document.body.appendChild(backToTop);

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 200 ? 'block' : 'none';
});

// Lazy loading for images
const lazyImages = document.querySelectorAll('.city-image, .collection-image');
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => {
    img.classList.add('lazy');
    img.dataset.src = img.src;
    img.src = '';
    imageObserver.observe(img);
  });
}

// Add animation class to stats and features on scroll
const animateElements = () => {
  const elements = document.querySelectorAll('.stat-item, .feature-item');
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;
    if (elementTop < screenPosition) {
      element.classList.add('fade-in');
    }
  });
};

window.addEventListener('scroll', debounce(animateElements, 100));
animateElements(); // Initial check

// Add fade-in animation for hero content
window.addEventListener('load', () => {
  const heroContent = document.querySelectorAll('.hero h1, .hero .subtitle, .hero .description, .hero .download-buttons-hero, .hero .scroll-down');
  heroContent.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.2}s`;
    item.classList.add('fade-in');
  });
});

// Dynamic current time display (optional)
function updateTime() {
  const now = new Date();
  const options = {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  const timeString = now.toLocaleTimeString('en-US', options);
  // Add to DOM if needed (e.g., <div id="time-display"></div> in HTML)
  // document.getElementById('time-display').textContent = `Current Time: ${timeString} IST`;
  console.log(`Current Time: ${timeString} IST`); // Example output
}
setInterval(updateTime, 1000);
updateTime(); // Initial call