import React from 'react'
import Header from './header'

function QuizLayout({children}) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default QuizLayout
