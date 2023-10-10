// const mongoose = require("mongoose");
// const { createReadStream } = require("fs");
// const { GridFSBucket } = require("mongodb");

// const storeFile = async (filename, stream) => {
//   const bucket = new GridFSBucket(mongoose.connection.db, {
//     bucketName: "files", // Use a bucket named "files"
//   });

//   const uploadStream = bucket.openUploadStream(filename);
//   await new Promise((resolve, reject) => {
//     stream.pipe(uploadStream).on("finish", resolve).on("error", reject);
//   });

//   return uploadStream.id;
// };

// const getFileStream = (fileId) => {
//   const bucket = new GridFSBucket(mongoose.connection.db, {
//     bucketName: "files",
//   });

//   return bucket.openDownloadStream(fileId);
// };

// module.exports = { storeFile, getFileStream };
