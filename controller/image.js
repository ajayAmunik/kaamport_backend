
let image = async (req, res) => {
  
    if (!req.file) {
      return res.status(200).send({
        responseCode:400,
        message: "No file provided",
      });
    }
  
    try {
      let fileName = await helper.s3FileUpload(req.file);
      res.status(200).send({
        imagePath1:` https://mrsasta.s3.eu-north-1.amazonaws.com/${fileName}`,
        imagePath: fileName,
      });
    } catch (error) {
      console.error(error, "Error uploading to S3");
      res.status(500).send({
        message: "Server error",
        error: error.message,
      });
    }
  };
  