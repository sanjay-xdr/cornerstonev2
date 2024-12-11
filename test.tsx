
import React, { useState } from "react";
import { X, Edit, Trash2, Save, X as XIcon } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description?: string;
}

interface Settings {
  backgroundType: string;
  backgroundValue: string;
  colorScheme: string;
  glassEffect: boolean;
  blurAmount: number;
}

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  tasks: Task[];
  onSettingsChange: (newSettings: Settings) => void;
  onTaskUpdate: (updatedTask: Task) => void;
  onTaskDelete: (taskId: string) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  onClose,
  settings,
  tasks,
  onSettingsChange,
  onTaskUpdate,
  onTaskDelete,
}) => {
  const [activeTab, setActiveTab] = useState("background");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleGradientChange = (gradientClass: string) => {
    onSettingsChange({
      ...settings,
      backgroundType: "gradient",
      backgroundValue: gradientClass,
    });
  };

  const handleColorSchemeChange = (color: string) => {
    onSettingsChange({
      ...settings,
      colorScheme: color,
    });
  };

  const handleTaskEdit = (task: Task) => {
    setEditingTask({ ...task });
  };

  const handleTaskSave = () => {
    if (editingTask) {
      onTaskUpdate(editingTask);
      setEditingTask(null);
    }
  };

  const handleTaskCancel = () => {
    setEditingTask(null);
  };

  return (
    <div
      className={`fixed inset-y-0 right-0 w-96 bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
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
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="flex space-x-2 mb-6">
          {["background", "colors", "effects", "tasks"].map((tab) => (
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
          {/* Previous tabs remain the same */}
          {activeTab === "background" && (
            // ... (previous background tab content)
          )}

          {activeTab === "colors" && (
            // ... (previous colors tab content)
          )}

          {activeTab === "effects" && (
            // ... (previous effects tab content)
          )}

          {activeTab === "tasks" && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-wider text-gray-400">
                Task Management
              </h3>
              {tasks.length === 0 ? (
                <p className="text-gray-500 text-center">No tasks available</p>
              ) : (
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-gray-800 rounded-lg p-4 flex items-center justify-between"
                    >
                      {editingTask?.id === task.id ? (
                        <div className="w-full">
                          <input
                            type="text"
                            value={editingTask.title}
                            onChange={(e) =>
                              setEditingTask({
                                ...editingTask,
                                title: e.target.value,
                              })
                            }
                            className="w-full bg-gray-700 text-white rounded-md px-2 py-1 mb-2"
                          />
                          <textarea
                            value={editingTask.description || ""}
                            onChange={(e) =>
                              setEditingTask({
                                ...editingTask,
                                description: e.target.value,
                              })
                            }
                            className="w-full bg-gray-700 text-white rounded-md px-2 py-1"
                            placeholder="Add description (optional)"
                          />
                          <div className="flex justify-end space-x-2 mt-2">
                            <button
                              onClick={handleTaskSave}
                              className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                            <button
                              onClick={handleTaskCancel}
                              className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                            >
                              <XIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div>
                            <p className="text-white font-medium">{task.title}</p>
                            {task.description && (
                              <p className="text-gray-400 text-sm">
                                {task.description}
                              </p>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleTaskEdit(task)}
                              className="text-blue-400 hover:text-blue-300"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => onTaskDelete(task.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};