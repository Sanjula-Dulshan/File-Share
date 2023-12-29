import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import File from "../models/File";
import { IFile } from "../libs/types";
export const Upload = async (req: any, res: any) => {
  console.log("test");
  try {
    if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

    console.log(req.file);

    let uploadedFile: UploadApiResponse;

    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "File Share",
        resource_type: "auto",
      });

      const { secure_url, bytes, format } = uploadedFile;
      const { originalname } = req.file;

      const fileData: IFile = {
        filename: originalname,
        secure_url,
        format,
        sizeInBytes: bytes.toString(),
      };
      const file = await File.create(fileData);
      res.status(200).json({
        id: file._id,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Cloudinary Error" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
};
