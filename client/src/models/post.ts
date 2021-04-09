export type PostType = {
    _id: string,
    title: string,
    body: string,
    createdAt: Date,
    updatedAt: Date,
};

export type PostsContextType = {
    posts: Array<PostType>;
    dispatchPosts: any;
};