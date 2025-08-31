welcome to # CodeAI Frontend

A modern, responsive frontend for an AI learning platform built with React, Tailwind CSS v4, and Framer Motion.

## Features

- **Dark Theme UI**: Glassmorphism design with neon accents
- **Responsive Design**: Mobile-first approach with tablet and desktop layouts
- **Interactive Code Showcase**: Syntax-highlighted code editor with typing animation
- **Authentication Flow**: Landing page for guests, app shell for authenticated users
- **Problem Workspace**: Interactive coding environment with hints and real-time feedback
- **Accessibility**: Full keyboard navigation, ARIA labels, and focus management

## Tech Stack

- **React 19** - Modern functional components with hooks
- **Tailwind CSS v4** - Utility-first CSS framework with JIT compilation
- **Framer Motion** - Smooth animations and micro-interactions
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icon set
- **Vite** - Fast development build tool

## Project Structure

```
src/
├── main.jsx              # App entry point
├── App.jsx               # Router configuration
├── styles/
│   └── index.css         # Global styles and Tailwind imports
├── pages/
│   ├── LandingPage.jsx   # Public homepage
│   └── Home.jsx          # Authenticated workspace
├── components/
│   ├── NavbarPublic.jsx  # Landing page navigation
│   ├── NavbarApp.jsx     # App navigation for authenticated users
│   ├── Footer.jsx        # Site footer
│   ├── CodeShowcase.jsx  # Interactive code editor display
│   ├── Button.jsx        # Reusable button component
│   ├── FeatureCard.jsx   # Feature showcase cards
│   ├── CategoryCard.jsx  # AI category navigation cards
│   ├── TestimonialCard.jsx # User testimonial display
│   └── MetricCard.jsx    # Statistics and progress cards
└── utils/
    └── syntaxHighlighter.js # Simple code syntax highlighting
```

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Design System

### Colors
- **Background**: Dark gradients from #0F0F10 to #000000
- **Accents**: Electric blue (#3B82F6), Cyan (#06B6D4), Violet (#8B5CF6)
- **Text**: White primary, gray variants for secondary text

### Typography
- **Primary**: Inter font family
- **Code**: JetBrains Mono for code blocks

### Components
- **Glassmorphism**: Translucent cards with blur effects
- **Glow Effects**: Subtle neon glows on hover
- **Custom Scrollbars**: Styled to match dark theme

## Key Features Implementation

### CodeShowcase Component
- Fixed height container prevents layout shifts
- Typing animation with syntax highlighting
- Custom scrollbars matching the dark theme
- Responsive height adjustments

### Navigation
- **Public Navbar**: Clean, minimal for landing page
- **App Navbar**: Feature-rich with notifications, user menu, progress
- **Mobile Responsive**: Hamburger menus for smaller screens

### Accessibility
- Keyboard navigation support
- Focus ring indicators
- ARIA labels and semantic HTML
- Screen reader friendly

## API Integration

The frontend is designed to work with the Express backend APIs documented in `server/api-stubs.md`. Key integration points:

- **Authentication**: Login/logout with JWT tokens
- **Problems**: Fetch problem lists and details
- **Submissions**: Submit code and get test results
- **Progress**: User statistics and leaderboard data

## Development Notes

### Tailwind Configuration
A minimal `tailwind.config.js` is included to extend the default theme with:
- Custom color palette for the AI theme
- Animation keyframes for typing and glow effects
- Font family extensions

### Performance Considerations
- Code splitting with React Router
- Optimized bundle size with Vite
- Lazy loading for large components
- Efficient re-renders with proper React patterns

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox for layouts
- Custom scrollbars with WebKit fallbacks

## Next Steps

1. **Backend Integration**: Implement the Express API endpoints from `server/api-stubs.md`
2. **Authentication**: Add JWT token management and route protection
3. **Code Execution**: Integrate with Judge0 or similar code execution service
4. **Real-time Features**: WebSocket connections for live updates
5. **Testing**: Add unit tests with Jest and React Testing Library
6. **Deployment**: Configure for production deployment (Vercel, Netlify, etc.)

## Testing Checklist

- [ ] Landing page loads without layout shifts
- [ ] CodeShowcase maintains fixed height during typing animation
- [ ] Responsive design works on mobile, tablet, and desktop
- [ ] All buttons have consistent styling and focus states
- [ ] Navigation works properly between public and authenticated views
- [ ] Custom scrollbars appear and function correctly
- [ ] Accessibility features work (keyboard navigation, screen readers)

## License

MIT License - see LICENSE file for details.