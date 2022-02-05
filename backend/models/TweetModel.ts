import { model, Schema, Document } from "mongoose";

import { UserModelDocumentInterface } from "./UserModel";

export interface TweetModelInterface {
  _id?: string;
  text: string;
  user: UserModelDocumentInterface;
  images?: string[];
};

export type TweetModelDocumentInterface = TweetModelInterface & Document;

const TweetSchema = new Schema<TweetModelInterface>(
  {
    text: {
      required: true,
      type: String,
      maxlength: 280,
    },
    user: {
      required: true,
      ref: "User",
      type: Schema.Types.ObjectId,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const TweetModel = model<TweetModelDocumentInterface>("Tweet", TweetSchema);
