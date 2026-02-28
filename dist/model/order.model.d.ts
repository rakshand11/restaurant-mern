import mongoose from "mongoose";
export declare const orderModel: mongoose.Model<{
    user: mongoose.Types.ObjectId;
    items: mongoose.Types.DocumentArray<{
        menuItem: mongoose.Types.ObjectId;
        quantity: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        menuItem: mongoose.Types.ObjectId;
        quantity: number;
    }, {}, {}> & {
        menuItem: mongoose.Types.ObjectId;
        quantity: number;
    }>;
    address: string;
    totalAmount: number;
    status: "Pending" | "Prepairing" | "Delivered";
    paymentMethod: string;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    user: mongoose.Types.ObjectId;
    items: mongoose.Types.DocumentArray<{
        menuItem: mongoose.Types.ObjectId;
        quantity: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        menuItem: mongoose.Types.ObjectId;
        quantity: number;
    }, {}, {}> & {
        menuItem: mongoose.Types.ObjectId;
        quantity: number;
    }>;
    address: string;
    totalAmount: number;
    status: "Pending" | "Prepairing" | "Delivered";
    paymentMethod: string;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    user: mongoose.Types.ObjectId;
    items: mongoose.Types.DocumentArray<{
        menuItem: mongoose.Types.ObjectId;
        quantity: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        menuItem: mongoose.Types.ObjectId;
        quantity: number;
    }, {}, {}> & {
        menuItem: mongoose.Types.ObjectId;
        quantity: number;
    }>;
    address: string;
    totalAmount: number;
    status: "Pending" | "Prepairing" | "Delivered";
    paymentMethod: string;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    user: mongoose.Types.ObjectId;
    items: mongoose.Types.DocumentArray<{
        menuItem: mongoose.Types.ObjectId;
        quantity: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        menuItem: mongoose.Types.ObjectId;
        quantity: number;
    }, {}, {}> & {
        menuItem: mongoose.Types.ObjectId;
        quantity: number;
    }>;
    address: string;
    totalAmount: number;
    status: "Pending" | "Prepairing" | "Delivered";
    paymentMethod: string;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    user: mongoose.Types.ObjectId;
    items: mongoose.Types.DocumentArray<{
        menuItem: mongoose.Types.ObjectId;
        quantity: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        menuItem: mongoose.Types.ObjectId;
        quantity: number;
    }, {}, {}> & {
        menuItem: mongoose.Types.ObjectId;
        quantity: number;
    }>;
    address: string;
    totalAmount: number;
    status: "Pending" | "Prepairing" | "Delivered";
    paymentMethod: string;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    user: mongoose.Types.ObjectId;
    items: mongoose.Types.DocumentArray<{
        menuItem: mongoose.Types.ObjectId;
        quantity: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        menuItem: mongoose.Types.ObjectId;
        quantity: number;
    }, {}, {}> & {
        menuItem: mongoose.Types.ObjectId;
        quantity: number;
    }>;
    address: string;
    totalAmount: number;
    status: "Pending" | "Prepairing" | "Delivered";
    paymentMethod: string;
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
        user: mongoose.Types.ObjectId;
        items: mongoose.Types.DocumentArray<{
            menuItem: mongoose.Types.ObjectId;
            quantity: number;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            menuItem: mongoose.Types.ObjectId;
            quantity: number;
        }, {}, {}> & {
            menuItem: mongoose.Types.ObjectId;
            quantity: number;
        }>;
        address: string;
        totalAmount: number;
        status: "Pending" | "Prepairing" | "Delivered";
        paymentMethod: string;
    } & mongoose.DefaultTimestampProps, {
        id: string;
    }, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
        timestamps: true;
    }>> & Omit<{
        user: mongoose.Types.ObjectId;
        items: mongoose.Types.DocumentArray<{
            menuItem: mongoose.Types.ObjectId;
            quantity: number;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            menuItem: mongoose.Types.ObjectId;
            quantity: number;
        }, {}, {}> & {
            menuItem: mongoose.Types.ObjectId;
            quantity: number;
        }>;
        address: string;
        totalAmount: number;
        status: "Pending" | "Prepairing" | "Delivered";
        paymentMethod: string;
    } & mongoose.DefaultTimestampProps & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    user: mongoose.Types.ObjectId;
    items: mongoose.Types.DocumentArray<{
        menuItem: mongoose.Types.ObjectId;
        quantity: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        menuItem: mongoose.Types.ObjectId;
        quantity: number;
    }, {}, {}> & {
        menuItem: mongoose.Types.ObjectId;
        quantity: number;
    }>;
    address: string;
    totalAmount: number;
    status: "Pending" | "Prepairing" | "Delivered";
    paymentMethod: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    user: mongoose.Types.ObjectId;
    items: mongoose.Types.DocumentArray<{
        menuItem: mongoose.Types.ObjectId;
        quantity: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        menuItem: mongoose.Types.ObjectId;
        quantity: number;
    }, {}, {}> & {
        menuItem: mongoose.Types.ObjectId;
        quantity: number;
    }>;
    address: string;
    totalAmount: number;
    status: "Pending" | "Prepairing" | "Delivered";
    paymentMethod: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=order.model.d.ts.map