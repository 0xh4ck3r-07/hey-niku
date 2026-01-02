"use client";

import { useState, useEffect } from "react";
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

export default function PasswordPage() {
  const [password, setPassword] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; delay: number; left: number; size: number }[]>([]);
  const router = useRouter();

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      delay: Math.random() * 5,
      left: Math.random() * 100,
      size: 20 + Math.random() * 30,
    }));
    setHearts(newHearts);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === "niku") {
      setShowMessage(true);
    } else {
      alert("Wrong password");
    }
  };

  const handleContinue = () => {
    router.push("/gallery");
  };

  return (
    <div className="min-h-screen romantic-gradient overflow-hidden relative flex items-center justify-center p-4">
      {hearts.map((heart) => (
        <FloatingHeart key={heart.id} delay={heart.delay} left={heart.left} size={heart.size} />
      ))}
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-red-500/10 rounded-full blur-3xl"></div>
      </div>

      {!showMessage ? (
        <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 max-w-md w-full border border-white/20 animate-pulse-glow">
          <div className="text-center mb-8">
            <h1 className="font-dancing text-4xl md:text-5xl text-pink-300 mb-2">Hey Niku</h1>
            <p className="text-pink-200/80 font-poppins text-sm">Enter the password to continue</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full bg-white/10 border border-pink-300/30 rounded-xl px-5 py-4 text-white placeholder-pink-200/50 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/30 transition-all font-poppins"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl">💕</span>
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-poppins font-medium py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-pink-500/30"
            >
              Unlock My Heart ❤️
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-pink-200/60 text-xs font-poppins">Happy New Year 2026 🎉</p>
          </div>
        </div>
      ) : (
        <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-10 max-w-2xl w-full border border-white/20 animate-fade-in-up overflow-y-auto max-h-[90vh]">
          <div className="text-center mb-6">
            <h1 className="font-dancing text-4xl md:text-5xl text-pink-300 mb-4">Happy New Year 2026, Niku 😊</h1>
            <div className="flex justify-center gap-2 text-2xl">
              <span>🎉</span>
              <span>💕</span>
              <span>✨</span>
            </div>
          </div>
          
          <div className="space-y-4 text-pink-100/90 font-poppins text-sm md:text-base leading-relaxed">
            <p>I hope you are doing well, and I wish the same for you.</p>
            
            <p>I want to see you happy for the rest of my life. It doesn&apos;t matter whether you are with me or not—I just want to see you happy and successful in your life. That&apos;s the reason I always tell you to study hard, because I never want to see you sad.</p>
            
            <p>But if you ever feel sad, just text me or call me. I will always be there for you. Even if we are not together, or even if we haven&apos;t talked for a long time, you can still remember me and reach out—I will help you.</p>
            
            <p>I don&apos;t know what the future holds or what will happen. And as I&apos;ve already told you, during this waiting time, if you start liking someone or get into a relationship with someone else, I have no problem with that. I respect your decision.</p>
          </div>
          
          <div className="mt-8 text-center">
            <button
              onClick={handleContinue}
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-poppins font-medium px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-pink-500/30"
            >
              Continue to Gallery →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
