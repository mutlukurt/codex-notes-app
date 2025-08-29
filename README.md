# 📝 Codex - Modern Local-First Notes App

[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/mutlukurt/codex-notes-app)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-blue.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC.svg)](https://tailwindcss.com)

> **A premium, local-first notes application with modern UI/UX design. Built with vanilla JavaScript, featuring glassmorphism effects, rich text editing, and complete privacy.**

**🔒 100% Private** • **📱 Fully Responsive** • **⚡ Lightning Fast** • **🎨 Modern Design** • **📄 PDF Export**

![Codex Preview](assets/images/hero-preview.png)

## ✨ Features

### 🎨 **Modern UI/UX Design**
- **Glassmorphism effects** with backdrop blur and transparency
- **Premium gradient backgrounds** and smooth color transitions
- **Micro-animations** and hover states for enhanced interaction
- **Professional color palette** - Teal, Ivory, and Selective Yellow
- **Card-based design** with rounded corners and shadows
- **Inter font** with optimized typography hierarchy

### 🗂️ **Advanced Folder Management**
- **Create unlimited folders** with modern card design
- **Rename folders** with real-time validation and duplicate checking
- **Delete folders** with confirmation dialogs
- **Collapsible structure** with smooth animations
- **Visual hierarchy** with active states and hover effects
- **Icon-based navigation** with professional SVG icons

### ✍️ **Rich Text Editor**
- **Glassmorphism editor** with floating toolbar design
- **Comprehensive formatting** - H1/H2/H3, Bold, Italic, Underline
- **Infinite color picker** for text customization
- **Real-time auto-save** to localStorage
- **Keyboard shortcuts** (Ctrl/Cmd + B/I/U)
- **Focus states** with dynamic border animations
- **Placeholder text** with elegant styling

### 📄 **PDF Export System**
- **One-click PDF export** with professional formatting
- **Automatic file naming** with timestamp
- **Multi-page support** for long documents
- **Preserved formatting** including colors and styles
- **Turkish date formatting** for localization
- **Loading animations** during export process

### 📱 **Responsive Experience**
- **Mobile-first design** with hamburger menu
- **Touch-optimized** interface for all devices
- **Adaptive layouts** for desktop, tablet, and mobile
- **Smooth sidebar** transitions and overlays
- **Consistent experience** across all screen sizes

### 🔐 **Privacy & Security**
- **100% local storage** - data never leaves your device
- **No registration** or account requirements
- **Zero tracking** or analytics
- **Offline-first** functionality
- **XSS protection** with proper input sanitization
- **Data validation** and error handling

### 🚀 **Performance Features**
- **Lightning-fast loading** with optimized assets
- **Smooth animations** with hardware acceleration
- **Efficient DOM updates** and memory management
- **Toast notifications** for user feedback
- **Error handling** with graceful fallbacks

## 🚀 Quick Start

### 🌐 **Option 1: Direct Use (Recommended)**
```bash
# Clone the repository
git clone https://github.com/mutlukurt/codex-notes-app.git
cd codex-notes-app

# Open directly in browser
open index.html
# or drag index.html to your browser
```

### 🔧 **Option 2: Development Server**
```bash
# Install development dependencies
npm install

# Start with live reload
npm start
# or
npm run dev

# Alternative: Python server
python3 -m http.server 3000
```

**➡️ Open [http://localhost:3000](http://localhost:3000) in your browser**

### 📦 **What's Included**
```
codex-notes-app/
├── 📄 index.html              # Main application file
├── 📂 assets/
│   ├── 🎨 css/styles.css      # Modern UI styling
│   ├── ⚡ js/app.js           # Core application logic
│   └── 🖼️ images/            # Screenshots and assets
├── 📦 package.json            # Project metadata
├── 📖 README.md               # Documentation
├── 📄 LICENSE                 # MIT License
└── 🔧 .gitignore             # Git configuration
```

## 📋 System Requirements

### Minimum Requirements
- **Modern web browser** (Chrome 80+, Firefox 75+, Safari 13+, Edge 80+)
- **JavaScript enabled**
- **LocalStorage support** (available in all modern browsers)

### Recommended
- **Desktop/Laptop** for optimal experience
- **1920x1080** resolution or higher
- **High-speed internet** for initial font loading

## 🎯 User Guide

### 📝 **Getting Started**

#### **Create Your Workspace**
1. **📁 Create Folder** - Click the gradient "Create Folder" button
2. **📄 Add Notes** - Use the "+" icon that appears on folder hover
3. **✏️ Rename Items** - Click the blue edit icon for folders
4. **🗑️ Delete Items** - Use the red trash icon with confirmation

#### **Rich Text Editing**
1. **🎨 Formatting** - Select text and use the glassmorphism toolbar
2. **🎨 Colors** - Use the color picker for custom text colors
3. **📐 Structure** - Apply H1, H2, H3 headers for organization
4. **💾 Auto-save** - Everything saves automatically as you type

#### **Export & Share**
1. **📄 PDF Export** - Click the download icon in the toolbar
2. **🎯 Professional Format** - Exports with headers, styling, and timestamps
3. **📱 Any Device** - Works perfectly on mobile, tablet, and desktop

### ⌨️ **Keyboard Shortcuts**
| Shortcut | Action | Description |
|----------|--------|-------------|
| `Ctrl/Cmd + B` | **Bold** | Make selected text bold |
| `Ctrl/Cmd + I` | *Italic* | Make selected text italic |
| `Ctrl/Cmd + U` | <u>Underline</u> | Underline selected text |

### 🔄 **Data Management**
- **⚡ Real-time Saving** - Changes saved instantly to localStorage
- **🔄 Session Restore** - Automatically restores your workspace
- **📱 Cross-Device** - Works on any device with a modern browser
- **🔒 Privacy** - All data stays on your device, never uploaded

## 🏗️ Project Structure

```
codex-notes-app/
├── 📄 index.html              # Main HTML file
├── 📂 assets/
│   ├── 🎨 css/
│   │   └── styles.css         # Main stylesheet
│   ├── ⚡ js/
│   │   └── app.js             # Main application logic
│   └── 🖼️ images/             # Images and screenshots
├── 📦 package.json            # Project metadata
├── 📖 README.md               # This file
├── 📄 LICENSE                 # MIT License
└── 🗑️ codex.html              # Legacy single-file version
```

## 🛠️ Technology Stack

### 🎨 **Frontend Technologies**
- **HTML5** - Semantic markup with modern structure
- **CSS3** - Advanced styling with Grid, Flexbox, and Animations
- **Vanilla JavaScript ES6+** - No frameworks, pure modern JavaScript
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development

### 🎭 **UI/UX Technologies**
- **Glassmorphism** - Modern backdrop-filter and transparency effects
- **CSS Gradients** - Premium color transitions and backgrounds
- **CSS Animations** - Smooth micro-interactions and hover states
- **Inter Font** - Google Fonts for optimal readability
- **Heroicons** - Professional SVG icon set

### 📄 **Export Technologies**
- **jsPDF** - Client-side PDF generation
- **html2canvas** - HTML to canvas conversion for PDF export
- **Canvas API** - High-quality rendering and image processing

### 💾 **Data & Storage**
- **localStorage** - Browser-native persistent storage
- **JSON** - Structured data serialization
- **IndexedDB** (future) - Enhanced storage capabilities

### 🔧 **Development Tools**
- **npm** - Package management and build scripts
- **Live Server** - Development server with hot reload
- **Git** - Version control with professional workflows

## 🎨 Design System

### 🌈 **Color Palette**
```css
/* Primary Colors */
--teal: #217f8b             /* Main backgrounds and headers */
--ivory: #fffdef            /* Note editor background */
--selective-yellow: #feb92e  /* Accents and highlights */

/* Supporting Colors */
--dark-teal: #1a6670        /* Sidebar background */
--light-teal: #2a9aaa       /* Hover states */
--dark-gray: #2d2d2d        /* Primary text */
--medium-gray: #666666      /* Secondary text */
```

### ✨ **Visual Effects**
- **Glassmorphism** - `backdrop-filter: blur(10px)` with transparency
- **Gradients** - Linear gradients for premium feel
- **Shadows** - Layered shadows with color-matching
- **Animations** - Cubic-bezier easing for smooth motion

### 📝 **Typography Scale**
| Element | Font Size | Weight | Usage |
|---------|-----------|--------|-------|
| **H1** | 2rem (32px) | 700 | Main headings |
| **H2** | 1.5rem (24px) | 700 | Section headings |
| **H3** | 1.25rem (20px) | 700 | Subsection headings |
| **Body** | 1rem (16px) | 400 | Regular text |
| **Small** | 0.875rem (14px) | 400 | Secondary text |

### 🎯 **Spacing System**
- **Base unit**: 0.25rem (4px)
- **Small**: 0.5rem (8px)
- **Medium**: 1rem (16px)
- **Large**: 1.5rem (24px)
- **Extra Large**: 2rem (32px)

## 🔧 Development

### Local Development Setup
```bash
# Clone the repository
git clone https://github.com/mutlukurt/codex-notes-app.git
cd codex-notes-app

# Install development dependencies
npm install

# Start development server with live reload
npm run dev
```

### Code Structure
- **`app.js`** - Main application class with all functionality
- **`styles.css`** - Complete styling with responsive design
- **`index.html`** - Semantic HTML structure

### Key Classes and Methods
```javascript
class CodexApp {
  constructor()           // Initialize app
  createFolder()          // Create new folder
  createNote()           // Create new note
  saveCurrentNote()      // Auto-save functionality
  renderFolders()        // Update sidebar
  handleToolbarClick()   // Rich text formatting
}
```

## 🗺️ Roadmap

### 🚀 **Version 2.1 (Q1 2025)**
- [ ] **🔍 Global Search** - Search across all notes and folders
- [ ] **🏷️ Tags System** - Organize notes with custom tags
- [ ] **📱 PWA Support** - Install as native app
- [ ] **🌙 Theme System** - Light/Dark mode toggle
- [ ] **⌨️ Advanced Shortcuts** - Extended keyboard navigation

### 🎯 **Version 2.2 (Q2 2025)**
- [ ] **📊 Tables Support** - Rich table editing capabilities
- [ ] **🖼️ Image Embedding** - Drag & drop image support
- [ ] **📋 Templates** - Pre-designed note templates
- [ ] **🔄 Import/Export** - JSON/Markdown import/export
- [ ] **📐 Advanced Formatting** - Code blocks, quotes, lists

### 🌟 **Version 3.0 (Q3 2025)**
- [ ] **☁️ Optional Cloud Sync** - Encrypted cloud backup
- [ ] **👥 Collaboration** - Real-time collaborative editing
- [ ] **🔌 Plugin System** - Custom extensions support
- [ ] **📈 Analytics Dashboard** - Writing statistics
- [ ] **🎨 Custom Themes** - User-created theme support

### 💡 **Future Concepts**
- [ ] **🤖 AI Integration** - Smart text suggestions
- [ ] **🗣️ Voice Notes** - Audio recording and transcription
- [ ] **📱 Mobile Apps** - Native iOS/Android applications
- [ ] **🔗 Link Preview** - Rich link previews and embeds

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Guidelines
- Follow existing code style and conventions
- Add comments for complex functionality
- Test on multiple browsers
- Update documentation as needed

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature idea? We'd love to hear from you!

- **Bug Reports**: [Create an Issue](https://github.com/mutlukurt/codex-notes-app/issues)
- **Feature Requests**: [Start a Discussion](https://github.com/mutlukurt/codex-notes-app/discussions)

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Mutlu Kurt

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 🏆 **Why Choose Codex?**

### 🔒 **Privacy-First**
- **Zero data collection** - No analytics, tracking, or telemetry
- **Local-only storage** - Your data never leaves your device
- **No registration** - Start using immediately without accounts

### 🚀 **Performance & Experience**
- **Lightning fast** - Optimized for speed and responsiveness
- **Modern UI** - 2024-2025 design trends with glassmorphism
- **Cross-platform** - Works perfectly on all devices

### 💎 **Professional Features**
- **PDF Export** - Publication-ready document export
- **Rich Text Editor** - Professional formatting capabilities
- **Smart Organization** - Intuitive folder and note management

---

## 👨‍💻 **Author**

**Mutlu Kurt** - *Full Stack Developer & UI/UX Designer*
- 🐙 **GitHub**: [@mutlukurt](https://github.com/mutlukurt)
- 💼 **Specializes in**: Modern web applications, user experience design
- 🎯 **Focus**: Privacy-first applications and local-first software

## 🙏 Acknowledgments

- **Tailwind CSS** - For the utility-first CSS framework
- **Heroicons** - For the beautiful SVG icon set
- **Inter Font** - For the excellent typography
- **jsPDF & html2canvas** - For enabling client-side PDF generation
- **Open Source Community** - For continuous inspiration and support

## ⭐ Support

If you find this project helpful, please consider:
- ⭐ **Starring** the repository
- 🐛 **Reporting** bugs and issues
- 💡 **Suggesting** new features
- 🔄 **Sharing** with others who might find it useful

---

<div align="center">

### 🌟 **Star History**

[![Star History Chart](https://api.star-history.com/svg?repos=mutlukurt/codex-notes-app&type=Date)](https://star-history.com/#mutlukurt/codex-notes-app&Date)

### 💫 **Made with passion for privacy-first software**

**Built with ❤️ by [Mutlu Kurt](https://github.com/mutlukurt)**

*Codex - Where your thoughts remain truly yours*

---

**🔒 Private** • **⚡ Fast** • **🎨 Beautiful** • **📄 Professional**

© 2025 Mutlu Kurt. Licensed under MIT.

</div>
