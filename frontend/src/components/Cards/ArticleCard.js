import React from 'react';
import Link from 'next/link';
import Image from 'next/image'
import DOMPurify from 'dompurify';

const ArticleCard = ({...article}) => {
    // console.log(article)
    const {title ,content} = article
  return (
    <div className='gridCard' style={{overflow:"scroll"}}>
        <div className='topCard'>

          {/* image */}
        <Image src='images/hero.jpg' alt='swahilipot' style={{ width: '230px' }} />
        <h3>{title}</h3>
            <img src='images/hero.jpg' alt='swahilipot' />
            <h3>{title}</h3>
        </div>
        <div className='lowerCard'>
              <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />    
                <Link href={`/articles/${article.id}`}>
                <button>READ MORE</button>
            </Link>
        </div>
       
    </div>
  )
}

export default ArticleCard