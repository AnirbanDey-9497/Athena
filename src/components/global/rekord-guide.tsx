import { FaUsers, FaVideo, FaDesktop, FaFolderOpen, FaShareAlt } from 'react-icons/fa'

export default function RekordGuide() {
  return (
    <section className="w-full max-w-3xl mx-auto bg-[#232336] rounded-2xl shadow-xl p-8 mb-10 mt-6">
      <h2 className="text-3xl font-extrabold text-white mb-4 text-center tracking-tight">Welcome to Rekord 👋</h2>
      <p className="text-lg text-gray-300 mb-8 text-center">
        Here's how to get started and make the most of your video workspace!
      </p>
      <ol className="space-y-6">
        <li className="flex items-start gap-4">
          <span className="text-2xl text-[#5b5df6]"><FaUsers /></span>
          <div>
            <span className="font-bold text-white">Create or Join a Workspace:</span>
            <span className="block text-gray-300">Start a new workspace for your team, or join with an invite link.</span>
          </div>
        </li>
        <li className="flex items-start gap-4">
          <span className="text-2xl text-[#5b5df6]"><FaUsers /></span>
          <div>
            <span className="font-bold text-white">Invite Your Team:</span>
            <span className="block text-gray-300">Go to Members, invite by email, and assign roles.</span>
          </div>
        </li>
        <li className="flex items-start gap-4">
          <span className="text-2xl text-[#5b5df6]"><FaVideo /></span>
          <div>
            <span className="font-bold text-white">Record a Video:</span>
            <span className="block text-gray-300">Click "Record", pick your camera/mic/screen, set resolution, and go!</span>
          </div>
        </li>
        <li className="flex items-start gap-4">
          <span className="text-2xl text-[#5b5df6]"><FaDesktop /></span>
          <div>
            <span className="font-bold text-white">Download the Desktop App:</span>
            <span className="block text-gray-300">For more power, download the app, select sources, and record from your desktop.</span>
          </div>
        </li>
        <li className="flex items-start gap-4">
          <span className="text-2xl text-[#5b5df6]"><FaFolderOpen /></span>
          <div>
            <span className="font-bold text-white">Organize & Share:</span>
            <span className="block text-gray-300">Use folders, preview videos, and share with your team or publicly.</span>
          </div>
        </li>
        <li className="flex items-start gap-4">
          <span className="text-2xl text-[#5b5df6]"><FaShareAlt /></span>
          <div>
            <span className="font-bold text-white">Showcase & Collaborate:</span>
            <span className="block text-gray-300">Share, comment, and collaborate on videos—all in Rekord.</span>
          </div>
        </li>
      </ol>
      <div className="mt-8 text-center">
        <span className="text-gray-400 text-sm">Need help? Check the Help menu or contact support anytime.</span>
      </div>
    </section>
  )
} 