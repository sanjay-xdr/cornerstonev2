import React, { useState } from "react";
import { BaseColor, COLOR_SCHEMES, GRADIENT_PRESETS } from "../assets/Color";
import { X } from "lucide-react";


interface Settings {
  backgroundType: string;
  backgroundValue: string;
  colorScheme: string;
  glassEffect: boolean;
  blurAmount:number
}

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  onSettingsChange: (newSettings: Settings) => void;
}



export const SettingsPanel :React.FC<SettingsPanelProps>  = ({ isOpen, onClose, settings, onSettingsChange }) => {
    const [activeTab, setActiveTab] = useState("background");
  
    const handleGradientChange = (gradientClass:string) => {
      onSettingsChange({
        ...settings,
        backgroundType: "gradient",
        backgroundValue: gradientClass,
      });
    };
  
    const handleColorSchemeChange = (color:string) => {
      onSettingsChange({
        ...settings,
        colorScheme: color,
      });
    };
  
    return (
      <div
        className={`fixed inset-y-0 right-0 w-80 bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Customize</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5 bg-white" />
            </button>
          </div>
  
          <div className="flex space-x-2 mb-6">
            {["background", "colors", "effects"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                  activeTab === tab
                    ? `bg-${settings.colorScheme}-500 text-white`
                    : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
  
          <div className="space-y-6">
            {activeTab === "background" && (
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
                        ${
                          settings.backgroundValue === gradient.class
                            ? "ring-2 ring-white"
                            : ""
                        }
                      `}
                      >
                        <span className="text-xs text-white/80">
                          {gradient.name}
                        </span>
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
                          backgroundType: "image",
                          backgroundValue: e.target.value,
                        });
                      }
                    }}
                  />
                </div>
              </>
            )}
  
            {activeTab === "colors" && (
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
                      ${COLOR_SCHEMES[color as BaseColor].primary} ${
                        COLOR_SCHEMES[color as BaseColor].hover
                      }
                      ${settings.colorScheme === color ? "ring-2 ring-white" : ""}
                    `}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}
  
            {activeTab === "effects" && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium uppercase tracking-wider text-gray-400">
                  Visual Effects
                </h3>
                <div className="space-y-4">
                  <label className="flex items-center justify-between">
                    <span className="text-white">Glass Effect</span>
                    <input
                      type="checkbox"
                      checked={settings.glassEffect}
                      onChange={(e) =>
                        onSettingsChange({
                          ...settings,
                          glassEffect: e.target.checked,
                        })
                      }
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
  

  