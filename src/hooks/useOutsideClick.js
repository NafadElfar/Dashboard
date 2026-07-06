import { useEffect, useRef } from "react";

import React from "react";

const useOutsideClick = (handler) => {
  const ref = useRef();
  useEffect(() => {
    function handeClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }

    document.addEventListener("click", handeClick, true);

    return () => {
      document.removeEventListener("click", handeClick, true);
    };
  }, [handler]);

  return ref;
};

export default useOutsideClick;
