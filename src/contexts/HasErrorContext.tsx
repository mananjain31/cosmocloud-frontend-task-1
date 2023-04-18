import { ReactNode, createContext, useState } from "react";

export interface HasErrorContextProps {
  hasError: boolean;
  setHasError: (hasError: boolean) => void;
}

const hasErrorContext = createContext<HasErrorContextProps>({
  hasError: false,
  setHasError: () => {},
});

const HasErrorContextProvider = ({ children }: { children: ReactNode }) => {
  const [hasError, setHasError] = useState(false);
  return (
    <hasErrorContext.Provider value={{ hasError, setHasError }}>
      {children}
    </hasErrorContext.Provider>
  );
};

export { hasErrorContext, HasErrorContextProvider };
