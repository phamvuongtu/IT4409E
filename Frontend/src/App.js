import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL || 'http://localhost:3001/blogs')
      .then(response => setBlogs(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = (event, id) => {
    event.preventDefault();
    axios.put(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/blogs/${id}`, { title, body, image })
      .then(response => {
        setBlogs(blogs.map(blog => blog._id === id ? response.data : blog));
        setTitle('');
        setBody('');
        setImage('');
        setErrorMessage('');
      })
      .catch(error => setErrorMessage(error.message));
  };

  return (
    <div>
      <h1>My Blog App</h1>
      {errorMessage && <p>{errorMessage}</p>}
      {blogs.map(blog => (
        <div key={blog._id}>
          <h2>{blog.title}</h2>
          <p>{blog.body}</p>
          <img src={blog.image} alt={blog.title} />
          <form onSubmit={event => handleSubmit(event, blog._id)}>
            <label>
              Title:
              <input type="text" value={title} onChange={event => setTitle(event.target.value)} />
            </label>
            <br />
            <label>
              Body:
              <textarea value={body} onChange={event => setBody(event.target.value)} />
            </label>
            <br />
            <label>
              Image URL:
              <input type="text" value={image} onChange={event => setImage(event.target.value)} />
            </label>
            <br />
            <button type="submit">Update</button>
          </form>
        </div>
      ))}
    </div>
  );
}

export default App;