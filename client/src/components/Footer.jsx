import React from 'react';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-12 bg-neutral-900 text-gray-300 border-t border-gray-700 flex items-center justify-between px-6 text-sm">
      <div>
        &copy; {new Date().getFullYear()} Material Master. All rights reserved.
      </div>
      <div className="flex space-x-4">
        <a
          href="https://instagram.com/yourhandle"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="hover:text-pink-500 transition"
        >
          {/* Instagram SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm8.5 2a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zm-4.25 1.5a5.5 5.5 0 110 11 5.5 5.5 0 010-11zm0 1.5a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
        </a>

        <a
          href="https://twitter.com/yourhandle"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X (Twitter)"
          className="hover:text-blue-400 transition"
        >
          {/* Twitter / X SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path d="M23 3a10.9 10.9 0 01-3.14.86A4.48 4.48 0 0022.4.4a9.1 9.1 0 01-2.88 1.1 4.52 4.52 0 00-7.71 4.13A12.85 12.85 0 013 2.15a4.5 4.5 0 001.4 6.04 4.52 4.52 0 01-2.05-.56v.06a4.52 4.52 0 003.62 4.43 4.49 4.49 0 01-2.03.07 4.53 4.53 0 004.22 3.14 9.04 9.04 0 01-5.59 1.92A8.5 8.5 0 012 19.54 12.73 12.73 0 008.29 21c7.55 0 11.68-6.25 11.68-11.67 0-.18 0-.35-.01-.53A8.18 8.18 0 0023 3z" />
          </svg>
        </a>

        <a
          href="https://linkedin.com/in/yourhandle"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="hover:text-blue-600 transition"
        >
          {/* LinkedIn SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path d="M20.45 20.45h-3.55v-5.33c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8v5.43H9.04V9h3.41v1.56h.05a3.74 3.74 0 013.37-1.85c3.61 0 4.28 2.38 4.28 5.48v6.26zM5.34 7.43a2.06 2.06 0 110-4.11 2.06 2.06 0 010 4.11zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.78A1.78 1.78 0 000 1.78v20.44A1.78 1.78 0 001.78 24h20.44A1.78 1.78 0 0024 22.22V1.78A1.78 1.78 0 0022.22 0z" />
          </svg>
        </a>

        <a
          href="https://github.com/yourhandle"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="hover:text-gray-100 transition"
        >
          {/* GitHub SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path d="M12 0a12 12 0 00-3.8 23.4c.6.11.82-.26.82-.58v-2.22c-3.34.73-4.04-1.61-4.04-1.61a3.18 3.18 0 00-1.34-1.76c-1.1-.75.08-.74.08-.74a2.5 2.5 0 011.82 1.22 2.54 2.54 0 003.47 1 2.55 2.55 0 01.75-1.6c-2.67-.3-5.47-1.33-5.47-5.93a4.64 4.64 0 011.23-3.22 4.3 4.3 0 01.12-3.18s1-.33 3.3 1.22a11.4 11.4 0 016 0c2.29-1.55 3.29-1.22 3.29-1.22a4.3 4.3 0 01.12 3.18 4.64 4.64 0 011.23 3.22c0 4.6-2.8 5.63-5.48 5.92a2.86 2.86 0 01.82 2.22v3.3c0 .32.21.7.82.58A12 12 0 0012 0z" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
