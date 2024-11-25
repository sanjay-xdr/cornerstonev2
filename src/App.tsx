import React, { useState, useEffect } from 'react';
import { Clock, Target, Settings, Plus, Play, Pause, RefreshCw, Image, Palette, X, ChevronRight } from 'lucide-react';

const GRADIENT_PRESETS = [
  { name: 'Mystic Night', class: 'from-gray-900 via-purple-900 to-gray-900' },
  { name: 'Ocean Depth', class: 'from-blue-900 via-purple-900 to-pink-900' },
  { name: 'Forest Dream', class: 'from-green-900 via-teal-900 to-blue-900' },
  { name: 'Sunset Flame', class: 'from-orange-900 via-red-900 to-purple-900' },
  { name: 'Aurora', class: 'from-indigo-900 via-purple-900 to-pink-900' }
];

const COLOR_SCHEMES = {
  yellow: { primary: 'text-yellow-400', secondary: 'text-yellow-600', hover: 'hover:bg-yellow-400/10' },
  blue: { primary: 'text-blue-400', secondary: 'text-blue-600', hover: 'hover:bg-blue-400/10' },
  purple: { primary: 'text-purple-400', secondary: 'text-purple-600', hover: 'hover:bg-purple-400/10' },
  green: { primary: 'text-green-400', secondary: 'text-green-600', hover: 'hover:bg-green-400/10' },
  pink: { primary: 'text-pink-400', secondary: 'text-pink-600', hover: 'hover:bg-pink-400/10' }
};

const SettingsPanel = ({ isOpen, onClose, settings, onSettingsChange }) => {
  const [activeTab, setActiveTab] = useState('background');
  
  const handleGradientChange = (gradientClass) => {
    onSettingsChange({
      ...settings,
      backgroundType: 'gradient',
      backgroundValue: gradientClass
    });
  };

  const handleColorSchemeChange = (color) => {
    onSettingsChange({
      ...settings,
      colorScheme: color
    });
  };

  return (
    <div 
    className={`fixed inset-y-0 right-0 w-80 bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}
  >
    <div className="h-full overflow-y-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Customize</h2>
        <button 
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex space-x-2 mb-6">
        {['background', 'colors', 'effects'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg capitalize transition-colors ${
              activeTab === tab 
                ? `bg-${settings.colorScheme}-500 text-white` 
                : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {activeTab === 'background' && (
          <>
            <div className="space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-wider text-gray-400">
                Gradient Presets
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {GRADIENT_PRESETS.map((gradient, index) => (
                  <button
                    key={index}
                    onClick={() => handleGradientChange(gradient.class)}
                    className={`
                      h-24 rounded-lg bg-gradient-to-br ${gradient.class}
                      transition-all duration-300 hover:scale-105
                      ${settings.backgroundValue === gradient.class ? 'ring-2 ring-white' : ''}
                    `}
                  >
                    <span className="text-xs text-white/80">{gradient.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-wider text-gray-400">
                Custom Image
              </h3>
              <input
                type="text"
                placeholder="Enter image URL..."
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
                onChange={(e) => {
                  if (e.target.value) {
                    onSettingsChange({
                      ...settings,
                      backgroundType: 'image',
                      backgroundValue: e.target.value
                    });
                  }
                }}
              />
            </div>
          </>
        )}

        {activeTab === 'colors' && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-400">
              Color Scheme
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.keys(COLOR_SCHEMES).map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorSchemeChange(color)}
                  className={`
                    p-4 rounded-lg capitalize transition-all duration-300 hover:scale-105
                    ${COLOR_SCHEMES[color].primary} ${COLOR_SCHEMES[color].hover}
                    ${settings.colorScheme === color ? 'ring-2 ring-white' : ''}
                  `}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'effects' && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-400">
              Visual Effects
            </h3>
            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <span className='text-white'>Glass Effect</span>
                <input
                  type="checkbox"
                  checked={settings.glassEffect}
                  onChange={(e) => onSettingsChange({
                    ...settings,
                    glassEffect: e.target.checked
                  })}
                  className="w-5 h-5"
                />
              </label>

            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);
};

const FocusDashboard = () => {
  const [time, setTime] = useState(new Date());
  const [focus, setFocus] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState({
    backgroundType: 'gradient',
    backgroundValue: GRADIENT_PRESETS[0].class,
    colorScheme: 'yellow',
    glassEffect: true,
    blurAmount: 10
  });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getBackground = () => {
    if (settings.backgroundType === 'image') {
      return {
        backgroundImage: `url(${settings.backgroundValue})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };
    }
    return {};
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Layer */}
      <div 
        className={`absolute inset-0 transition-all duration-500 ${
          settings.backgroundType === 'gradient' 
            ? `bg-gradient-to-br ${settings.backgroundValue}` 
            : ''
        }`}
        style={getBackground()}
      />

      {/* Content Layer */}
      <div className="relative min-h-screen p-8">
        <div className="max-w-2xl mx-auto">
          {/* Settings Button */}
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className={`
                p-3 rounded-lg transition-all duration-300 hover:scale-105
                ${settings.glassEffect ? 'bg-white/10 backdrop-blur' : 'bg-gray-800'}
                ${COLOR_SCHEMES[settings.colorScheme].hover}
              `}
            >
              <Settings className={COLOR_SCHEMES[settings.colorScheme].primary} />
            </button>
          </div>

          {/* Time Display */}
          <div className="text-center mb-8">
            <div className={`text-8xl font-bold tracking-wider ${COLOR_SCHEMES[settings.colorScheme].primary}`}>
              {time.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </div>
          </div>

          {/* Focus Input */}
          <div className={`
            rounded-xl p-6 transition-all duration-300
            ${settings.glassEffect 
              ? `bg-white/10 backdrop-blur-${settings.blurAmount}` 
              : 'bg-gray-800/90'
            }
          `}>
            <div className="flex items-center gap-3 mb-4">
              <Target className={COLOR_SCHEMES[settings.colorScheme].primary} />
              <h3 className="text-xl text-white">My Main Focus for today is</h3>
            </div>
            
            {isEditing ? (
              <input
                type="text"
                value={focus}
                onChange={(e) => setFocus(e.target.value)}
                onBlur={() => setIsEditing(false)}
                className="w-full bg-black/20 text-white rounded-lg px-4 py-3 outline-none"
                placeholder="Enter your main focus..."
                autoFocus
              />
            ) : (
              <div
                onClick={() => setIsEditing(true)}
                className="cursor-text min-h-[48px] flex items-center px-4 text-white rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                {focus || 'Click to set your focus...'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSettingsChange={setSettings}
      />
    </div>
  );
};

export default FocusDashboard;