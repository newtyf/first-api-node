const mongoose = require('mongoose');

const dbConnect = () => {
  const DB_URI = process.env.DB_URI;
  mongoose.connect(DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, res) => {
      if (!err) {
        console.log('***** Connection established *****');
      } else {
        console.log('***** Connection error *****');
        console.error(err)
      }
    })
}
module.exports = dbConnect;