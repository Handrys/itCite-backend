import mongoose from 'mongoose';



const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      /*  type: String, */
      /*      default: [], */
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    categoryPresent: {
      type: String,

    },
    image: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Post', PostSchema);
