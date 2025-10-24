export interface Image {
    _id: string;
    uploaderId: string;
    imageUrl: string;
    caption: string;
    uploadDate: Date;
    likes: string[];
    comments: string[];
}

import mongoose, { Schema } from 'mongoose';

const imageSchema = new Schema<Image>({
    uploaderId: { type: String, required: true },
    imageUrl: { type: String, required: true },
    caption: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now },
    likes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
});

const ImageModel = mongoose.model<Image>('Image', imageSchema);

export default ImageModel;