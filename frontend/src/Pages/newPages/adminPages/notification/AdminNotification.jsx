import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import GeneralNavbar from "../../../../components/navbar/GeneralNavbar";
import BlobComposition from "../../../../components/backgrounds/BlobComposition/BlobComposition";
import GeneralFooter from "../../../../components/footer/GeneralFooter";

const AdminNotification = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [notificationType, setNotificationType] = useState("alert"); // New state for notification type
  const [notifications, setNotifications] = useState([]);

  const navigate = useNavigate();

  // List of users to select from
  const users = [
    "user1@example.com",
    "user2@example.com",
    "user3@example.com",
    // More users can be added or fetched from a backend service
  ];

  // List of notification types
  const notificationTypes = [
    "Alert",
    "Reminder",
    "Update",
    // Add more types if needed
  ];

  const handleSendNotification = () => {
    if (title && description && selectedUser) {
      setNotifications([...notifications, { title, description, user: selectedUser, type: notificationType }]);
      setTitle("");
      setDescription("");
      setSelectedUser("");
      setNotificationType("alert"); // Reset to default type
      alert(`Notification sent to ${selectedUser === "all" ? "All Users" : selectedUser}!`);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleDeleteNotification = (index) => {
    const updatedNotifications = notifications.filter((_, i) => i !== index);
    setNotifications(updatedNotifications);
  };

  const handleBackClick = () => {
    navigate("/admin");
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <GeneralNavbar />
      <BlobComposition
        blobsData={[
          { top: "10%", left: "-20%", size: "700px" },
          { top: "-30%", left: "70%", size: "400px" },
          { top: "40%", left: "50%", size: "300px" },
        ]}
      />
      <Container maxWidth="sm" sx={styles.container}>
        <Box sx={styles.content}>
          <Typography variant="h4" component="h2" sx={styles.heading}>
            Admin Notifications
          </Typography>
          <Box sx={styles.buttonContainer}>
            <IconButton
              color="primary"
              onClick={handleBackClick}
              sx={styles.backButton}
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>
          <Box sx={styles.inputContainer}>
            <FormControl fullWidth margin="normal">
              <InputLabel>User</InputLabel>
              <Select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                label="User"
              >
                <MenuItem value="all">All Users</MenuItem>
                {users.map((user) => (
                  <MenuItem key={user} value={user}>
                    {user}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Notification Type</InputLabel>
              <Select
                value={notificationType}
                onChange={(e) => setNotificationType(e.target.value)}
                label="Notification Type"
              >
                {notificationTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Notification Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Notification Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSendNotification}
              endIcon={<SendIcon />}
              sx={styles.button}
            >
              Send Notification
            </Button>
          </Box>
          <Box sx={styles.notificationsContainer}>
            <Typography variant="h5" component="h3" sx={styles.sentNotificationsHeading}>
              Sent Notifications
            </Typography>
            {notifications.map((notification, index) => (
              <Card key={index} sx={styles.notification}>
                <CardContent>
                  <Typography variant="h6" component="h4">
                    {notification.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {notification.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Sent to: {notification.user === "all" ? "All Users" : notification.user}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Type: {notification.type}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleDeleteNotification(index)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
      <GeneralFooter />
    </div>
  );
};

// Styles for the component using MUI's sx prop
const styles = {
  container: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    marginTop: "20px",
  },
  content: {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "20px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: "20px",
  },
  backButton: {
    marginBottom: "10px",
  },
  inputContainer: {
    marginBottom: "30px",
  },
  button: {
    marginTop: "10px",
  },
  notificationsContainer: {
    marginTop: "20px",
  },
  notification: {
    marginBottom: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  sentNotificationsHeading: {
    marginBottom: "10px",
  },
};

export default AdminNotification;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Container,
//   TextField,
//   Typography,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Button,
// } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";

// const AdminNotification = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [selectedUser, setSelectedUser] = useState("");
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     // Fetch all student emails when component loads
//     axios.get("/api/get-students")
//       .then(response => {
//         if (response.data.success) {
//           setUsers(response.data.data);
//         } else {
//           console.error("Error fetching students:", response.data.error);
//         }
//       })
//       .catch(error => console.error("Error fetching students:", error));
//   }, []);

//   const handleSendNotification = () => {
//     if (title && description && selectedUser) {
//       axios.post("/api/send-notification", {
//         email: selectedUser,
//         title,
//         message: description,
//       })
//         .then(() => {
//           alert(`Notification sent to ${selectedUser}!`);
//           setTitle("");
//           setDescription("");
//           setSelectedUser("");
//         })
//         .catch(error => console.error("Error sending notification:", error));
//     } else {
//       alert("Please fill in all fields.");
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h4" component="h2" gutterBottom>
//         Admin Notifications
//       </Typography>
//       <FormControl fullWidth margin="normal">
//         <InputLabel>User</InputLabel>
//         <Select
//           value={selectedUser}
//           onChange={(e) => setSelectedUser(e.target.value)}
//           label="User"
//         >
//           {users.map((user, index) => (
//             <MenuItem key={index} value={user.email}>
//               {user.email}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       <TextField
//         label="Notification Title"
//         variant="outlined"
//         fullWidth
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         margin="normal"
//       />
//       <TextField
//         label="Notification Description"
//         variant="outlined"
//         fullWidth
//         multiline
//         rows={4}
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         margin="normal"
//       />
//       <Button
//         variant="contained"
//         color="primary"
//         fullWidth
//         onClick={handleSendNotification}
//         endIcon={<SendIcon />}
//         sx={{ marginTop: "10px" }}
//       >
//         Send Notification
//       </Button>
//     </Container>
//   );
// };

// export default AdminNotification;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Container,
//   TextField,
//   Typography,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Button,
// } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";

// const AdminNotification = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [selectedUser, setSelectedUser] = useState("");
//   const [users, setUsers] = useState([]);
//   const [notificationType, setNotificationType] = useState("email");

//   useEffect(() => {
//     // Fetch all student emails when component loads
//     axios.get("/get-students")
//       .then(response => {
//         if (response.data.success) {
//           setUsers(response.data.data);
//         } else {
//           console.error("Error fetching students:", response.data.error);
//         }
//       })
//       .catch(error => console.error("Error fetching students:", error));
//   }, []);

//   const handleSendNotification = () => {
//     if (title && description) {
//       const endpoint = selectedUser === "all"
//         ? "/trigger-notification-all"
//         : "/trigger-notification";

//       const payload = {
//         userId: selectedUser !== "all" ? selectedUser : undefined,
//         type: notificationType,
//         payload: {
//           title,
//           message: description,
//         },
//       };

//       axios.post(endpoint, payload)
//         .then(() => {
//           alert(`Notification sent to ${selectedUser === "all" ? "All Users" : selectedUser}!`);
//           setTitle("");
//           setDescription("");
//           setSelectedUser("");
//         })
//         .catch(error => console.error("Error sending notification:", error));
//     } else {
//       alert("Please fill in all fields.");
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h4" component="h2" gutterBottom>
//         Admin Notifications
//       </Typography>
//       <FormControl fullWidth margin="normal">
//         <InputLabel>User</InputLabel>
//         <Select
//           value={selectedUser}
//           onChange={(e) => setSelectedUser(e.target.value)}
//           label="User"
//         >
//           <MenuItem value="all">All Users</MenuItem>
//           {users.map((user, index) => (
//             <MenuItem key={index} value={user._id}>
//               {user.email}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       <FormControl fullWidth margin="normal">
//         <InputLabel>Notification Type</InputLabel>
//         <Select
//           value={notificationType}
//           onChange={(e) => setNotificationType(e.target.value)}
//           label="Notification Type"
//         >
//           <MenuItem value="email">Email</MenuItem>
//           <MenuItem value="sms">SMS</MenuItem>
//           <MenuItem value="push">Push Notification</MenuItem>
//         </Select>
//       </FormControl>
//       <TextField
//         label="Notification Title"
//         variant="outlined"
//         fullWidth
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         margin="normal"
//       />
//       <TextField
//         label="Notification Description"
//         variant="outlined"
//         fullWidth
//         multiline
//         rows={4}
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         margin="normal"
//       />
//       <Button
//         variant="contained"
//         color="primary"
//         fullWidth
//         onClick={handleSendNotification}
//         endIcon={<SendIcon />}
//         sx={{ marginTop: "10px" }}
//       >
//         Send Notification
//       </Button>
//     </Container>
//   );
// };

// export default AdminNotification;


