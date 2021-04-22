import axios, { AxiosResponse } from 'axios';
import React, { useContext, useState } from 'react';
import PostsContext from '../context/PostsContext';
import UserContext from '../context/UserContext';
import { Comment as CommentType, PostType } from '../models/post';
import { Types } from '../reducers/PostsReducer';
import { Button } from './';

const Comment = (props: CommentType) => {
  const [editing, setEditing] = useState(false);
  const { user } = useContext(UserContext);
  const [body, setBody] = useState(props.body);
  const { dispatch } = useContext(PostsContext);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (body) {
      axios
        .post('/comment', {
          id: props._id,
          body,
        })
        .then((res: AxiosResponse<PostType>) => {
          if (res.data)
            dispatch({
              type: Types.Edit,
              payload: res.data,
            });
          setEditing(false);
        });
    }
  };

  const canEdit: boolean = !!(
    user?.role === 'admin' || user?._id === props.author._id
  );

  return (
    <div
      data-testid="comment-component"
      key={props._id}
      id={props._id}
      className="flex flex-col"
    >
      <div className="bg-red-200 px-3 py-1 flex justify-between">
        <span>{`${new Date(props.createdAt).toLocaleString()} by ${
          props.author.username
        }`}</span>
        {canEdit && !editing && (
          <Button
            text="Edit"
            onClick={() => setEditing(true)}
            classes="self-center"
          />
        )}
      </div>
      <div className="bg-red-100 px-3 py-1">
        {!editing ? (
          <pre className="font-sans whitespace-pre-line text-left">
            {props.body}
          </pre>
        ) : (
          <form onSubmit={submit}>
            <textarea
              value={body}
              className="block w-full mb-2"
              onChange={(e) => setBody(e.target.value)}
            />
            <Button
              text="Cancel"
              onClick={() => setEditing(false)}
              classes="mr-2"
            />
            <Button type="submit" text="Save" />
          </form>
        )}
        {props.createdAt !== props.updatedAt && (
          <span className="text-sm text-gray-500">{`Edited: ${new Date(
            props.updatedAt
          ).toLocaleString()}`}</span>
        )}
      </div>
    </div>
  );
};

export default Comment;
