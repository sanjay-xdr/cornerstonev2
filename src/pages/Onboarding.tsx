import React, { useState, useEffect } from "react";
import { COLOR_SCHEMES, GRADIENT_PRESETS } from "../assets/Color";
import { BaseColor } from "../assets/Color";

export const Onboarding = () => {
  const [time, setTime] = useState(new Date());
  const [focus, setFocus] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false); // New state for theme modal
  const [tasks, setTasks] = useState([]); // New state for tasks
  const [settings, setSettings] = useState({
    backgroundType: "gradient",
    backgroundValue: GRADIENT_PRESETS[0].class,
    colorScheme: "yellow",
    glassEffect: true,
    blurAmount: 10,
  });

  interface Task {
    id: string;
    title: string;
    completed: boolean;
  }
  

  useEffect(() => {
    const savedTasks=localStorage.getItem("tasks");
    if(savedTasks){
        try{

            const parsedTasks : Task[]=JSON.parse(localStorage.getItem("tasks"));
        }catch (err){
            
        }
    }

    const savedTasksf = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  const handleAddTask = () => {
    if (focus.trim() !== "") {
      const newTasks = [...tasks, focus];
      setTasks(newTasks);
      localStorage.setItem("tasks", JSON.stringify(newTasks)); // Persist tasks immediately
      setFocus("");
    }
  };

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem("dashboardSettings", JSON.stringify(newSettings)); // Persist settings
  };

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem("dashboardSettings"));
    if (savedSettings) {
      setSettings(savedSettings);
    }
  }, []);

  const [userName, setUserName] = useState("");
  const [isNameSet, setIsNameSet] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setUserName(savedName);
      setIsNameSet(true);
    }

    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNameSubmit = () => {
    if (userName.trim() !== "") {
      localStorage.setItem("userName", userName);
      setIsNameSet(true);
      setIsThemeModalOpen(true); // Open theme modal
    }
  };

  const handleThemeConfirm = () => {
    setIsThemeModalOpen(false); // Close theme modal
  };
  const getBackground = () => {
    if (settings.backgroundType === "image") {
      return {
        backgroundImage: `url(${settings.backgroundValue})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    }
    return {
      background: `linear-gradient(to br, ${settings.backgroundValue})`, //new
    };
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Step 1: Ask for User's Name */}
      {!isNameSet ? (
        <div
          className={`absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 transition-all duration-500 ${
            settings.backgroundType === "gradient"
              ? `bg-gradient-to-br ${settings.backgroundValue}` // Applying gradient background
              : ""
          }`}
        >
          <div className="bg-gray-900 p-8 rounded-lg shadow-xl max-w-sm w-full backdrop-blur-md">
            <h2 className="text-xl text-white mb-4">
              Hello, What's your name?
            </h2>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              autoFocus
            />
            <button
              onClick={handleNameSubmit}
              className="mt-4 w-full text-white py-2 rounded-lg hover:bg-purple-500"
            >
              Submit
            </button>
          </div>
        </div>
      ) : isThemeModalOpen ? (
        // Step 2: Theme Customization Modal
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80">
          <div className="bg-gray-900 p-6 rounded-lg shadow-xl max-w-lg w-full">
            <h2 className="text-xl text-white mb-4">Customize Your Theme</h2>
            <SettingsPanel
              isOpen={true}
              onClose={handleThemeConfirm}
              settings={settings}
              onSettingsChange={setSettings} // Update `settings` state dynamically
            />
            <button
              onClick={() => {
                handleThemeConfirm(); // Apply changes
              }}
              className="mt-4 w-full text-white py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
            >
              Confirm Theme
            </button>
          </div>
        </div>
      ) : (
        // Step 3: Main Dashboard
        <div className="relative min-h-screen overflow-hidden">
          {/* Background Layer */}
          <div
            className={`absolute inset-0 transition-all duration-500 ${
              settings.backgroundType === "gradient"
                ? `bg-gradient-to-br ${settings.backgroundValue}`
                : ""
            }`}
            style={
              settings.backgroundType === "image"
                ? {
                    backgroundImage: `url(${settings.backgroundValue})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : {}
            }
          />

          {/* Content Layer */}
          <div className="relative min-h-screen p-8">
            <div className="max-w-2xl mx-auto">
              {/* Settings Button */}
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setIsSettingsOpen(true)}
                  className={`p-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                    settings.glassEffect
                      ? "bg-white/10 backdrop-blur"
                      : "bg-gray-800"
                  } ${COLOR_SCHEMES[settings.colorScheme as BaseColor].hover}`}
                >
                  <Settings
                    className={
                      COLOR_SCHEMES[settings.colorScheme as BaseColor].primary
                    }
                  />
                </button>
              </div>

              {/* Time Display */}
              <div className="text-center mb-8">
                <div
                  className={`text-5xl font-bold tracking-wider ${
                    COLOR_SCHEMES[settings.colorScheme as BaseColor].primary
                  }`}
                >
                  {time.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </div>
              </div>

              {/* User Name Display */}
              <div className="text-center mb-8">
                <h2
                  className={`text-4xl font-bold ${
                    COLOR_SCHEMES[settings.colorScheme as BaseColor].primary
                  }`}
                >
                  Hello, {userName} !
                </h2>
              </div>

              {/* Focus Input */}
              <div
                className={`rounded-xl p-6 transition-all duration-300 ${
                  settings.glassEffect
                    ? `bg-white/10 backdrop-blur-${settings.blurAmount}`
                    : "bg-gray-800/90"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Target
                    className={
                      COLOR_SCHEMES[settings.colorScheme as BaseColor].primary
                    }
                  />
                  <h3 className="text-xl text-white">
                    My Main Focus for today is
                  </h3>
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
                    {focus || "Click to set your focus..."}
                  </div>
                )}
                <button
                  onClick={handleAddTask}
                  className="mt-4 w-full text-white py-2 rounded-lg hover:bg-purple-500"
                >
                  Let's Do this
                </button>
              </div>
              <div>
                <br></br>
                <h3
                  className={`text-2xl font-bold ${
                    COLOR_SCHEMES[settings.colorScheme as BaseColor].primary
                  } `}
                >
                  Tasks :
                </h3>
                <ul className="space-y-2">
                  {tasks.map((task, index) => (
                    <li
                      key={index}
                      className="mt-3 w-full text-white py-2 rounded-lg hover:bg-purple-500"
                    >
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Settings Panel */}
          <SettingsPanel
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            settings={settings}
            onSettingsChange={handleSettingsChange}
          />
        </div>
      )}
    </div>
  );
};
