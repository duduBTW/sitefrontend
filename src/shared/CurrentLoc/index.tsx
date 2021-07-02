import { useState } from "react";

export const useCurrentProvider = () => {
  const [current, setCurrent] = useState<string>("");

  return {
    current,
    setCurrent,
  };
};
