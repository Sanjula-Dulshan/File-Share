import { DropZone } from "@/components/DropZone";
import { RenderFile } from "@/components/RenderFile";
import axios from "axios";
import { useState } from "react";
import { UPLOAD_STATE } from "../../libs/types";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [id, setId] = useState(null);
  const [uploadState, setUploadState] = useState<UPLOAD_STATE>(
    UPLOAD_STATE.UPLOAD
  );
  let downloadPageLink;

  const handleUpload = async () => {
    if (uploadState === UPLOAD_STATE.UPLOADING) return;
    setUploadState(UPLOAD_STATE.UPLOADING);
    const formData = new FormData();
    if (file) {
      formData.append("myFile", file);
    }
    try {
      const { data } = await axios({
        method: "post",
        data: formData,
        url: "api/files/upload",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setId(data.id);
      downloadPageLink = `${window.location.origin}/download/${data.id}`;
      console.log(downloadPageLink);
      setUploadState(UPLOAD_STATE.UPLOADED);
    } catch (error: any) {
      console.log("error ", error.response.data);
      setUploadState(UPLOAD_STATE.UPLOAD_FAILED);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="my-4 text-3xl">Got a File? Share it with your friends!</h1>

      <div className="flex flex-col items-center justify-center bg-gray-800 shadow-xl w-96 rounded-xl">
        <DropZone setFile={setFile} />

        {file && (
          <RenderFile
            file={{
              name: file?.name,
              format: file?.type.split("/")[1],
              sizeInBytes: file.size,
            }}
          />
        )}
        <button
          className="p-2 my-5 bg-gray-900 rounded-md w-44"
          onClick={handleUpload}
        >
          {uploadState}
        </button>
      </div>
    </div>
  );
}
