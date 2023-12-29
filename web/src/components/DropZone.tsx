import React, { Dispatch, FunctionComponent, useCallback } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";

export const DropZone: FunctionComponent<{ setFile: Dispatch<any> }> = ({
  setFile,
}) => {
  const onDrop = useCallback((acceptedFiles: DropzoneOptions[]) => {
    console.log(acceptedFiles);
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: {
        "image/jpeg": [],
        "image/png": [],
        "audio/mpeg": [],
        "application/pdf": [],
      },
    });
  return (
    <div className="p-4 w-full">
      <div {...getRootProps()} className="w-full h-80">
        <input {...getInputProps()} />
        <div
          className={
            "flex flex-col items-center justify-center h-full space-y-3 border border-dashed border-yellow-600 rounded-xl " +
            (isDragAccept === true ? "border-green-500" : "") +
            (isDragReject === true ? "border-red-400" : "")
          }
        >
          <img src="/images/folder.png" alt="folder" className="w-16 h-16" />
          {isDragReject ? (
            <p>Sorry, This app only supports images, mp3 and pdf</p>
          ) : (
            <>
              <p>Drag & Drop Files Here</p>
              <p className="mt-2 text-base text-gray-300">
                Only jpeg, png,pdf & mp3 files supported
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
