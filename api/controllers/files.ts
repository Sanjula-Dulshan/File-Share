import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import File from "../models/File";
import { IFile } from "../libs/types";
import https from "https";
import nodemailer from "nodemailer";
import { sizeInMb } from "../libs/sizeInMb";
import emailTemplate from "../utils/emailTemplate";
import Mail from "nodemailer/lib/mailer";

export const upload = async (req: any, res: any) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

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
      res.status(500).json({ message: "Cloudinary Error" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getFileDetails = async (req: any, res: any) => {
  try {
    const id = req.params.id;
    const file = await File.findById(id);

    if (!file) {
      return res.status(404).json({ message: "File does not exist" });
    }

    const { filename, format, sizeInBytes } = file;

    return res.status(200).json({
      name: filename,
      sizeInBytes: sizeInBytes,
      format: format,
      id,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const downloadFile = async (req: any, res: any) => {
  try {
    const id = req.params.id;
    const file = await File.findById(id);

    if (!file) {
      return res.status(404).json({ message: "File does not exist" });
    }

    https.get(file.secure_url, (fileStream) => fileStream.pipe(res));
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const sendEmail = async (req: any, res: any) => {
  const { id, emailFrom, emailTo, clientOrigin } = req.body;

  if (!id || !emailFrom || !emailTo)
    return res.status(400).json({ message: "All fields are required" });

  const file = await File.findById(id);

  if (!file) {
    return res.status(400).json({ message: "File does not exist" });
  }

  if (file.sender) {
    return res.status(400).json({ message: "File is already sent" });
  }

  const transporter = nodemailer.createTransport({
    //@ts-ignore
    host: process.env.SENDINBLUE_SMTP_HOST!,
    port: process.env.SENDINBLUE_SMTP_PORT,
    auth: {
      user: process.env.SENDINBLUE_SMTP_USER,
      pass: process.env.SENDINBLUE_SMTP_PASSWORD,
    },
  });

  const { filename, sizeInBytes } = file;
  const fileSize = sizeInMb(Number(sizeInBytes));
  const downloadpageLink = `${clientOrigin}/download/${id}`;

  const MailOptions: Mail.Options = {
    from: emailFrom,
    to: emailTo,
    subject: "File shared with you", // Subject line
    text: `${emailFrom} shared a file with you`,
    html: emailTemplate(emailFrom, downloadpageLink, filename, fileSize), // html body
  };

  transporter.sendMail(MailOptions, async (error) => {
    if (error) {
      return res.status(500).json({
        message: "Server error",
      });
    }

    file.sender = emailFrom;
    file.receiver = emailTo;

    await file.save();

    return res.status(200).json({ message: "Email sent" });
  });
};
