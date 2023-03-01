import React from "react";
import { transform } from "typescript";

const UnfollowButton = () => {
    return (
        <button className="w-1/2 rounded-full h-1/3 bg-lblue text-lgrey hover:bg-navy after:bg-navy" > 
            Following
        </button>
    );
};
export default UnfollowButton;