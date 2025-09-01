# WordWise Play - GitHub Copilot Instructions

WordWise Play is an interactive phonics education tool designed for K-2 classrooms. It's a React/TypeScript single-page application built with Vite that helps young learners master word families through engaging, technology-enhanced practice sessions.

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Prerequisites
- Node.js 20+ and npm (tested with Node.js v20.19.4, npm 10.8.2)
- No database or server setup required - fully client-side application

### Bootstrap, Build, and Test the Repository
Run these commands in sequence for a fresh setup:

```bash
# Install dependencies - takes ~15 seconds
npm install

# Build the application - takes ~4 seconds, NEVER CANCEL
npm run build

# Run linting (currently has 4 errors, 10 warnings but application still works)
npm run lint
```

**TIMING EXPECTATIONS:**
- `npm install`: 15 seconds
- `npm run build`: 4 seconds  
- `npm run lint`: 2 seconds
- `npm run dev`: starts instantly

**NEVER CANCEL these commands** - they complete quickly.

### Run the Application

#### Development Server
```bash
# Start development server - starts instantly
npm run dev
```
- Runs on http://localhost:8080
- Auto-reloads on file changes
- No backend server required

#### Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Validation

### ALWAYS Manually Validate Changes
After making any code changes, **ALWAYS run through this complete end-to-end scenario:**

1. **Start the application**: `npm run dev`
2. **Test Landing Page**: Visit http://localhost:8080 - verify "Start Teaching" button works
3. **Test Setup Flow**: 
   - Click "Start Teaching" 
   - Select 2-3 word families (e.g., -at, -an)
   - Verify word count updates (shows "X of 4 selected")
   - Click "Begin Session"
4. **Test Session Flow**:
   - Verify word appears with onset (colored) and rime (white)
   - Test NEXT button navigation
   - Verify word counter updates (e.g., "Word 2 of 18")
   - Test BACK button
   - Verify family name displays correctly
5. **Test Complete Session**: Navigate through several words to verify functionality

### Required Validation Before Committing
- **ALWAYS run `npm run build`** before committing to ensure no build errors
- **ALWAYS test the complete user flow** as described above
- **ALWAYS verify** the application loads without console errors

### Linting Status
Currently has linting issues but application functions correctly:
- 4 errors (empty object types, prefer-const warnings, require() imports)
- 10 warnings (mostly react-refresh warnings)
- Run `npm run lint` to see current status
- These do NOT prevent the application from working

## Common Tasks

### Key Directories and Files

```
src/
├── pages/           # Main application pages
│   ├── Landing.tsx  # Home page with "Start Teaching"
│   ├── Setup.tsx    # Word family selection
│   ├── Session.tsx  # Word practice interface
│   ├── Complete.tsx # Session completion
│   └── TouchTest.tsx # Testing utility
├── components/      # Reusable UI components
│   ├── Footer.tsx   # App footer
│   └── ui/          # ShadCN/UI component library
├── contexts/        # React context providers
│   └── SessionContext.tsx  # Session state management
├── data/           # Application data
│   └── wordFamilies.ts # All word family definitions
├── hooks/          # Custom React hooks
└── lib/            # Utility functions
```

### Key Configuration Files
- `package.json` - Dependencies and scripts
- `vite.config.ts` - Vite build configuration (port 8080)
- `tailwind.config.ts` - Tailwind CSS configuration with custom colors
- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - ESLint configuration

### Word Family Data Structure
All phonics content is defined in `src/data/wordFamilies.ts`:
- 11 word families: -ad, -at, -an, -in, -og, -am, -ug, -op, -ight, -ack, -ail
- Each family contains 8-9 words with onset/rime breakdown
- Example: `{ word: "cat", onset: "c", rime: "at" }`

### Routing Structure
- `/` - Landing page
- `/setup` - Word family selection
- `/session` - Active learning session
- `/complete` - Session completion
- `/test` - Touch testing utility
- `*` - 404 NotFound page

## Technology Stack

### Core Technologies
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite 5.4.19
- **Styling**: Tailwind CSS with custom educational color scheme
- **UI Components**: ShadCN/UI (Radix UI primitives)
- **Routing**: React Router DOM 6
- **State Management**: React Context (no external state library)

### Key Dependencies
- `react-router-dom` - Client-side routing
- `@radix-ui/*` - Accessible UI primitives
- `tailwindcss` - Utility-first CSS framework
- `lucide-react` - Icon library
- `class-variance-authority` - Component variants
- `clsx` and `tailwind-merge` - Conditional styling

### Development Dependencies  
- `@vitejs/plugin-react-swc` - Fast React builds
- `typescript-eslint` - TypeScript linting
- `eslint-plugin-react-hooks` - React hooks linting
- `lovable-tagger` - Development enhancement

## Educational Context

### Target Audience
- **Primary**: K-2 students (ages 5-8)
- **Secondary**: Elementary teachers, reading specialists, homeschool educators

### Key Features
- **11 Word Families**: Comprehensive phonics coverage
- **Randomized Practice**: Words shuffled each session
- **Large Text**: Optimized for classroom projection
- **Touch & Keyboard Ready**: Works on interactive whiteboards and tablets
- **Accessible Design**: High contrast, clear visual separation of onsets/rimes

### Classroom Usage
- Teachers select 1-4 word families per session
- Students identify onsets (beginning sounds) and rimes (ending patterns)
- Visual color coding: onset in yellow, rime in white
- Perfect for whole-class instruction on interactive whiteboards

## Deployment

### Production Deployment
The application builds to static files and can be deployed anywhere:

```bash
# Build for production
npm run build

# Output directory: dist/
# Deploy the dist/ folder to any static hosting service
```

### Hosting Options
- **Primary**: Lovable platform (https://lovable.dev)
- **Alternatives**: Vercel, Netlify, GitHub Pages, any static host
- **School Districts**: Can host on internal servers

### No Server Requirements
- Fully client-side application
- No database or backend API
- All word family data included in build
- Perfect for offline use after initial load

## Common Development Scenarios

### Adding New Word Families
1. Edit `src/data/wordFamilies.ts`
2. Add new family object with id, displayName, rime, and words array
3. Test in Setup page to verify new family appears
4. Validate session works with new words

### Modifying UI Components
1. Most components are in `src/components/ui/` (ShadCN)
2. Custom components in `src/components/`
3. Page-specific components in respective page files
4. Always test responsive design on different screen sizes

### Styling Changes
1. Use Tailwind CSS utility classes
2. Custom colors defined in `tailwind.config.ts`
3. Educational theme: primary (blue), onset (yellow), session colors
4. Test on classroom projection scenarios (large screens)

### Debugging Session Flow
1. Check `src/contexts/SessionContext.tsx` for state management
2. Session data flows: Setup → SessionContext → Session page
3. Word progression logic in Session.tsx
4. Use React DevTools for state inspection

## Troubleshooting

### Common Issues
- **Build fails**: Run `npm install` and retry
- **Linting errors**: Currently expected, app still works
- **Dev server won't start**: Check port 8080 availability
- **UI broken**: Verify Tailwind CSS classes are valid

### Performance Considerations
- Very fast builds (< 5 seconds typical)
- No API calls or database queries
- All assets bundled for optimal loading
- Suitable for slow classroom internet connections

### Browser Compatibility
- Modern browsers supported (Chrome, Firefox, Safari, Edge)
- Touch events for mobile/tablet use
- Keyboard navigation for accessibility
- No special browser requirements

## File Reference

### Frequently Modified Files
```bash
src/data/wordFamilies.ts    # Word content
src/pages/Session.tsx       # Main learning interface  
src/pages/Setup.tsx         # Family selection
src/contexts/SessionContext.tsx  # Session state
src/components/Footer.tsx   # App footer
```

### Build Output (after npm run build)
```bash
dist/
├── index.html              # Main HTML file
├── assets/
│   ├── index-*.css        # Compiled CSS (~64KB)
│   └── index-*.js         # Compiled JavaScript (~341KB)
```

### Key Commands Reference
```bash
npm install                 # Install dependencies (15s)
npm run dev                 # Start development server
npm run build              # Build for production (4s)
npm run preview            # Preview production build
npm run lint               # Run ESLint (has known issues)
```

**Remember**: Always validate your changes through the complete user flow before committing. This ensures the educational functionality remains intact for classroom use.