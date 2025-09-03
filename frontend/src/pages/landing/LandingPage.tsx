import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Music, 
  Users, 
  MessageCircle,  
  Play, 
  Radio,
  Sparkles,
  ArrowRight,
  Heart,
  Zap,
  Star,
  Disc,
  Waves,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import SplashCursor from "@/components/SplashCursor";

const AnimatedBackground = () => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, delay: number}>>([]);
  
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-blue-500/5 to-purple-500/5 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-emerald-500/3 to-transparent animate-pulse delay-1000" />
      </div>
      
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
      
      <motion.div
        className="absolute top-1/4 left-1/5 text-emerald-400/10"
        animate={{ 
          rotate: [0, 360], 
          scale: [1, 1.2, 1],
          y: [0, -30, 0]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <Music className="h-12 w-12" />
      </motion.div>
      
      <motion.div
        className="absolute top-3/4 right-1/4 text-blue-400/10"
        animate={{ 
          rotate: [360, 0], 
          scale: [1, 1.3, 1],
          y: [0, -40, 0]
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <Disc className="h-16 w-16" />
      </motion.div>
      
      <motion.div
        className="absolute top-1/2 left-3/4 text-purple-400/10"
        animate={{ 
          rotate: [0, -360], 
          scale: [1, 1.1, 1],
          x: [0, -25, 0]
        }}
        transition={{ 
          duration: 18, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <Waves className="h-14 w-14" />
      </motion.div>
    </div>
  );
};

const MusicVisualizer = () => {
  const [bars, setBars] = useState<number[]>([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setBars(Array.from({ length: 20 }, () => Math.random() * 100));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-end justify-center gap-1 h-16 mb-8">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          className="w-2 bg-gradient-to-t from-emerald-500 to-blue-500 rounded-full"
          style={{ height: `${height}%` }}
          animate={{ height: `${height}%` }}
          transition={{ duration: 0.15 }}
        />
      ))}
    </div>
  );
};

const FloatingButton = ({ children, onClick, className = "" }: { children: React.ReactNode, onClick: () => void, className?: string }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -5 }}
    whileTap={{ scale: 0.95 }}
    className={`relative group ${className}`}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <Button
      onClick={onClick}
      className="relative bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white rounded-full"
    >
      {children}
    </Button>
  </motion.div>
);

const LandingPage = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const features = [
    {
      icon: <Music className="h-8 w-8" />,
      title: "Endless Music Library",
      description: "Stream millions of songs from every genre. Discover new favorites and revisit classics with AI-powered recommendations.",
      gradient: "from-emerald-500/20 to-teal-500/20",
      color: "emerald"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Social Listening",
      description: "Connect with friends, share your music taste, and discover what they're playing in real-time.",
      gradient: "from-blue-500/20 to-indigo-500/20",
      color: "blue"
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Real-time Chat",
      description: "Chat with friends while listening. Share reactions, lyrics, and recommendations instantly.",
      gradient: "from-purple-500/20 to-pink-500/20",
      color: "purple"
    },
    {
      icon: <Radio className="h-8 w-8" />,
      title: "Smart Recommendations",
      description: "AI-powered suggestions based on your taste, mood, and listening history. Never run out of music to love.",
      gradient: "from-orange-500/20 to-red-500/20",
      color: "orange"
    }
  ];

  const stats = [
    { number: "10M+", label: "Songs Available", icon: <Music className="h-6 w-6" /> },
    { number: "500K+", label: "Active Users", icon: <Users className="h-6 w-6" /> },
    { number: "1M+", label: "Playlists Created", icon: <Heart className="h-6 w-6" /> },
    { number: "99.9%", label: "Uptime", icon: <Zap className="h-6 w-6" /> }
  ];

  const [, setCurrentFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen text-white overflow-hidden relative">
      <SplashCursor 
        SIM_RESOLUTION={64}
        DYE_RESOLUTION={512}
        DENSITY_DISSIPATION={2}
        VELOCITY_DISSIPATION={1.5}
        PRESSURE_ITERATIONS={15}
        CURL={2}
        SPLAT_FORCE={4000}
        COLOR_UPDATE_SPEED={5}
      />
      <AnimatedBackground />
      
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/20 border-b border-white/10"
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <motion.img
              src="https://alternative.me/media/256/beatwave-icon-8x42bk54wwlw7535-c.png"
              alt="BeatWave Logo"
              className="h-8 w-8"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              BeatWave
            </span>
          </motion.div>
          
          <div className="flex items-center gap-4">
            <SignedIn>
              <FloatingButton onClick={() => navigate("/home")}>
                <Sparkles className="mr-2 h-4 w-4" />
                Enter App
              </FloatingButton>
            </SignedIn>
            <SignedOut>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={() => navigate("/home")}
                  variant="outline"
                  className="border-emerald-400/50 bg-emerald-400/10 text-emerald-400 hover:bg-emerald-400 hover:text-black backdrop-blur-sm"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              </motion.div>
            </SignedOut>
          </div>
        </div>
      </motion.nav>

      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            style={{ y, opacity, scale }}
            className="relative z-10"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full border border-emerald-500/30 backdrop-blur-sm">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Star className="h-4 w-4 text-emerald-400" />
                </motion.div>
                <span className="text-sm font-medium">Now in Beta - Join the Music Revolution</span>
              </div>
            </motion.div>
            
            <motion.div className="mb-6">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="text-7xl lg:text-9xl font-bold bg-gradient-to-r from-white via-emerald-200 to-blue-200 bg-clip-text text-transparent mb-4"
              >
                Feel the
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="relative"
              >
                <h1 className="text-7xl lg:text-9xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Beat
                </h1>
                <motion.div
                  className="absolute -top-4 -right-4 text-6xl"
                  animate={{ 
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: 2
                  }}
                >
                  🎵
                </motion.div>
              </motion.div>
            </motion.div>
            
            <MusicVisualizer />
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-2xl lg:text-3xl text-zinc-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Stream unlimited music, connect with friends, and discover your next favorite song. 
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent font-semibold">
                {" "}Experience seamless playback with real-time social features.
              </span>
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full blur-xl opacity-50"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <Button
                  onClick={() => navigate("/home")}
                  size="lg"
                  className="relative bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-12 py-6 text-xl font-medium rounded-full group"
                >
                  <motion.div
                    className="mr-3"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Play className="h-6 w-6" />
                  </motion.div>
                  Start Listening Now
                  <motion.div
                    className="ml-3"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <ArrowRight className="h-6 w-6" />
                  </motion.div>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.8, type: "spring" }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:border-emerald-400/50 transition-all duration-300"
              >
                <motion.div
                  className="text-emerald-400 mb-4 flex justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  {stat.icon}
                </motion.div>
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-zinc-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-emerald-200 to-blue-200 bg-clip-text text-transparent">
              Why Choose BeatWave?
            </h2>
            <p className="text-2xl text-zinc-400 max-w-3xl mx-auto">
              Experience music like never before with our cutting-edge features
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                <Card className="relative overflow-hidden bg-gradient-to-br from-zinc-900/80 to-zinc-800/80 border-zinc-700/50 backdrop-blur-xl hover:border-emerald-500/50 transition-all duration-500 h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardContent className="p-8 relative z-10">
                    <motion.div
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 text-${feature.color}-400`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-emerald-400 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-400 text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative text-center bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl p-12 border border-emerald-500/30 backdrop-blur-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 animate-pulse" />
            
            <motion.div
              className="relative z-10"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center mb-8">
                <motion.div
                  className="flex items-center gap-2 text-red-400"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="h-8 w-8" />
                  <span className="text-xl font-semibold">Join thousands of music lovers</span>
                </motion.div>
              </div>
              
              <h2 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                Ready to Start Your Journey?
              </h2>
              <p className="text-2xl text-zinc-300 mb-12 max-w-3xl mx-auto">
                Join BeatWave today and discover a whole new way to experience music with friends
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <FloatingButton
                  onClick={() => navigate("/home")}
                  className="text-xl px-12 py-6"
                >
                  <Play className="mr-3 h-6 w-6" />
                  Get Started Free
                </FloatingButton>
       
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer className="py-16 px-6 border-t border-zinc-800/50 backdrop-blur-xl bg-black/20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <motion.img
                src="https://alternative.me/media/256/beatwave-icon-8x42bk54wwlw7535-c.png"
                alt="BeatWave Logo"
                className="h-8 w-8"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                BeatWave
              </span>
            </motion.div>
            
            <div className="flex flex-col sm:flex-row items-center gap-8 text-zinc-400">
              <span>© 2024 BeatWave. All rights reserved.</span>
              <div className="flex gap-6">
                <motion.div whileHover={{ scale: 1.05, color: "#10b981" }}>
                  <Link to="/home" className="hover:text-emerald-400 transition-colors">Privacy</Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05, color: "#10b981" }}>
                  <Link to="/home" className="hover:text-emerald-400 transition-colors">Terms</Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05, color: "#10b981" }}>
                  <Link to="/home" className="hover:text-emerald-400 transition-colors">Support</Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 