import React, { FunctionComponent } from "react";
import { IFile } from "../../libs/types";

export const RenderFile: FunctionComponent<{ file: IFile }> = ({
  file: { format, name, sizeInBytes },
}) => {
  return (
    <div>
      <img src={`/images/${format}`} alt="" />
      <span>{name}</span>
      <span>{sizeInBytes}</span>
    </div>
  );
};
