import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Slider = forwardRef(({ 
  className, 
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  ...props 
}, ref) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium text-text-primary">
            {label}
          </label>
          <span className="text-sm text-text-secondary">{value}</span>
        </div>
      )}
      <div className="relative">
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
          className={cn(
            "w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer slider",
            className
          )}
          style={{
            background: `linear-gradient(to right, #6366F1 0%, #8B5CF6 ${percentage}%, #1E1B4B ${percentage}%, #1E1B4B 100%)`
          }}
          {...props}
        />
        <style jsx>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
          }
          .slider::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
            cursor: pointer;
            border: none;
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
          }
        `}</style>
      </div>
    </div>
  );
});

Slider.displayName = "Slider";

export default Slider;