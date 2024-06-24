import React, { useState } from 'react';
import { Button, TextField, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CommentSection = ({ comments = [], addComment, deleteComment, currentUserId }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('[commentSection] 코멘트 submit클릭하면: ', newComment);
    if (newComment.trim()) {
      addComment(newComment);
      setNewComment('');
    }
  };

  return (
    <Box className="comment-section mt-4">
      {comments.length === 0 && <Typography variant="body1">No comments yet.</Typography>}
      <List>
        {comments.map((comment, index) => (
          <ListItem key={index} className="comment-item">
            <ListItemText primary={comment.email} secondary={comment.content} />
            {comment.userId === currentUserId && (
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
