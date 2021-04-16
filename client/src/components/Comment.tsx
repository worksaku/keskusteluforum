import { Comment as CommentType } from '../models/post';
// import { Button } from './ui-components';

const Comment = (props: CommentType) => (
  <div key={props._id} id={props._id} className="flex flex-col">
    <div className="bg-blue-200 px-3 py-1 flex justify-between">
      <span>{`${new Date(props.createdAt).toLocaleString()} by ${
        props.author.username
      }`}</span>
      {/* {<Button text="Edit" />} */}
    </div>
    <div className="bg-blue-100 px-3 py-1">{props.body}</div>
  </div>
);

export default Comment;
