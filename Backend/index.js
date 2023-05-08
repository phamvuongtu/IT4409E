const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const blogSchema = new mongoose.Schema({
  title: String,
  body: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model('Blog', blogSchema);

mongoose.connect(
  process.env.MONGODB_URI || "mongodb+srv://it4409:it4409-soict@lamdb-crud.qd3s7vv.mongodb.net/?retryWrites=true&w=majority",
  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  }
)
app.use(cors());
app.use(express.json());

app.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/blogs/:id', async (req, res) => {
  const { id } = req.params;
  const { title, body, image } = req.body;
  try {
    const blog = await Blog.findByIdAndUpdate(id, { title, body, image }, { new: true });
    res.json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(3001, ()=>{
  console.log("Server is running on port 3001");
});