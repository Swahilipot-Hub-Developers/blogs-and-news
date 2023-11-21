// pages/CreateArticle.js

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const CreateArticle = ({username}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [writerOptions, setWriterOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedWriter, setSelectedWriter] = useState(0);


  const quillRef = useRef(null);
  
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

    try {
      const response = await axios.post('http://127.0.0.1:8000/articles/',dataTake);
      console.log('Article created successfully:', response.data);
      setTitle('')
      setContent('')

      // Handle success, redirect, or perform other actions
    } catch (error) {
      console.error('Failed to create article:', error.message);
    }
  };
  const handleEditorChange = (content, delta, source, editor) => {
    // Collecting the content onChange
    setContent(content);
  };
  return (
    <Layout username={username}>
    <div className='createArticle'>
      <h1>Create Article</h1>
      <div className='createContainer'>

        <div className='leftCreate'>
            <label>
              Title:
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <br />
            {/* <label>
              Content:
              <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            </label> */}
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
        </div>
        <div className='rightCreate'>
          {/* Your content */}
          <ReactQuill
            ref={quillRef}
            value={content}
            theme="snow" // You can use 'bubble' or 'snow' theme
            style={{
              width: '100%',
              minHeight: '200px',
              maxHeight: '400px', // Maximum height before scrollbar appears
              overflowY: 'auto', // Enable vertical scrollbar
            }}
            onChange={handleEditorChange} // This captures content changes
            />
        
        </div>
      </div>
        <div className='buttonSect'>
          <button type="button" onClick={handleSubmit}>Create Article</button>
        </div>
        
    </div>

    </Layout>
  );
};

export default CreateArticle;

