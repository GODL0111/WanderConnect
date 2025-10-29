# WanderConnect Frontend - Development Guide

## 🚀 Quick Start

### Installation
```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📚 Project Structure Deep Dive

### `/src/app`
Next.js App Router directory containing pages and layouts:
- `layout.tsx` - Root layout with global styles
- `page.tsx` - Main home page with all sections
- `globals.css` - Tailwind and global CSS directives
- `metadata.ts` - SEO and Next.js metadata

### `/src/components`
Reusable React components:

#### `ParticleBackground.tsx`
- Animated particle system for background effects
- Uses Framer Motion for smooth animations
- Customizable particle count and animation duration

#### `AnimatedComponents.tsx`
- `AnimatedCard` - Reusable card with entrance/exit animations
- `AnimatedButton` - Button variants with hover effects
- `AnimatedText` - Text with word-by-word animations

#### `HeroSection.tsx`
- Landing section with animated text
- Rotating icons displaying statistics
- Call-to-action buttons
- Gradient animations in background

#### `GamificationWidget.tsx`
- User level display with rotating trophy icon
- Experience progress bar
- Points and badges counter
- Real-time stat updates

#### `TravelPostCard.tsx`
- Travel adventure showcase card
- Image with hover zoom effect
- Engagement metrics (likes, comments, shares)
- Achievement badge display
- Animated like button with counter

#### `AchievementCard.tsx`
- Achievement/badge display
- Locked/unlocked states
- Progress bar for locked achievements
- Bounce animation on unlock

### `/src/store`
State management with Zustand:

#### `userStore.ts`
Manages user game state:
```typescript
// Example usage
const { user, addPoints, unlockBadge } = useUserStore();
addPoints(100);
```

### `/src/services`
API communication layer:

#### `api.ts`
- Axios-based API client
- Interceptors for error handling
- Methods for all endpoints (posts, achievements, leaderboard, etc.)

### `/src/utils`
Utility functions:

#### `gamification.ts`
- Level calculation logic
- Achievement templates
- Badge color mapping
- Experience progression

#### `format.ts`
- Number formatting (K, M, B notation)
- Date formatting (relative times)
- Text truncation
- Initials generation

## 🎨 Styling System

### Tailwind CSS Configuration
Located in `tailwind.config.ts`:
- Custom color palette with gaming aesthetic
- Extended animations (float, glow, slide-up, bounce-custom)
- Custom shadows (glow effects)
- Global component classes (btn-primary, card-glass, gradient-text)

### CSS Variables & Themes
The app uses a consistent color system:
- Primary: `#00D9FF` - Main cyan
- Secondary: `#FF006E` - Hot pink
- Accent: `#8338EC` - Purple
- Dark backgrounds with overlays

### Glass Morphism
Uses `card-glass` class for frosted glass effect:
```jsx
<div className="card-glass">Content</div>
```

## 🎬 Animation System

### Framer Motion
Main animation library providing:
- Page transitions
- Component entrance/exit animations
- Interactive hover effects
- Gesture-based animations

### Custom Tailwind Animations
- `animate-float` - Floating up/down motion
- `animate-glow` - Glowing effect
- `animate-pulse-glow` - Pulsing opacity
- `animate-slide-up` - Slide-up entrance
- `animate-bounce-custom` - Custom bounce

## 🔄 State Management Flow

```
useUserStore (Zustand)
    ↓
User Stats (level, exp, points, badges, achievements)
    ↓
Components (GamificationWidget, AchievementCard)
    ↓
API Service (backend sync)
```

## 🛠️ Development Workflow

### Running Development Server
```bash
npm run dev
```
Starts Next.js dev server with hot reload.

### Type Checking
```bash
npm run type-check
```
Validates TypeScript types without building.

### Building for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 📝 Adding New Components

### Component Template
```typescript
'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ComponentProps {
  // Define props here
}

export const ComponentName: React.FC<ComponentProps> = ({ 
  // props here
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Content */}
    </motion.div>
  );
};
```

### Component Checklist
- [ ] Add `'use client'` directive for client components
- [ ] Use TypeScript interfaces for props
- [ ] Add Framer Motion animations
- [ ] Use Tailwind CSS for styling
- [ ] Export as named export
- [ ] Add to component index if needed

## 🎯 Adding Features

### Add New Page
1. Create file in `/src/app`
2. Export default React component
3. Add to navigation if needed

### Add New API Endpoint
1. Add method to `src/services/api.ts`
2. Define types/interfaces
3. Use in components via `apiService`

### Add New Animation
1. Define in `tailwind.config.ts` keyframes
2. Use via `animate-` Tailwind class
3. Or create custom with Framer Motion

## 🧪 Testing

### Unit Tests (Ready to add)
```bash
npm test
```

### E2E Tests (Ready to add)
```bash
npm run e2e
```

## 📱 Responsive Design

Breakpoints used:
- `sm: 640px`
- `md: 768px`
- `lg: 1024px`
- `xl: 1280px`
- `2xl: 1536px`

### Example:
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  {/* 1 col mobile, 2 cols tablet, 4 cols desktop */}
</div>
```

## 🚨 Performance Tips

1. **Code Splitting** - Next.js handles automatically
2. **Image Optimization** - Use `next/image` component
3. **Animation Performance** - Use `will-change` CSS for expensive animations
4. **Bundle Size** - Check with `npm run build`
5. **Web Vitals** - Monitor with Sentry/Analytics

## 🔐 Security Considerations

1. **API Keys** - Use `.env.local` (gitignored)
2. **CORS** - Configure on backend
3. **Input Validation** - Validate all user inputs
4. **XSS Prevention** - React handles by default
5. **HTTPS** - Required for production

## 📖 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://github.com/pmndrs/zustand)

## 🤝 Contributing Guidelines

1. Create feature branch: `git checkout -b feature/YourFeature`
2. Make changes and test
3. Commit: `git commit -m 'Add YourFeature'`
4. Push: `git push origin feature/YourFeature`
5. Create Pull Request

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -i :3000
kill -9 <PID>
# or use different port
npm run dev -- -p 3001
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

## 📊 Performance Metrics

Monitor with:
- Lighthouse
- Google PageSpeed Insights
- Web Vitals (Core Web Vitals)
- Bundle Analyzer

## 🎯 Next Steps

1. Set up backend API
2. Connect authentication
3. Implement real data fetching
4. Add more pages and features
5. Deploy to production (Vercel recommended)
6. Set up CI/CD pipeline
7. Add testing suite
8. Monitor performance and errors

---

Happy coding! 🚀
