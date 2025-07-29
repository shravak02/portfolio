import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // Resume download endpoint
  app.get("/api/download-resume", (req, res) => {
    try {
      const resumePath = path.join(process.cwd(), "public", "resume.pdf");
      
      // Check if resume file exists
      if (!fs.existsSync(resumePath)) {
        return res.status(404).json({ 
          message: "Resume file not found. Please contact the administrator." 
        });
      }

      // Set headers for file download
      res.setHeader('Content-Disposition', 'attachment; filename="Alex_Morgan_Resume.pdf"');
      res.setHeader('Content-Type', 'application/pdf');
      
      // Stream the file
      const fileStream = fs.createReadStream(resumePath);
      fileStream.pipe(res);
      
      fileStream.on('error', (error) => {
        console.error('File streaming error:', error);
        if (!res.headersSent) {
          res.status(500).json({ message: "Error downloading resume" });
        }
      });
    } catch (error) {
      console.error('Resume download error:', error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Contact form endpoint (for future implementation)
  app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        message: "Name, email, and message are required" 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: "Please provide a valid email address" 
      });
    }

    // In a real application, you would:
    // 1. Send an email using nodemailer or similar
    // 2. Store the message in a database
    // 3. Send a confirmation email to the sender
    
    console.log('Contact form submission:', { name, email, message });
    
    res.json({ 
      message: "Thank you for your message! I'll get back to you soon." 
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
