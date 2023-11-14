import React from 'react'
import Link from 'next/link';


const ArticleCard = ({...article}) => {
    console.log(article)
    const {title ,content} = article
  return (
    <div className='gridCard'>
        <div className='topCard'>
            <img src='images/hero.jpg'  />
            <h3>{title}</h3>
        </div>
        <div className='lowerCard'>
            <p>{content}</p>
            <Link href={`/articles/${article.id}`}>
                <button>READ MORE</button>
            </Link>
        </div>
        <div className='socials'>
            <div className='socialLeft'>
                <p>Share Via:</p>
            </div>
            <div className='socialIcons'>
                {/* Ig */}
                {/* Twitter */}
                {/* Telegram */}
                {/* Whatsaap */}
            </div>
        </div>
    </div>
  )
}

export default ArticleCard