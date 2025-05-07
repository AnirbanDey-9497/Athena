> **⚠️ Important: Project Integration Notice**
>
> This project is not intended to be used as a standalone application. For full functionality, you must use it together with:
>
> - [Rekord-Desktop](<https://github.com/AnirbanDey-9497/Rekord-Desktop>) — An Electron-powered desktop app for screen and video capture.
> - [Rekord Express](<https://github.com/AnirbanDey-9497/Rekord-Express>) — The backend service that connects to Rekord-Desktop via sockets, streams video chunks to CloudFront, and manages storage.
>
> Please refer to the respective repositories for setup and integration instructions.

# Rekord

A modern, full-stack web application built with Next.js, TypeScript, and a robust tech stack for optimal performance and developer experience.

## 🎥 Platform Overview

Rekord is a powerful video recording and sharing platform that enables users to create, manage, and share video content seamlessly. Similar to Loom, it provides an intuitive interface for screen recording, video sharing, and collaboration.

## ✨ User Features

### 🏠 Dashboard
- **Centralized Dashboard**: Access all your videos, folders, and analytics from a single, intuitive dashboard.

  [![Dashboard Overview](public/dashboard.png)](public/dashboard.png)
  *The dashboard provides a comprehensive overview of your video library and activity.*

### 🤖 AI-Powered Features
- **AI Description & Transcript**: Automatically generate accurate description & transcripts for your videos, making them searchable and accessible.

  [![AI Transcript Example](public/ai-transcript.png)](public/ai-transcript.png)
  *View and search through AI-generated video transcripts.*

- **AI Chatbot**: Interact with an AI chatbot that answers questions based on the video transcript, enhancing viewer engagement and support.

  [![AI Chatbot Example](public/ai-chatbot.png)](public/ai-chatbot.png)
  *Ask questions about the video and get instant AI-powered responses.*

### ☁️ Cloud Video Storage & Delivery
- **Fast & Secure Streaming**: All videos are stored on AWS CloudFront, ensuring fast, reliable, and secure video delivery to users worldwide.

  [![CloudFront Video Delivery](public/cloudfront.png)](public/cloudfront.png)
  *Videos are streamed directly from CloudFront for optimal performance and scalability.*

### 📎 Embeddable Links & GIF Previews
- **Embeddable Links**: Copy and paste video links into platforms like Gmail, where they appear as animated GIF previews for instant context.

  [![Embeddable GIF Preview](public/embed-gif.png)](public/embed-gif.png)
  *Share videos with rich GIF previews in emails and other platforms.*

### ⚙️ Customizable Settings
- **Settings with Modes**: Choose between three distinct modes in the settings to tailor the platform to your workflow and preferences.

  [![Settings Modes](public/settings-modes.png)](public/settings-modes.png)
  *Easily switch between different modes to customize your Rekord experience.*

---

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
- **Database**: Neon (PostgreSQL) with Prisma ORM
- **Payment Processing**: Stripe integration for secure payments
- **Email Services**: Nodemailer for email functionality
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Extensive use of Radix UI primitives
- **Animations**: Tailwind animations and custom transitions
- **Charts**: Recharts for data visualization
- **Notifications**: Toast notifications with react-hot-toast

---

> **⚡ Related Projects Overview**
>
> Rekord is designed to work seamlessly with two companion applications:
>
> ### 🖥️ Rekord Desktop
> - Electron-powered desktop app for screen and video capture
> - Built with React, TypeScript, Vite, and Tailwind CSS
> - Real-time communication with backend via Socket.IO
> - Modern UI with Radix UI and Shadcn UI components
> - Authentication with Clerk
> - Cross-platform and responsive design
>

[![Rekord Desktop Example](public/rekord-desktop.png)](public/rekord-desktop.png)
  *Record Videos using your computer effortlessly.*


> ### 🛠️ Rekord Express
> - Node.js/Express backend for video processing and storage
> - Real-time video chunk handling and WebSocket support
> - AWS S3/CloudFront integration for secure, scalable storage
> - OpenAI-powered features: transcription, Q&A, title/summary generation
> - Plan-based access control (PRO features)
> - API endpoints for AI and video management
>
> These apps together enable end-to-end video capture, processing, AI analysis, and secure cloud delivery for the Rekord platform.

[![Rekord Express Example](public/rekord-express.png)](public/rekord-express.png)
  *Save videos to Cloudfront via WebSocket for real time communication.*

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **Database**: Neon (PostgreSQL) with Prisma ORM
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

4. Set up the database:
```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev
```

5. Run the development server:
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

## 🗄️ Database

### Schema
The database schema is defined in `prisma/schema.prisma`. Key models include:

- **User**: User profiles and authentication data
- **Recording**: Video recording metadata and storage information
- **Share**: Sharing permissions and access controls
- **Comment**: User comments and feedback on recordings

### Migrations
Database migrations are managed using Prisma Migrate:

```bash
# Create a new migration
npx prisma migrate dev --name migration_name

# Apply pending migrations
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset
```

### Database Management
- **Development**: Local PostgreSQL instance or Neon development database
- **Production**: Neon production database with automatic backups
- **Backup**: Daily automated backups with point-in-time recovery

## 🔄 State Management

### Redux Toolkit
The application uses Redux Toolkit for global state management. Key features include:

#### Store Structure
```
src/redux/
├── store.ts          # Redux store configuration
├── slices/           # Feature-based state slices
│   ├── auth/        # Authentication state
│   ├── recording/   # Recording session state
│   ├── player/      # Video player state
│   └── ui/          # UI state management
└── hooks.ts         # Custom Redux hooks
```

#### Key State Slices
- **Auth Slice**: User authentication and session management
- **Recording Slice**: Recording session state, controls, and metadata
- **Player Slice**: Video playback state and controls
- **UI Slice**: Application-wide UI state (theme, modals, etc.)

#### Usage Example
```typescript
// Using Redux in components
import { useDispatch, useSelector } from 'react-redux';
import { setRecordingState } from '@/redux/slices/recording';

// In your component
const dispatch = useDispatch();
const recordingState = useSelector((state) => state.recording);

// Dispatching actions
dispatch(setRecordingState({ isRecording: true }));
```

### State Persistence
- Redux state is persisted using Redux Persist
- Critical state is saved to localStorage
- Session-specific state is managed in memory

## 🔐 Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@ep-something.region.aws.neon.tech/neondb"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_1234567890abcdef
CLERK_SECRET_KEY=sk_test_abcdef1234567890

# Stripe Payment
STRIPE_CLIENT_SECRET=sk_test_stripeclientsecret
STRIPE_SUBSCRIPTION_PRICE_ID=price_1234567890abcdef

# Host URL (for links in emails, etc.)
NEXT_PUBLIC_HOST_URL=https://your-app-domain.com

# Nodemailer Email Service
MAILER_EMAIL=your-email@example.com
MAILER_PASSWORD=your-email-password

# (Optional) AWS/Cloud Storage (if used directly in this app)
# ACCESS_KEY=your_aws_access_key
# SECRET_KEY=your_aws_secret_key
# BUCKET_REGION=your_aws_region
# BUCKET_NAME=your_s3_bucket_name

# (Optional) OpenAI API Key (if used directly in this app)
# OPEN_AI_KEY=your_openai_api_key

# (Optional) Electron/Backend Host (if needed for integration)
# ELECTRON_HOST=http://localhost:5173
# NEXT_API_HOST=http://localhost:3000
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the Apache License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Anirban Dey - Initial work

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the open-source community for the amazing tools and libraries
