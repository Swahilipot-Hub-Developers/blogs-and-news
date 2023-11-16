// pages/CreateArticle.js

import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';

const CreateArticle = ({username}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [writerOptions, setWriterOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedWriter, setSelectedWriter] = useState(0);


  // console.log(writerOptions)
  // console.log(categoryOptions)
  useEffect(() => {
    // Fetch available categories and writers when the component mounts
    const fetchData = async () => {
      try {
        const categoryResponse = await axios.get('http://127.0.0.1:8000/categories/');

        const fetchedCategories = categoryResponse.data.categories;

        // Ensure fetchedCategories is an array before setting it
        if (Array.isArray(fetchedCategories)) {
          setCategoryOptions(fetchedCategories);
        } else {
          console.error('Invalid data structure for categories:', fetchedCategories);
        }

        const writerResponse = await axios.get('http://127.0.0.1:8000/writers/');
        const fetchedWriters = writerResponse.data;

        // Ensure fetchedWriters is an array before setting it
        if (Array.isArray(fetchedWriters)) {
          console.log(fetchedWriters)
          setWriterOptions(fetchedWriters);
        } else {
          console.error('Invalid data structure for writers:', fetchedWriters);
        }
      } catch (error) {
        console.error('Error fetching categories or writers:', error.message);
        // Handle error
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataTake = {
      title: title,
      content: content,
      category: parseInt(selectedCategory),
      writer: parseInt(selectedWriter),
      // Play test selected writer to 2
      // Include other fields as needed
    }
    console.log(dataTake)

    try {
      const response = await axios.post('http://127.0.0.1:8000/articles/',dataTake);

      console.log('Article created successfully:', response.data);
      // Handle success, redirect, or perform other actions
    } catch (error) {
      console.error('Failed to create article:', error.message);
      // Handle error
    }
  };

  return (
    <Layout username={username}>
    <div className='createArticle'>
      <h1>Create Article</h1>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Content:
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
        <br />
        <label>
          Category:
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Select a category</option>
            {categoryOptions.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Writer:
          <select value={selectedWriter} onChange={(e) => setSelectedWriter(e.target.value)}>
            <option value="">Select a writer</option>
            {writerOptions.map((writer) => (
              <option key={writer.id} value={writer.id}>
                {writer.user.username}
              </option>
            ))}
          </select>
        </label>
        <br />
        <div className='buttonSect'>
          <button type="button" onClick={handleSubmit}>Create Article</button>
        </div>
  
    </div>
    </Layout>
  );
};

export default CreateArticle;

