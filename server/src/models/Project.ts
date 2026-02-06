import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
    title: string;
    description: string;
    tags: string[];
    githubLink?: string;
    demoLink?: string;
    image?: string;
}

const ProjectSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], default: [] },
    githubLink: { type: String },
    demoLink: { type: String },
    image: { type: String },
}, { timestamps: true });

export default mongoose.model<IProject>('Project', ProjectSchema);
