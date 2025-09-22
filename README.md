# پیتزا هات - React + Vite + Tailwind

این پروژه یک اپلیکیشن سفارش پیتزا با React، Vite و Tailwind CSS است که از پروژه HTML/CSS/JS اصلی تبدیل شده است.

## ویژگی‌های پروژه

- ✅ رابط کاربری مدرن با Tailwind CSS
- ✅ انیمیشن‌های زیبا و تعاملی
- ✅ طراحی ریسپانسیو
- ✅ پیش‌نمایش پیتزا با قابلیت درگ و رها کردن
- ✅ سیستم مرحله‌ای برای ساخت پیتزا
- ✅ محاسبه قیمت بلادرنگ
- ✅ ذخیره خودکار در localStorage
- ✅ پشتیبانی از کیبورد
- ✅ طراحی RTL برای فارسی

## نصب و راه‌اندازی

### مرحله 1: نصب وابستگی‌ها
```bash
npm install
```

### مرحله 2: انتقال فایل‌های تصویری
فایل‌های زیر را از پوشه اصلی به پوشه `public` منتقل کنید:
- `pizza1.png` → `public/pizza1.png`
- `pizza2.png` → `public/pizza2.png`
- `pizza3.png` → `public/pizza3.png`
- `bg-pizza.jpg` → `public/bg-pizza.jpg`

### مرحله 3: اجرای پروژه
```bash
npm run dev
```

پروژه روی `http://localhost:3000` اجرا خواهد شد.

## ساختار پروژه

```
src/
├── components/          # کامپوننت‌های React
│   ├── BackgroundEffects.tsx
│   ├── Header.tsx
│   ├── PizzaDisplay.tsx
│   ├── PizzaPreview.tsx
│   ├── ProgressSteps.tsx
│   ├── OptionCard.tsx
│   ├── ThumbnailCarousel.tsx
│   └── ToppingItem.tsx
├── pages/              # صفحات اصلی
│   ├── HomePage.tsx
│   └── PizzaBuilderPage.tsx
├── hooks/              # React Hooks سفارشی
│   └── usePizzaBuilder.ts
├── data/               # داده‌های پیکربندی
│   └── pizzaConfig.ts
├── types/              # تعریف انواع TypeScript
│   └── pizza.ts
├── App.tsx             # کامپوننت اصلی
├── main.tsx            # نقطه ورود
└── index.css           # استایل‌های سراسری
```

## اسکریپت‌های موجود

- `npm run dev` - اجرای سرور توسعه
- `npm run build` - ساخت نسخه تولید
- `npm run preview` - پیش‌نمایش نسخه تولید
- `npm run lint` - بررسی کد

## تکنولوژی‌های استفاده شده

- **React 18** - کتابخانه UI
- **TypeScript** - زبان برنامه‌نویسی
- **Vite** - ابزار ساخت سریع
- **Tailwind CSS** - فریمورک CSS
- **React Router** - مسیریابی
- **Local Storage** - ذخیره محلی داده‌ها

## ویژگی‌های خاص

### صفحه اصلی
- نمایش پیتزاهای مختلف با انیمیشن
- کاروسل انتخاب پیتزا
- افکت‌های شیشه‌ای در پس‌زمینه
- پاسخگویی کامل به کیبورد و موس

### صفحه ساخت پیتزا
- سیستم 5 مرحله‌ای (سایز، خمیر، سس، پنیر، تاپینگ)
- پیش‌نمایش بصری پیتزا
- قابلیت درگ و رها کردن تاپینگ‌ها
- محاسبه خودکار قیمت
- ذخیره خودکار پیشرفت

## پشتیبانی از مرورگرها

- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

## مجوز

این پروژه تحت مجوز MIT منتشر شده است.
