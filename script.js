// Pizza data using local images
const pizzaData = [
    {
        id: 1,
        name: "پیتزا اسپشیال",
        description: "پیتزای خوشمزه با مواد تازه و پنیر مرغوب، طعمی فراموش نشدنی برای شما.",
        image: "pizza1.png",
        thumbnail: "pizza1.png"
    },
    {
        id: 2,
        name: "پیتزا کلاسیک",
        description: "طعم اصیل پیتزا با ترکیب بهترین مواد اولیه و سس مخصوص رستوران.",
        image: "pizza2.png",
        thumbnail: "pizza2.png"
    },
    {
        id: 3,
        name: "پیتزا لوکس",
        description: "پیتزای لوکس با بهترین کیفیت مواد و طعمی استثنائی که حس خوبی به شما می‌دهد.",
        image: "pizza3.png",
        thumbnail: "pizza3.png"
    }
];

let currentPizzaIndex = 0;

// DOM elements
const mainPizza = document.getElementById('mainPizza');
const pizzaTitle = document.getElementById('pizzaTitle');
const pizzaDescription = document.getElementById('pizzaDescription');
const thumbnailContainer = document.getElementById('thumbnailContainer');
const carouselIndicators = document.getElementById('carouselIndicators');

// Initialize the page
function init() {
    createThumbnails();
    createIndicators();
    updatePizzaDisplay(0);
    addLoadingStates();
}

// Create thumbnail images
function createThumbnails() {
    pizzaData.forEach((pizza, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = pizza.thumbnail;
        thumbnail.alt = pizza.name;
        thumbnail.className = 'thumbnail';
        thumbnail.dataset.index = index;
        
        // Add loading state
        thumbnail.style.opacity = '0';
        thumbnail.onload = () => {
            setTimeout(() => {
                thumbnail.style.opacity = '1';
                thumbnail.style.transform = 'translateY(0)';
            }, index * 100);
        };
        thumbnail.style.transform = 'translateY(20px)';
        thumbnail.style.transition = 'all 0.5s ease';
        
        if (index === 0) {
            thumbnail.classList.add('active');
        }
        
        thumbnail.addEventListener('click', () => selectPizza(index));
        thumbnailContainer.appendChild(thumbnail);
    });
}

// Create indicator dots
function createIndicators() {
    pizzaData.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        indicator.dataset.index = index;
        
        if (index === 0) {
            indicator.classList.add('active');
        }
        
        indicator.addEventListener('click', () => selectPizza(index));
        carouselIndicators.appendChild(indicator);
    });
}

// Update pizza display
function updatePizzaDisplay(index) {
    const pizza = pizzaData[index];
    
    // Add rotation animation
    mainPizza.classList.add('rotating');
    
    // Update content after a short delay to sync with animation
    setTimeout(() => {
        mainPizza.src = pizza.image;
        mainPizza.alt = pizza.name;
        pizzaTitle.textContent = pizza.name;
        pizzaDescription.textContent = pizza.description;
    }, 200);
    
    // Remove rotation animation
    setTimeout(() => {
        mainPizza.classList.remove('rotating');
    }, 800);
    
    // Update active thumbnail
    updateActiveThumbnail(index);
    currentPizzaIndex = index;
}

// Update active thumbnail and indicators
function updateActiveThumbnail(activeIndex) {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const indicators = document.querySelectorAll('.indicator');
    
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.classList.toggle('active', index === activeIndex);
    });
    
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === activeIndex);
    });
}

// Select pizza
function selectPizza(index) {
    if (index !== currentPizzaIndex) {
        updatePizzaDisplay(index);
    }
}

// Mobile menu functionality
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');

if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        nav.classList.toggle('nav-open');
        mobileMenuToggle.classList.toggle('active');
        
        // Add animation class
        if (nav.classList.contains('nav-open')) {
            nav.style.display = 'flex';
            setTimeout(() => {
                nav.classList.add('nav-animate-in');
            }, 10);
        } else {
            nav.classList.remove('nav-animate-in');
            setTimeout(() => {
                nav.style.display = 'none';
            }, 300);
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            if (nav.classList.contains('nav-open')) {
                nav.classList.remove('nav-open', 'nav-animate-in');
                mobileMenuToggle.classList.remove('active');
                setTimeout(() => {
                    nav.style.display = 'none';
                }, 300);
            }
        }
    });
    
    // Close menu when clicking on nav links
    const navLinks = nav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-open', 'nav-animate-in');
            mobileMenuToggle.classList.remove('active');
            setTimeout(() => {
                nav.style.display = 'none';
            }, 300);
        });
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        const prevIndex = currentPizzaIndex > 0 ? currentPizzaIndex - 1 : pizzaData.length - 1;
        selectPizza(prevIndex);
    } else if (e.key === 'ArrowRight') {
        const nextIndex = currentPizzaIndex < pizzaData.length - 1 ? currentPizzaIndex + 1 : 0;
        selectPizza(nextIndex);
    }
});

// Smooth scrolling for thumbnail carousel on mobile
let isScrolling = false;

thumbnailContainer.addEventListener('wheel', (e) => {
    if (window.innerWidth <= 768 && !isScrolling) {
        e.preventDefault();
        isScrolling = true;
        
        const scrollAmount = e.deltaY > 0 ? 100 : -100;
        thumbnailContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
        
        setTimeout(() => {
            isScrolling = false;
        }, 100);
    }
});

// Auto-play functionality (optional)
let autoPlayInterval;

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        const nextIndex = currentPizzaIndex < pizzaData.length - 1 ? currentPizzaIndex + 1 : 0;
        selectPizza(nextIndex);
    }, 5000); // Change pizza every 5 seconds
}

function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
    }
}

// Start auto-play when page loads
// Uncomment the line below if you want auto-play functionality
// startAutoPlay();

// Stop auto-play when user interacts
thumbnailContainer.addEventListener('click', stopAutoPlay);

// Add loading states and animations
function addLoadingStates() {
    // Add stagger animation to hero elements
    const heroElements = document.querySelectorAll('.pizza-day, .pizza-title, .pizza-description');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, (index + 1) * 200);
    });
    
    // Add entrance animation to main pizza
    mainPizza.style.opacity = '0';
    mainPizza.style.transform = 'scale(0.8)';
    mainPizza.style.transition = 'all 0.8s ease';
    
    setTimeout(() => {
        mainPizza.style.opacity = '1';
        mainPizza.style.transform = 'scale(1)';
    }, 600);
}

// Add haptic feedback simulation
function addHapticFeedback() {
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}

// Enhanced pizza selection with feedback
function selectPizzaEnhanced(index) {
    if (index !== currentPizzaIndex) {
        addHapticFeedback();
        updatePizzaDisplay(index);
        
        // Add subtle bounce to selected thumbnail
        const selectedThumbnail = document.querySelector(`[data-index="${index}"]`);
        selectedThumbnail.style.animation = 'bounce 0.6s ease';
        setTimeout(() => {
            selectedThumbnail.style.animation = '';
        }, 600);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Add bounce animation keyframes via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 20%, 60%, 100% { transform: scale(1.15) translateY(-4px); }
        40% { transform: scale(1.25) translateY(-8px); }
        80% { transform: scale(1.2) translateY(-6px); }
    }
`;
document.head.appendChild(style);

// Add some interactive effects
document.addEventListener('mousemove', (e) => {
    const floatingPizzas = document.querySelectorAll('.floating-pizza');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    floatingPizzas.forEach((pizza, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        pizza.style.transform = `translate(${x}px, ${y}px) rotate(${x * 2}deg)`;
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.hero-text, .pizza-display');
    animatedElements.forEach(el => observer.observe(el));
});
