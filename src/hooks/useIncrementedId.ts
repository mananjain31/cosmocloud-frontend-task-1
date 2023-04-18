import { useCallback } from "react";

export default function useIncrementedId() {
  let id = 100;
  const getID = useCallback(() => {
    id++;
    return id;
  }, []);
  return getID;
}
