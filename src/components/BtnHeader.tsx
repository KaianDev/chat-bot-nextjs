import React, { ReactNode } from "react";

export const BtnHeader = ({ children }: { children: ReactNode }) => {
    return <div className=" cursor-pointer text-[25px]">{children}</div>;
};
