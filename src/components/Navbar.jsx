import { User, Share2, Link2 } from "lucide-react";

export default function Navbar({ username, publicLink }) {
  return (
    <header className="w-full sticky top-0 z-20 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 select-none">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-sky-500 via-violet-500 to-fuchsia-500" />
          <span className="font-semibold tracking-tight">HoloFrame</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="hidden sm:flex items-center gap-2 px-2 py-1.5 rounded-md bg-gray-50">
            <User className="h-4 w-4" />
            <span className="font-medium">{username || "Guest"}</span>
          </div>
          {publicLink && (
            <a
              href={publicLink}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </a>
          )}
          {publicLink && (
            <a
              href={publicLink}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-900 text-white hover:bg-black transition-colors"
            >
              <Link2 className="h-4 w-4" />
              <span className="hidden sm:inline">Public Link</span>
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
