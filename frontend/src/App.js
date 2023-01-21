import { Route, Routes, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import AddPost from "./components/AddPost/AddPost";
import Post from "./components/Post/Post";
import PostList from "./components/PostList/PostList";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/Home" />} />
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<Profile />} />
        <Route path="posts" element={<PostList />}>
          <Route path=":id/edit" element={<Post />} />
        </Route>
        <Route path="add" element={<AddPost />} />
      </Routes>
    </div>
  );
}

export default App;
