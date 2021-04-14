import { PostType } from '../models/post';

type PostAction = {
  type: string;
  payload: any;
};

export const PostsReducer = (state: PostType[], action: PostAction) => {
  switch (action.type) {
    case 'add':
      return [{ ...action.payload }, ...state];
    case 'set':
      if (Array.isArray(action.payload)) {
        return [...action.payload];
      } else {
        throw new Error();
      }
    case 'edit':
      const itemIndex = state.findIndex(
        (post) => post._id === action.payload._id
      );
      if (itemIndex >= 0) {
        state[itemIndex] = action.payload;
        return [...state];
      } else {
        throw new Error();
      }
    default:
      throw new Error();
  }
};
