import { useState, useEffect, useRef } from "react";

const useClickOutside = (initialState = false) => {
  const [isActive, setIsActive] = useState(initialState);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setIsActive(false);
      }
    };

    if (isActive) {
      window.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isActive]);

  return { isActive, setIsActive, containerRef };
};

export default useClickOutside;