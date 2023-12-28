export const Upload = async (req: any, res: any) => {
  console.log("test");
  try {
    if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

    console.log(req.file);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
};
