import mongoose from 'mongoose';

// Interface that describe the properties for creating a user
interface PlanAttrs {
    name: 'premium' | 'basic';
    amount: number;
    userId: String;
}

// Interface that describes the properties that user model has
interface PlanModel extends mongoose.Model<PlanDoc> {
    build(attrs: PlanAttrs): PlanDoc;
}

// Interface that describes that a properite a user document has
interface PlanDoc extends mongoose.Document {
    name: 'premium' | 'basic';
    amount: number;
    userId: String;
}

const planSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        userId: [
            {
                type: String,
            },
        ],
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
                delete ret.__v;
            },
        },
    }
);

planSchema.statics.build = (attrs: PlanAttrs) => {
    return new Plan(attrs);
};

const Plan = mongoose.model<PlanDoc, PlanModel>('Plan', planSchema);

export { Plan };
