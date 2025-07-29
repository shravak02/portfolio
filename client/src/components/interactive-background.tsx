import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Orb {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  speed: number;
}

export function InteractiveBackground() {
  const [orbs, setOrbs] = useState<Orb[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const colors = ["#0070F3", "#FF0080", "#7928CA", "#00DFD8"];
    const newOrbs: Orb[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
      size: Math.random() * 300 + 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.1 + 0.05,
      speed: Math.random() * 0.5 + 0.2
    }));
    setOrbs(newOrbs);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrbs(prevOrbs => 
        prevOrbs.map(orb => ({
          ...orb,
          x: orb.x + (Math.sin(Date.now() * 0.001 * orb.speed) * 0.5),
          y: orb.y + (Math.cos(Date.now() * 0.001 * orb.speed) * 0.5)
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${orb.color}${Math.floor(orb.opacity * 255).toString(16)} 0%, transparent 70%)`,
            width: orb.size,
            height: orb.size,
          }}
          animate={{
            x: orb.x + (mousePosition.x - (typeof window !== 'undefined' ? window.innerWidth : 1920) / 2) * 0.01,
            y: orb.y + (mousePosition.y - (typeof window !== 'undefined' ? window.innerHeight : 1080) / 2) * 0.01,
            scale: [1, 1.1, 1],
          }}
          transition={{
            x: { type: "spring", stiffness: 50, damping: 20 },
            y: { type: "spring", stiffness: 50, damping: 20 },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      ))}
      
      {/* Cursor follower */}
      <motion.div
        className="absolute w-6 h-6 rounded-full border-2 border-blue-500/50 pointer-events-none"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28
        }}
      />
    </div>
  );
}