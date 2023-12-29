import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import File from "../models/File";
import { IFile } from "../libs/types";

export const upload = async (req: any, res: any) => {
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

export const getFileDetails = async (req: any, res: any) => {
  try {
    const id = req.params.id;
    const file = await File.findById(id);

    if (!file) {
      return res.status(404).json({ msg: "File does not exist" });
    }

    const { filename, format, sizeInBytes } = file;

    return res.status(200).json({
      name: filename,
      sizeInBytes: sizeInBytes,
      format: format,
      id,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
};
