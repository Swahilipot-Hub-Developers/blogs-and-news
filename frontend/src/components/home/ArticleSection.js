import React, { useCallback, useEffect, useState } from 'react';
import PillCard from '../Cards/PillCard';
import ArticleCard from '../Cards/ArticleCard';
import Search from './Search';
import Link from 'next/link';
import axios from 'axios';

const ArticleSection = () => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All')

    const baseUrl = "https://jerryj.pythonanywhere.com"
  const fetchArticles = useCallback( async (condition) => {
    try {
      let url = `${baseUrl}/articles/published/`;
      //point category
      
      if (condition === 'category') {
        const categoryId = selectedCategory.id;
        url = `${baseUrl}/articles/category/${categoryId}`;
      } else if (condition === 'search') {
        url = `${baseUrl}/articles/search/?q=${searchTerm}`;
      }
      
      const response = await axios.get(url);
      setArticles(response.data.articles);
    } catch (error) {
      console.error('Error fetching articles:', error.message);
    }
  },[searchTerm,selectedCategory]);
  const fetchPublishedArticles = async () => {
    try {
      const response = await axios.get(`${baseUrl}/articles/published/`);
      setArticles(response.data.articles);
    } catch (error) {
      console.error('Error fetching articles:', error.message);
    }
  };

  const fetchData = async () => {
    try {
      const categoryResponse = await axios.get(`${baseUrl}/categories/`);
      const fetchedCategories = categoryResponse.data.categories;

      if (Array.isArray(fetchedCategories)) {
        setCategoryOptions(fetchedCategories);
      } else {
        console.error('Invalid data structure for categories:', fetchedCategories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error.message);
    }
  };

  useEffect(() => {
    // Fetch available categories when the component mounts
    fetchData();
    fetchPublishedArticles()
    fetchArticles(selectedCategory ? 'category' : 'published');
  }, [selectedCategory, searchTerm]);

  const handleAllCategoryClick = () => {
    setActiveFilter('All');
    setSelectedCategory(null); // Reset selected category to null
    fetchPublishedArticles(); // Fetch published articles when 'All' is clicked
  };
  const handleCategoryClick = (category) => {
    setActiveFilter(category.name)
    setSelectedCategory(category);
    setSearchTerm('');
    fetchArticles('category');
  };

  const handleSearch = () => {
    setSelectedCategory(null);
    fetchArticles('search');
  };

  return (
    <div className='articleSection' style={{ backgroundColor: '#362d2c', minHeight: '70vh', textAlign: 'center' }}>
      <h2 className='welcome'> Welcome to Our Blog Website</h2>
      <p className='text-center fs-'>Blogs and News</p>
      <div className='categoriesPill'>
        {categoryOptions.map((category) => (
          <PillCard key={category.id} text={category.name} onClick={() => handleCategoryClick(category)} active={activeFilter == category.name} />
          ))}
          <PillCard
            text='All'
            onClick={handleAllCategoryClick}
            active={activeFilter === 'All'}
          />
      </div>
      <Search searchTerm={searchTerm} onSearch={handleSearch} onInputChange={(e) => setSearchTerm(e.target.value)} />
      <div className='articleCardSection'>
        <div className='grid'>
          {articles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      </div>
      <div className='reachOut'>
        <p>If you believe that you have the Writers skill you can Signup/login to the program....... Spread Awareness</p>
        <Link href='/signup'>
          <button>Reach Out</button>
        </Link>
      </div>
    </div>
  );
};

export default ArticleSection;
