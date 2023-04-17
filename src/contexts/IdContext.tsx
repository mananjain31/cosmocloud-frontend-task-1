import { createContext, ReactNode } from "react";
import useIncrementedId from "../hooks/useIncrementedId";

const IDContext = createContext<undefined | (() => number)>(undefined);

const IDContextProvider = ({ children }: { children: ReactNode }) => {
  const getId = useIncrementedId();
  return <IDContext.Provider value={getId}>{children}</IDContext.Provider>;
};

export { IDContext, IDContextProvider };
