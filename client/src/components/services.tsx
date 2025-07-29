import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Palette, Database, Globe, Smartphone, Users } from "lucide-react";

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  color: "blue" | "pink" | "purple";
}

const services: Service[] = [
  {
    icon: <Code2 className="w-8 h-8" />,
    title: "Full-Stack Development",
    description: "Complete web application development from concept to deployment",
    features: ["React & Next.js", "Node.js & Express", "Database Design", "API Development"],
    color: "blue"
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: "UI/UX Implementation",
    description: "Pixel-perfect design implementation with modern animations",
    features: ["Responsive Design", "Framer Motion", "CSS Animations", "User Experience"],
    color: "pink"
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: "Backend Solutions",
    description: "Scalable server architecture and database optimization",
    features: ["REST APIs", "Database Design", "Cloud Deployment", "Performance Optimization"],
    color: "purple"
  }
];

const colorClasses = {
  blue: "text-blue-500 bg-blue-500/10 border-blue-500/30",
  pink: "text-pink-500 bg-pink-500/10 border-pink-500/30",
  purple: "text-purple-500 bg-purple-500/10 border-purple-500/30"
};

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="grid md:grid-cols-3 gap-8">
      {services.map((service, index) => (
        <motion.div
          key={service.title}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          whileHover={{ y: -10, scale: 1.02 }}
          className={`glass-morphism p-8 rounded-2xl border hover:shadow-2xl transition-all duration-300 ${colorClasses[service.color].split(' ')[2]}`}
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${colorClasses[service.color]}`}>
            {service.icon}
          </div>
          
          <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
          <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>
          
          <div className="space-y-2">
            {service.features.map((feature) => (
              <div key={feature} className="flex items-center text-sm">
                <div className={`w-2 h-2 rounded-full mr-3 ${colorClasses[service.color].split(' ')[1].replace('/10', '')}`} />
                <span className="text-gray-400">{feature}</span>
              </div>
            ))}
          </div>
          
          <motion.div
            className="mt-6 pt-4 border-t border-gray-700"
            whileHover={{ x: 5 }}
          >
            <span className={`text-sm font-medium ${colorClasses[service.color].split(' ')[0]} cursor-pointer flex items-center`}>
              Learn More 
              <motion.span className="ml-2" whileHover={{ x: 3 }}>→</motion.span>
            </span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}