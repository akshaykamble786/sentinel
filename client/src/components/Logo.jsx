import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="size-8 rounded-xs bg-primary flex items-center justify-center">
        <div className="size-4 rounded-sm bg-primary-foreground"></div>
      </div>
      <div className="grid flex-1 ml-1 text-left text-sm leading-tight">
        <Link to="/">
          <span className="truncate font-medium text-2xl">Sentinel</span>
        </Link>
      </div>
    </div>
  );
};

export default Logo;

