"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function FloatingHeart({ delay, left, size }: { delay: number; left: number; size: number }) {
  return (
    <div
      className="fixed text-pink-500 animate-float-heart pointer-events-none z-0"
      style={{
        left: `${left}%`,
        animationDuration: `${6 + Math.random() * 4}s`,
        animationDelay: `${delay}s`,
        fontSize: `${size}px`,
        bottom: "-50px",
      }}
    >
      ❤️
    </div>
  );
}

function Butterfly({ delay, top }: { delay: number; top: number }) {
  return (
    <div
      className="fixed animate-float-butterfly pointer-events-none z-0"
      style={{
        top: `${top}%`,
        animationDelay: `${delay}s`,
        left: "-100px",
      }}
    >
      <span className="text-3xl md:text-4xl animate-wing-flap inline-block">🦋</span>
    </div>
  );
}

function Sparkle({ left, top, delay }: { left: number; top: number; delay: number }) {
  return (
    <div
      className="fixed text-yellow-300 animate-sparkle pointer-events-none z-0"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        animationDelay: `${delay}s`,
      }}
    >
      ✨
    </div>
  );
}

export default function ThanksPage() {
  const [hearts, setHearts] = useState<{ id: number; delay: number; left: number; size: number }[]>([]);
  const [butterflies, setButterflies] = useState<{ id: number; delay: number; top: number }[]>([]);
  const [sparkles, setSparkles] = useState<{ id: number; left: number; top: number; delay: number }[]>([]);
  const router = useRouter();

  useEffect(() => {
    const newHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      delay: Math.random() * 5,
      left: Math.random() * 100,
      size: 20 + Math.random() * 25,
    }));
    setHearts(newHearts);

    const newButterflies = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      delay: i * 3,
      top: 15 + Math.random() * 60,
    }));
    setButterflies(newButterflies);

    const newSparkles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
    }));
    setSparkles(newSparkles);
  }, []);

  const goHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen romantic-gradient overflow-hidden relative flex flex-col items-center justify-center p-4">
      {hearts.map((heart) => (
        <FloatingHeart key={`heart-${heart.id}`} delay={heart.delay} left={heart.left} size={heart.size} />
      ))}

      {butterflies.map((butterfly) => (
        <Butterfly key={`butterfly-${butterfly.id}`} delay={butterfly.delay} top={butterfly.top} />
      ))}

      {sparkles.map((sparkle) => (
        <Sparkle key={`sparkle-${sparkle.id}`} left={sparkle.left} top={sparkle.top} delay={sparkle.delay} />
      ))}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-pink-500/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-10 w-40 h-40 bg-purple-500/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-36 h-36 bg-red-500/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-28 h-28 bg-rose-500/15 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 max-w-lg w-full border border-white/20 text-center animate-fade-in-up">
        <div className="mb-6">
          <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-6">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/36a9cc62-a033-4e23-9043-7199972ffe24/anand-1767383674893.jpg?width=8000&height=8000&resize=contain"
              alt="Christmas Photo"
              fill
              className="object-contain rounded-2xl"
              priority
            />
          </div>
          <div className="text-6xl mb-4">🧸</div>
        </div>

        <h1 className="font-dancing text-4xl md:text-6xl text-pink-300 mb-4">
          Thank You for Watching
        </h1>
        <p className="text-pink-200/80 font-poppins text-lg mb-2">❤️</p>
        
        <div className="flex justify-center gap-3 text-3xl mb-8">
          <span className="animate-bounce" style={{ animationDelay: "0s" }}>💕</span>
          <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>🦋</span>
          <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>✨</span>
          <span className="animate-bounce" style={{ animationDelay: "0.3s" }}>🧸</span>
          <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>💖</span>
        </div>

        <div className="space-y-3 text-pink-100/80 font-poppins text-sm md:text-base mb-8">
          <p>Wishing you all the love and happiness</p>
          <p>in the new year and beyond! 🎉</p>
        </div>

        <button
          onClick={goHome}
          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-poppins font-medium px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-pink-500/30"
        >
          Back to Start 💝
        </button>

        <div className="mt-8">
          <p className="text-pink-200/50 font-poppins text-xs">
            Made with love 💕 Happy New Year 2026
          </p>
        </div>
      </div>
    </div>
  );
}
