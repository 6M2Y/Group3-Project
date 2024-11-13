// import mongoose, { Schema,  } from "mongoose";

// const PageSchema = new Schema({
//   title: { type: String, required: true },
//   content: { type: String, required: true },
//   tags: [{ type: String }],
//   versions: [{
//     content: String,
//     editor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     date: { type: Date, default: Date.now }
//   }],
//   views: { type: Number, default: 0 },
//   comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// });

// PageSchema.pre('save', function(next) {
//   this.updatedAt = Date.now();
//   next();
// });

// const Page = mongoose.model('Page', PageSchema);
// export default Page;

// // "Each page represents a wiki page with a title, content, associated tags, and an author (user ID)."
// // "Pages will reference versions to track changes."
// // "You may also include statistics such as the view count."
// // "Version Schema"
// // "Since versions are embedded within the Page schema, you don’t need a separate schema for versions. They are already included in the versions array in the Page schema."
// import mongoose, { Schema, Document, Types } from 'mongoose';

// Define the interface for the Page schema
// interface IVersion {
//   content: string;
//   editor: Types.ObjectId;
//   date: Date;
// }

// interface IPage extends Document {
//   title: string;
//   content: string;
//   tags: string[];
//   versions: IVersion[];
//   views: number;
//   comments: Types.ObjectId[];
//   createdAt: Date;
//   updatedAt: Date;
//   image?: string; // Optional image field (could store a URL or path to the image)
// }

// // Define the Page schema
// const PageSchema: Schema<IPage> = new Schema(
//   {
//     title: { type: String, required: true },
//     content: { type: String, required: true },
//     tags: [{ type: String }],
//     versions: [{
//       content: String,
//       editor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//       date: { type: Date, default: Date.now }
//     }],
//     views: { type: Number, default: 0 },
//     comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now },
//     image: { type: String, required: false } // Add the image field here
//   },
//   {
//     timestamps: true // This will automatically add createdAt and updatedAt fields
//   }
// );

// // Pre-save hook to update the `updatedAt` field
// PageSchema.pre<IPage>('save', function(next) {
//   this.updatedAt = new Date();
//   next();
// });

// // Create the model
// const Page = mongoose.model<IPage>('Page', PageSchema);

// export default Page;
import mongoose, { Schema, Document, Types } from 'mongoose';

// Define the interface for the Page schema
interface IVersion {
  title: string;
  content: string;
  tags: string[];
  image: string | undefined;
  editor: Types.ObjectId;
  date: Date;
}

interface IPage extends Document {
  author: Types.ObjectId;
  title: string;
  content: string;
  tags: string[];
  versions: IVersion[];
  views: number;
  comments: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  image?: string;
}

// Define the Page schema
const PageSchema: Schema<IPage> = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: String }],
    versions: [
      {
        title: { type: String, required: true },
        content: { type: String, required: true },
        tags: [{ type: String }],
        image: { type: String },
        editor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        date: { type: Date, default: Date.now },
      },
    ],
    views: { type: Number, default: 0 },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
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
