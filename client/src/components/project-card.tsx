import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  color: "blue" | "pink" | "purple";
}

const colorClasses = {
  blue: "text-blue-500 bg-blue-500/20",
  pink: "text-pink-500 bg-pink-500/20", 
  purple: "text-purple-500 bg-purple-500/20"
};

export function ProjectCard({ 
  title, 
  description, 
  image, 
  technologies, 
  githubUrl, 
  liveUrl, 
  color 
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="glass-morphism rounded-2xl overflow-hidden neon-glow group"
    >
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex gap-4">
            {githubUrl && (
              <motion.a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="p-2 bg-white/20 rounded-full backdrop-blur-sm"
              >
                <Github className="w-5 h-5" />
              </motion.a>
            )}
            {liveUrl && (
              <motion.a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="p-2 bg-white/20 rounded-full backdrop-blur-sm"
              >
                <ExternalLink className="w-5 h-5" />
              </motion.a>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className={`text-xl font-semibold mb-3 ${colorClasses[color].split(' ')[0]}`}>
          {title}
        </h3>
        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <span
              key={tech}
              className={`px-2 py-1 rounded text-xs ${colorClasses[color]}`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
