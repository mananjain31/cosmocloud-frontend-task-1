import { ReactNode } from "react";
import { IDContextProvider } from "./IdContext";

export default function Providers({ children }: { children: ReactNode }) {
  return <IDContextProvider>{children}</IDContextProvider>;
}
