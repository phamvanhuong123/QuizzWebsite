import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { ApiTopic } from "@/types/api.types";

interface TopicFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<ApiTopic, "id">) => void;
  initialData?: ApiTopic | null;
}

const TopicFormModal: React.FC<TopicFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    abridger: "",
    description: "",
    durationHours: 0,
    durationMinutes: 0,
  });

  const [errors, setErrors] = useState({
    durationHours: "",
    durationMinutes: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        abridger: initialData.abridger,
        description: initialData.description,
        durationHours: initialData.durationHours,
        durationMinutes: initialData.durationMinutes,
      });
    } else {
      setFormData({
        name: "",
        abridger: "",
        description: "",
        durationHours: 0,
        durationMinutes: 0,
      });
    }
    setErrors({ durationHours: "", durationMinutes: "" });
  }, [initialData]);

  const validateDuration = (hours: number, minutes: number): boolean => {
    let isValid = true;
    const newErrors = { durationHours: "", durationMinutes: "" };

    if (isNaN(hours) || hours < 0 || !Number.isInteger(hours) || hours > 24) {
      newErrors.durationHours = "Hours must be between 0 and 24, integer";
      isValid = false;
    }
    if (
      isNaN(minutes) ||
      minutes < 0 ||
      !Number.isInteger(minutes) ||
      minutes >= 60
    ) {
      newErrors.durationMinutes = "Minutes must be between 0 and 59, integer";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "durationHours" || name === "durationMinutes") {
      const intValue = parseInt(value, 10);
      const newValue = isNaN(intValue) ? 0 : intValue;
      setFormData((prev) => ({ ...prev, [name]: newValue }));
      if (name === "durationHours") {
        validateDuration(newValue, formData.durationMinutes);
      } else {
        validateDuration(formData.durationHours, newValue);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { durationHours, durationMinutes } = formData;
    if (!validateDuration(durationHours, durationMinutes)) {
      return;
    }
    onSubmit({ ...formData, questionCount: 0 });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {initialData ? "Edit Topic" : "Add New Topic"}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Topic Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none"
              placeholder="e.g. React Hooks"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Abridger (Short code) *
            </label>
            <input
              type="text"
              name="abridger"
              value={formData.abridger}
              onChange={handleChange}
              required
              maxLength={10}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none"
              placeholder="e.g. RH"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none resize-none"
              placeholder="Brief description of the topic..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Duration (Hours)
              </label>
              <input
                type="number"
                name="durationHours"
                value={formData.durationHours}
                onChange={handleChange}
                min="0"
                max="24"
                step="1"
                className={`w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl focus:ring-2 focus:ring-primary/50 outline-none ${
                  errors.durationHours
                    ? "border-red-500"
                    : "border-slate-200 dark:border-slate-700"
                }`}
                placeholder="0-24"
              />
              {errors.durationHours && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.durationHours}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Duration (Minutes)
              </label>
              <input
                type="number"
                name="durationMinutes"
                value={formData.durationMinutes}
                onChange={handleChange}
                min="0"
                max="59"
                step="1"
                className={`w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl focus:ring-2 focus:ring-primary/50 outline-none ${
                  errors.durationMinutes
                    ? "border-red-500"
                    : "border-slate-200 dark:border-slate-700"
                }`}
                placeholder="0-59"
              />
              {errors.durationMinutes && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.durationMinutes}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
            >
              {initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TopicFormModal;
