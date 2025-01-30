import mongoose from 'mongoose';
import { encrypt } from '../utils/encryption';
import { renderMailHtml, sendMail } from '../utils/mail/mail';
import { CLIENT_HOST, EMAIL_SMTP_USER } from '../utils/env';

export interface User {
    fullName: string;
    username: string;
    email: string;
    password: string;
    role: string;
    profilePicture: string;
    isActived: boolean;
    activationCode: string;
    createdAt?: string,
}

const Schema = mongoose.Schema;

const UserSchema = new Schema<User>({
    fullName: {
        type: Schema.Types.String,
        required: true
    },
    username: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true
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
});

UserSchema.pre("save", function (next) {
    const self = this;
    self.password = encrypt(self.password);
    self.activationCode = encrypt(self.id);
    next();
});

UserSchema.post("save", async function (doc, next) {
    try {
        const user = doc;
        
        const contentMail = await renderMailHtml("registration-success.ejs", {
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            createdAt: user.createdAt,
            activationLink: `${CLIENT_HOST}/auth/activation?code=${user.activationCode}`,
        });
    
        await sendMail({
            from: EMAIL_SMTP_USER,
            to: user.email,
            subject: "Aktivasi Akun Anda",
            html: contentMail,
        });
    } catch (error) {
        console.log("error > ", error);
    } finally {
        next();
    }
});

UserSchema.methods.toJSON = function () {
    const self = this.toObject();
    delete self.password;
    return self;
};

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;