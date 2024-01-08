import React from 'react'
import "./footer.css"

const Footer = () => {
  return (
    <footer>
        <div className='left'>
          <p><span>&copy; Dict.ai</span> all rights reserved</p>
        </div>
        <div className='right'>
          <a target='_blank'  rel="noreferrer" href='https://harvservices.com/'>Donate Us🚀</a>
        </div>
    </footer>
  )
}

export default Footer