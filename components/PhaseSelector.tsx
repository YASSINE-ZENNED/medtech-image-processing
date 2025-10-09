
import React from 'react';
import { ProcessingPhase } from '../types';

interface PhaseSelectorProps {
  selectedPhase: ProcessingPhase;
  onPhaseChange: (phase: ProcessingPhase) => void;
}

const PhaseOption: React.FC<{
  value: ProcessingPhase;
  label: string;
  description: string;
  isSelected: boolean;
  onChange: (value: ProcessingPhase) => void;
}> = ({ value, label, description, isSelected, onChange }) => (
  <label
    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
      isSelected
        ? 'bg-blue-50 border-brand-blue ring-2 ring-brand-blue'
        : 'bg-white border-brand-gray-200 hover:border-brand-gray-300'
    }`}
  >
    <input
      type="radio"
      name="phase"
      value={value}
      checked={isSelected}
      onChange={() => onChange(value)}
      className="h-4 w-4 text-brand-blue focus:ring-brand-blue border-gray-300"
    />
    <div className="ml-4">
      <span className="block text-sm font-medium text-brand-gray-900">{label}</span>
      <span className="block text-xs text-gray-500">{description}</span>
    </div>
  </label>
);

export const PhaseSelector: React.FC<PhaseSelectorProps> = ({ selectedPhase, onPhaseChange }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <PhaseOption
        value={ProcessingPhase.Arterial}
        label="Arterial Phase"
        description="Simulates increased contrast."
        isSelected={selectedPhase === ProcessingPhase.Arterial}
        onChange={onPhaseChange}
      />
      <PhaseOption
        value={ProcessingPhase.Venous}
        label="Venous Phase"
        description="Simulates Gaussian smoothing."
        isSelected={selectedPhase === ProcessingPhase.Venous}
        onChange={onPhaseChange}
      />
    </div>
  );
};
