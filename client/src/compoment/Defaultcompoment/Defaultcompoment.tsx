import React from 'react'
import Header from '../HeaderCompoment/HeaderCompoment'
import Footer from '../FooterCompoment/FooterCompoment'
export default function Defaultcompoment({children}: {children:React.ReactNode}) {
  return (
    <div>
        <Header/>
        {children}
        <Footer/>
    </div>
  )
}
