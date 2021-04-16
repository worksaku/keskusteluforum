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
        state.sort((a, b) =>
          a._id === action.payload._id
            ? -1
            : b._id === action.payload._id
            ? 1
            : 0
        );
        console.log(state);
        return [...state];
      } else {
        throw new Error();
      }
    case 'delete':
      const filtered = state.filter((post) => post._id !== action.payload);
      return [...filtered];
    default:
      throw new Error();
  }
};
