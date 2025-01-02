import React from "react";
import { Slider } from "../ui/slider";
import SettingsField from "./SettingsField";

interface SliderFieldProps {
  label: string;
  tooltip: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
}

const SliderField = ({
  label,
  tooltip,
  value,
  onChange,
  min,
  max,
  step,
}: SliderFieldProps) => {
  return (
    <SettingsField label={`${label} (${value})`} tooltip={tooltip}>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([val]) => onChange(val)}
        className="my-4"
      />
    </SettingsField>
  );
};

export default SliderField;