import mongoose from 'mongoose';
import { Password } from '../services/Password';

// Interface that describe the properties for creating a user
interface UserAttrs {
    name: string;
    plan?: string;
    email: string;
    imageUrl: string;
    userName: string;
    password: string;
}

// Interface that describes the properties that user model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

// Interface that describes that a properite a user document has
interface UserDoc extends mongoose.Document {
    name: string;
    plan?: string;
    email: string;
    imageUrl: string;
    userName: string;
    password: string;
}

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        userName: {
            type: String,
            required: true,
        },

        plan: {
            type: String,
        },

        email: {
            type: String,
            required: true,
        },

        imageUrl: {
            type: String,
            required: true,
        },

        password: {
            type: String,
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

userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
