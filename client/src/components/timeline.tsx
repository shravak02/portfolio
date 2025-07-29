import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TimelineItem {
  title: string;
  company: string;
  period: string;
  description: string;
  color: "blue" | "pink" | "purple";
}

const timelineData: TimelineItem[] = [
  {
    title: "Senior Full Stack Developer",
    company: "TechCorp Solutions",
    period: "2022 - Present",
    description: "Leading development of enterprise web applications using React, Node.js, and AWS. Mentoring junior developers and implementing best practices.",
    color: "blue"
  },
  {
    title: "Full Stack Developer",
    company: "StartupXYZ",
    period: "2020 - 2022", 
    description: "Built scalable web applications from scratch. Worked with React, Python Django, and PostgreSQL. Increased application performance by 40%.",
    color: "pink"
  },
  {
    title: "Frontend Developer",
    company: "DigitalAgency",
    period: "2019 - 2020",
    description: "Developed responsive websites and web applications for various clients. Specialized in React.js and modern CSS frameworks.",
    color: "purple"
  }
];

const colorClasses = {
  blue: "bg-blue-500 border-blue-500 text-blue-500",
  pink: "bg-pink-500 border-pink-500 text-pink-500", 
  purple: "bg-purple-500 border-purple-500 text-purple-500"
};

export function Timeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative">
      {/* Timeline Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 via-pink-500 to-purple-500 h-full" />
      
      <div className="space-y-12">
        {timelineData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`flex items-center relative ${
              index % 2 === 0 ? "flex-row" : "flex-row-reverse"
            }`}
          >
            <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
              <div className="glass-morphism p-6 rounded-xl hover:scale-105 transition-transform duration-300">
                <h3 className={`text-xl font-semibold mb-2 ${colorClasses[item.color].split(' ')[2]}`}>
                  {item.title}
                </h3>
                <p className="text-gray-400 mb-2">{item.company}</p>
                <p className="text-sm text-gray-500 mb-3">{item.period}</p>
                <p className="text-gray-300 text-sm">{item.description}</p>
              </div>
            </div>
            
            <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-black ${colorClasses[item.color].split(' ')[0]}`} />
            
            <div className="w-1/2" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
