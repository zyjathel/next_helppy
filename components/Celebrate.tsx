import { FC, useEffect, useRef } from "react";
import party from "party-js";

export const Celebrate: FC<{ show: boolean }> = ({ show }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    if (!show) return;
    console.log(1234);
    party.confetti(ref.current);
  }, [show]);
  return <div ref={ref} className="absolute h-full w-full top-0 left-0"></div>;
};
