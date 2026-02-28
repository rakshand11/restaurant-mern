import mongoose from "mongoose";
export declare const bookingModel: mongoose.Model<{
    name: string;
    date: string;
    user: mongoose.Types.ObjectId;
    status: "Pending" | "Approved" | "Cancelled";
    contact: number;
    numberOfPeople: string;
    time: string;
    note: string;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    name: string;
    date: string;
    user: mongoose.Types.ObjectId;
    status: "Pending" | "Approved" | "Cancelled";
    contact: number;
    numberOfPeople: string;
    time: string;
    note: string;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    date: string;
    user: mongoose.Types.ObjectId;
    status: "Pending" | "Approved" | "Cancelled";
    contact: number;
    numberOfPeople: string;
    time: string;
    note: string;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    name: string;
    date: string;
    user: mongoose.Types.ObjectId;
    status: "Pending" | "Approved" | "Cancelled";
    contact: number;
    numberOfPeople: string;
    time: string;
    note: string;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    name: string;
    date: string;
    user: mongoose.Types.ObjectId;
    status: "Pending" | "Approved" | "Cancelled";
    contact: number;
    numberOfPeople: string;
    time: string;
    note: string;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    name: string;
    date: string;
    user: mongoose.Types.ObjectId;
    status: "Pending" | "Approved" | "Cancelled";
    contact: number;
    numberOfPeople: string;
    time: string;
    note: string;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: mongoose.SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: mongoose.SchemaDefinitionProperty<any, any, mongoose.Document<unknown, {}, {
        name: string;
        date: string;
        user: mongoose.Types.ObjectId;
        status: "Pending" | "Approved" | "Cancelled";
        contact: number;
        numberOfPeople: string;
        time: string;
        note: string;
    } & mongoose.DefaultTimestampProps, {
        id: string;
    }, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
        timestamps: true;
    }>> & Omit<{
        name: string;
        date: string;
        user: mongoose.Types.ObjectId;
        status: "Pending" | "Approved" | "Cancelled";
        contact: number;
        numberOfPeople: string;
        time: string;
        note: string;
    } & mongoose.DefaultTimestampProps & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    name: string;
    date: string;
    user: mongoose.Types.ObjectId;
    status: "Pending" | "Approved" | "Cancelled";
    contact: number;
    numberOfPeople: string;
    time: string;
    note: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    name: string;
    date: string;
    user: mongoose.Types.ObjectId;
    status: "Pending" | "Approved" | "Cancelled";
    contact: number;
    numberOfPeople: string;
    time: string;
    note: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=booking.model.d.ts.map