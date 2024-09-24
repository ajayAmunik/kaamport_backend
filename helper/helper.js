let request = require("request")
let jwt = require("jsonwebtoken")
let config = require("../config/auth")

let token = (userId, secreateKey) => {
  const token = jwt.sign(userId, config.secreateKey);

  return token;
};

const generateOTP = () => {
  const min = 1000;
  const max = 9999;

  return Math.floor(Math.random() * (max - min + 1)) + min;
};


let signupOtp = async (phoneNumber, otp) => {
    try {
      console.log(phoneNumber, otp);
      var options = {
        method: "GET",
        url: `https://2factor.in/API/V1/7f079577-8a95-11ee-8cbb-0200cd936042/SMS/+91${phoneNumber}/${otp}/:Login`,
        headers:{
            "content-type": "application/x-www-form-urlencoded"
        },
        form: {},
      };   
      request(options, async (error, response, body) => {
        if (error) {
          throw new Error(error); 
        }
      });
    } catch (err) {
      console.error("Error occurred while sending OTP:", err.message);
    }
  };

const createToken = (phoneNumber, userId) => {

    let tokenId = {id:userId, phoneNumber: phoneNumber}
    return jwt.sign(tokenId, config.secretKey);
  };


  let date = () => {
    currentTime = new Date();
  
    let year = currentTime.getFullYear();
  
    let getMonth = currentTime.getMonth() + 1;
  
    let month = ("0" + getMonth).slice(-2);
  
    let date = ("0" + currentTime.getDate()).slice(-2);
  
    return `${year}-${month}-${date}`;
  };

  const s3FileUpload = (file) => {
    let fileName = Date.now() + "_" + file.originalname;
    // replace spaces with _
    fileName = fileName.replace(/\s+/g, '_');
    console.log(fileName);
    
  
    const s3 = new S3Client({
      credentials: {
        accessKeyId: authorizationValues.accessKeyId,
        secretAccessKey: authorizationValues.secretAccessKey,
      },
      region: authorizationValues.region,
    });
  
    const params = {
      Bucket: authorizationValues.bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
  
    let command = new PutObjectCommand(params);
  
    s3.send(command);
  
    return fileName;
  };

  const s3PDFUpload = async (fileName) => {
    let pdfName = Date.now() + "_" + fileName;
  
    const s3 = new S3Client({
      credentials: {
        accessKeyId: authorizationValues.accessKeyId,
  
        secretAccessKey: authorizationValues.secretAccessKey,
      },
  
      region: authorizationValues.region,
    });
    const fileContent = fs.readFileSync(fileName);
  
    const params = {
      Bucket: authorizationValues.bucketName,
  
      Key: pdfName,
  
      Body: fileContent,
  
      ContentType: "application/pdf", // Set the appropriate MIME type for PDF
    };
  
    const command = new PutObjectCommand(params);
  
    try {
      await s3.send(command);
  
      return pdfName; // Return the uploaded file name
    } catch (err) {
      console.error("Error uploading to S3:", err);
  
      throw err;
    }
  };
  
  
  module.exports = {
    generateOTP,
    signupOtp,
    createToken,
    date,
    s3PDFUpload,
    token
  };