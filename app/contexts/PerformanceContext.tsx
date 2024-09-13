'use client'
// contexts/GlobalContext.tsx
import React, { createContext, useState, ReactNode, FC } from 'react';

// Define the shape of the context value
interface PerformanceContextType  {
  performancePercentage: number;
  setPerformancePercentage: (percentage: number) => void;
  repetitions: number;
  setRepetitions: (rep: number) => void;
}

// Create a Context with an initial undefined value
const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

// Create a Provider Component
const PerformanceProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [performancePercentage, setPerformancePercentage] = useState<number>(0);
  const [repetitions, setRepetitions] = useState<number>(0);

  return (
    <PerformanceContext.Provider value={{ performancePercentage, setPerformancePercentage, repetitions, setRepetitions }}>
      {children}
    </PerformanceContext.Provider>
  );
};

export { PerformanceContext, PerformanceProvider };

