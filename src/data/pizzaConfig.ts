import { PizzaConfig } from '../types/pizza'

export const pizzaConfig: PizzaConfig = {
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
}
