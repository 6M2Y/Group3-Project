import mongoose, { Schema, Document, Types } from 'mongoose';


// Define the interface for the Page schema
interface IVersion {
  title: string;
  content: string;
  summary: string;
  tags: string[];
  image: string | undefined;
  published: boolean;
  editor: Types.ObjectId;
  date: Date;
}

export interface IPage extends Document {
  author: Types.ObjectId;
  title: string;
  summary: string;
  content: string;
  tags: string[];
  versions: IVersion[];
  views: number;
  comments: Types.ObjectId[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  image?: string;
}

// Define the Page schema
const PageSchema: Schema<IPage> = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    content: { type: String,  },
    tags: [{ type: String }],
    versions: [
      {
        title: { type: String, required: true },
        summary:{type:String},
        content: { type: String, },
        tags: [{ type: String }],
        image: { type: String },
        published: {type:Boolean},
        editor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        date: { type: Date, default: Date.now },
      },
    ],
    views: { type: Number, default: 0 },
<<<<<<< HEAD
    published: {type:Boolean},
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
=======
    comments:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    published: {type:Boolean},
    // comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
>>>>>>> 4fcf0dc5bbbacf3247de652090b154fae0d6201d
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    image: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to update the `updatedAt` field
PageSchema.pre<IPage>('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Create the model
const Post = mongoose.model<IPage>('Page', PageSchema);

export default Post;
