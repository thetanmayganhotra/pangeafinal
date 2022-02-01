import React from 'react';
// import emailjs from 'emailjs-com';

import { createGlobalStyle } from 'styled-components';

const contact= function() {

  function sendEmail(e) {

    const success = document.getElementById("success");
    const button = document.getElementById("buttonsent");
    const failed = document.getElementById("failed");
    e.preventDefault();

    // emailjs.sendForm('gmail', 'template_csfdEZiA', e.target, 'UUUUUUUUUUUUUUU')
    //   .then((result) => {
    //       console.log(result.text);
    //       // success.classList.add('show');
    //       // button.classList.add('show');
    //       // failed.classList.remove('show');
    //   }, (error) => {
    //       console.log(error.text);
    //       // failed.classList.add('show');
    //   });
  }

  return (
  <div className="greyscheme">
  


      <section className='container'>
        <div className='row'>
          <div className='col-lg-8 mb-3'>
          <h3>Do you have any question?</h3>
            <div className="form-side">
              <form className="formcontact" onSubmit={sendEmail}>
                <input type="text" className="form-controls" name="user_name" placeholder="Your Name" required />
                <input type="email" className="form-controls" name="user_email" placeholder="Your Email" required />
                <input type="text" className="form-controls" name="user_phone" placeholder="Your Phone" required />
                <textarea name="message" className="form-controls" placeholder="Your Message" required />
                <div id='success' className='hide'>Your message has been sent...</div>
                <div id='failed' className='hide'>Message failed...</div>
                <input type='submit' id='buttonsent' value='Submit Now' className="btn btn-main color-2" />
              </form>
            </div>
          </div>

          <div className='col-md-4'>
           
           <div className="padding40 box-rounded mb30">
              <h3>US Office</h3>
              <address className="s1">
                <li><span><i className="id-color fa fa-map-marker fa-lg"></i>08 W 36th St, New York, NY 10001</span></li>
                <li><span><i className="id-color fa fa-phone fa-lg"></i>+1 333 9296</span></li>
                <li><span><i className="id-color fa fa-envelope-o fa-lg"></i><span className='btn'>contact@example.com</span></span>
                </li>
                <li><span><i className="id-color fa fa-file-pdf-o fa-lg"></i><span className='btn'>Download Brochure</span></span></li>
              </address>
            </div>
            <br/>
            <div className="padding40 box-rounded mb30 text-light">
              <h3>AU Office</h3>
              <address className="s1">
                <li><span><i className="fa fa-map-marker fa-lg"></i>100 Mainstreet Center, Sydney</span></li>
                <li><span><i className="fa fa-phone fa-lg"></i>+61 333 9296</span></li>
                <li><span><i className="fa fa-envelope-o fa-lg"></i><span className='btn'>contact@example.com</span></span></li>
                <li><span><i className="fa fa-file-pdf-o fa-lg"></i><span className='btn'>Download Brochure</span></span></li>
              </address>
            </div>

          </div>

        </div>
      </section>
      
    </div>
  );
}
export default contact;
