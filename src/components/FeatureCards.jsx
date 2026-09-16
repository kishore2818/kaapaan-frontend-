import React from 'react';

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
      icon: '🤖',
      title: 'Facial Recognition at Traffic Signals',
      description: 'Facial recognition must balance security with privacy.',
    }
  ];

  return (
    <div className="flex flex-col items-center justify-start px-3 pt-1 pb-20">
      {/* First row with 3 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-24">
        {features.slice(0, 3).map((feature, index) => (
          <div
            key={index}
            className="w-44 h-48 bg-orange-50 border-2 border-blue-900 rounded-2xl shadow-xl flex flex-col justify-center items-center text-center px-4"
          >
            <div className="text-2xl mb-4">{feature.icon}</div>
            <h2 className="text-xl font-bold mb-2">{feature.title}</h2>
            {feature.description && (
              <p className="text-sm text-black">{feature.description}</p>
            )}
          </div>
        ))}
      </div>

      {/* Second row with 4 cards - increased gap spacing */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-20 gap-x-20">
        {features.slice(3).map((feature, index) => (
          <div
            key={index + 3}
            className="w-44 min-h-[200px] bg-orange-50 border-2 border-blue-900 rounded-2xl shadow-xl flex flex-col justify-center items-center text-center px-4"
          >
            <div className="text-2xl mb-4">{feature.icon}</div>
            <h2 className="text-xl font-bold mb-2">{feature.title}</h2>
            {feature.description && (
              <p className="text-sm text-black">{feature.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeatureCards;
