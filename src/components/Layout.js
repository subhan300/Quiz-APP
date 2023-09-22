import React, { useEffect, useState } from 'react'
import Footer from './footer'
import GlobalFunctions from '../../lib/GlobalFunctions';
import contentful from '../../lib/contentful';
import Navbar from './navbar';

function Layout({children}) {
    const [menuCollection, setMenuCollection] = useState([]);
    const getAllQuizes = async () => {
        const allQuizes = await contentful.fetchEntries();
        const menus = GlobalFunctions.filterDuplicates(allQuizes);
        const temperMenu = menus.map((val) => {
          let slug = val.sys.contentType.sys.id;
          let title = slug.slice(5);
          return { slug:`/cefr/${slug}`, title };
        });
        setMenuCollection(temperMenu);
      };
      useEffect(() => {
        getAllQuizes();
      }, []);
  return (
    <>
       <Navbar menuCollection={menuCollection} />
         {children}
       <Footer />
    </>
  )
}

export default Layout
