import Link from 'next/link';
import { FaFacebook, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const DetailPage = ({ title, disabled }) => {
  const imgUrl ="/public/images/technology.jpeg"

  const router = useRouter();
  const [formData, setFormData] = useState({
      username: '',
      password: '',
      email:'',
      confirm_password:''
  });
  // console.log(formData)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      

      if (title === 'LOGIN') {
        const response = await axios.post('http://127.0.0.1:8000/login/', formData);
        if(response.data.message === 'Login successful'){
          localStorage.setItem('user', JSON.stringify(response.data.user))
          router.push(`/dashboard/${response.data.user.username}`)

        }

      } else if (title === 'SIGN UP') {
        if (formData.password !== formData.confirm_password) {
          console.error('Passwords do not match');
          return;
        }
        await axios.post('http://127.0.0.1:8000/signup/', formData);
        router.push('/login')
      }
    } catch (error) {
      console.error(`${title} failed:`, error);
    }
  };

  return (

      <section className="ftco-section">
      <div className="container">
      
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-10">
            <div className="wrap d-md-flex">
              <div className="imgDetails" style={{ borderRadius:"20px", width:"30vw", }}>  
              
              </div>
              <div className="login-wrap p-4 p-md-5" style={{width:"30vw",borderRight:"1px dotted grey", borderRadius:"20px", boxShadow:"1px 1px 2px"}}>
                <div className="d-flex">
                  <div className="w-100">
                    <h3 className="mb-4">{title}</h3>
                  </div>
                  <div className="w-100">
                    <p className="social-media d-flex justify-content-end">
                          <a className="btn btn-icon btn-sm btn-ghost-secondary rounded-circle" href="https://www.linkedin.com/company/swahilipot-hub">
                              <FaLinkedin/>
                          </a>
                          <a className="btn btn-icon btn-sm btn-ghost-secondary rounded-circle" href="https://www.twitter.com/swahilipothub">
                              <FaXTwitter/>
                          </a>
                          <a className="btn btn-icon btn-sm btn-ghost-secondary rounded-circle" href="https://www.facebook.com/Swahilipothub/">
                              <FaFacebook/>
                          </a>
                    </p>
                  </div>
                </div>
              
                  <div className="form-group mb-3">
                    <label className="label" for="name">Username</label>
                    <input type="text" className="form-control" placeholder="Username"
                      value={formData.username || ''}
                      name='username'
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="form-group mb-3">
                  {!disabled ? (
                    <>
                      <label className='label' for="email">Email:</label>
                      <input
                        type='email'
                        name='email'
                        className="form-control"
                        placeholder='Enter your Email address'
                        value={formData.email || ''}
                        onChange={handleChange}
                      />
                    </>
                  ) : ('')}
                  </div>
                  <div className="form-group mb-3">
                    <label className="label" for="password">Password</label>
                    <input type="password"name='password' className="form-control" 
                      placeholder="Password" 
                      value={formData.password || ''}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="form-group mb-3">
                  {!disabled ? (
                      <>
                        <label>Confirm Password:</label>
                        <input
                          type='password'
                          name='confirm_password'
                          className="form-control" 
                          placeholder='Enter password'
                          value={formData.confirm_password || ''}
                          onChange={handleChange}
                          required
                        />
                      </>
                    ) : ('')}
                  </div>
                  <div className="form-group">
                    <button type="button" onClick={handleSubmit} className="form-control btn btn-primary rounded submit px-3">{title}</button>
                  </div>
                  <div className="form-group d-md-flex">
                    <div className="w-50 text-left ">
                      <label className="checkbox-wrap checkbox-primary mb-0">Remember Me
                      <input type="checkbox" defaultChecked />
                      <span className="checkmark"></span>
                      </label>
                    </div>
                    {/* <div className="w-50 text-md-right">
                      <a href="#" style={{color:"blue"}}>Forgot Password</a>
                    </div> */}
                  </div>

                {!disabled? (
                  <p className="text-center">Already a member?  <Link href='/login'
                    ><span style={{color:"blueviolet", cursor:"pointer"}}>Sign In</span></Link></p>
                  ) : (
                    <p className="text-center">Not a member?  <Link href='/signup'
                    ><span style={{color:'blueviolet', cursor:"pointer"}}>Sign Up</span></Link></p>
                )
                }
                
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
  );
};

export default DetailPage;