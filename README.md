# 🎮 Vibe Coding Games

A modern game collection built with React + TypeScript, featuring responsive design and multilingual support.

[English](#english) | [中文](#中文)

## English

### 🌟 Features

- **🎯 Classic Games**: Currently featuring Snake Game with more games coming soon
- **📱 Mobile Friendly**: Responsive design with touch controls and swipe gestures
- **🌍 Multilingual**: Support for English and Chinese
- **⚙️ Customizable**: Multiple difficulty levels and settings
- **🎨 Modern UI**: Beautiful design with smooth animations
- **🔧 TypeScript**: Fully typed for better development experience

### 🎮 Games

#### Snake Game
- Classic snake gameplay with modern controls
- Three difficulty levels (Easy, Medium, Hard)
- Mobile-friendly touch controls
- Swipe gesture support
- Keyboard controls (Arrow keys, WASD)
- Real-time scoring system

### 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/vibe-coding-games.git

# Navigate to project directory
cd vibe-coding-games

# Install dependencies
pnpm install

# Start development server
pnpm start

# Build for production
pnpm build
```

### 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Routing**: React Router v6
- **Internationalization**: react-i18next
- **Styling**: CSS3 with modern features
- **Build Tool**: Create React App
- **Package Manager**: pnpm

### 📱 Mobile Support

- Touch-friendly button controls
- Swipe gesture recognition
- Responsive design for all screen sizes
- Optimized for mobile performance

### 🌍 Internationalization

The app supports multiple languages:
- English (en)
- Chinese (zh)

Language files are located in `src/i18n/locales/`.

### 🎯 Project Structure

```
src/
├── components/          # Shared components
│   ├── HomePage.tsx     # Main landing page
│   ├── GameLayout.tsx   # Game wrapper layout
│   └── LanguageSelector.tsx
├── games/               # Game modules
│   └── snake/           # Snake game
│       ├── components/  # Game-specific components
│       ├── hooks/       # Game logic hooks
│       ├── types/       # Type definitions
│       └── utils/       # Game utilities
├── i18n/               # Internationalization
│   └── locales/        # Language files
└── App.tsx             # Main app component
```

### 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 中文

### 🌟 特色功能

- **🎯 经典游戏**: 目前包含贪吃蛇游戏，更多游戏即将推出
- **📱 移动端友好**: 响应式设计，支持触摸控制和滑动手势
- **🌍 多语言支持**: 支持中文和英文界面
- **⚙️ 可自定义**: 多种难度级别和设置选项
- **🎨 现代化界面**: 精美设计配合流畅动画
- **🔧 TypeScript**: 完整类型支持，提供更好的开发体验

### 🎮 游戏列表

#### 贪吃蛇游戏
- 经典贪吃蛇玩法配合现代化控制
- 三种难度级别（简单、中等、困难）
- 移动端友好的触摸控制
- 支持滑动手势操作
- 键盘控制（方向键、WASD）
- 实时计分系统

### 🚀 快速开始

```bash
# 克隆仓库
git clone https://github.com/yourusername/vibe-coding-games.git

# 进入项目目录
cd vibe-coding-games

# 安装依赖
pnpm install

# 启动开发服务器
pnpm start

# 构建生产版本
pnpm build
```

### 🛠️ 技术栈

- **前端**: React 19, TypeScript
- **路由**: React Router v6
- **国际化**: react-i18next
- **样式**: CSS3 现代特性
- **构建工具**: Create React App
- **包管理器**: pnpm

### 📱 移动端支持

- 触摸友好的按钮控制
- 滑动手势识别
- 适配所有屏幕尺寸的响应式设计
- 移动端性能优化

### 🌍 国际化

应用支持多种语言：
- 英文 (en)
- 中文 (zh)

语言文件位于 `src/i18n/locales/` 目录。

### 🎯 项目结构

```
src/
├── components/          # 共享组件
│   ├── HomePage.tsx     # 主页面
│   ├── GameLayout.tsx   # 游戏布局包装器
│   └── LanguageSelector.tsx
├── games/               # 游戏模块
│   └── snake/           # 贪吃蛇游戏
│       ├── components/  # 游戏专用组件
│       ├── hooks/       # 游戏逻辑钩子
│       ├── types/       # 类型定义
│       └── utils/       # 游戏工具函数
├── i18n/               # 国际化
│   └── locales/        # 语言文件
└── App.tsx             # 主应用组件
```

### 🤝 贡献

欢迎贡献代码！请随时提交 Pull Request。

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 📄 许可证

本项目基于 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。