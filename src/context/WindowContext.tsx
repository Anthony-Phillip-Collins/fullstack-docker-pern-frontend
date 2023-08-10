import { createContext, useCallback, useEffect, useState } from 'react';
import theme from '../styles/theme';

export interface WindowContextType {
  clientWidth: number;
  clientHeight: number;
  isMobileWidth: boolean;
}

export const WindowContext = createContext<WindowContextType>({
  clientWidth: 0,
  clientHeight: 0,
  isMobileWidth: false,
});

interface WindowContextProviderProps {
  children: React.ReactNode;
}
export const WindowContextProvider = ({ children }: WindowContextProviderProps) => {
  const [clientWidth, setClientWidth] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const [isMobileWidth, setIsMobileWidth] = useState(false);

  const onResize = useCallback(() => {
    const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;
    setClientWidth(clientWidth);
    setClientHeight(clientHeight);
    setIsMobileWidth(clientWidth <= theme.breakpoints.md);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  });

  useEffect(() => {
    onResize();
  }, [onResize]);

  return (
    <WindowContext.Provider value={{ clientWidth, clientHeight, isMobileWidth }}>{children}</WindowContext.Provider>
  );
};

export default WindowContext;
