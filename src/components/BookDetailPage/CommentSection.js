import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { commentActions } from '../../action/commentAction';

const CommentSection = ({ bookId, deleteComment, userId }) => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comment);

  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(commentActions.createComment({ content: newComment, bookId: bookId }));
  };
  console.log('코멘트섹션에서', comments);

  useEffect(() => {
    dispatch(commentActions.getCommentsByBook(bookId));
  }, []);

  console.log('zzzz', comments[0].userId.userName);

  return (
    <Box className="comment-section mt-4">
      {comments.length === 0 && <Typography variant="body1">No comments yet.</Typography>}
      <List>
        {comments.map((comment, index) => (
          <ListItem key={index} className="comment-item">
            <ListItemText primary={comment.userId.userName} secondary={comment.content} />
            {comment.userId === userId && (
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => deleteComment(comment._id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        ))}
      </List>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Add a comment"
          multiline
          rows={2}
          variant="outlined"
          fullWidth
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default CommentSection;
