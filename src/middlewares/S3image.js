const  ENV  = require("../constants/constants");
const path = require('path');
const fs = require('fs');
const AWS = require('aws-sdk');
exports.imageS3 = async (image)=>{
const s3 =  new AWS.S3({accessKeyId: ENV.S3_IdKey, secretAccessKey: ENV.S3_SecretKey});
const fileContent = fs.createReadStream(path.join(__dirname, '../images/' + image.filename));

const params = {
    Bucket: ENV.MyBucketName,//NOMBRE bucket s3
    Body: fileContent, 
    Key: image.originalname,
    ContentType: "image/JPG" // File name you want to save as in S3
};

return s3.upload(params).promise()
.then(data => {
    return data
})
.catch((err)=>{
 throw err;
})
}

  
