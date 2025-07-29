import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  color: "blue" | "pink" | "purple";
}

const blogPosts: BlogPost[] = [
  {
    title: "Building Scalable React Applications with TypeScript",
    excerpt: "Learn how to structure large React applications using TypeScript, best practices for component architecture, and advanced patterns for maintainable code.",
    date: "Dec 15, 2024",
    readTime: "8 min read",
    category: "React",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    color: "blue"
  },
  {
    title: "Modern CSS Animations and Framer Motion",
    excerpt: "Explore the latest in web animations, from CSS transforms to advanced Framer Motion techniques that create engaging user experiences.",
    date: "Dec 10, 2024",
    readTime: "6 min read",
    category: "Animation",
    image: "https://images.unsplash.com/photo-1558618666-fcd25e85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    color: "pink"
  },
  {
    title: "Database Design Patterns for Modern Web Apps",
    excerpt: "Deep dive into database optimization, indexing strategies, and choosing the right database technology for your next project.",
    date: "Dec 5, 2024",
    readTime: "10 min read",
    category: "Backend",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    color: "purple"
  }
];

const colorClasses = {
  blue: "text-blue-500 bg-blue-500/10 border-blue-500/30",
  pink: "text-pink-500 bg-pink-500/10 border-pink-500/30",
  purple: "text-purple-500 bg-purple-500/10 border-purple-500/30"
};

export function BlogPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="grid md:grid-cols-3 gap-8">
      {blogPosts.map((post, index) => (
        <motion.article
          key={post.title}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          whileHover={{ y: -10 }}
          className="glass-morphism rounded-2xl overflow-hidden group cursor-pointer"
        >
          <div className="relative overflow-hidden h-48">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${colorClasses[post.color]}`}>
                {post.category}
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center text-sm text-gray-400 mb-3">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="mr-4">{post.date}</span>
              <Clock className="w-4 h-4 mr-2" />
              <span>{post.readTime}</span>
            </div>

            <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-500 transition-colors line-clamp-2">
              {post.title}
            </h3>

            <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>

            <div className="flex items-center text-sm font-medium text-blue-500 group-hover:text-pink-500 transition-colors">
              Read More
              <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}