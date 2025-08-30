# Contributing to WordWise Play

Thank you for your interest in contributing to WordWise Play! This document provides information for developers who want to contribute to or modify the project.

## Project Development

**Lovable Project URL**: https://lovable.dev/projects/a0d99597-0967-435d-9900-08ea2f639d7f

## Technology Stack

WordWise Play is built with modern, education-focused technologies:

- **Frontend Framework**: React 18 with TypeScript for type-safe development
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Components**: shadcn/ui component library for consistent, accessible design
- **Styling**: Tailwind CSS for responsive, mobile-first design
- **Routing**: React Router for seamless navigation
- **State Management**: React Context for session and game state
- **Icons**: Lucide React for crisp, scalable icons
- **Development**: ESLint and TypeScript for code quality

### Educational Features

- **Phonics Data Structure**: Comprehensive word families with onset/rime breakdown
- **Randomization**: Built-in shuffling algorithms to vary practice sessions
- **Accessibility**: Keyboard navigation and screen reader support
- **Responsive Design**: Works seamlessly on desktops, tablets, and interactive whiteboards

## Development Setup

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Local Development

```sh
# Step 1: Clone the repository
git clone https://github.com/fitzgeraldsteele/wordwise-play.git

# Step 2: Navigate to the project directory
cd wordwise-play

# Step 3: Install the necessary dependencies
npm install

# Step 4: Start the development server with auto-reloading and an instant preview
npm run dev
```

## How to Contribute

There are several ways to contribute to WordWise Play:

### 1. Use Lovable (Recommended)

Simply visit the [Lovable Project](https://lovable.dev/projects/a0d99597-0967-435d-9900-08ea2f639d7f) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

### 2. Local Development

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

### 3. Edit Files Directly in GitHub

- Navigate to the desired file(s)
- Click the "Edit" button (pencil icon) at the top right of the file view
- Make your changes and commit the changes

### 4. Use GitHub Codespaces

- Navigate to the main page of your repository
- Click on the "Code" button (green button) near the top right
- Select the "Codespaces" tab
- Click on "New codespace" to launch a new Codespace environment
- Edit files directly within the Codespace and commit and push your changes once you're done

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── Footer.tsx      # App footer component
├── contexts/           # React contexts for state management
│   └── SessionContext.tsx
├── data/              # Static data and content
│   └── wordFamilies.ts # Word families data structure
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── pages/             # Page components for routing
│   ├── Landing.tsx    # Home page
│   ├── Setup.tsx      # Word family selection
│   ├── Session.tsx    # Practice session
│   └── Complete.tsx   # Session completion
└── main.tsx           # App entry point
```

## Deployment

### Lovable Deployment (Recommended)

The easiest way to deploy WordWise Play is through [Lovable](https://lovable.dev/projects/a0d99597-0967-435d-9900-08ea2f639d7f). Simply click on Share → Publish to make your version live.

### Custom Hosting

For schools and districts requiring custom hosting, the application can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop the `dist` folder after running `npm run build`
- **GitHub Pages**: Use GitHub Actions for automated deployment

### Custom Domain Setup

If using Lovable, you can connect a custom domain:

1. Navigate to Project > Settings > Domains
2. Click Connect Domain
3. Follow the setup instructions

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Contributing Guidelines

### Code Style

- Follow TypeScript best practices
- Use meaningful component and variable names
- Keep components small and focused
- Use Tailwind CSS for styling
- Ensure accessibility compliance

### Educational Considerations

When contributing new features, keep in mind:

- The target audience is K-2 students and their teachers
- Design should be clear and uncluttered
- Text should be large enough for classroom projection
- Features should support both touch and keyboard interaction
- Consider accessibility for diverse learners

### Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Questions or Issues?

- Open an issue on GitHub for bug reports or feature requests
- Contact the maintainers through the Lovable project
- Check existing issues before creating new ones

Thank you for helping make WordWise Play better for educators and students!