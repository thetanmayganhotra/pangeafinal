import React from 'react';
import {Col, Container, Image, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import './RegisterForm.scss'
const Footer = () => {
  return (
    <div className="greyscheme">
    <section className='container'>
    <div className="row">
    <div className='spacer-double'></div>
    <div className="col-md-8 offset-md-2">
        <h3>Don't have an account? Register now.</h3>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>

        <div className="spacer-10"></div>

      <form name="contactForm" id='contact_form' className="form-border" action='#'>

            <div className="row">

                <div className="col-md-6">
                    <div className="field-set">
                        <label>Name:</label>
                        <input type='text' name='name' id='name' className="form-controls"/>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="field-set">
                        <label>Email Address:</label>
                        <input type='email' name='email' id='email' className="form-controls"/>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="field-set">
                        <label>Choose a Username:</label>
                        <input type='text' name='username' id='username' className="form-controls"/>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="field-set">
                        <label>Phone:</label>
                        <input type='phone' name='phone' id='phone' className="form-controls"/>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="field-set">
                        <label>Password:</label>
                        <input type='password' name='password' id='password' className="form-controls"/>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="field-set">
                        <label>Re-enter Password:</label>
                        <input type='password' name='re-password' id='re-password' className="form-controls"/>
                    </div>
                </div>
                <div className="col-md-12">
                    <div id='submit' className="pull-left">
                        <input type='submit' id='send_message' value='Register Now' className="btn btn-main color-2" />
                    </div>
                    
                    <div className="clearfix"></div>
                </div>

                        </div>
                    </form>
      </div>

    </div>
  </section>

  
</div>
  )
}

export default Footer
