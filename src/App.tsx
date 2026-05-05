/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Popcorn, Film, ChevronRight, PartyPopper, Clock, Ticket, Sparkles } from "lucide-react";

const MESSAGES = [
  "Tu ne m'aimes pas ? 🥺",
  "T'es sûre ?? 🕶️",
  "Réfléchis bien... 💔",
  "Même pour Michael ? 🕺",
  "C'est ton dernier mot ? ⌛",
  "Hee-Hee ! S'il te plait ! 🙏",
  "Tu me brises le coeur là... 🎤",
  "Ok, j'arrête de bouger... 🕺",
];

const SHOWTIMES = [
  { time: "18h00", label: "Early Show" },
  { time: "19h00", label: "Prime Time" },
  { time: "20h45", label: "Late Night" },
];

type Step = "invitation" | "time_selection" | "celebration";

export default function App() {
  const [currentStep, setCurrentStep] = useState<Step>("invitation");
  const [moveCount, setMoveCount] = useState(0);
  const [ouiScale, setOuiScale] = useState(1);
  const [nonScale, setNonScale] = useState(1);
  const [nonText, setNonText] = useState("Non 😢");
  const [nonPosition, setNonPosition] = useState({ x: 0, y: 0 });
  const [selectedTime, setSelectedTime] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNonHover = useCallback(() => {
    if (moveCount >= 5) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    
    const btnW = 180;
    const btnH = 80;
    const margin = 60;
    const maxX = (vw / 2) - (btnW / 2) - margin;
    const maxY = (vh / 2) - (btnH / 2) - margin;
    
    const newX = (Math.random() * 2 - 1) * maxX;
    const newY = (Math.random() * 2 - 1) * maxY;
    
    setNonPosition({ x: newX, y: newY });
    setMoveCount((prev) => prev + 1);
  }, [moveCount]);

  const handleNonClick = () => {
    const nextMessageIndex = (moveCount) % MESSAGES.length;
    setNonText(MESSAGES[nextMessageIndex]);
    setNonScale((prev) => Math.max(0.3, prev - 0.1));
    setOuiScale((prev) => prev + 0.4);
    
    if (moveCount < 5) {
      handleNonHover();
    } else {
      setMoveCount((prev) => prev + 1);
    }
  };

  const handleOuiClick = () => {
    setCurrentStep("time_selection");
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setCurrentStep("celebration");
  };

  const reset = () => {
    setCurrentStep("invitation");
    setMoveCount(0);
    setNonPosition({ x: 0, y: 0 });
    setNonText("Non 😢");
    setNonScale(1);
    setOuiScale(1);
    setSelectedTime("");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-12 overflow-hidden bg-black selection:bg-gold-500/30">
      <AnimatePresence mode="wait">
        {currentStep === "invitation" && (
          <motion.div
            key="invitation"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50 }}
            className="w-full max-w-2xl flex flex-col items-center text-center space-y-12"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gold-500/20 blur-2xl rounded-full animate-pulse" />
              <img
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3pjdW03dmVwbmZqZzR3eGZ3bmZqZzR3eGZ3bmZqZzR3eGZ3bmZqJmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/guufsF0Az3Lpu/giphy.gif"
                alt="Michael Jackson Popcorn"
                className="w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-3xl shadow-[0_0_50px_rgba(184,134,11,0.3)] border-4 border-gold-500 relative z-10"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            <div className="space-y-6">
              <motion.h1 
                className="font-display font-bold text-5xl sm:text-7xl leading-[1.1]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="gold-shimmer block mb-2">Invitation Spéciale</span>
                <span className="text-white">
                  Veux-tu venir voir <span className="italic">Michael</span> avec moi 
                  <span className="text-gold-500 font-black px-4">ce soir</span> ?
                </span>
              </motion.h1>
            </div>

            <div 
              ref={containerRef}
              className="relative w-full h-[300px] flex items-center justify-center gap-8"
            >
              <motion.button
                onClick={handleOuiClick}
                style={{ scale: ouiScale }}
                className="relative z-10 px-12 py-6 bg-gold-500 text-black font-black text-2xl rounded-full shadow-[0_0_30px_rgba(184,134,11,0.5)] cursor-pointer flex items-center gap-3 transition-colors hover:bg-gold-400 group"
                whileHover={{ scale: ouiScale * 1.05 }}
                whileTap={{ scale: ouiScale * 0.95 }}
              >
                OUI ! 😍
                <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                onMouseEnter={handleNonHover}
                onClick={handleNonClick}
                animate={{ 
                  x: nonPosition.x, 
                  y: nonPosition.y,
                  scale: nonScale 
                }}
                className="px-8 py-4 bg-gray-900 text-gold-300 font-semibold text-lg border-2 border-gold-900/50 rounded-full shadow-lg cursor-pointer whitespace-nowrap backdrop-blur-sm z-20"
                transition={{ type: "spring", damping: 20, stiffness: 400 }}
              >
                {nonText}
              </motion.button>
            </div>

            <div className="flex gap-12 text-gold-500/20">
              <Film className="w-10 h-10" />
              <Popcorn className="w-10 h-10" />
              <Film className="w-10 h-10" />
            </div>
          </motion.div>
        )}

        {currentStep === "time_selection" && (
          <motion.div
            key="time_selection"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="w-full max-w-4xl flex flex-col items-center space-y-12"
          >
            <div className="space-y-4 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 border border-gold-500/20 rounded-full text-gold-500 mb-4">
                <Ticket className="w-4 h-4" />
                <span className="text-sm font-bold uppercase tracking-widest">Réservation VIP</span>
              </div>
              <h2 className="font-display font-bold text-5xl sm:text-7xl text-white">
                À quelle <span className="gold-shimmer">heure</span> ?
              </h2>
              <p className="text-gray-400 text-lg">Choisis le créneau idéal pour voir le King 🕺</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full px-4">
              {SHOWTIMES.map((showtime, idx) => (
                <motion.button
                  key={showtime.time}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => handleTimeSelect(showtime.time)}
                  className="group relative flex flex-col items-center p-8 bg-gray-900/50 border-2 border-gold-900/30 rounded-3xl cursor-pointer overflow-hidden transition-all hover:border-gold-500 hover:bg-gray-800/80"
                  whileHover={{ y: -10 }}
                >
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkles className="w-6 h-6 text-gold-500 animate-spin-slow" />
                  </div>
                  <Clock className="w-12 h-12 text-gold-500 mb-4 group-hover:scale-110 transition-transform" />
                  <span className="text-4xl font-black text-white group-hover:gold-shimmer mb-2">{showtime.time}</span>
                  <span className="text-sm text-gold-500/60 uppercase tracking-widest font-bold">{showtime.label}</span>
                </motion.button>
              ))}
            </div>

            <button 
              onClick={() => setCurrentStep("invitation")}
              className="text-gray-500 hover:text-white transition-colors flex items-center gap-2"
            >
              Retour
            </button>
          </motion.div>
        )}

        {currentStep === "celebration" && (
          <motion.div
            key="celebration"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center space-y-10"
          >
            <div className="relative">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0], 
                  scale: [1, 1.2, 1],
                  filter: ["drop-shadow(0 0 0px #b8860b)", "drop-shadow(0 0 20px #b8860b)", "drop-shadow(0 0 0px #b8860b)"]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <PartyPopper className="w-24 h-24 text-gold-500" />
              </motion.div>
            </div>

            <div className="space-y-4">
              <h2 className="font-display font-bold text-6xl gold-shimmer uppercase tracking-tighter">Smooth ! 🎉</h2>
              <p className="text-2xl text-white max-w-xl font-light">
                C'est noté ! Prépare le popcorn, on se retrouve à <span className="text-gold-500 font-black border-b-2 border-gold-500/30">{selectedTime}</span> ! 🎸🔥
              </p>
              <p className="text-gray-500 italic">Je passe te prendre juste avant.</p>
            </div>

            <img
              src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHY0bHc5bWRiczFoMWxucG4yMmtlaGFseGw5emZhaHA5cHU5ajduYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ibE2G1af8aMZG/giphy.gif"
              alt="Michael Jackson Thriller Dance"
              className="w-72 h-72 object-cover rounded-3xl shadow-[0_0_100px_rgba(184,134,11,0.4)] border-4 border-gold-500"
              referrerPolicy="no-referrer"
            />

            <motion.button
              onClick={reset}
              className="text-gold-500/50 text-sm font-medium underline underline-offset-8 hover:text-gold-500 transition-colors"
            >
              Recommencer
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
