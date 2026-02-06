import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
    title: string;
    year: string;
    description: string;
    organization?: string;
}

const ExperienceSchema: Schema = new Schema({
    title: { type: String, required: true },
    year: { type: String, required: true },
    description: { type: String, required: true },
    organization: { type: String },
}, { timestamps: true });

export default mongoose.model<IExperience>('Experience', ExperienceSchema);
