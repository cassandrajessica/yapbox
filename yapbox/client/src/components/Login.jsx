import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/loginstyles.css";
import styles from "../styles/buttons.module.css";
import inputStyle from "../styles/inputfield.module.css";
import arrow from "../images/backArrow.svg";
import loginGirl from "../images/loginImage1.png";

function Login() {
  // state to hold users data entered
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  // holds error messages when data entered isn't valid
  const [validationErr, setValidationErr] = useState({});

  // helps control text for the back arrows signup page visibility
  const [arrowVisible, setArrowVisible] = useState(false);

  // control sign up form visibility
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  // controls homepage visbility
  const [showHomepage, setShowHomepage] = useState(true);

  // use to navigate through pages
  const navigate = useNavigate();

  // handle change when input is entered
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // function to validate input
  function validate(data) {
    let errMsg = {};

    // validate username/
    const usernameRegex = /^[a-zA-Z0-9._]+$/;

    if (!data.username.trim()) {
      errMsg.username = "Please enter a username";
    } else if (data.username.length < 6) {
      errMsg.username = "Username must be atleast 6 characters";
    } else if (!usernameRegex.test(data.username.trim())) {
      errMsg.username = `A username can contain only contain special characters such as ' . ' and ' _ '`;
    }

    // validate email address
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!data.email.trim()) {
      errMsg.email = "Please enter an email address";
    } else if (!emailRegex.test(data.email.trim())) {
      errMsg.email = "Email is not in proper format";
    }

    // validate password
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/;

    if (!data.password.trim()) {
      errMsg.password = "Please enter a password";
    } else if (data.password.length < 8) {
      errMsg.password = "Password must be atleast 8 characters long";
    } else if (!passwordRegex.test(data.password.trim())) {
      errMsg.password =
        "Password must contain atleast 1 uppercase letter, 1 number, and 1 special character";
    }

    // confirming password
    if (!data.confirmPass.trim()) {
      errMsg.confirmPass = "Please confirm your password";
    } else if (data.confirmPass !== userData.password) {
      errMsg.confirmPass = "Password does not match";
    }

    return errMsg;
  }

  // handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = validate(userData);
    setValidationErr(errors);
    if (Object.keys(validationErr).length === 0) {
      console.log("form submitted", userData);
      sendToBackEnd();
    }
  };

  // send user data to backend
  const sendToBackEnd = async() => {
    try {
        const response = await fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username: userData.username,
                email: userData.email,
                password: userData.password,
            })
        })

        const data = await response.json();

        if(response.ok) {
            console.log("successfully sent", data);

            navigate('/setup');
        }

    } catch(err) {
        console.error("Error sending data: ", err);
    }
  }

  // for the 'back to login' text when hovering on signup arrow
  const handleMouseEnter = () => {
    setArrowVisible(true);
  };

  const handleMouseLeave = () => {
    setArrowVisible(false);
  };

  // handles homepage signup button and redirects to signup form
  const signUp = () => {
    setShowSignUpForm(true);
    setShowHomepage(false);
  };

  // goes back to homepage
  const goBack = () => {
    setShowSignUpForm(false);
    setShowHomepage(true);
    setUserData({
      username: "",
      email: "",
      password: "",
      confirmPass: "",
    });
    setValidationErr({});
  };

  return (
    <>
      <div className="loginContainer">
        <div className="innerLoginContainer">
          <div className="cartoonGirlLogin">
            <img src={loginGirl} alt="cartoon image of a girl on her phone" />
          </div>
          <h1 className="title">YapBox</h1>
          <h3 className="desc">
            a messenger app for the yappers built by a yapper
          </h3>

          {!showSignUpForm && showHomepage && (
            <div className="homepage">
              <div id="userSignin" className={inputStyle.field}>
                <input
                  type="text"
                  id="usenameSignin"
                  name="usernameSignin"
                  placeholder="Username"
                />
                <input
                  type="text"
                  id="passwordSignin"
                  name="passwordSignin"
                  placeholder="Password"
                />
              </div>
              <div className="loginBtn">
                <button className={styles.button}>Login</button>
              </div>
              <div className="signUpBtn">
                <p onClick={signUp}>Sign Up</p>
              </div>
            </div>
          )}

          {showSignUpForm && (
            <form
              className={inputStyle.field}
              onSubmit={handleSubmit}
              id="signUpContainer"
            >
              {/* USERNAME FIELD */}
              <div className="usernameSignUp">
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={userData.username}
                  onChange={handleChange}
                />
              </div>
              {validationErr.username && (
                <p className="validateErr">{validationErr.username}</p>
              )}

              {/* EMAIL FIELD */}
              <div className="emailSignUp">
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  value={userData.email}
                  onChange={handleChange}
                />
              </div>
              {validationErr.email && (
                <p className="validateErr">{validationErr.email}</p>
              )}

              {/* PASSWORD FIELD*/}
              <div className="passSignUp">
                <input
                  type="text"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={userData.password}
                  onChange={handleChange}
                />
              </div>
              {validationErr.password && (
                <p className="validateErr">{validationErr.password}</p>
              )}

              {/* CONFIRM PASSWORD FIELD */}
              <div className="confirmPassSignUp">
                <input
                  type="text"
                  id="confirmPass"
                  name="confirmPass"
                  placeholder="Confirm Password"
                  value={userData.confirmPass}
                  onChange={handleChange}
                />
              </div>
              {validationErr.confirmPass && (
                <p className="validateErr">{validationErr.confirmPass}</p>
              )}

              <div className="registerBtn">
                <button className={styles.button}>Sign Up</button>
              </div>

              <div
                className="backArrow"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={goBack}
              >
                <img src={arrow} alt="back arrow" className="backArrowIcon" />
                {arrowVisible && (
                  <p className="backToLogin" onClick={goBack}>
                    {" "}
                    Back to Login
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
