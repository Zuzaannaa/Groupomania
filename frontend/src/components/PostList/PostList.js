import React, { useState, useEffect } from "react";
import PostService from "../../service/post.service";
import { Link } from "react-router-dom";

const PostList = () => {
  const [posts, setPost] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrievePost();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrievePost = () => {
    PostService.getAll()
      .then((response) => {
        setPost(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrievePost();
    setCurrentPost(null);
    setCurrentIndex(-1);
  };

  const setActivePost = (post, index) => {
    setCurrentPost(post);
    setCurrentIndex(index);
  };

  const removeAllPost = () => {
    PostService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    PostService.findByTitle(searchTitle)
      .then((response) => {
        setPost(JSON.stringify(response.data));
        console.log(JSON.stringify(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="col-md-6">
        <h4>All Posts</h4>

        <ul className="list-group">
          {posts &&
            posts.map((post, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActivePost(post, index)}
                key={index}
              >
                {post.message}
                {post.image}
                {/*{post.description}*/}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentPost ? (
          <div>
            <h4>Post</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentPost.message}
            </div>
            <div>
              <label>
                <strong>Image:</strong>
              </label>{" "}
              {currentPost.image}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentPost.published ? "Read" : "New"}
            </div>

            <Link
              className="badge badge-warning"
              to={`/posts/${currentPost.id}`}
              key={currentPost.id}
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Select Post</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostList;
