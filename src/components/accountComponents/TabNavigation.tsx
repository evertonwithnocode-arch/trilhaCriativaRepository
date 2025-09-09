import React, { useState } from 'react';
import  PersonalInfoForm  from './PersonalInfoForm';
import  TeamPage  from './TeamPage';
import SubscriptionPage from './SubscriptionPage';

interface Tab {
  id: string;
  label: string;
}

interface TabNavigationProps {
  className?: string;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ className = "" }) => {
  const [activeTab, setActiveTab] = useState('pessoal');

  const tabs: Tab[] = [
    { id: 'pessoal', label: 'Pessoal' },
    { id: 'equipe', label: 'Equipe' },
    { id: 'assinatura', label: 'Assinatura' },
  ];

  return (
    <div>
      {/* Navigation Tabs */}
      <div
        className={`flex gap-4 max-md:gap-2 max-md:left-8 max-md:top-[180px] max-sm:overflow-x-auto max-sm:flex-nowrap max-sm:gap-1 max-sm:left-6 max-sm:top-[130px] ${className}`}
        role="tablist"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`${tab.id}-panel`}
            className={`flex w-[248px] h-16 justify-center items-center gap-2 shadow-[0_3px_0_0_#FEF2CC]  rounded-[20px_20px_0_0] border-2 border-solid border-[#FEF2CC] max-md:w-[calc(50%_-_4px)] max-md:h-12 max-md:px-6 max-md:py-4 max-sm:min-w-[120px] max-sm:h-10 max-sm:px-4 max-sm:py-3 transition-colors hover:bg-[#FEF9E5] ${
              activeTab === tab.id ? 'bg-[#FEF2CC]' : 'bg-[#FFFCF2]'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="text-[#2C2623] text-base font-bold leading-5 tracking-[0.16px] overflow-hidden text-ellipsis whitespace-nowrap max-sm:text-sm">
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      {/* Conditional Rendering */}
      <div className="">
        {activeTab === 'pessoal' && <PersonalInfoForm />}
        {activeTab === 'equipe' && <TeamPage />}
        {activeTab === 'assinatura' && <div><SubscriptionPage/></div>}
      </div>
    </div>
  );
};
