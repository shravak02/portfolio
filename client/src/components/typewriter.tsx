import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterProps {
  texts: string[];
  className?: string;
  speed?: number;
  delay?: number;
}

export function Typewriter({ texts, className = "", speed = 100, delay = 1000 }: TypewriterProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (currentTextIndex < texts.length) {
      if (isTyping) {
        if (currentText.length < texts[currentTextIndex].length) {
          timeout = setTimeout(() => {
            setCurrentText(texts[currentTextIndex].slice(0, currentText.length + 1));
          }, speed);
        } else {
          timeout = setTimeout(() => {
            setCurrentTextIndex(prev => prev + 1);
            setCurrentText("");
          }, delay);
        }
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, texts, speed, delay, isTyping]);

  return (
    <div className={`font-mono ${className}`}>
      {texts.map((text, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: index <= currentTextIndex ? 1 : 0 
          }}
          className="mb-4"
        >
          {index === currentTextIndex ? (
            <span className="typewriter-cursor">
              {currentText}
            </span>
          ) : index < currentTextIndex ? (
            text
          ) : null}
        </motion.div>
      ))}
    </div>
  );
}
