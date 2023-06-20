import React, { useState } from 'react';
import axios from 'axios';
import "../Styles/LoginModal.css"
import SignUpModal from './SignUpModal';

axios.defaults.withCredentials = true;
const LoginModal = ({ setIsAdmin,show, handleClose,setLoggedIn}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:8800/auth/login', {
          email,
          password
        });
        if (response.data.success === true) {
          // Registration successful
          console.log("success");
          setLoggedIn(true);
          setIsAdmin(response.data.isAdmin)
          handleClose(true); // Close the modal
          
        } else {
          // Handle other response statuses or error cases
          alert(response.data.error);
        }
      } catch (error) {
        // Handle error
        console.error('Error logging user:', error);
      }
  };

  const handleSignUpModal = () => {
    setShowSignUpModal(true);
  };

  return (
    <div className={`modal ${show ? 'show' : ''}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Login</h5>
            <button type="button" className="close" onClick={handleClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <br></br>
            <p>Don't have an account? <button className="btn btn-primary" onClick={handleSignUpModal}>Sign Up</button></p>
          </div>
        </div>
      </div>
      {showSignUpModal && (
        <SignUpModal
          show={showSignUpModal}
          handleClose={() => setShowSignUpModal(false)}
        />
      )}
    </div>
  );
};

export default LoginModal;
