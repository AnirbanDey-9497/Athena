# Rekord

A modern, full-stack web application built with Next.js, TypeScript, and a robust tech stack for optimal performance and developer experience.

## 🎥 Platform Overview

Rekord is a powerful video recording and sharing platform that enables users to create, manage, and share video content seamlessly. Similar to Loom, it provides an intuitive interface for screen recording, video sharing, and collaboration.

## ✨ User Features

### 🎬 Video Recording
- **Screen Recording**: Capture your entire screen or specific windows
- **Camera Recording**: Record yourself while presenting
- **Audio Recording**: Include system audio and microphone input
- **Pause/Resume**: Control your recording session with ease
- **Trim & Edit**: Basic video editing capabilities to perfect your recordings

### 📤 Sharing & Collaboration
- **Instant Sharing**: Generate shareable links for your recordings
- **Privacy Controls**: Set viewing permissions and password protection
- **Team Collaboration**: Share recordings with team members and collaborators
- **Comments & Feedback**: Add timestamps and comments on videos
- **View Analytics**: Track video views and engagement metrics

### 🎯 User Experience
- **Quick Start**: Begin recording in seconds with minimal setup
- **Cloud Storage**: Automatic cloud backup of all recordings
- **Video Management**: Organize recordings in folders and collections
- **Search & Filter**: Easily find past recordings with powerful search
- **Mobile Friendly**: Access and view recordings on any device

### 🔒 Security & Privacy
- **End-to-End Encryption**: Secure video storage and transmission
- **Access Control**: Granular permissions for video access
- **Data Protection**: GDPR and CCPA compliant
- **Secure Sharing**: Password-protected and expiring links

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15, React 19, and TypeScript
- **Authentication**: Secure user authentication powered by Clerk
- **State Management**: Redux Toolkit for global state management
- **Data Fetching**: TanStack Query (React Query) for efficient data fetching
- **Styling**: Tailwind CSS with a comprehensive UI component library
- **Database**: Prisma ORM for type-safe database operations
- **Payment Processing**: Stripe integration for secure payments
- **Email Services**: Nodemailer for email functionality
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Extensive use of Radix UI primitives
- **Animations**: Tailwind animations and custom transitions
- **Charts**: Recharts for data visualization
- **Notifications**: Toast notifications with react-hot-toast

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **Database**: Prisma
- **State Management**: Redux Toolkit
- **Data Fetching**: TanStack Query
- **UI Components**: Radix UI
- **Form Handling**: React Hook Form + Zod
- **Payment**: Stripe
- **Email**: Nodemailer
- **Charts**: Recharts
- **Notifications**: react-hot-toast

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/rekord.git
cd rekord
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add necessary environment variables.

4. Run the development server:
```bash
npm run dev
```

## 🔧 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting

## 📁 Project Structure

```
src/
├── app/          # Next.js app directory
├── components/   # Reusable UI components
├── hooks/        # Custom React hooks
├── lib/          # Utility functions and configurations
├── redux/        # Redux store and slices
├── constants/    # Application constants
├── types/        # TypeScript type definitions
├── react-query/  # React Query configurations
└── actions/      # Server actions
```

## 🔐 Environment Variables

Create a `.env` file with the following variables:

```env
# Add your environment variables here
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the open-source community for the amazing tools and libraries
