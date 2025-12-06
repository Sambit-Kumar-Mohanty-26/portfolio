'use client';
import { motion, useMotionTemplate, useMotionValue, useInView } from 'framer-motion';
import { Mail, Github, Linkedin, Send, CheckCircle, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [headerText, setHeaderText] = useState(""); 
  const [gradientText, setGradientText] = useState(""); 
  const headingRef = useRef(null);
  const isInView = useInView(headingRef, { margin: "-100px" });

  useEffect(() => {
    let headerInterval: NodeJS.Timeout;
    let gradientInterval: NodeJS.Timeout;

    if (isInView) {
      const fullHeader = "Let's start a";
      const fullGradient = "project together";
      const speed = 40; 
      let i = 0;
      let j = 0;
      setHeaderText("");
      setGradientText("");
      headerInterval = setInterval(() => {
        if (i <= fullHeader.length) {
          setHeaderText(fullHeader.slice(0, i));
          i++;
        } else {
          clearInterval(headerInterval);

          gradientInterval = setInterval(() => {
            if (j <= fullGradient.length) {
              setGradientText(fullGradient.slice(0, j));
              j++;
            } else {
              clearInterval(gradientInterval);
            }
          }, speed);
        }
      }, speed);

    } else {
      setHeaderText("");
      setGradientText("");
    }

    return () => {
      clearInterval(headerInterval);
      clearInterval(gradientInterval);
    };
  }, [isInView]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');

    const target = e.target as typeof e.target & {
        name: { value: string };
        email: { value: string };
        message: { value: string };
    };

    const formData = {
        name: target.name.value,
        email: target.email.value,
        message: target.message.value,
    };

    try {
        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            setFormState('success');
            (e.target as HTMLFormElement).reset();
            setTimeout(() => setFormState('idle'), 3000);
        } else {
            setFormState('error');
            setTimeout(() => setFormState('idle'), 3000);
        }
    } catch (error) {
        setFormState('error');
        setTimeout(() => setFormState('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="py-24 relative z-20 overflow-hidden">
        
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-16 flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
            >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-green-400 tracking-wide uppercase">Available for work</span>
            </motion.div>
            <h2 
                ref={headingRef}
                className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight min-h-[120px] md:min-h-40"
            >
                {headerText}
                {isInView && headerText.length < 13 && headerText.length > 0 && <span className="animate-pulse">|</span>}
                
                <br />
                
                <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-cyan-500">
                    {gradientText}
                    {isInView && headerText.length >= 13 && gradientText.length < 16 && <span className="text-purple-500 animate-pulse">|</span>}
                </span>
            </h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="text-gray-400 text-lg max-w-2xl mx-auto"
            >
                Have an idea? I'd love to help you build it. Send me a message and I'll get back to you within 24 hours.
            </motion.p>
        </div>
        <div 
            onMouseMove={handleMouseMove}
            className="group relative rounded-4xl bg-zinc-900/50 border border-white/10 p-8 md:p-12 overflow-hidden shadow-2xl"
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-4xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                        650px circle at ${mouseX}px ${mouseY}px,
                        rgba(120, 40, 200, 0.1),
                        transparent 80%
                        )
                    `,
                }}
            />

            <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-300 ml-1 uppercase tracking-wider">Full Name</label>
                        <input 
                            name="name"
                            type="text" 
                            required
                            placeholder="John Doe"
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-300 ml-1 uppercase tracking-wider">Email Address</label>
                        <input 
                            name="email"
                            type="email" 
                            required
                            placeholder="john@example.com"
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-300 ml-1 uppercase tracking-wider">Your Message</label>
                    <textarea 
                        name="message"
                        rows={4}
                        required
                        placeholder="Tell me about your project..."
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                    />
                </div>

                <div className="flex justify-end">
                    <button 
                        type="submit"
                        disabled={formState !== 'idle'}
                        className={`
                            relative px-10 py-4 rounded-full font-bold text-base tracking-wide transition-all duration-300 flex items-center gap-3 overflow-hidden
                            ${formState === 'success' ? 'bg-green-500 text-white' : 
                              formState === 'error' ? 'bg-red-500 text-white' :
                              'bg-white text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]'}
                        `}
                    >
                        {formState === 'idle' && (
                            <>
                                <span className="relative z-10">Send Message</span>
                                <Send className="w-5 h-5 relative z-10" />
                            </>
                        )}
                        {formState === 'submitting' && (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Sending...</span>
                            </>
                        )}
                        {formState === 'success' && (
                            <>
                                <CheckCircle className="w-5 h-5" />
                                <span>Message Sent!</span>
                            </>
                        )}
                        {formState === 'error' && <span>Error. Try Again.</span>}
                    </button>
                </div>
            </form>
        </div>

        <div className="mt-24 flex flex-col items-center gap-8">
            <div className="flex items-center gap-4 w-full justify-center opacity-50">
                <div className="h-px bg-white/20 w-1/4"></div>
                <p className="text-gray-300 text-lg tracking-widest uppercase font-semibold">Or connect via</p>
                <div className="h-px bg-white/20 w-1/4"></div>
            </div>

            <div className="flex gap-8">
                <a 
                    href="mailto:sambitkumarmohanty25@gmail.com" 
                    className="group p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:scale-110 hover:border-orange-500/50 transition-all duration-300"
                >
                    <Mail className="w-8 h-8 text-gray-300 group-hover:text-orange-400 transition-colors" />
                </a>
                
                <a 
                    href="https://github.com/Sambit-Kumar-Mohanty-26" 
                    target="_blank" 
                    className="group p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:scale-110 hover:border-purple-500/50 transition-all duration-300"
                >
                    <Github className="w-8 h-8 text-gray-300 group-hover:text-purple-400 transition-colors" />
                </a>
                
                <a 
                    href="https://www.linkedin.com/in/sambit-kumar-mohanty-26/" 
                    target="_blank" 
                    className="group p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:scale-110 hover:border-blue-500/50 transition-all duration-300"
                >
                    <Linkedin className="w-8 h-8 text-gray-300 group-hover:text-blue-400 transition-colors" />
                </a>
            </div>
            
            <div className="mt-12 text-center">
                <p className="text-gray-500 text-sm">© 2025 Sambit Kumar Mohanty. Built with <span className="text-white">Next.js</span> & <span className="text-white">Passion</span>.</p>
            </div>
        </div>

      </div>
    </section>
  );
}