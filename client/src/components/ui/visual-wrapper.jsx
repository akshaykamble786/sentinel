import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const EndToEndEncryption = () => {
    const [phase, setPhase] = useState('idle'); // idle, encrypting, transmitting, decrypting
  
    useEffect(() => {
      const sequence = () => {
        setPhase('encrypting');
        setTimeout(() => setPhase('transmitting'), 1500);
        setTimeout(() => setPhase('decrypting'), 3500);
        setTimeout(() => setPhase('idle'), 5500);
      };
  
      const interval = setInterval(sequence, 7000);
      sequence();
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="relative w-full h-32 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-lg overflow-hidden">
        {/* Sender Device */}
        <motion.div 
          className="absolute left-6 top-1/2 transform -translate-y-1/2 w-14 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg"
          animate={{ 
            scale: phase === 'encrypting' ? [1, 1.1, 1] : 1,
            boxShadow: phase === 'encrypting' 
              ? ["0 4px 20px rgba(59, 130, 246, 0.3)", "0 4px 40px rgba(59, 130, 246, 0.6)", "0 4px 20px rgba(59, 130, 246, 0.3)"]
              : "0 4px 20px rgba(59, 130, 246, 0.2)"
          }}
          transition={{ duration: 0.8 }}
        >
          {/* Encryption Process Visual */}
          <motion.div 
            className="absolute inset-2 bg-blue-300/40 rounded"
            animate={{ 
              opacity: phase === 'encrypting' ? [0.4, 0.8, 0.4] : 0.4
            }}
            transition={{ duration: 1, repeat: phase === 'encrypting' ? Infinity : 0 }}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-bold">A</div>
        </motion.div>
        
        {/* Receiver Device */}
        <motion.div 
          className="absolute right-6 top-1/2 transform -translate-y-1/2 w-14 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg shadow-lg"
          animate={{ 
            scale: phase === 'decrypting' ? [1, 1.1, 1] : 1,
            boxShadow: phase === 'decrypting' 
              ? ["0 4px 20px rgba(16, 185, 129, 0.3)", "0 4px 40px rgba(16, 185, 129, 0.6)", "0 4px 20px rgba(16, 185, 129, 0.3)"]
              : "0 4px 20px rgba(16, 185, 129, 0.2)"
          }}
          transition={{ duration: 0.8 }}
        >
          {/* Decryption Process Visual */}
          <motion.div 
            className="absolute inset-2 bg-emerald-300/40 rounded"
            animate={{ 
              opacity: phase === 'decrypting' ? [0.4, 0.8, 0.4] : 0.4
            }}
            transition={{ duration: 1, repeat: phase === 'decrypting' ? Infinity : 0 }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-bold"
            animate={{ opacity: phase === 'decrypting' ? 1 : 0 }}
          >
            A
          </motion.div>
        </motion.div>
        
        {/* Secure Tunnel */}
        <motion.div 
          className="absolute top-1/2 left-20 right-20 h-8 transform -translate-y-1/2"
          animate={{ 
            opacity: phase === 'transmitting' ? 1 : 0.3
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent rounded-full border-2 border-cyan-400/30"></div>
        </motion.div>
        
        {/* Encrypted Data Packets */}
        <AnimatePresence>
          {phase === 'transmitting' && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 rounded"
                  style={{
                    background: `linear-gradient(45deg, ${['#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#10b981', '#f97316'][i % 6]}, ${['#d97706', '#dc2626', '#7c3aed', '#0891b2', '#059669', '#ea580c'][i % 6]})`
                  }}
                  initial={{ 
                    x: 80, 
                    y: Math.sin(i * 0.5) * 8,
                    opacity: 0, 
                    rotate: 0,
                    scale: 0.5
                  }}
                  animate={{ 
                    x: 280,
                    y: Math.sin(i * 0.5 + Date.now() * 0.01) * 8,
                    opacity: [0, 1, 1, 0],
                    rotate: 360,
                    scale: [0.5, 1, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 2, 
                    delay: i * 0.15,
                    ease: "easeInOut"
                  }}
                >
                  {/* Scrambled text effect */}
                  <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-mono">
                    {Math.random().toString(36).substr(2, 1).toUpperCase()}
                  </div>
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
        
        {/* Encryption Strength Indicators */}
        <motion.div 
          className="absolute bottom-2 left-6 flex space-x-1"
          animate={{ opacity: phase === 'encrypting' ? 1 : 0.5 }}
        >
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-3 bg-blue-400 rounded-full"
              animate={{ 
                height: phase === 'encrypting' ? [12, 16, 12] : 12,
                opacity: phase === 'encrypting' ? [0.5, 1, 0.5] : 0.5
              }}
              transition={{ duration: 0.5, delay: i * 0.1, repeat: phase === 'encrypting' ? Infinity : 0 }}
            />
          ))}
        </motion.div>
        
        <motion.div 
          className="absolute bottom-2 right-6 flex space-x-1"
          animate={{ opacity: phase === 'decrypting' ? 1 : 0.5 }}
        >
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-3 bg-emerald-400 rounded-full"
              animate={{ 
                height: phase === 'decrypting' ? [12, 16, 12] : 12,
                opacity: phase === 'decrypting' ? [0.5, 1, 0.5] : 0.5
              }}
              transition={{ duration: 0.5, delay: i * 0.1, repeat: phase === 'decrypting' ? Infinity : 0 }}
            />
          ))}
        </motion.div>
      </div>
    );
};

export const ZeroKnowledgeArchitecture = () => {
  const [phase, setPhase] = useState('idle'); // idle, challenge, proof, verification
  const [proofElements, setProofElements] = useState([]);
  
  useEffect(() => {
    const sequence = () => {
      setPhase('challenge');
      
      // Generate proof elements
      const elements = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        angle: (i * 45) * Math.PI / 180,
        delay: i * 0.1
      }));
      setProofElements(elements);
      
      setTimeout(() => setPhase('proof'), 1000);
      setTimeout(() => setPhase('verification'), 2500);
      setTimeout(() => setPhase('idle'), 4500);
    };

    const interval = setInterval(sequence, 6000);
    sequence();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-32 bg-gradient-to-br from-violet-950 via-purple-900 to-indigo-950 rounded-lg overflow-hidden">
      {/* Prover (Left) */}
      <motion.div 
        className="absolute left-8 top-1/2 transform -translate-y-1/2"
        animate={{ 
          scale: phase === 'proof' ? [1, 1.1, 1] : 1
        }}
      >
        <motion.div 
          className="w-16 h-16 border-3 border-purple-400 rounded-full relative"
          animate={{ 
            borderColor: phase === 'proof' ? "#a855f7" : "#c084fc",
            boxShadow: phase === 'proof' 
              ? "0 0 30px rgba(168, 85, 247, 0.5)" 
              : "0 0 15px rgba(192, 132, 252, 0.3)"
          }}
        >
          <motion.div 
            className="absolute inset-2 bg-gradient-to-br from-purple-500/30 to-purple-600/30 rounded-full"
            animate={{ 
              opacity: phase === 'proof' ? [0.3, 0.6, 0.3] : 0.3
            }}
            transition={{ duration: 1, repeat: phase === 'proof' ? Infinity : 0 }}
          />
          
          {/* Secret Knowledge Indicator */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-purple-300 rounded-full"
            animate={{ 
              scale: phase === 'challenge' ? [1, 1.5, 1] : 1,
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-purple-300 text-xs font-medium">
          Prover
        </div>
      </motion.div>
      
      {/* Verifier (Right) */}
      <motion.div 
        className="absolute right-8 top-1/2 transform -translate-y-1/2"
        animate={{ 
          scale: phase === 'verification' ? [1, 1.1, 1] : 1
        }}
      >
        <motion.div 
          className="w-14 h-12 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg relative"
          animate={{ 
            backgroundColor: phase === 'verification' 
              ? ["#4f46e5", "#3730a3", "#4f46e5"] 
              : "#4f46e5",
            boxShadow: phase === 'verification' 
              ? "0 0 25px rgba(79, 70, 229, 0.6)" 
              : "0 0 10px rgba(79, 70, 229, 0.3)"
          }}
          transition={{ duration: 0.8 }}
        >
          {/* Verification Process */}
          <motion.div 
            className="absolute inset-1 bg-indigo-400/40 rounded"
            animate={{ 
              opacity: phase === 'verification' ? [0.4, 0.8, 0.4] : 0.4
            }}
            transition={{ duration: 1, repeat: phase === 'verification' ? Infinity : 0 }}
          />
          
          {/* Checkmark appears on successful verification */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: phase === 'verification' ? [0, 1.2, 1] : 0,
              opacity: phase === 'verification' ? [0, 1, 1] : 0
            }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            ✓
          </motion.div>
        </motion.div>
        
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-indigo-300 text-xs font-medium">
          Verifier
        </div>
      </motion.div>
      
      {/* Zero Knowledge Proof Visualization */}
      <AnimatePresence>
        {phase === 'proof' && (
          <motion.div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {proofElements.map((element) => (
              <motion.div
                key={element.id}
                className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                initial={{ 
                  x: 0, 
                  y: 0, 
                  opacity: 0,
                  scale: 0
                }}
                animate={{ 
                  x: Math.cos(element.angle) * 30,
                  y: Math.sin(element.angle) * 30,
                  opacity: [0, 1, 1, 0.3],
                  scale: [0, 1.5, 1, 0.5]
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ 
                  duration: 1.5,
                  delay: element.delay,
                  ease: "easeOut"
                }}
              />
            ))}
            
            {/* Central proof nexus */}
            <motion.div 
              className="absolute w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: 360
              }}
              transition={{ 
                scale: { duration: 2, repeat: Infinity },
                rotate: { duration: 3, repeat: Infinity, ease: "linear" }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Challenge-Response Waves */}
      <motion.div 
        className="absolute top-1/2 left-24 right-24 h-1 transform -translate-y-1/2"
        animate={{ 
          opacity: phase === 'challenge' ? [0, 1, 1, 0] : 0,
          scaleX: phase === 'challenge' ? [0, 1, 1, 0] : 0
        }}
        transition={{ duration: 1 }}
      >
        <div className="w-full h-full bg-gradient-to-r from-purple-400 via-cyan-400 to-indigo-400 rounded-full"></div>
      </motion.div>
      
      {/* Verification Confirmation Wave */}
      <motion.div 
        className="absolute top-1/2 left-24 right-24 h-1 transform -translate-y-1/2 mt-2"
        animate={{ 
          opacity: phase === 'verification' ? [0, 1, 1, 0] : 0,
          scaleX: phase === 'verification' ? [0, 1, 1, 0] : 0
        }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="w-full h-full bg-gradient-to-r from-indigo-400 via-emerald-400 to-purple-400 rounded-full"></div>
      </motion.div>
      
      {/* Privacy Protection Field */}
      <motion.div 
        className="absolute inset-4 border border-purple-400/30 rounded-lg"
        animate={{ 
          borderColor: phase === 'proof' 
            ? ["rgba(168, 85, 247, 0.3)", "rgba(168, 85, 247, 0.6)", "rgba(168, 85, 247, 0.3)"]
            : "rgba(168, 85, 247, 0.3)",
          boxShadow: phase === 'proof' 
            ? "inset 0 0 20px rgba(168, 85, 247, 0.1)" 
            : "inset 0 0 10px rgba(168, 85, 247, 0.05)"
        }}
        transition={{ duration: 2, repeat: phase === 'proof' ? Infinity : 0 }}
      />
      
      {/* Status Indicator */}
      <motion.div 
        className="absolute top-2 right-3 text-xs font-medium"
        animate={{ 
          color: phase === 'verification' ? "#10b981" : 
                phase === 'proof' ? "#06b6d4" : 
                phase === 'challenge' ? "#8b5cf6" : "#6b7280"
        }}
      >
        {phase === 'idle' ? 'Ready' : 
         phase === 'challenge' ? 'Challenge' :
         phase === 'proof' ? 'Proving' : 'Verified ✓'}
      </motion.div>
    </div>
  );
};

export const BrowserSecurity = () => {
  const [threats, setThreats] = useState([]);
  const [shieldPulse, setShieldPulse] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newThreat = {
        id: Date.now(),
        x: Math.random() * 70 + 15,
        y: Math.random() * 50 + 25,
        type: Math.floor(Math.random() * 3) // Different threat types
      };
      setThreats(prev => [...prev, newThreat].slice(-6));
      
      // Shield pulse when threat detected
      setShieldPulse(true);
      setTimeout(() => setShieldPulse(false), 800);
    }, 1200);
    
    return () => clearInterval(interval);
  }, []);

  const threatColors = ['bg-red-500', 'bg-orange-500', 'bg-pink-500'];

  return (
    <div className="relative w-full h-32 bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 rounded-lg overflow-hidden shadow-2xl">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent animate-pulse" 
             style={{ animationDuration: '3s' }} />
        <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
          {[...Array(96)].map((_, i) => (
            <div key={i} className="border-emerald-400/10 border-r border-b animate-pulse" 
                 style={{ animationDelay: `${i * 10}ms` }} />
          ))}
        </div>
      </div>
      
      {/* Browser Window Frame with glow */}
      <div className="absolute top-2 left-2 right-2 h-6 bg-gray-700 rounded-t-lg shadow-lg border border-gray-600">
        <div className="flex space-x-1 p-1">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse shadow-lg shadow-yellow-500/50" 
               style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" 
               style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
      
      {/* Advanced Security Shield with multiple layers */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {/* Outer rotating ring */}
        <div 
          className="absolute w-20 h-20 border-2 border-emerald-400/30 rounded-full animate-spin"
          style={{ animationDuration: '8s' }}
        />
        
        {/* Main shield */}
        <div 
          className={`w-16 h-16 border-4 rounded-full transition-all duration-300 ${
            shieldPulse 
              ? 'border-emerald-300 bg-emerald-400/30 scale-110 shadow-2xl shadow-emerald-400/50' 
              : 'border-emerald-400 bg-emerald-400/20 scale-100 shadow-xl shadow-emerald-400/30'
          }`}
        >
          {/* Inner pulsing core */}
          <div className="absolute inset-2 bg-emerald-400/40 rounded-full animate-pulse" 
               style={{ animationDuration: '1.5s' }}>
            <div className="absolute inset-1 bg-emerald-300/60 rounded-full animate-ping" 
                 style={{ animationDuration: '2s' }} />
          </div>
          
          {/* Shield symbol */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-8 bg-emerald-200/80 rounded-t-full relative">
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-4 border-transparent border-t-emerald-200/80" />
            </div>
          </div>
        </div>
        
        {/* Counter-rotating inner ring */}
        <div 
          className="absolute inset-2 border border-emerald-300/50 rounded-full animate-spin"
          style={{ animationDuration: '4s', animationDirection: 'reverse' }}
        />
      </div>
      
      {/* Enhanced Threat Particles with trails */}
      {threats.map((threat, index) => (
        <div key={threat.id} className="absolute">
          {/* Main threat particle */}
          <div
            className={`w-3 h-3 ${threatColors[threat.type]} rounded-full shadow-lg animate-pulse`}
            style={{
              left: `${threat.x}%`,
              top: `${threat.y}%`,
              animation: `threatMove 2s ease-out forwards, pulse 0.5s ease-in-out infinite`,
              animationDelay: `${index * 0.1}s`,
              filter: 'drop-shadow(0 0 6px currentColor)'
            }}
          />
          
          {/* Threat trail */}
          <div
            className={`absolute w-1 h-1 ${threatColors[threat.type]} rounded-full opacity-60`}
            style={{
              left: `${threat.x - 2}%`,
              top: `${threat.y}%`,
              animation: `threatTrail 2s ease-out forwards`,
              animationDelay: `${index * 0.1 + 0.2}s`
            }}
          />
        </div>
      ))}
      
      {/* Scan lines effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent animate-bounce"
             style={{ 
               top: '30%',
               animationDuration: '3s',
               animationDirection: 'alternate-reverse' 
             }} />
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-teal-400/30 to-transparent animate-bounce"
             style={{ 
               top: '70%',
               animationDuration: '4s',
               animationDelay: '1s',
               animationDirection: 'alternate' 
             }} />
      </div>
      
      <style jsx>{`
        @keyframes threatMove {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          10% { transform: scale(1) rotate(45deg); opacity: 1; }
          90% { transform: scale(0.8) rotate(315deg) translateX(-20px) translateY(-20px); opacity: 0.8; }
          100% { transform: scale(0) rotate(360deg) translateX(-50px) translateY(-50px); opacity: 0; }
        }
        
        @keyframes threatTrail {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(0); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
  
export const LocalFirstEncryption = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [dataFlow, setDataFlow] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsProcessing(true);
      setDataFlow(prev => prev + 1);
      setTimeout(() => setIsProcessing(false), 2500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-32 bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 rounded-lg overflow-hidden shadow-2xl">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-radial from-emerald-400/30 via-transparent to-teal-400/20 animate-pulse"
             style={{ animationDuration: '4s' }} />
        {[...Array(20)].map((_, i) => (
          <div key={i} 
               className="absolute w-1 h-1 bg-teal-300/40 rounded-full animate-twinkle"
               style={{
                 left: `${Math.random() * 100}%`,
                 top: `${Math.random() * 100}%`,
                 animationDelay: `${Math.random() * 3}s`,
                 animationDuration: `${2 + Math.random() * 2}s`
               }} />
        ))}
      </div>
      
      {/* Enhanced Device/Local Storage */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div 
          className={`w-16 h-12 rounded-lg relative transition-all duration-700 ${
            isProcessing 
              ? 'bg-emerald-400 scale-110 shadow-2xl shadow-emerald-400/50' 
              : 'bg-emerald-600 scale-100 shadow-xl shadow-emerald-600/40'
          }`}
        >
          {/* Processing cores */}
          <div className="absolute inset-1 grid grid-cols-3 gap-1 p-1">
            {[...Array(6)].map((_, i) => (
              <div key={i}
                   className={`bg-emerald-200/60 rounded transition-all duration-300 ${
                     isProcessing ? 'animate-pulse bg-emerald-100/80' : ''
                   }`}
                   style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
          
          {/* Central processing indicator */}
          <div className={`absolute inset-2 border-2 border-emerald-200/50 rounded transition-all duration-500 ${
            isProcessing ? 'animate-ping border-emerald-100/80' : ''
          }`} />
          
          {/* Data flow indicator */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
            <div className={`w-2 h-2 bg-emerald-300 rounded-full transition-all duration-300 ${
              isProcessing ? 'animate-bounce shadow-lg shadow-emerald-300/50' : 'opacity-50'
            }`} />
          </div>
        </div>
      </div>
      
      {/* Advanced Data Particles with orbital motion */}
      {isProcessing && (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30) + (dataFlow * 10);
            const radius = 25 + (i % 3) * 8;
            return (
              <div
                key={i}
                className="absolute w-2 h-2 bg-teal-300 rounded-full shadow-lg shadow-teal-300/50"
                style={{
                  left: `${Math.cos(angle * Math.PI / 180) * radius}px`,
                  top: `${Math.sin(angle * Math.PI / 180) * radius}px`,
                  animation: `orbit 3s linear infinite, glow 1s ease-in-out infinite alternate`,
                  animationDelay: `${i * 0.1}s`,
                  transformOrigin: `${-Math.cos(angle * Math.PI / 180) * radius}px ${-Math.sin(angle * Math.PI / 180) * radius}px`
                }}
              />
            );
          })}
        </div>
      )}
      
      {/* Multi-layered Encryption Rings */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {[24, 32, 40].map((size, index) => (
          <div key={index}
               className={`absolute border rounded-full transition-all duration-1000 ${
                 isProcessing 
                   ? 'border-emerald-300/70 shadow-lg shadow-emerald-400/30' 
                   : 'border-emerald-400/40'
               }`}
               style={{
                 width: `${size * 4}px`,
                 height: `${size * 4}px`,
                 left: `${-size * 2}px`,
                 top: `${-size * 2}px`,
                 animation: `rotate ${8 + index * 4}s linear infinite ${index % 2 ? 'reverse' : ''}`,
                 transform: isProcessing ? `scale(${1 + index * 0.1})` : 'scale(1)'
               }}>
            {/* Ring decorations */}
            <div className={`absolute w-2 h-2 bg-teal-400 rounded-full -top-1 left-1/2 transform -translate-x-1/2 ${
              isProcessing ? 'animate-pulse' : ''
            }`} />
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes glow {
          0% { box-shadow: 0 0 5px currentColor; }
          100% { box-shadow: 0 0 15px currentColor, 0 0 25px currentColor; }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
};

export const PasswordHashing = () => {
  const [isHashing, setIsHashing] = useState(false);
  const [hashBits, setHashBits] = useState([]);
  const [processingStage, setProcessingStage] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsHashing(true);
      setProcessingStage(0);
      
      // Multi-stage processing
      const stages = [0, 1, 2, 3];
      stages.forEach((stage, index) => {
        setTimeout(() => {
          setProcessingStage(stage);
          if (stage === 3) {
            const bits = Array.from({length: 20}, () => Math.random() > 0.5 ? 1 : 0);
            setHashBits(bits);
          }
        }, index * 500);
      });
      
      setTimeout(() => setIsHashing(false), 3000);
    }, 4500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-32 bg-gradient-to-r from-orange-900 via-red-900 to-pink-900 rounded-lg overflow-hidden shadow-2xl">
      {/* Dynamic background with data stream effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent animate-pulse"
             style={{ animationDuration: '2s' }} />
        {[...Array(15)].map((_, i) => (
          <div key={i}
               className="absolute w-px h-full bg-gradient-to-b from-transparent via-orange-400/30 to-transparent opacity-50"
               style={{
                 left: `${i * 7}%`,
                 animation: `dataStream 3s linear infinite`,
                 animationDelay: `${i * 0.2}s`
               }} />
        ))}
      </div>
      
      {/* Enhanced Input Password */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <div 
          className={`w-20 h-8 rounded-lg relative transition-all duration-700 ${
            isHashing 
              ? 'bg-orange-400 scale-95 shadow-xl shadow-orange-400/50' 
              : 'bg-orange-600 scale-100'
          }`}
        >
          <div className="flex space-x-1 p-1">
            {[...Array(6)].map((_, i) => (
              <div key={i}
                   className={`w-1 rounded-full transition-all duration-500 ${
                     isHashing 
                       ? 'h-4 bg-orange-100 animate-pulse shadow-lg shadow-orange-200/50' 
                       : 'h-6 bg-orange-300'
                   }`}
                   style={{ 
                     transitionDelay: `${i * 100}ms`,
                     animationDelay: `${i * 0.1}s`
                   }} />
            ))}
          </div>
          
          {/* Input glow effect */}
          <div className={`absolute inset-0 rounded-lg transition-opacity duration-500 ${
            isHashing ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="absolute inset-0 bg-orange-400/30 rounded-lg animate-pulse" />
          </div>
        </div>
        
        {/* Input label */}
        <div className="absolute -top-6 left-0 text-xs text-orange-300 font-mono">
          PASSWORD
        </div>
      </div>
      
      {/* Advanced Hash Function Processor */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div 
          className={`w-14 h-14 relative transition-all duration-1000 ${
            isHashing ? 'scale-120' : 'scale-100'
          }`}
        >
          {/* Multi-ring processor */}
          {[0, 1, 2].map(ring => (
            <div key={ring}
                 className={`absolute border-2 rounded-full transition-all duration-1000 ${
                   processingStage > ring 
                     ? 'border-yellow-300 shadow-lg shadow-yellow-300/50' 
                     : 'border-yellow-500/50'
                 }`}
                 style={{
                   width: `${56 - ring * 8}px`,
                   height: `${56 - ring * 8}px`,
                   left: `${ring * 4}px`,
                   top: `${ring * 4}px`,
                   animation: processingStage > ring ? `spin 1s linear infinite` : 'none',
                   animationDelay: `${ring * 0.2}s`
                 }}>
              
              {/* Ring indicators */}
              <div className={`absolute w-1 h-1 bg-yellow-400 rounded-full -top-0.5 left-1/2 transform -translate-x-1/2 ${
                processingStage > ring ? 'animate-ping' : ''
              }`} />
            </div>
          ))}
          
          {/* Central core */}
          <div className={`absolute inset-4 rounded-full transition-all duration-700 ${
            processingStage >= 2 
              ? 'bg-yellow-400/60 animate-pulse shadow-2xl shadow-yellow-400/50' 
              : 'bg-yellow-400/20'
          }`}>
            <div className={`absolute inset-1 rounded-full transition-all duration-500 ${
              processingStage >= 3 ? 'bg-yellow-200/80 animate-ping' : 'bg-transparent'
            }`} />
          </div>
        </div>
        
        {/* Processor label */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-yellow-300 font-mono">
          HASH FUNC
        </div>
      </div>
      
      {/* Enhanced Output Hash */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <div 
          className={`w-28 h-6 rounded-lg relative transition-all duration-1200 delay-1000 ${
            processingStage >= 3 
              ? 'bg-red-500 scale-100 shadow-xl shadow-red-500/50' 
              : 'bg-red-700 scale-90'
          }`}
        >
          <div className="flex space-x-0.5 p-0.5">
            {hashBits.map((bit, i) => (
              <div key={i}
                   className={`w-1 h-5 rounded-full transition-all duration-400 ${
                     bit 
                       ? (processingStage >= 3 ? 'bg-red-100 shadow-sm shadow-red-100/50' : 'bg-red-200') 
                       : (processingStage >= 3 ? 'bg-red-300 shadow-sm shadow-red-300/50' : 'bg-red-400')
                   }`}
                   style={{ 
                     transitionDelay: `${i * 50 + 1500}ms`,
                     opacity: processingStage >= 3 ? 1 : 0.5,
                     animation: processingStage >= 3 ? `hashBit 0.3s ease-out ${i * 0.05 + 1.5}s both` : 'none'
                   }} />
            ))}
          </div>
          
          {/* Hash glow */}
          <div className={`absolute inset-0 rounded-lg transition-opacity duration-700 ${
            processingStage >= 3 ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="absolute inset-0 bg-red-400/20 rounded-lg animate-pulse" />
          </div>
        </div>
        
        {/* Output label */}
        <div className="absolute -top-6 right-0 text-xs text-red-300 font-mono">
          HASH OUTPUT
        </div>
      </div>
      
      {/* Enhanced Processing Particles */}
      {isHashing && (
        <>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute top-1/2 transform -translate-y-1/2">
              <div
                className="w-2 h-2 bg-yellow-300 rounded-full shadow-lg shadow-yellow-300/50"
                style={{
                  left: '112px',
                  animation: `particleFlow 2s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`
                }}
              />
            </div>
          ))}
        </>
      )}
      
      <style jsx>{`
        @keyframes dataStream {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes particleFlow {
          0% { transform: translateX(0) scale(0); opacity: 0; }
          20% { transform: translateX(20px) scale(1); opacity: 1; }
          80% { transform: translateX(60px) scale(0.8); opacity: 0.8; }
          100% { transform: translateX(80px) scale(0); opacity: 0; }
        }
        
        @keyframes hashBit {
          from { transform: translateY(10px) scale(0); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};