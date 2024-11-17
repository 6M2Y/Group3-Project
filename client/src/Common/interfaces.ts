export interface Version {
    tags: string[];
    content: string;
    editor: string;
    _id: string;
    date: string;
  }
  
export interface SaveVersionResponse {
    message: string;
    post: {
      _id: string;
      title: string;
      summary: string;
      content: string;
      tags: string[];
      versions: {
        title: string;
        summary: string;
        content: string;
        tags: string[];
        image?: string;
        published: boolean;
        editor: string;
        date: string;
      }[];
      views: number;
      comments: string[];
      published: boolean;
      createdAt: string;
      updatedAt: string;
      image?: string;
    };
  }
//   interface Post {
//     _id: string;
//     title: string;
//     content: string;
//     tags: string[];
//     versions: Version[];
//     views: number;
//     comments: string[];
//     image: string;
//     createdAt: string;
//     updatedAt: string;
//     __v: number;
//   }
  
export  interface AddCommentResponse {
    _id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  }
  
export interface IncrementViewsResponse {
    views: number;
}
  
export interface latestPostType {
    author: {
      fullname: string;
      email: string;
    };
    title: string;
    tags: string[];
    updatedAt: string; // ISO string for date
  }
export  interface ApiResponse {
    wikiPost: latestPostType[];
  }
export  interface TagCount {
    tag: string;
    count: number;
  }
  export  interface PostCountResponse {
    postCount: number;
}

export interface HomeProps {
    isAuthenticated?: boolean; // Make isAuthenticated optional
    userId?: string | null; // Make userId optional
  }
export  interface Version {
    tags: string[];
    content: string;
    editor: string;
    _id: string;
    date: string;
  }
export  interface Post {
    _id: string;
    title: string;
    content: string;
    author: string;
    tags: string[];
    versions: Version[];
    views: number;
    comments: string[]; // You can replace `any` with a more specific type if you have a structure for comments
    image: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
export  interface User {
    _id: string;
    fullname: string;
    // Add other user fields as necessary
    title: string;
    content: string;
    author: string;
    tags: string[];
    versions: Version[];
    views: number;
    comments: string[]; // You can replace `any` with a more specific type if you have a structure for comments
    image: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }