export interface IFile {
  filename: string;
  secure_url: string;
  format: string;
  sizeInBytes: string;
  sender?: string;
  receiver?: string;
}
