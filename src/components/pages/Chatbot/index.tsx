import React, { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;

    // Add user message
    setMessages([...messages, { sender: "You", text: input }]);

    // Optional: Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "You", text: input },
        { sender: "Bot", text: "This is a response from the bot." }
      ]);
    }, 500);

    setInput("");
  };

  return (
    <Paper elevation={3} sx={{ p: 2, maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Chatbot
      </Typography>
      <Divider />
      <List sx={{ maxHeight: 300, overflowY: "auto", my: 2 }}>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${msg.sender}:`}
              secondary={msg.text}
              sx={{
                textAlign: msg.sender === "You" ? "right" : "left"
              }}
            />
          </ListItem>
        ))}
      </List>
      <Box display="flex" alignItems="center">
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
        />
        <IconButton onClick={handleSend} color="primary">
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default Chatbot;