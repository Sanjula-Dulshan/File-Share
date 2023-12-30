import React, { FunctionComponent } from "react";

export const DownloadFile: FunctionComponent<{ downloadPageLink: string }> = ({
  downloadPageLink,
}) => {
  return (
    <div className="p-1">
      <div className="flex space-x-3 mt-3">
        <a href={downloadPageLink} target="_blank" className="break-all">
          {downloadPageLink}
        </a>
        <img
          src="/images/copy.png"
          alt=""
          className="object-contain w-8 h-8 cursor-pointer"
          onClick={() => navigator.clipboard.writeText(downloadPageLink)}
        />
      </div>
    </div>
  );
};
