import { PostType } from "../models/post"

type PostAction = {
    type: string,
    payload: any, // Plz help
}

export const PostsReducer = (state: PostType[], action: PostAction) => {
    switch (action.type) {
        case 'add': 
            return [{ ...action.payload}, ...state]
        case 'set':
            if (Array.isArray(action.payload)) {
                return [...action.payload]
            } else {
                throw new Error()
            }
        default:
            throw new Error()
    }
}