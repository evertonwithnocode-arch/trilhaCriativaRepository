import React, { useState } from 'react';

interface SearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ 
  onSearch, 
  placeholder = "Buscar paciente...", 
  className = '' 
}) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className={`flex w-[688px] h-12 items-center gap-2 bg-[#FEF2CC] p-4 rounded-2xl max-md:w-[calc(100%_-_320px)] max-sm:w-[calc(100%_-_40px)] ${className}`}>
      <div className="flex items-center gap-2 flex-[1_0_0]">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full bg-transparent text-[#BB9205] text-base font-medium leading-5 tracking-[0.16px] placeholder:text-[#BB9205] outline-none"
        />
      </div>
    </div>
  );
};
