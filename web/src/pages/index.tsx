import { DropZone } from "@/components/DropZone";
import { RenderFile } from "@/components/RenderFile";
import axios from "axios";
import { useState } from "react";
import { UPLOAD_STATE } from "../../libs/types";
import { DownloadFile } from "@/components/DownloadFile";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [id, setId] = useState(null);
  const [downloadPageLink, setDownloadPageLink] = useState("");

  const [uploadState, setUploadState] = useState<UPLOAD_STATE>(
    UPLOAD_STATE.UPLOAD
  );

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
      setDownloadPageLink(`${window.location.origin}/download/${data.id}`);
      setUploadState(UPLOAD_STATE.UPLOADED);
    } catch (error: any) {
      console.log("error ", error.response.data);
      setUploadState(UPLOAD_STATE.UPLOAD_FAILED);
    }
  };

  const resetComponent = () => {
    setFile(null);
    setDownloadPageLink("");
    setUploadState(UPLOAD_STATE.UPLOAD);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="my-4 text-3xl">Got a File? Share it with your friends!</h1>

      <div className="flex flex-col items-center justify-center bg-gray-800 shadow-xl w-96 rounded-xl">
        {!downloadPageLink && <DropZone setFile={setFile} />}
        {file && (
          <RenderFile
            file={{
              name: file?.name,
              format: file?.type.split("/")[1],
              sizeInBytes: file.size,
            }}
          />
        )}
        {!downloadPageLink && (
          <button className="button" onClick={handleUpload}>
            {uploadState}
          </button>
        )}
        {downloadPageLink && (
          <div className="p-2 text-center">
            <DownloadFile downloadPageLink={downloadPageLink} />
            <button className="button" onClick={resetComponent}>
              Upload New File
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
