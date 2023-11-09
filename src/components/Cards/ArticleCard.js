import React from 'react'

const ArticleCard = () => {
  return (
    <div className='gridCard'>
        <div className='topCard'>
            <img src='images/hero.jpg'  />
            <h3>Article Title</h3>
        </div>
        <div className='lowerCard'>
            <p>The content of a lifetime,The content of a lifetime,The content of a lifetime,The content of a lifetime,The content of a lifetime,The content of a lifetime,The content of a lifetime,The content of a lifetime,The content of a lifetime,The content of a lifetime,The content of a lifetime,The content of a lifetime,The content of a lifetime,The content of a lifetime,The content of a lifetime,The content of a lifetime,The content of a lifetime,
            The content of a lifetime,The content of a lifetime,The content of a lifetime,The content of a lifetime,The content of a lifetime,The content of a lifetime,The content of a lifetime,The content of a lifetime,
            </p>
            <button>READ MORE</button>
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