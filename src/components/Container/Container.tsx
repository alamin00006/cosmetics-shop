import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children:React.ReactNode;
  className?:string;
}

const Container = ({ children, className }) => {
  return (
    <div className={twMerge("max-w-[1140px] px-4 py-2 mx-auto",className)}>
        {children}
    </div>
  );
};

export default Container;