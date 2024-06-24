import React, { useState } from 'react';
import { Button, TextField, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { commentActions } from '../../action/commentAction';

const CommentSection = ({ bookId, deleteComment, userId }) => {
  const dispatch = useDispatch();

  const [newComment, setNewComment] = useState('');
  const { comments } = useSelector((state) => state.comment);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(commentActions.createComment({ content: newComment, bookId: bookId }));
    setNewComment('');
  };

  return (
    <Box className="comment-section mt-4">
      {comments.length === 0 && <Typography variant="body1">No comments yet.</Typography>}
      <List>
        {comments.map((comment, index) => (
          <ListItem
            key={index}
            className="comment-item"
            sx={{
              marginBottom: '10px',
              padding: '15px',
              backgroundColor: 'white',
              opacity: '70%',
              boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.3)',
              borderRadius: '8px',
            }}>
            <ListItemText
              primary={comment.userId.userName}
              secondary={comment.content}
              primaryTypographyProps={{ fontWeight: 'bold', color: '#333' }}
              secondaryTypographyProps={{ color: '#555' }}
            />
            {comment.userId._id === userId && (
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(comment._id)}>
                  <DeleteIcon color="#537019" />
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
