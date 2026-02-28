import mongoose from "mongoose";
export declare const menuModel: mongoose.Model<{
    name: string;
    description: string;
    image: string;
    category: mongoose.Types.ObjectId;
    price: number;
    isAvailabel: boolean;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    name: string;
    description: string;
    image: string;
    category: mongoose.Types.ObjectId;
    price: number;
    isAvailabel: boolean;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    description: string;
    image: string;
    category: mongoose.Types.ObjectId;
    price: number;
    isAvailabel: boolean;
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
    description: string;
    image: string;
    category: mongoose.Types.ObjectId;
    price: number;
    isAvailabel: boolean;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    name: string;
    description: string;
    image: string;
    category: mongoose.Types.ObjectId;
    price: number;
    isAvailabel: boolean;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    name: string;
    description: string;
    image: string;
    category: mongoose.Types.ObjectId;
    price: number;
    isAvailabel: boolean;
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
        description: string;
        image: string;
        category: mongoose.Types.ObjectId;
        price: number;
        isAvailabel: boolean;
    } & mongoose.DefaultTimestampProps, {
        id: string;
    }, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
        timestamps: true;
    }>> & Omit<{
        name: string;
        description: string;
        image: string;
        category: mongoose.Types.ObjectId;
        price: number;
        isAvailabel: boolean;
    } & mongoose.DefaultTimestampProps & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    name: string;
    description: string;
    image: string;
    category: mongoose.Types.ObjectId;
    price: number;
    isAvailabel: boolean;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    name: string;
    description: string;
    image: string;
    category: mongoose.Types.ObjectId;
    price: number;
    isAvailabel: boolean;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=menu.model.d.ts.map