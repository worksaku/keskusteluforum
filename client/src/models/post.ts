export interface PostType {
    _id: string
    title: string
    body: string
    createdAt: Date
    updatedAt: Date
    comments: Array<any>
};

export interface PostsContextType {
    posts: Array<PostType>;
    dispatchPosts: any;
};