import React, { FunctionComponent } from "react";

export const DownloadFile: FunctionComponent<{ downloadPageLink: string }> = ({
  downloadPageLink,
}) => {
  return (
    <div className="p-1">
      <h1 className="my-2 text-lg font-medium">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia iusto
      </h1>
      <div className="flex space-x-3">
        <span className="break-all">{downloadPageLink}</span>
        <img
          src="/images/copy.png"
          alt=""
          className="object-contain w-8 h-8 cursor-pointer"
        />
      </div>
    </div>
  );
};
