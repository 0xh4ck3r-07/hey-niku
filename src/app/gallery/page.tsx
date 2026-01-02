"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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

const galleryImages = [
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/36a9cc62-a033-4e23-9043-7199972ffe24/g-1767382712828.jpg?width=8000&height=8000&resize=contain",
    caption: "Best friends forever 💕",
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/36a9cc62-a033-4e23-9043-7199972ffe24/f-1767382718925.jpg?width=8000&height=8000&resize=contain",
    caption: "Together we shine ✨",
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/36a9cc62-a033-4e23-9043-7199972ffe24/e-1767382728444.jpg?width=8000&height=8000&resize=contain",
    caption: "Moments to cherish 💖",
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/36a9cc62-a033-4e23-9043-7199972ffe24/d-1767382929168.jpg?width=8000&height=8000&resize=contain",
    caption: "Beautiful memories 💗",
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/36a9cc62-a033-4e23-9043-7199972ffe24/c-1767382936593.jpg?width=8000&height=8000&resize=contain",
    caption: "Friends like family 🌸",
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/36a9cc62-a033-4e23-9043-7199972ffe24/b-1767382945820.jpg?width=8000&height=8000&resize=contain",
    caption: "Squad goals 💫",
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/36a9cc62-a033-4e23-9043-7199972ffe24/a-1767382948956.jpg?width=8000&height=8000&resize=contain",
    caption: "Friendship forever 🤝💕",
  },
];

export default function GalleryPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [butterflies, setButterflies] = useState<{ id: number; delay: number; top: number }[]>([]);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const newButterflies = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      delay: i * 2,
      top: 10 + Math.random() * 70,
    }));
    setButterflies(newButterflies);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const goToThanks = () => {
    router.push("/thanks");
  };

  return (
    <div className="min-h-screen romantic-gradient overflow-hidden relative flex flex-col items-center justify-center p-4">
      {butterflies.map((butterfly) => (
        <Butterfly key={butterfly.id} delay={butterfly.delay} top={butterfly.top} />
      ))}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="text-center mb-6 z-10">
        <h1 className="font-dancing text-4xl md:text-5xl text-pink-300 mb-2">Your Memories</h1>
        <p className="text-pink-200/70 font-poppins text-sm">Swipe left or right to view your memories</p>
      </div>

      <div
        className="relative z-10 w-full max-w-md"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-4 border border-white/20 overflow-hidden">
          <div className="relative aspect-auto min-h-[400px] max-h-[70vh] rounded-2xl overflow-hidden flex items-center justify-center bg-black/20">
            <Image
              src={galleryImages[currentIndex].src}
              alt={galleryImages[currentIndex].caption}
              fill
              className="object-contain transition-all duration-500"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <p className="absolute bottom-4 left-4 right-4 text-white font-poppins text-center text-sm md:text-base">
              {galleryImages[currentIndex].caption}
            </p>
          </div>

          <div className="flex items-center justify-between mt-4">
            <button
              onClick={prevSlide}
              className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all"
            >
              ←
            </button>

            <div className="flex gap-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-pink-400 w-6" : "bg-white/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all"
            >
              →
            </button>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-pink-200/60 font-poppins text-xs mb-4">
            {currentIndex + 1} / {galleryImages.length}
          </p>
          <button
            onClick={goToThanks}
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-poppins font-medium px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-pink-500/30"
          >
            Next → Thank You Page 💝
          </button>
        </div>
      </div>
    </div>
  );
}
