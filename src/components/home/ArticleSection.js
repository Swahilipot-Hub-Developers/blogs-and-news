import React from 'react'
import PillCard from '../Cards/PillCard'
import ArticleCard from '../Cards/ArticleCard'
import Search from './Search'
import Link from 'next/link'

const ArticleSection = () => {
  return (
    <div className='articleSection' style={{backgroundColor:"  #362d2c", minHeight:"70vh",textAlign:"center"}}>
        <h2 className="welcome"> Welcome to Our  Blog Website</h2>
        <p className='text-center fs-'>Blogs and News</p>
        <div className='categoriesPill'>
            <PillCard text="Educational"/>
            <PillCard text="Fashion & Design"/>
            <PillCard text="Educational"/>
            <PillCard text="Fashion & Design"/>
            <PillCard text="Educational"/>
            <PillCard text="Fashion & Design"/>
        </div>
        <Search />
        <div className='articleCardSection'>
            <div className='grid'>
               <ArticleCard />
               <ArticleCard />
               <ArticleCard />
               <ArticleCard />
               <ArticleCard />
               <ArticleCard />

            </div>
        </div>
        <div className='reachOut'>
          <p>If you believe that you have the Writters skill you can Signup/login to the program....... "Spread Awareness"</p>
          <Link href="/signup"><button>Reach Out</button></Link>
        </div>
    </div>
  )
}

export default ArticleSection