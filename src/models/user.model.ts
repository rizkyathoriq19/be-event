import mongoose from 'mongoose';
import { encrypt } from '../utils/encryption';

export interface User {
    fullName: string;
    username: string;
    email: string;
    password: string;
    role: string;
    profilePicture: string;
    isActived: boolean;
    activationCode: string;
}

const Schema = mongoose.Schema;

const UserSchema = new Schema<User>({
    fullName: {
        type: Schema.Types.String,
        required: true
    },
    username: {
        type: Schema.Types.String,
        required: true
    },
    email: {
        type: Schema.Types.String,
        required: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    role: {
        type: Schema.Types.String,
        enum: ["admin", "user"],
        default: "user"
    },
    profilePicture: {
        type: Schema.Types.String,
        default: "user.jpg"
    },
    isActived: {
        type: Schema.Types.Boolean,
        default: false
    },
    activationCode: {
        type: Schema.Types.String,
    }
}, {
    timestamps: true
})

UserSchema.pre("save", function (next) {
    const self = this;
    self.password = encrypt(self.password);
    next();
})

UserSchema.methods.toJSON = function () {
    const self = this.toObject();
    delete self.password;
    return self;
}

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;