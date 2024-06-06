import mongoose from 'mongoose';

// Interface that describe the properties for creating a user
interface TransactionsAttrs {
    type: 'Debit' | 'Credit';
    userId: string;
    amount: number;
}

// Interface that describes the properties that user model has
interface TransactionsModel extends mongoose.Model<TransactionsDoc> {
    build(attrs: TransactionsAttrs): TransactionsDoc;
}

// Interface that describes that a properite a user document has
interface TransactionsDoc extends mongoose.Document {
    type: 'Debit' | 'Credit';
    userId: string;
    amount: number;
}

const TransactionsSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
        },

        userId: {
            type: String,
            required: true,
        },

        amount: {
            type: Number,
            required: true,
        },
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

TransactionsSchema.statics.build = (attrs: TransactionsAttrs) => {
    return new Transactions(attrs);
};

const Transactions = mongoose.model<TransactionsDoc, TransactionsModel>('Transactions', TransactionsSchema);

export { Transactions };
