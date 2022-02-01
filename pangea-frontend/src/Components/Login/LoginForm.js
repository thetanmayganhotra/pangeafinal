import React from 'react';
import {Col, Container, Image, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import './login.scss'
const Footer = () => {
  return (
    <div style={{marginTop:"150px"}}>
        <section className='container'>
          <div className="row">
          <div className="col-md-6 offset-md-3">

            <form name="contactForm" id='contact_form' className="form-border" action=''>
                <h5 className='hr5_color_grey'>Login to your account</h5>
                <br/> <br/>
                <div className="field-set">
                    <label>Username</label>
                    <input type='text' name='name' id='name' className="form-controls" placeholder=""/>
                </div>


                  <div className="field-set">
                      <label>Password</label>
                      <input type='password' name='email' id='email' className="form-controls" placeholder=""/>
                  </div>

          <div id='submit'>
              <input type='submit' style={{color:"white"}} id='send_message' value='Login' className="btns btn-main color-2"/>
              <div className="clearfix"></div>

              <div className="spacer-single"></div>

              <ul className="list s3">
                <h6 className='#606060'>
                  Or login with:
                <a href='#'> <span style={{color:"red"}}> - Facebook</span></a>
                <a href='#'><span style={{color:"red"}}> - Google</span></a>
                <a href='#'><span style={{color:"red"}}> - Instagram</span></a></h6>
              </ul>
          </div>
      </form>

      </div>
    </div>
  </section>
    </div>
  )
}

export default Footer
