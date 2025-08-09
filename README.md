# Krish Gifts - Handcrafted Memories

A beautiful and modern e-commerce platform for handmade gifts, custom photo frames, albums, and personalized gifts. Built with Next.js 14, TypeScript, and Tailwind CSS.

## 🎨 Features

### ✨ Beautiful Design
- Modern, responsive design with beautiful animations
- Gradient backgrounds and smooth transitions
- Custom color scheme with primary and secondary colors
- Beautiful typography with Inter and Playfair Display fonts

### 🛍️ E-commerce Functionality
- **Product Catalog**: Browse through different categories of gifts
- **Shopping Cart**: Add, remove, and manage cart items
- **User Authentication**: Login, register, and user profile management
- **Wishlist**: Save favorite products for later
- **Product Search**: Search through the product catalog
- **Responsive Design**: Works perfectly on all devices

### 🎯 Key Sections
- **Hero Section**: Eye-catching landing page with call-to-action
- **Categories**: Beautiful category cards with hover effects
- **Featured Products**: Showcase best-selling products
- **Testimonials**: Customer reviews and ratings
- **Newsletter**: Email subscription with beautiful design
- **Footer**: Comprehensive footer with links and social media

### 🔧 Technical Features
- **Next.js 14**: Latest version with App Router
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Beautiful animations and transitions
- **React Hook Form**: Form handling and validation
- **Context API**: State management for auth and cart
- **Local Storage**: Persistent cart and user data

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd krish-gifts
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
krish-gifts/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Homepage
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navigation.tsx  # Main navigation
│   │   │   └── Footer.tsx      # Footer component
│   │   ├── providers/
│   │   │   ├── AuthProvider.tsx # Authentication context
│   │   │   └── CartProvider.tsx # Shopping cart context
│   │   ├── sections/
│   │   │   ├── Hero.tsx        # Hero section
│   │   │   ├── Categories.tsx  # Product categories
│   │   │   ├── FeaturedProducts.tsx # Featured products
│   │   │   ├── Testimonials.tsx # Customer testimonials
│   │   │   └── Newsletter.tsx  # Newsletter subscription
│   │   └── ui/
│   │       └── Loading.tsx     # Loading component
│   └── types/                  # TypeScript type definitions
├── public/                     # Static assets
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🎨 Design System

### Colors
- **Primary**: Orange gradient (#ed7516 to #de5a0c)
- **Secondary**: Purple gradient (#d946ef to #c026d3)
- **Background**: Gradient backgrounds with subtle patterns
- **Text**: Dark gray (#1f2937) for headings, medium gray (#6b7280) for body

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Components
- **Buttons**: Primary, secondary, and outline variants
- **Cards**: Hover effects with shadows and transforms
- **Forms**: Clean input fields with focus states
- **Navigation**: Sticky header with backdrop blur

## 🔧 Customization

### Adding New Products
1. Update the products array in `FeaturedProducts.tsx`
2. Add product images to the public folder
3. Update categories in `Categories.tsx`

### Modifying Colors
1. Edit the color palette in `tailwind.config.js`
2. Update CSS variables in `globals.css`
3. Modify component styles as needed

### Adding New Pages
1. Create new page files in `src/app/`
2. Add navigation links in `Navigation.tsx`
3. Update footer links in `Footer.tsx`

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The project can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform

## 🛠️ Built With

- **[Next.js](https://nextjs.org/)** - React framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animations
- **[Lucide React](https://lucide.dev/)** - Icons
- **[React Hook Form](https://react-hook-form.com/)** - Form handling

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, email hello@krishgifts.com or join our Slack channel.

## 🙏 Acknowledgments

- Design inspiration from modern e-commerce platforms
- Icons from [Lucide](https://lucide.dev/)
- Images from [Unsplash](https://unsplash.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)

---

Made with ❤️ by the Krish Gifts team 