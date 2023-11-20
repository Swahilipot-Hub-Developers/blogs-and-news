import React from 'react'
import Header from './Header';
import Footer from './Footer';
import Metadata from './Metatags';


const Layout = ({children}) => {
  return (
    <>
        <Metadata/>
        <Header />
        <main id='content' role="main">
            {children}
        </main>
        <Footer />
    </>
  )
}

export default Layout