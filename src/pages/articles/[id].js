

import axios from 'axios';
import { useRouter } from 'next/router';
import Hero from '../../components/home/Hero'
import { useEffect } from 'react';

const getArticleById = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/articles/${id}`);
    //   console.log(response.data)
      return response.data;

    } catch (error) {
      console.error('Error fetching article:', error);
      return null;
    }
  };

const IndividualArticle = ({ article }) => {
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    const viewArticle = async () => {
      try {
        await axios.get(`http://127.0.0.1:8000/articles/${id}/views/`);
        console.log('Article viewed successfully.');
      } catch (error) {
        console.error('Error viewing article:', error);
      }
    };

    if (id) {
      viewArticle();
    }
  }, [id]);
  // Article data is passed as a prop
  return (
    <div className='home'>
        <Hero/>
        <div >
        {/* Display article content using the fetched data */}
        {article ? (
            <>
            <h2 className='' style={{textAlign:"center", marginTop:"20px"}}>{article.title}</h2>
            <p>{article.content}</p>
            </>
        ) : (
            <p>Loading...</p>
        )}
        </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const article = await getArticleById(params.id);

  return {
    props: {
      article,
    },
  };
}

export default IndividualArticle;
