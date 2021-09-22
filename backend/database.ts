import mongoose from "mongoose";
const dbUri = `mongodb://root:1234@db:27017/dev?authSource=admin`
const connection = mongoose.connect(dbUri);

connection
  .then((db) => console.log('Database connected!'))
  .catch((err) => console.log(err));

export default connection;
