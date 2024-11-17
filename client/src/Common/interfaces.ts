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
  interface Post {
    _id: string;
    title: string;
    content: string;
    tags: string[];
    versions: Version[];
    views: number;
    comments: string[];
    image: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
export  interface AddCommentResponse {
    _id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  }
  
export interface IncrementViewsResponse {
    views: number;
  }