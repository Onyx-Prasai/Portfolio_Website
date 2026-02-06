import mongoose, { Schema, Document } from 'mongoose';

export interface IConference extends Document {
    name: string;
    date?: string;
    description?: string;
    link?: string;
}

const ConferenceSchema: Schema = new Schema({
    name: { type: String, required: true },
    date: { type: String },
    description: { type: String },
    link: { type: String },
}, { timestamps: true });

export default mongoose.model<IConference>('Conference', ConferenceSchema);
