import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
    name: string;
    category: string; // e.g., 'Frontend', 'Backend', 'Tools'
    level?: number; // 1-100
    icon?: string;
}

const SkillSchema: Schema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    level: { type: Number, min: 1, max: 100 },
    icon: { type: String },
}, { timestamps: true });

export default mongoose.model<ISkill>('Skill', SkillSchema);
