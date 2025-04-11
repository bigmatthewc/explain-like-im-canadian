// components/BiasFilter.js
'use client'; // Required for client-side interactivity

export default function BiasFilter({ activeBias, setActiveBias }) {
  const biases = ['all', 'left', 'center', 'right'];
  
  return (
    <div className="flex gap-2 mb-6">
      {biases.map((bias) => (
        <button
          key={bias}
          onClick={() => setActiveBias(bias)}
          className={`px-4 py-2 rounded-full text-sm ${
            activeBias === bias 
              ? getActiveButtonStyle(bias)
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {bias.charAt(0).toUpperCase() + bias.slice(1)}
        </button>
      ))}
    </div>
  );
}

function getActiveButtonStyle(bias) {
  const styles = {
    all: 'bg-black text-white',
    left: 'bg-blue-600 text-white',
    center: 'bg-gray-600 text-white',
    right: 'bg-red-600 text-white'
  };
  return styles[bias];
}