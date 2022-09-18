const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete')

const TracksSchema = new mongoose.Schema(
  {
    name: {
      type:String
    },
    album: {
      type:String
    },
    cover: {
      type:String,
      validate: {
        validator: (req) => {
          if (req.includes('https') || req.includes('http')) {
            return true;
          } else {
            return false
          }
        },
        message: "ERROR_URL",
      }
    },
    artist: {
      name: {
        type:String,
      },
      nickname: {
        type:String,
      },
      nationality: {
        type:String,
      },

    },
    duration: {
      start: {
        type:Number,
      },
      end: {
        type:Number,
      }
    },
    mediaId: {
      type: mongoose.Types.ObjectId,
    },
  },
  {
    timestamps: true, // TODO createAt, updateAt
    versionKey: false,
  }
)

TracksSchema.plugin(mongooseDelete, {overrideMethods: 'all'});
module.exports = mongoose.model("tracks", TracksSchema)