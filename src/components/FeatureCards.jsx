import React from 'react';
import { motion } from 'framer-motion';

function FeatureCards() {
  const features = [
    {
      icon: '🪖',
      title: 'No Helmet Detection',
      description: '💡 Smart rides begin with smart detection — helmet on, life on.',
    },
    {
      icon: '🤳🏼',
      title: 'Phone Usage Detection',
      description: '📱 Gear up before you go up — safety first.',
    },
    {
      icon: '🏍',
      title: 'Triple Riding Detection',
      description: '🧍‍♂🧍‍♂🧍‍♂ Safety first: automated detection of triple riding saves lives.',
    },
    {
      icon: '🔥',
      title: 'Vehicle Fire Detection',
      description: '🚒 Catch flames before they rage — early detection prevents disasters.',
    },
    {
      icon: '🚬',
      title: 'Smoking While Driving',
      description: '🚭 Clear air, clear focus — smoking distracts you from the road.',
    },
    {
      icon: '🤸‍♂️',
      title: 'Stunt Ride Detection',
      description: '🎬 Keep the stunts on screen — real roads demand real responsibility.',
    },
    {
      icon: '🚦',
      title: 'Red Light Violation',
      description: '⛔ When red appears, brakes should engage — no exceptions.',
    }
  ];

  return (
    <div className="flex flex-col items-center justify-start px-3 pt-1 pb-20">
      {/* First row with 3 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-24">
        {features.slice(0, 3).map((feature, index) => (
          <motion.div
            key={index}
            className="w-44 h-48 bg-orange-50 border-2 border-blue-900 rounded-2xl shadow-xl flex flex-col justify-center items-center text-center px-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: 'easeOut',
            }}
            whileHover={{
              scale: 1.08,
              boxShadow: '0 12px 24px rgba(247, 236, 212, 0.94)',
            }}
          >
            <div className="text-2xl mb-4">{feature.icon}</div>
            <h2 className="text-xl font-bold mb-2">{feature.title}</h2>
            {feature.description && (
              <p className="text-sm text-black">{feature.description}</p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Second row with 4 cards - increased gap spacing */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-20 gap-x-20">
        {features.slice(3).map((feature, index) => (
          <motion.div
            key={index + 3}
            className="w-44 min-h-[200px] bg-orange-50 border-2 border-blue-900 rounded-2xl shadow-xl flex flex-col justify-center items-center text-center px-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: (index + 3) * 0.1,
              ease: 'easeOut',
            }}
            whileHover={{
              scale: 1.08,
              boxShadow: '0 12px 24px rgba(0, 0, 0, 0.25)',
            }}
          >
            <div className="text-2xl mb-4">{feature.icon}</div>
            <h2 className="text-xl font-bold mb-2">{feature.title}</h2>
            {feature.description && (
              <p className="text-sm text-black">{feature.description}</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default FeatureCards;