import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User';

export interface IComment {
  user: Schema.Types.ObjectId | IUser;
  text: string;
  createdAt: Date;
}

export interface IImage extends Document {
  caption: string;
  image: {
    data: Buffer;
    contentType: string;
  };
  uploaderId: Schema.Types.ObjectId | IUser;
  likes: (Schema.Types.ObjectId | IUser)[];
  comments: IComment[];
  createdAt: Date;
}

const imageSchema = new Schema({
  caption: {
    type: String,
    required: true
  },
  image: {
    data: Buffer,
    contentType: String
  },
  uploaderId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    text: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IImage>('Image', imageSchema);