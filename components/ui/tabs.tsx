import React, { ReactNode, useState } from 'react';

interface TabsProps {
  children: ReactNode | ((activeTab: string, handleTabChange: (value: string) => void) => ReactNode); // Allowing both ReactNode and function
  defaultValue: string; 
  onValueChange: (value: string) => void;
  className?: string;
}

interface TabsContentProps {
  value: string;
  children: ReactNode;
}

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  onClick?: () => void;
}

export function Tabs({ children, defaultValue, onValueChange, className }: TabsProps) {
  // Manage active tab state
  const [activeTab, setActiveTab] = useState(defaultValue);

  const handleValueChange = (value: string) => {
    setActiveTab(value);
    onValueChange(value); 
  };

  // Check if children is a function
  const childrenNodes = typeof children === 'function' ? children(activeTab, handleValueChange) : children;

  return <div className={className}>{childrenNodes}</div>;
}

export function TabsList({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

export function TabsTrigger({ value, children, onClick }: TabsTriggerProps) {
  return (
    <button
      onClick={onClick}
      data-value={value}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }: TabsContentProps) {
  return (
    <div data-value={value}>
      {children}
    </div>
  );
}
