import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-violet-500/20 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} HandDraw.AI. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="hover:text-cyan-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-cyan-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 