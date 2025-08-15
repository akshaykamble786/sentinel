import React from "react";

const Pill = ({ pill }) => {
  return (
    <div className="flex justify-center">
      <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full bg-muted text-primary border">
        <span className="flex h-2 w-2 rounded-full bg-primary"></span>
        {pill}
      </span>
    </div>
  );
};

export default Pill;
