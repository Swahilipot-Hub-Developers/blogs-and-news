
import axios from 'axios';
import { useRouter } from 'next/router';
import Hero from '../../components/home/Hero'
import { useEffect } from 'react';
import DOMPurify from 'dompurify';
import { FaFacebook, FaLinkedin, FaXTwitter } from "react-icons/fa6";


const getArticleById = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/articles/${id}`);
    //   console.log(response.data)
      // await axios.get(`http://127.0.0.1:8000/articles/${id}/views/`);

      return response.data;

    } catch (error) {
      console.error('Error fetching article:', error);
      return null;
    }
  };

const IndividualArticle = ({ article }) => {
  const router = useRouter();
  const { id } = router.query;

  // Article data is passed as a prop
  return (
    <div className='homePoint'>
        {/* <Hero/> */}
        <div >
        {/* Display article content using the fetched data */}
        {article ? (
            <>
            <h2 className='' style={{textAlign:"center", marginTop:"20px"}}>{article.title}</h2>
            {/* <p>{article.content}</p> */}
            <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }} />    
            </>
        ) : (
            <p>Loading...</p>
        )}

              <p className='text-center'>Share Via:</p>
          <div className='col-md d-md-flex justify-content-md-center  my-20'>
              {/* Socials */}
              <ul className="list-inline mb-0">
                      <li className="list-inline-item">
                          <a className="btn btn-icon btn-sm btn-ghost-secondary rounded-circle fs-4" href="https://www.linkedin.com/company/swahilipot-hub">
                              <FaLinkedin/>
                          </a>
                      </li>
                      <li className="list-inline-item">
                          <a className="btn btn-icon btn-sm btn-ghost-secondary rounded-circle fs-4" href="https://www.twitter.com/swahilipothub">
                              <FaXTwitter/>
                          </a>
                      </li>
                      <li className="list-inline-item">
                          <a className="btn btn-icon btn-sm btn-ghost-secondary rounded-circle fs-4" href="https://www.facebook.com/Swahilipothub/">
                              <FaFacebook/>
                          </a>
                      </li>
                  </ul>
              {/* End Socials */}
            </div>
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
