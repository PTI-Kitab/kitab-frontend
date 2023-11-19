import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ResetScroll = () => {
  const path = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  return <></>;
};

export default ResetScroll;
