export interface IFile {
  name: string;
  sizeInBytes: number;
  format: string;
  id?: string;
}

export enum UPLOAD_STATE {
  UPLOAD = "Upload",
  UPLOADING = "Uploading",
  UPLOAD_FAILED = "Upload Failed",
  UPLOADED = "Uploaded",
}
