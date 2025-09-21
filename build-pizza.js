// Build Pizza JavaScript - Professional Pizza Builder

// Pizza configuration data
const pizzaConfig = {
    sizes: [
        { id: 'small', name: 'کوچک', icon: '🍕', price: 45000, description: '۲۰ سانتی‌متر' },
        { id: 'medium', name: 'متوسط', icon: '🍕', price: 65000, description: '۲۵ سانتی‌متر' },
        { id: 'large', name: 'بزرگ', icon: '🍕', price: 85000, description: '۳۰ سانتی‌متر' }
    ],
    doughs: [
        { id: 'thin', name: 'نازک', icon: '🥖', price: 0, description: 'خمیر نازک و ترد' },
        { id: 'classic', name: 'کلاسیک', icon: '🍞', price: 5000, description: 'خمیر متوسط' },
        { id: 'deep', name: 'ضخیم', icon: '🥯', price: 10000, description: 'خمیر ضخیم و نرم' }
    ],
    sauces: [
        { id: 'tomato', name: 'گوجه', icon: '🍅', price: 0, description: 'سس گوجه کلاسیک' },
        { id: 'pesto', name: 'پستو', icon: '🌿', price: 8000, description: 'سس پستوی تازه' },
        { id: 'white', name: 'سفید', icon: '🥛', price: 6000, description: 'سس کرمی سفید' }
    ],
    cheeses: [
        { id: 'mozzarella', name: 'موزارلا', icon: '🧀', price: 0, description: 'پنیر موزارلای اصیل' },
        { id: 'cheddar', name: 'چدار', icon: '🟡', price: 8000, description: 'پنیر چدار تند' },
        { id: 'vegan', name: 'وگان', icon: '🌱', price: 12000, description: 'پنیر گیاهی' }
    ],
    toppings: [
        { id: 'pepperoni', name: 'پپرونی', icon: '🔴', price: 15000, color: '#8B0000' },
        { id: 'mushroom', name: 'قارچ', icon: '🍄', price: 8000, color: '#8B7355' },
        { id: 'pepper', name: 'فلفل', icon: '🌶️', price: 6000, color: '#228B22' },
        { id: 'onion', name: 'پیاز', icon: '⚪', price: 4000, color: '#F5F5DC' },
        { id: 'olive', name: 'زیتون', icon: '🫒', price: 10000, color: '#2F4F2F' },
        { id: 'tomato', name: 'گوجه', icon: '🍅', price: 5000, color: '#FF6347' }
    ]
};

// Current pizza state
let currentPizza = {
    size: null,
    dough: null,
    sauce: null,
    cheese: null,
    toppings: []
};

let currentStep = 1;
const totalSteps = 5;

// DOM elements
const pizzaPreview = document.getElementById('pizzaPreview');
const pizzaBase = document.getElementById('pizzaBase');
const pizzaSauce = document.getElementById('pizzaSauce');
const pizzaCheese = document.getElementById('pizzaCheese');
const pizzaToppings = document.getElementById('pizzaToppings');
const totalPrice = document.getElementById('totalPrice');
const stepTitle = document.getElementById('stepTitle');
const stepDescription = document.getElementById('stepDescription');
const optionsGrid = document.getElementById('optionsGrid');
const backBtn = document.getElementById('backBtn');
const nextBtn = document.getElementById('nextBtn');
const finishBtn = document.getElementById('finishBtn');
const toppingsDrawer = document.getElementById('toppingsDrawer');
const toppingsList = document.getElementById('toppingsList');
const cartCount = document.querySelector('.cart-count');
const orderModal = document.getElementById('orderModal');
const successToast = document.getElementById('successToast');

// Initialize the pizza builder
function init() {
    loadStep(1);
    updatePrice();
    setupEventListeners();
    setupDragAndDrop();
    
    // Add entrance animations
    setTimeout(() => {
        document.querySelector('.progress-steps').classList.add('slide-in-right');
    }, 200);
    
    setTimeout(() => {
        document.querySelector('.build-content').classList.add('slide-in-right');
    }, 400);
}

// Setup event listeners
function setupEventListeners() {
    backBtn.addEventListener('click', () => navigateStep(-1));
    nextBtn.addEventListener('click', () => navigateStep(1));
    finishBtn.addEventListener('click', showOrderSummary);
    
    // Modal events
    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('editOrder').addEventListener('click', closeModal);
    document.getElementById('confirmOrder').addEventListener('click', confirmOrder);
    
    // Step navigation
    document.querySelectorAll('.step').forEach(step => {
        step.addEventListener('click', () => {
            const stepNum = parseInt(step.dataset.step);
            if (stepNum < currentStep || isStepCompleted(stepNum)) {
                loadStep(stepNum);
            }
        });
    });
    
    // Pizza rotation on click
    pizzaPreview.addEventListener('click', () => {
        pizzaPreview.classList.add('rotating');
        setTimeout(() => {
            pizzaPreview.classList.remove('rotating');
        }, 900);
        
        // Haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    });
}

// Load specific step
function loadStep(step) {
    if (step < 1 || step > totalSteps) return;
    
    currentStep = step;
    updateStepIndicators();
    updateNavigationButtons();
    
    // Hide toppings drawer by default
    toppingsDrawer.style.display = 'none';
    
    const stepConfig = {
        1: {
            title: 'انتخاب سایز پیتزا',
            description: 'سایز مورد نظر خود را انتخاب کنید',
            options: pizzaConfig.sizes,
            onSelect: selectSize
        },
        2: {
            title: 'انتخاب نوع خمیر',
            description: 'نوع خمیر دلخواه خود را انتخاب کنید',
            options: pizzaConfig.doughs,
            onSelect: selectDough
        },
        3: {
            title: 'انتخاب سس',
            description: 'سس مورد علاقه خود را انتخاب کنید',
            options: pizzaConfig.sauces,
            onSelect: selectSauce
        },
        4: {
            title: 'انتخاب پنیر',
            description: 'نوع پنیر دلخواه خود را انتخاب کنید',
            options: pizzaConfig.cheeses,
            onSelect: selectCheese
        },
        5: {
            title: 'اضافه کردن تاپینگ',
            description: 'تاپینگ‌های مورد نظر خود را اضافه کنید',
            options: [],
            onSelect: null
        }
    };
    
    const config = stepConfig[step];
    stepTitle.textContent = config.title;
    stepDescription.textContent = config.description;
    
    if (step === 5) {
        // Show toppings drawer
        toppingsDrawer.style.display = 'block';
        optionsGrid.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 20px;">تاپینگ‌ها را از پایین انتخاب کنید</p>';
        loadToppings();
    } else {
        // Load regular options
        loadOptions(config.options, config.onSelect);
    }
    
    // Add slide animation
    optionsGrid.classList.remove('slide-in-right');
    setTimeout(() => {
        optionsGrid.classList.add('slide-in-right');
    }, 50);
}

// Load options for current step
function loadOptions(options, onSelectCallback) {
    optionsGrid.innerHTML = '';
    
    options.forEach((option, index) => {
        const optionCard = document.createElement('div');
        optionCard.className = 'option-card';
        optionCard.innerHTML = `
            <div class="option-icon">${option.icon}</div>
            <div class="option-name">${option.name}</div>
            <div class="option-price">${option.price === 0 ? 'رایگان' : formatPrice(option.price)}</div>
            <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">${option.description}</div>
        `;
        
        // Check if this option is already selected
        const currentValue = getCurrentStepValue();
        if (currentValue && currentValue.id === option.id) {
            optionCard.classList.add('selected');
        }
        
        optionCard.addEventListener('click', () => {
            // Remove selection from other cards
            document.querySelectorAll('.option-card').forEach(card => {
                card.classList.remove('selected');
            });
            
            // Select this card
            optionCard.classList.add('selected');
            
            // Call the selection callback
            if (onSelectCallback) {
                onSelectCallback(option);
            }
            
            // Add selection animation
            optionCard.style.animation = 'bounce 0.6s ease';
            setTimeout(() => {
                optionCard.style.animation = '';
            }, 600);
        });
        
        // Add entrance animation with delay
        setTimeout(() => {
            optionCard.classList.add('bounce-in');
        }, index * 100);
        
        optionsGrid.appendChild(optionCard);
    });
}

// Load toppings for step 5
function loadToppings() {
    toppingsList.innerHTML = '';
    
    pizzaConfig.toppings.forEach((topping, index) => {
        const toppingItem = document.createElement('div');
        toppingItem.className = 'topping-item';
        toppingItem.draggable = true;
        toppingItem.dataset.toppingId = topping.id;
        
        toppingItem.innerHTML = `
            <div class="topping-preview" style="background: radial-gradient(circle, ${topping.color} 0%, ${adjustColor(topping.color, -30)} 100%);"></div>
            <div class="topping-name">${topping.name}</div>
            <div class="topping-price">${formatPrice(topping.price)}</div>
        `;
        
        // Check if topping is already selected
        if (currentPizza.toppings.some(t => t.id === topping.id)) {
            toppingItem.classList.add('selected');
        }
        
        // Click to add/remove topping
        toppingItem.addEventListener('click', () => {
            toggleTopping(topping);
            toppingItem.classList.toggle('selected');
        });
        
        // Drag events
        toppingItem.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', topping.id);
            toppingItem.style.opacity = '0.5';
        });
        
        toppingItem.addEventListener('dragend', () => {
            toppingItem.style.opacity = '1';
        });
        
        // Add entrance animation
        setTimeout(() => {
            toppingItem.classList.add('bounce-in');
        }, index * 80);
        
        toppingsList.appendChild(toppingItem);
    });
}

// Setup drag and drop functionality
function setupDragAndDrop() {
    pizzaPreview.addEventListener('dragover', (e) => {
        e.preventDefault();
        pizzaPreview.classList.add('drag-over');
    });
    
    pizzaPreview.addEventListener('dragleave', () => {
        pizzaPreview.classList.remove('drag-over');
    });
    
    pizzaPreview.addEventListener('drop', (e) => {
        e.preventDefault();
        pizzaPreview.classList.remove('drag-over');
        
        const toppingId = e.dataTransfer.getData('text/plain');
        const topping = pizzaConfig.toppings.find(t => t.id === toppingId);
        
        if (topping && !currentPizza.toppings.some(t => t.id === toppingId)) {
            addTopping(topping, e.offsetX, e.offsetY);
            
            // Update topping item selection
            const toppingItem = document.querySelector(`[data-topping-id="${toppingId}"]`);
            if (toppingItem) {
                toppingItem.classList.add('selected');
            }
            
            showToast('تاپینگ اضافه شد!');
        }
    });
}

// Selection functions
function selectSize(size) {
    currentPizza.size = size;
    updatePizzaSize();
    updatePrice();
    playSelectionSound();
}

function selectDough(dough) {
    currentPizza.dough = dough;
    updatePizzaDough();
    updatePrice();
    playSelectionSound();
}

function selectSauce(sauce) {
    currentPizza.sauce = sauce;
    updatePizzaSauce();
    updatePrice();
    playSelectionSound();
}

function selectCheese(cheese) {
    currentPizza.cheese = cheese;
    updatePizzaCheese();
    updatePrice();
    playSelectionSound();
}

function toggleTopping(topping) {
    const existingIndex = currentPizza.toppings.findIndex(t => t.id === topping.id);
    
    if (existingIndex >= 0) {
        // Remove topping
        currentPizza.toppings.splice(existingIndex, 1);
        removeToppingFromPizza(topping.id);
        showToast('تاپینگ حذف شد');
    } else {
        // Add topping at random position
        const x = Math.random() * 200 + 50; // Random position within pizza
        const y = Math.random() * 200 + 50;
        addTopping(topping, x, y);
        showToast('تاپینگ اضافه شد!');
    }
    
    updatePrice();
    playSelectionSound();
}

// Visual update functions
function updatePizzaSize() {
    if (!currentPizza.size) return;
    
    pizzaPreview.className = `pizza-preview ${currentPizza.size.id}`;
    pizzaPreview.classList.add('rotating');
    
    setTimeout(() => {
        pizzaPreview.classList.remove('rotating');
    }, 900);
}

function updatePizzaDough() {
    if (!currentPizza.dough) return;
    
    pizzaBase.className = `pizza-base ${currentPizza.dough.id}`;
}

function updatePizzaSauce() {
    if (!currentPizza.sauce) return;
    
    pizzaSauce.className = `pizza-sauce ${currentPizza.sauce.id}`;
}

function updatePizzaCheese() {
    if (!currentPizza.cheese) return;
    
    pizzaCheese.className = `pizza-cheese ${currentPizza.cheese.id}`;
}

function addTopping(topping, x, y) {
    currentPizza.toppings.push({
        ...topping,
        x: x || Math.random() * 200 + 50,
        y: y || Math.random() * 200 + 50
    });
    
    const toppingElement = document.createElement('div');
    toppingElement.className = `topping ${topping.id}`;
    toppingElement.dataset.toppingId = topping.id;
    toppingElement.style.left = `${currentPizza.toppings[currentPizza.toppings.length - 1].x}px`;
    toppingElement.style.top = `${currentPizza.toppings[currentPizza.toppings.length - 1].y}px`;
    toppingElement.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    // Add click to remove
    toppingElement.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleTopping(topping);
        
        // Update topping item selection
        const toppingItem = document.querySelector(`[data-topping-id="${topping.id}"]`);
        if (toppingItem) {
            toppingItem.classList.remove('selected');
        }
    });
    
    // Add with animation
    toppingElement.style.opacity = '0';
    toppingElement.style.transform += ' scale(0.85)';
    pizzaToppings.appendChild(toppingElement);
    
    setTimeout(() => {
        toppingElement.style.opacity = '1';
        toppingElement.style.transform = toppingElement.style.transform.replace('scale(0.85)', 'scale(1)');
    }, 50);
}

function removeToppingFromPizza(toppingId) {
    const toppingElement = pizzaToppings.querySelector(`[data-topping-id="${toppingId}"]`);
    if (toppingElement) {
        toppingElement.style.animation = 'fadeOut 250ms ease-out';
        setTimeout(() => {
            toppingElement.remove();
        }, 250);
    }
}

// Price calculation
function updatePrice() {
    let total = 0;
    
    if (currentPizza.size) total += currentPizza.size.price;
    if (currentPizza.dough) total += currentPizza.dough.price;
    if (currentPizza.sauce) total += currentPizza.sauce.price;
    if (currentPizza.cheese) total += currentPizza.cheese.price;
    
    currentPizza.toppings.forEach(topping => {
        total += topping.price;
    });
    
    totalPrice.textContent = formatPrice(total);
    totalPrice.style.animation = 'priceUpdate 300ms ease-out';
    
    setTimeout(() => {
        totalPrice.style.animation = '';
    }, 300);
}

// Navigation functions
function navigateStep(direction) {
    const newStep = currentStep + direction;
    
    if (direction > 0 && !canProceedToNextStep()) {
        showToast('لطفاً یک گزینه انتخاب کنید');
        return;
    }
    
    if (newStep >= 1 && newStep <= totalSteps) {
        loadStep(newStep);
    }
}

function canProceedToNextStep() {
    switch (currentStep) {
        case 1: return currentPizza.size !== null;
        case 2: return currentPizza.dough !== null;
        case 3: return currentPizza.sauce !== null;
        case 4: return currentPizza.cheese !== null;
        case 5: return true; // Toppings are optional
        default: return false;
    }
}

function isStepCompleted(step) {
    switch (step) {
        case 1: return currentPizza.size !== null;
        case 2: return currentPizza.dough !== null;
        case 3: return currentPizza.sauce !== null;
        case 4: return currentPizza.cheese !== null;
        case 5: return true;
        default: return false;
    }
}

function getCurrentStepValue() {
    switch (currentStep) {
        case 1: return currentPizza.size;
        case 2: return currentPizza.dough;
        case 3: return currentPizza.sauce;
        case 4: return currentPizza.cheese;
        default: return null;
    }
}

function updateStepIndicators() {
    document.querySelectorAll('.step').forEach((step, index) => {
        const stepNum = index + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNum === currentStep) {
            step.classList.add('active');
        } else if (isStepCompleted(stepNum)) {
            step.classList.add('completed');
        }
    });
}

function updateNavigationButtons() {
    backBtn.disabled = currentStep === 1;
    
    if (currentStep === totalSteps) {
        nextBtn.style.display = 'none';
        finishBtn.style.display = 'flex';
    } else {
        nextBtn.style.display = 'flex';
        finishBtn.style.display = 'none';
    }
}

// Order summary and checkout
function showOrderSummary() {
    if (!isOrderComplete()) {
        showToast('لطفاً تمام مراحل را تکمیل کنید');
        return;
    }
    
    // Update order modal content
    document.getElementById('orderSize').textContent = currentPizza.size?.name || '-';
    document.getElementById('orderDough').textContent = currentPizza.dough?.name || '-';
    document.getElementById('orderSauce').textContent = currentPizza.sauce?.name || '-';
    document.getElementById('orderCheese').textContent = currentPizza.cheese?.name || '-';
    document.getElementById('orderToppings').textContent = 
        currentPizza.toppings.length > 0 
            ? currentPizza.toppings.map(t => t.name).join('، ')
            : 'بدون تاپینگ';
    
    // Calculate total price
    let total = 0;
    if (currentPizza.size) total += currentPizza.size.price;
    if (currentPizza.dough) total += currentPizza.dough.price;
    if (currentPizza.sauce) total += currentPizza.sauce.price;
    if (currentPizza.cheese) total += currentPizza.cheese.price;
    currentPizza.toppings.forEach(topping => {
        total += topping.price;
    });
    
    document.getElementById('orderTotalPrice').textContent = formatPrice(total);
    
    // Clone pizza preview for modal
    const orderPizzaPreview = document.getElementById('orderPizzaPreview');
    orderPizzaPreview.innerHTML = pizzaPreview.innerHTML;
    orderPizzaPreview.className = pizzaPreview.className;
    
    // Show modal
    orderModal.style.display = 'flex';
}

function closeModal() {
    orderModal.style.display = 'none';
}

function confirmOrder() {
    // Add to cart (simulate)
    const currentCount = parseInt(cartCount.textContent);
    cartCount.textContent = currentCount + 1;
    
    // Show success toast
    showToast('پیتزا به سبد خرید اضافه شد!', 'success');
    
    // Close modal
    closeModal();
    
    // Reset pizza builder
    setTimeout(() => {
        resetPizzaBuilder();
    }, 1000);
    
    // Haptic feedback
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
    }
}

function isOrderComplete() {
    return currentPizza.size && currentPizza.dough && currentPizza.sauce && currentPizza.cheese;
}

function resetPizzaBuilder() {
    currentPizza = {
        size: null,
        dough: null,
        sauce: null,
        cheese: null,
        toppings: []
    };
    
    // Reset visual elements
    pizzaPreview.className = 'pizza-preview';
    pizzaBase.className = 'pizza-base';
    pizzaSauce.className = 'pizza-sauce';
    pizzaCheese.className = 'pizza-cheese';
    pizzaToppings.innerHTML = '';
    
    // Reset to first step
    loadStep(1);
    updatePrice();
}

// Utility functions
function formatPrice(price) {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
}

function adjustColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

function showToast(message, type = 'info') {
    const toast = document.getElementById('successToast');
    const toastMessage = toast.querySelector('.toast-message');
    const toastIcon = toast.querySelector('.toast-icon');
    
    toastMessage.textContent = message;
    
    if (type === 'success') {
        toastIcon.textContent = '✅';
        toast.style.background = '#22c55e';
    } else {
        toastIcon.textContent = 'ℹ️';
        toast.style.background = '#3b82f6';
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function playSelectionSound() {
    // Simple audio feedback (optional)
    if (typeof Audio !== 'undefined') {
        // You can add actual sound files here
        // const audio = new Audio('selection-sound.mp3');
        // audio.volume = 0.3;
        // audio.play().catch(() => {}); // Ignore errors
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (orderModal.style.display === 'flex') {
        if (e.key === 'Escape') {
            closeModal();
        }
        return;
    }
    
    switch (e.key) {
        case 'ArrowLeft':
            if (currentStep > 1) navigateStep(-1);
            break;
        case 'ArrowRight':
            if (currentStep < totalSteps && canProceedToNextStep()) navigateStep(1);
            break;
        case 'Enter':
            if (currentStep === totalSteps) {
                showOrderSummary();
            } else if (canProceedToNextStep()) {
                navigateStep(1);
            }
            break;
        case 'Escape':
            // Go back to main page
            window.location.href = 'index.html';
            break;
    }
});

// Add CSS animation for fadeOut
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.8); }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause any ongoing animations or sounds
    } else {
        // Resume animations
    }
});

// Auto-save progress to localStorage
function saveProgress() {
    localStorage.setItem('pizzaBuilder', JSON.stringify({
        currentPizza,
        currentStep
    }));
}

function loadProgress() {
    const saved = localStorage.getItem('pizzaBuilder');
    if (saved) {
        const data = JSON.parse(saved);
        currentPizza = data.currentPizza || currentPizza;
        currentStep = data.currentStep || 1;
        
        // Restore visual state
        if (currentPizza.size) updatePizzaSize();
        if (currentPizza.dough) updatePizzaDough();
        if (currentPizza.sauce) updatePizzaSauce();
        if (currentPizza.cheese) updatePizzaCheese();
        
        // Restore toppings
        currentPizza.toppings.forEach(topping => {
            addTopping(topping, topping.x, topping.y);
        });
    }
}

// Save progress on each change
const originalSelectSize = selectSize;
const originalSelectDough = selectDough;
const originalSelectSauce = selectSauce;
const originalSelectCheese = selectCheese;
const originalToggleTopping = toggleTopping;

selectSize = function(size) {
    originalSelectSize(size);
    saveProgress();
};

selectDough = function(dough) {
    originalSelectDough(dough);
    saveProgress();
};

selectSauce = function(sauce) {
    originalSelectSauce(sauce);
    saveProgress();
};

selectCheese = function(cheese) {
    originalSelectCheese(cheese);
    saveProgress();
};

toggleTopping = function(topping) {
    originalToggleTopping(topping);
    saveProgress();
};

// Load saved progress on init
window.addEventListener('load', () => {
    setTimeout(loadProgress, 100);
});
