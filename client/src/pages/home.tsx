import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, Mail, Github, Linkedin, ExternalLink } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Particles } from "@/components/particles";
import { Typewriter } from "@/components/typewriter";
import { Timeline } from "@/components/timeline";
import { SkillsSection } from "@/components/skills-section";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const projectsData = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with React, Node.js, and Stripe integration. Features real-time inventory management and analytics dashboard.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    githubUrl: "#",
    liveUrl: "#",
    color: "blue" as const
  },
  {
    title: "Task Management App", 
    description: "Collaborative task management tool with real-time updates, drag-and-drop functionality, and team collaboration features.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: ["Vue.js", "Express", "Socket.io", "PostgreSQL"],
    githubUrl: "#",
    liveUrl: "#", 
    color: "pink" as const
  },
  {
    title: "Weather Analytics",
    description: "Advanced weather tracking application with interactive maps, historical data analysis, and predictive modeling using machine learning.",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: ["Python", "Django", "D3.js", "TensorFlow"],
    githubUrl: "#",
    liveUrl: "#",
    color: "purple" as const
  }
];

export default function Home() {
  const { toast } = useToast();
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const handleDownloadResume = async () => {
    try {
      const response = await fetch('/api/download-resume');
      if (!response.ok) throw new Error('Failed to download resume');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Alex_Morgan_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Resume Downloaded",
        description: "Thank you for your interest!",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Particles />
      <Navigation />

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 opacity-20"
        />
        
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="mb-8">
            <Typewriter
              texts={[
                "Hi",
                "Hi, I'm Alex Morgan", 
                "I am a Full Stack Developer"
              ]}
              className="text-4xl md:text-6xl lg:text-7xl font-bold"
              speed={80}
              delay={1500}
            />
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 8 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Crafting digital experiences with modern web technologies. 
            Passionate about creating scalable, user-friendly applications that make a difference.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 8.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={handleDownloadResume}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg neon-glow"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </Button>
            <Button
              onClick={handleContact}
              variant="outline" 
              className="border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white px-8 py-4 text-lg"
            >
              View My Work
            </Button>
          </motion.div>
        </div>
        
        {/* Floating Elements */}
        <motion.div
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full"
        />
        <motion.div
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          className="absolute bottom-20 right-10 w-16 h-16 bg-pink-500/20 rounded-full"
        />
        <motion.div
          animate={{ y: [-15, 15, -15] }}
          transition={{ duration: 6, repeat: Infinity, delay: 4 }}
          className="absolute top-1/2 right-20 w-12 h-12 bg-purple-500/20 rounded-full"
        />
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            About <span className="text-blue-500">Me</span>
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm a passionate full-stack developer with over 5 years of experience building 
                web applications that solve real-world problems. My journey started with curiosity 
                about how websites work, and it evolved into a deep love for creating digital experiences 
                that users genuinely enjoy.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to 
                open-source projects, or sharing knowledge through technical blog posts. I believe 
                in continuous learning and staying at the forefront of web development trends.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-3xl font-bold text-blue-500"
                  >
                    50+
                  </motion.div>
                  <div className="text-gray-400">Projects Completed</div>
                </div>
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-3xl font-bold text-pink-500"
                  >
                    5+
                  </motion.div>
                  <div className="text-gray-400">Years Experience</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="w-full h-96 bg-gray-800 rounded-2xl overflow-hidden neon-glow">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000" 
                  alt="Professional headshot" 
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-6 -right-6 w-24 h-24 bg-purple-500 rounded-full flex items-center justify-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  💻
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Skills & <span className="text-pink-500">Technologies</span>
          </motion.h2>
          
          <SkillsSection />
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Professional <span className="text-blue-500">Journey</span>
          </motion.h2>
          
          <Timeline />
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            Featured <span className="text-pink-500">Projects</span>
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projectsData.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <Button
              variant="outline"
              className="border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-3"
            >
              View All Projects
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-8"
          >
            Let's <span className="text-blue-500">Connect</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
          >
            I'm always interested in hearing about new opportunities and exciting projects. 
            Let's discuss how we can work together!
          </motion.p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: Mail, title: "Email", value: "alex.morgan@email.com", color: "blue" },
              { icon: Linkedin, title: "LinkedIn", value: "in/alex-morgan-dev", color: "pink" },
              { icon: Github, title: "GitHub", value: "github.com/alexmorgan", color: "purple" }
            ].map(({ icon: Icon, title, value, color }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="glass-morphism p-6 rounded-xl cursor-pointer"
              >
                <div className={`text-3xl mb-4 ${
                  color === 'blue' ? 'text-blue-500' :
                  color === 'pink' ? 'text-pink-500' : 'text-purple-500'
                }`}>
                  <Icon />
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-gray-400 text-sm">{value}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Button
              onClick={() => window.open('mailto:alex.morgan@email.com')}
              className="bg-gradient-to-r from-blue-500 to-pink-500 text-white px-12 py-4 text-lg hover:scale-105 transition-transform duration-300 neon-glow"
            >
              Get In Touch
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            &copy; 2024 Alex Morgan. Built with passion and lots of coffee ☕
          </p>
        </div>
      </footer>
    </div>
  );
}
