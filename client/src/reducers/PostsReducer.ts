import { PostType } from '../models/post';

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  Add = 'add',
  Set = 'set',
  Edit = 'edit',
  Delete = 'delete',
}

export type PostPayload = {
  [Types.Add]: PostType;
  [Types.Set]: PostType[];
  [Types.Edit]: PostType;
  [Types.Delete]: string;
};

export type PostActions = ActionMap<PostPayload>[keyof ActionMap<PostPayload>];

export const PostsReducer = (state: PostType[], action: PostActions) => {
  switch (action.type) {
    case Types.Add:
      return [{ ...action.payload }, ...state];
    case Types.Set:
      return [...action.payload];
    case Types.Edit:
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
        return [...state];
      } else {
        throw new Error();
      }
    case Types.Delete:
      const filtered = state.filter((post) => post._id !== action.payload);
      return [...filtered];
    default:
      throw new Error();
  }
};
