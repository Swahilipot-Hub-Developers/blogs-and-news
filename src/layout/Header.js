import React from 'react'

const Header = () => {
  return (
   //  <div className='headerSect '>
   //     <div className='leftHeader '>
   //        <h1>BLOGS & NEWS</h1>
   //     </div>
   //     <div className='rightHeader'>
   //        <p>“ What you do after you create your content is what truly counts.” </p>
   //     </div>
   //  </div>
       <header>
         <div className="logo">
         <h1 className="logo-text"><span>Swahilipot</span> News and Blogs</h1>
         </div>
         <i className="fa fa-bars menu-toggle"></i>
         <ul className="nav">
         <li><a href="/Home">Home</a></li>
         <li><a href="/About">About</a></li>
         <li><a href="/Department's blogs">Departments blogs</a></li>
         {/* <li><a href="/Sign Up">Sign Up</a></li>
         <li><a href="/Login">Login</a></li> */}

         {/* This bellow we will show when user is logged in */}
         {/* <li>
            <a href='#'>
               <i className="fa fa-user"></i>
               Action
               <i className="fa fa-chevron-down" style={{fontSize: "1em"}}></i>
               <ul>
                  <li><a href="#">Dashboard</a></li>
                  <li><a href="#" className="logout">Logout</a></li>
               </ul>
               </a>
          </li> */}
      </ul>
      </header>
  )
}

export default Header