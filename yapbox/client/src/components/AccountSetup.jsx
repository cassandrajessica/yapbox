import { useState, useEffect } from "react";
import girlWaving from "../images/setupImages/girlWaving.png";
import "../styles/accountstyles.css";
import inputStyle from "../styles/inputfield.module.css";
import arrow from "../images/setupImages/whiteArrow.svg";
import profilePic from "../images/setupImages/personIcon.svg";

function AccountSetup() {
  // hold users first and last name
  const [nameData, setNameData] = useState({
    firstName: "",
    lastName: "",
  });

  // stores boolean value to handle showing next button
  const [showNext, setShowNext] = useState(false);

  // set profile picture page view to false intitially
  const [showPicUpload, setShowPicUpload] = useState(false);

  // set account name setup page view to true intitially
  const [showNameSetup, setShowNameSetup] = useState(true);

  // hold image upload
  const [file, setFile] = useState();

  // handle change when input is entered
  const handleNameChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...nameData, [name]: value };
    setNameData(updated);
    setShowNext(updated.firstName.trim() && updated.lastName.trim());
    console.log(nameData);
  };

  // handle submission when clicking next
  const handleNext = (e) => {
    e.preventDefault();
    setShowPicUpload(true);
    setShowNameSetup(false);
  };

  // function to get and store file
  const getFile = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  // handles clicking the back button on pic upload page
  const handlePicBackArrow = () => {
    setShowNameSetup(true);
    setShowPicUpload(false);
    setNameData({
      firstName: "",
      lastName: "",
    });
    setFile();
  };

  return (
    <>
      <div className="accountSetupContainer">
        <div className="innerAccountSetupContainer">
          {showNameSetup && (
            <>
              <h1 className="introduction">Hi, welcome to YapBox!</h1>
              <h3 className="introDesc">
                Let's get started. What's your name?
              </h3>
              <form className={inputStyle.field} id="inputContainer">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={nameData.firstName}
                  onChange={handleNameChange}
                  placeholder="First Name"
                />
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={nameData.lastName}
                  onChange={handleNameChange}
                  placeholder="Last Name"
                />
              </form>

              {showNext && (
                <div className="nextArrowContainer">
                  <img
                    src={arrow}
                    alt="next arrow"
                    className="nextArrow"
                    onClick={handleNext}
                  />
                </div>
              )}

              <div className="girlWaving">
                <img src={girlWaving} alt="claymation of a girl waving" />
              </div>
            </>
          )}

          {showPicUpload && (
            <>
              <div className="addProfilePicContainer">
                <h1>
                  Nice To Meet You, <span className="name">Y/N!</span>
                </h1>
                <h3>Upload a profile picture</h3>
                <img
                  src={file ? URL.createObjectURL(file) : profilePic}
                  alt="users profile picture"
                  className="profilePicIcon"
                />
                <div className="profilePicInputContainer">
                  <input type="file" accept="image/*" onChange={getFile} />
                </div>
                <p className="skip">skip</p>
              </div>
              <div className="arrowContainer">
                <img
                  src={arrow}
                  alt="back arrow"
                  className="backArrow"
                  onClick={handlePicBackArrow}
                />
                <img src={arrow} alt="next arrow" className="nextArrow" />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AccountSetup;
