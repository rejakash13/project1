"use client"

import { MessageCircle } from "lucide-react"

export function FloatingActionButton() {
  return (
    <>
      <style jsx>{`
        @keyframes fab-pop-in {
          from {
            opacity: 0;
            transform: scale(0);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .fab-button {
          animation: fab-pop-in 0.5s ease-out 200ms both;
        }
        
        .fab-button:hover {
          transform: scale(1.1);
        }
        
        .fab-button:active {
          transform: scale(0.95);
        }
      `}</style>
      <a
        href="https://wa.me/917046127242"
        target="_blank"
        rel="noopener noreferrer"
        className="fab-button fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
      >
        <MessageCircle size={24} />
      </a>
    </>
  )
}
