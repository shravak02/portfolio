import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  message: string;
  rating: number;
  avatar: string;
  color: "blue" | "pink" | "purple";
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechFlow Inc",
    message: "Alex delivered an exceptional e-commerce platform that exceeded our expectations. The attention to detail and user experience is outstanding.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b9e7e4a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    color: "blue"
  },
  {
    name: "Michael Chen",
    role: "CTO",
    company: "StartupXYZ",
    message: "Working with Alex was a game-changer for our team. His full-stack expertise and problem-solving skills are top-notch.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    color: "pink"
  },
  {
    name: "Emily Rodriguez",
    role: "Design Director",
    company: "Creative Labs",
    message: "Alex seamlessly brought our complex designs to life with pixel-perfect precision and smooth animations. Truly impressive work.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    color: "purple"
  }
];

const colorClasses = {
  blue: "text-blue-500 border-blue-500/30",
  pink: "text-pink-500 border-pink-500/30",
  purple: "text-purple-500 border-purple-500/30"
};

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="grid md:grid-cols-3 gap-8">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.name}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          className={`glass-morphism p-6 rounded-2xl relative overflow-hidden group hover:scale-105 transition-transform duration-300 border ${colorClasses[testimonial.color].split(' ')[1]}`}
        >
          <Quote className={`absolute top-4 right-4 opacity-10 text-6xl ${colorClasses[testimonial.color].split(' ')[0]}`} />
          
          <div className="flex items-center mb-4">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full mr-4 border-2 border-gray-700"
            />
            <div>
              <h4 className="font-semibold">{testimonial.name}</h4>
              <p className="text-sm text-gray-400">{testimonial.role}</p>
              <p className="text-xs text-gray-500">{testimonial.company}</p>
            </div>
          </div>
          
          <div className="flex mb-3">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 fill-current ${colorClasses[testimonial.color].split(' ')[0]}`} />
            ))}
          </div>
          
          <p className="text-gray-300 text-sm leading-relaxed">
            "{testimonial.message}"
          </p>
        </motion.div>
      ))}
    </div>
  );
}