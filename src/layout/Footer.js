import React from 'react'

const Footer = () => {
    const year = new Date().getFullYear()
    return (
      <>
        {/* ========== FOOTER ========== */}
        <footer className='container py-4'>
          <div className='row align-items-md-center text-center text-md-start'>
            <div className='col-md mb-3 mb-md-0'>
              <p className='mb-0'>© Swahilipot Hub. {year} Mombasa, Kenya.</p>
            </div>
            <div className='col-md d-md-flex justify-content-md-end'>
              {/* Socials */}
              <ul className='list-inline mb-0'>
                <li className='list-inline-item'>
                  <a
                    className='btn btn-icon btn-sm btn-ghost-secondary rounded-circle'
                    href='https://www.facebook.com/Swahilipothub/'
                  >
                    <i className='bi-facebook' />
                  </a>
                </li>
                <li className='list-inline-item'>
                  <a
                    className='btn btn-icon btn-sm btn-ghost-secondary rounded-circle'
                    href='https://twitter.com/swahilipothub'
                  >
                    <i className='bi-twitter' />
                  </a>
                </li>
  
                <li className='list-inline-item'>
                  <a
                    className='btn btn-icon btn-sm btn-ghost-secondary rounded-circle'
                    href='https://www.linkedin.com/company/swahilipot-hub'
                  >
                    <i className='bi-linkedin' />
                  </a>
                </li>
              </ul>
              {/* End Socials */}
            </div>
          </div>
        </footer>
        {/* ========== END FOOTER ========== */}
      </>
    )
  
}

export default Footer