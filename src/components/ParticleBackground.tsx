import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
}

export const ParticleBackground: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      return Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 20 + 10,
      }));
    };

    setParticles(generateParticles());
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-primary to-accent"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            opacity: 0.3,
          }}
          animate={{
            y: [0, -100, -200],
            opacity: [0.3, 0.5, 0],
            x: [0, Math.random() * 100 - 50],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};
