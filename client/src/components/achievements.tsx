import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Star, Users, Code2 } from "lucide-react";

interface Achievement {
  icon: React.ReactNode;
  number: string;
  label: string;
  description: string;
  color: "blue" | "pink" | "purple" | "green";
}

const achievements: Achievement[] = [
  {
    icon: <Trophy className="w-8 h-8" />,
    number: "50+",
    label: "Projects Completed",
    description: "Successfully delivered projects ranging from startups to enterprise",
    color: "blue"
  },
  {
    icon: <Star className="w-8 h-8" />,
    number: "4.9",
    label: "Client Rating",
    description: "Average rating from satisfied clients across all platforms",
    color: "pink"
  },
  {
    icon: <Users className="w-8 h-8" />,
    number: "25+",
    label: "Happy Clients",
    description: "Businesses that trusted me to bring their ideas to life",
    color: "purple"
  },
  {
    icon: <Code2 className="w-8 h-8" />,
    number: "5+",
    label: "Years Experience",
    description: "Continuous learning and growth in web development",
    color: "green"
  }
];

const colorClasses = {
  blue: "text-blue-500 bg-blue-500/10",
  pink: "text-pink-500 bg-pink-500/10",
  purple: "text-purple-500 bg-purple-500/10",
  green: "text-green-500 bg-green-500/10"
};

export function Achievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {achievements.map((achievement, index) => (
        <motion.div
          key={achievement.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="glass-morphism p-6 rounded-2xl text-center group hover:shadow-2xl transition-all duration-300"
        >
          <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${colorClasses[achievement.color]} group-hover:scale-110 transition-transform duration-300`}>
            {achievement.icon}
          </div>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
            className={`text-3xl font-bold mb-2 ${colorClasses[achievement.color].split(' ')[0]}`}
          >
            {achievement.number}
          </motion.div>
          
          <h4 className="font-semibold mb-2">{achievement.label}</h4>
          <p className="text-xs text-gray-400 leading-relaxed">{achievement.description}</p>
        </motion.div>
      ))}
    </div>
  );
}