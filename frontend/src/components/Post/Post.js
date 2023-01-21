import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostService from "../../service/post.service";

const Post = (props) => {
  const navigate = useNavigate();
  navigate("/posts");

  const initialPostState = {
    id: null,
    title: "",
    description: "",
    published: false,
  };
  const [currentPost, setCurrentPost] = useState(initialPostState);
  const [message, setMessage] = useState("");

  const getPost = (id) => {
    PostService.get(id)
      .then((response) => {
        setCurrentPost(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getPost(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentPost({ ...currentPost, [name]: value });
  };

  const updatePublished = (status) => {
    const data = {
      id: currentPost.id,
      title: currentPost.title,
      description: currentPost.description,
      published: status,
    };

    PostService.update(currentPost.id, data)
      .then((response) => {
        setCurrentPost({ ...currentPost, published: status });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updatePost = () => {
    PostService.update(currentPost.id, currentPost)
      .then((response) => {
        console.log(response.data);
        setMessage("The post was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deletePost = () => {
    PostService.remove(currentPost.id)
      .then((response) => {
        console.log(response.data);
        navigate("/posts");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentPost ? (
        <div className="edit-form">
          <h4>Post</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentPost.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentPost.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentPost.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentPost.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deletePost}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updatePost}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Post...</p>
        </div>
      )}
    </div>
  );
};

export default Post;
