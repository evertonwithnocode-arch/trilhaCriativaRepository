import React, { useState } from 'react';

interface FilterDropdownProps {
  onFilterChange: (filter: string) => void;
  className?: string;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({ onFilterChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Todas as idades');

  const filterOptions = [
    'Todas as idades',
    '0-5 anos',
    '6-10 anos',
    '11-15 anos',
    '16+ anos'
  ];

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    onFilterChange(filter);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-[248px] h-12 justify-between items-center bg-white pl-4 pr-3 py-2 rounded-xl border-4 border-solid border-[#FEF9E5] hover:bg-gray-50 transition-colors"
      >
        <span className="text-[#2C2623] text-center text-base font-bold leading-5 tracking-[0.16px]">
          {selectedFilter}
        </span>
        <div className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 7.5L10 12.5L15 7.5" stroke="#F7B34D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </div>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-[#FEF9E5] rounded-xl shadow-lg z-10">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => handleFilterSelect(option)}
              className="w-full px-4 py-3 text-left text-[#2C2623] hover:bg-[#FEF9E5] transition-colors first:rounded-t-xl last:rounded-b-xl"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
