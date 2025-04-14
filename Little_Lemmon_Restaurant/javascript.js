// DOM Elements
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('main > div');
const foodItems = document.querySelectorAll('.food-item');
const reviewContents = document.querySelectorAll('.review-content');
const logo = document.querySelector('.logo img');
const banner = document.querySelector('.banner img');

// Current date display
const currentDate = new Date();
const footer = document.querySelector('footer .foot');
footer.insertAdjacentHTML('afterbegin', `<p>${currentDate.toDateString()}</p>`);

// Navigation active state
function setActiveNav() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.querySelector('a').getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// Smooth scrolling for navigation
navItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.querySelector('a').getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Logo animation
logo.addEventListener('mouseenter', () => {
    logo.style.transform = 'rotate(10deg) scale(1.1)';
    logo.style.transition = 'all 0.3s ease';
});

logo.addEventListener('mouseleave', () => {
    logo.style.transform = 'rotate(0deg) scale(1)';
});

// Banner carousel
const bannerImages = [
    'images/banner.png',
    'images/banner2.jpg',
    'images/banner3.jpg'
];
let currentBannerIndex = 0;

function changeBanner() {
    currentBannerIndex = (currentBannerIndex + 1) % bannerImages.length;
    banner.src = bannerImages[currentBannerIndex];
    banner.alt = `Banner image ${currentBannerIndex + 1}`;
}

// Set interval for banner change
let bannerInterval = setInterval(changeBanner, 5000);

// Pause banner on hover
banner.addEventListener('mouseenter', () => {
    clearInterval(bannerInterval);
});

banner.addEventListener('mouseleave', () => {
    bannerInterval = setInterval(changeBanner, 5000);
});

// Food items animation
foodItems.forEach((item, index) => {
    // Add delay based on index for staggered animation
    item.style.transitionDelay = `${index * 0.1}s`;
    
    item.addEventListener('click', () => {
        const itemName = item.querySelector('h6').textContent;
        alert(`You clicked on ${itemName}! Add it to your cart?`);
    });
});

// Review content animation
reviewContents.forEach(review => {
    const revTitle = review.querySelector('.rev-title');
    const revText = review.querySelector('.rev');
    
    revTitle.addEventListener('click', () => {
        revText.style.display = revText.style.display === 'none' ? 'block' : 'none';
    });
});

// Dynamic menu filtering
function filterMenu(category) {
    const menuRows = document.querySelectorAll('.menu-t tr:not(:first-child)');
    
    menuRows.forEach(row => {
        const itemName = row.querySelector('td:first-child').textContent.toLowerCase();
        if (category === 'all' || itemName.includes(category.toLowerCase())) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Add filter buttons dynamically
const menuSection = document.querySelector('.menu');
const filterButtons = document.createElement('div');
filterButtons.className = 'filter-buttons';
filterButtons.innerHTML = `
    <button class="filter-btn active" data-category="all">All</button>
    <button class="filter-btn" data-category="chicken">Chicken</button>
    <button class="filter-btn" data-category="veg">Vegetarian</button>
    <button class="filter-btn" data-category="soup">Soup</button>
    <button class="filter-btn" data-category="juice">Juice</button>
`;

menuSection.insertBefore(filterButtons, menuSection.querySelector('table'));

// Add event listeners to filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        filterMenu(this.dataset.category);
    });
});

// Form validation for newsletter signup
const newsletterForm = document.createElement('form');
newsletterForm.className = 'newsletter-form';
newsletterForm.innerHTML = `
    <h3>Subscribe to our Newsletter</h3>
    <input type="email" placeholder="Your email address" required>
    <button type="submit">Subscribe</button>
    <p class="newsletter-message"></p>
`;

document.querySelector('.home').appendChild(newsletterForm);

newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = this.querySelector('input');
    const message = this.querySelector('.newsletter-message');
    
    if (validateEmail(emailInput.value)) {
        message.textContent = 'Thank you for subscribing!';
        message.style.color = 'green';
        emailInput.value = '';
        
        // Store in localStorage
        const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || []);
        subscribers.push({ email: emailInput.value, date: new Date().toISOString() });
        localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
    } else {
        message.textContent = 'Please enter a valid email address';
        message.style.color = 'red';
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Theme switcher
const themeSwitcher = document.createElement('div');
themeSwitcher.className = 'theme-switcher';
themeSwitcher.innerHTML = `
    <button id="light-theme">Light</button>
    <button id="dark-theme">Dark</button>
    <button id="high-contrast">High Contrast</button>
`;

document.body.insertBefore(themeSwitcher, document.body.firstChild);

document.getElementById('light-theme').addEventListener('click', () => {
    document.documentElement.style.setProperty('--bg-home', '#F6D776');
    document.documentElement.style.setProperty('--bg-menu', '#A0D8B3');
    document.documentElement.style.setProperty('--bg-new-arrivals', '#FFB6B9');
    document.documentElement.style.setProperty('--bg-about', '#A0C4FF');
    document.documentElement.style.setProperty('--bg-footer', '#FFE066');
    document.documentElement.style.setProperty('--bg-nav', '#F67280');
    document.documentElement.style.setProperty('--text-dark', '#333');
    document.documentElement.style.setProperty('--text-light', '#fff');
});

document.getElementById('dark-theme').addEventListener('click', () => {
    document.documentElement.style.setProperty('--bg-home', '#2C3E50');
    document.documentElement.style.setProperty('--bg-menu', '#34495E');
    document.documentElement.style.setProperty('--bg-new-arrivals', '#7F8C8D');
    document.documentElement.style.setProperty('--bg-about', '#95A5A6');
    document.documentElement.style.setProperty('--bg-footer', '#2C3E50');
    document.documentElement.style.setProperty('--bg-nav', '#1A1A1A');
    document.documentElement.style.setProperty('--text-dark', '#ECF0F1');
    document.documentElement.style.setProperty('--text-light', '#BDC3C7');
});

document.getElementById('high-contrast').addEventListener('click', () => {
    document.documentElement.style.setProperty('--bg-home', '#000000');
    document.documentElement.style.setProperty('--bg-menu', '#FFFFFF');
    document.documentElement.style.setProperty('--bg-new-arrivals', '#000000');
    document.documentElement.style.setProperty('--bg-about', '#FFFFFF');
    document.documentElement.style.setProperty('--bg-footer', '#000000');
    document.documentElement.style.setProperty('--bg-nav', '#FF0000');
    document.documentElement.style.setProperty('--text-dark', '#FFFFFF');
    document.documentElement.style.setProperty('--text-light', '#000000');
});

// Scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.style.display = 'none';
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Lazy loading for images
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

//call the function if any lazy-load images exist
if (document.querySelector('img[data-src]')) {
    lazyLoadImages();
}

// Shopping cart functionality
const cart = {
    items: [],
    addItem: function(itemName, price) {
        this.items.push({ name: itemName, price: price });
        this.updateCart();
    },
    removeItem: function(index) {
        this.items.splice(index, 1);
        this.updateCart();
    },
    getTotal: function() {
        return this.items.reduce((total, item) => total + item.price, 0);
    },
    updateCart: function() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.displayCart();
    },
    displayCart: function() {
        const cartDropdown = document.querySelector('.cart-dropdown');
        if (cartDropdown) {
            cartDropdown.innerHTML = this.items.length === 0 
                ? '<p>Your cart is empty</p>'
                : this.items.map((item, index) => `
                    <div class="cart-item">
                        <span>${item.name} - $${item.price.toFixed(2)}</span>
                        <button class="remove-item" data-index="${index}">×</button>
                    </div>
                `).join('') + `<div class="cart-total">Total: $${this.getTotal().toFixed(2)}</div>
                <button class="checkout-btn">Checkout</button>`;
            
            document.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.removeItem(parseInt(e.target.dataset.index));
                });
            });
        }
    }
};

// Load cart from localStorage
if (localStorage.getItem('cart')) {
    cart.items = JSON.parse(localStorage.getItem('cart'));
}

// Create cart dropdown
const cartIcon = document.createElement('div');
cartIcon.className = 'cart-icon';
cartIcon.innerHTML = '🛒 <span class="cart-count">0</span>';
document.body.appendChild(cartIcon);

const cartDropdown = document.createElement('div');
cartDropdown.className = 'cart-dropdown';
document.body.appendChild(cartDropdown);

// Update cart count
function updateCartCount() {
    document.querySelector('.cart-count').textContent = cart.items.length;
}

// Toggle cart dropdown
cartIcon.addEventListener('click', () => {
    cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
    cart.displayCart();
});

// Add to cart functionality for menu items
document.querySelectorAll('.menu-t tr:not(:first-child)').forEach(row => {
    row.addEventListener('click', () => {
        const itemName = row.querySelector('td:first-child').textContent;
        const price = parseFloat(row.querySelector('td:nth-child(2)').textContent.replace('$', ''));
        cart.addItem(itemName, price);
        updateCartCount();
        
        // Show added notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = `${itemName} added to cart!`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    });
});

// Close cart when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.cart-icon') && !e.target.closest('.cart-dropdown')) {
        cartDropdown.style.display = 'none';
    }
});

// Initialize
updateCartCount();
window.addEventListener('scroll', setActiveNav);
setActiveNav(); // Set initial active nav item