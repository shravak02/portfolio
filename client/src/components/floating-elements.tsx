import { motion } from "framer-motion";

export function FloatingElements() {
  const elements = [
    { shape: "circle", size: 60, color: "bg-blue-500/10", position: { top: "10%", left: "10%" }, delay: 0 },
    { shape: "square", size: 40, color: "bg-pink-500/10", position: { top: "20%", right: "15%" }, delay: 2 },
    { shape: "triangle", size: 50, color: "bg-purple-500/10", position: { bottom: "30%", left: "20%" }, delay: 4 },
    { shape: "circle", size: 35, color: "bg-green-500/10", position: { top: "60%", right: "10%" }, delay: 1 },
    { shape: "square", size: 45, color: "bg-yellow-500/10", position: { bottom: "15%", right: "25%" }, delay: 3 },
    { shape: "circle", size: 25, color: "bg-cyan-500/10", position: { top: "40%", left: "5%" }, delay: 5 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.color} ${
            element.shape === 'circle' ? 'rounded-full' : 
            element.shape === 'triangle' ? 'rotate-45' : 'rounded-lg'
          }`}
          style={{
            width: element.size,
            height: element.size,
            ...element.position,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: element.shape === 'triangle' ? [45, 135, 45] : [0, 360, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}