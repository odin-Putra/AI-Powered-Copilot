import React, { createContext, useContext, useState, ReactNode } from 'react';


export type UserRole = 'student' | 'hr' | null;

interface ResumeData {
  name: string;
  email: string;
  skills: string[];
  experience: string;
  summary?: string;
  rawText?: string;
  authenticityFeedback?: string;
  suggestedRoles?: string[];
  learningResources?: {
    title: string;
    url: string;
    platform: string;
  }[];
  scores?: {
    fit: number;
    authenticity: number;
    clarity: number;
    impact: number;
    relevance: number;
  };
}

interface AppContextType {
  user: any; // authentication removed
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  resumeData: ResumeData | null;
  setResumeData: (data: ResumeData | null) => void;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRoleState] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem('userRole');
    return (savedRole as UserRole) || null;
  });
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);

  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
    if (role) {
      localStorage.setItem('userRole', role);
    } else {
      localStorage.removeItem('userRole');
    }
  };


  return (
    <AppContext.Provider value={{ user, userRole, setUserRole, resumeData, setResumeData, loading }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
