
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center space-x-3">
          <svg className="w-8 h-8 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 01-6.23-.693L4.2 15.3m15.6 0-1.57.393m0 0A9.065 9.065 0 0112 15a9.065 9.065 0 01-6.23-.693m7.43-9.094A24.301 24.301 0 0112 3.104a24.301 24.301 0 01-3.23.082m6.46 0A24.301 24.301 0 0012 3.104a24.301 24.301 0 00-3.23.082"></path></svg>
          <h1 className="text-2xl font-bold text-brand-gray-900 tracking-tight">
            Surgical Planning Simulation
          </h1>
        </div>
      </div>
    </header>
  );
};
