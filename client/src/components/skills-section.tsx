import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Code, Server, Wrench } from "lucide-react";

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  color: string;
  skills: Skill[];
}

const skillsData: SkillCategory[] = [
  {
    title: "Frontend Development",
    icon: <Code className="text-2xl" />,
    color: "blue",
    skills: [
      { name: "React.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Next.js", level: 88 }
    ]
  },
  {
    title: "Backend Development", 
    icon: <Server className="text-2xl" />,
    color: "pink",
    skills: [
      { name: "Node.js", level: 92 },/* 
      { name: "Python", level: 85 },
      { name: "PostgreSQL", level: 80 } */
    ]
  },
  {
    title: "Tools & Others",
    icon: <Wrench className="text-2xl" />,
    color: "purple", 
    skills: [/* 
      { name: "Docker", level: 87 },
      { name: "AWS", level: 83 }, */
      { name: "Git", level: 95 }
    ]
  }
];

const colorClasses = {
  blue: "text-blue-500 bg-blue-500/20",
  pink: "text-pink-500 bg-pink-500/20",
  purple: "text-purple-500 bg-purple-500/20"
};

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [animatedSkills, setAnimatedSkills] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (isInView) {
      skillsData.forEach((category, categoryIndex) => {
        category.skills.forEach((skill, skillIndex) => {
          setTimeout(() => {
            setAnimatedSkills(prev => ({
              ...prev,
              [`${categoryIndex}-${skillIndex}`]: true
            }));
          }, (categoryIndex * 3 + skillIndex) * 200);
        });
      });
    }
  }, [isInView]);

  return (
    <div ref={ref} className="grid md:grid-cols-3 gap-8">
      {skillsData.map((category, categoryIndex) => (
        <motion.div
          key={category.title}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
          className="glass-morphism p-8 rounded-2xl hover:scale-105 transition-transform duration-300"
        >
          <div className={`mb-4 ${colorClasses[category.color as keyof typeof colorClasses].split(' ')[0]}`}>
            {category.icon}
          </div>
          <h3 className="text-xl font-semibold mb-6">{category.title}</h3>
          
          <div className="space-y-4">
            {category.skills.map((skill, skillIndex) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-2">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full ${colorClasses[category.color as keyof typeof colorClasses].split(' ')[1].replace('/20', '')}`}
                    initial={{ width: 0 }}
                    animate={{
                      width: animatedSkills[`${categoryIndex}-${skillIndex}`] ? `${skill.level}%` : 0
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
