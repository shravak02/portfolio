import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Technology {
  name: string;
  icon: string;
  category: "frontend" | "backend" | "database" | "tools";
  level: number;
}

const technologies: Technology[] = [
  // Frontend
  { name: "React", icon: "⚛️", category: "frontend", level: 95 },
  { name: "TypeScript", icon: "🔷", category: "frontend", level: 90 },
  { name: "Next.js", icon: "⚡", category: "frontend", level: 88 },
  { name: "Tailwind", icon: "🎨", category: "frontend", level: 92 },
  
  // Backend
  { name: "Node.js", icon: "🟢", category: "backend", level: 92 },
  { name: "Express", icon: "🚄", category: "backend", level: 90 },
  { name: "Python", icon: "🐍", category: "backend", level: 85 },
  { name: "GraphQL", icon: "🔗", category: "backend", level: 80 },
  
  // Database
  { name: "PostgreSQL", icon: "🐘", category: "database", level: 88 },
  { name: "MongoDB", icon: "🍃", category: "database", level: 85 },
  { name: "Redis", icon: "🔴", category: "database", level: 75 },
  { name: "Prisma", icon: "💎", category: "database", level: 82 },
  
  // Tools
  { name: "AWS", icon: "☁️", category: "tools", level: 85 },
  { name: "Docker", icon: "🐳", category: "tools", level: 88 },
  { name: "Git", icon: "📝", category: "tools", level: 95 },
  { name: "Figma", icon: "🎯", category: "tools", level: 80 }
];

const categoryColors = {
  frontend: "blue",
  backend: "pink", 
  database: "purple",
  tools: "green"
};

const colorClasses = {
  blue: "bg-blue-500",
  pink: "bg-pink-500",
  purple: "bg-purple-500",
  green: "bg-green-500"
};

export function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const groupedTechs = technologies.reduce((acc, tech) => {
    if (!acc[tech.category]) acc[tech.category] = [];
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, Technology[]>);

  return (
    <div ref={ref} className="space-y-8">
      {Object.entries(groupedTechs).map(([category, techs], categoryIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
        >
          <h4 className="text-lg font-semibold mb-4 capitalize flex items-center">
            <div className={`w-3 h-3 rounded-full mr-3 ${colorClasses[categoryColors[category as keyof typeof categoryColors] as keyof typeof colorClasses]}`} />
            {category} Technologies
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {techs.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: categoryIndex * 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-morphism p-4 rounded-xl text-center group cursor-pointer"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">
                  {tech.icon}
                </div>
                <div className="font-medium text-sm mb-2">{tech.name}</div>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <motion.div
                    className={`h-1.5 rounded-full ${colorClasses[categoryColors[tech.category as keyof typeof categoryColors] as keyof typeof colorClasses]}`}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${tech.level}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: categoryIndex * 0.2 + index * 0.1 + 0.5 }}
                  />
                </div>
                <div className="text-xs text-gray-400 mt-1">{tech.level}%</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}