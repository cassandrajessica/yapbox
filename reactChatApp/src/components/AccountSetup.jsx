import { useState, useEffect } from 'react';
import girlWaving from '../images/setupImages/girlWaving.png';
import '../styles/accountstyles.css';
import inputStyle from '../styles/inputfield.module.css';
import arrow from '../images/setupImages/whiteArrow.svg';

function AccountSetup() {
    // hold users first and last name 
    const [nameData, setNameData] = useState({
        firstName: '',
        lastName: '',
    });

    // stores boolean value to handle showing next button
    const [showNext, setShowNext] = useState(false);

    // handle change when input is entered
    const handleNameChange = (e) => {
        const {name, value} = e.target;
        const updated = {...nameData, [name] : value };
        setNameData(updated);
        setShowNext(updated.firstName.trim() && updated.lastName.trim());
        console.log(nameData);
    }

    return(
        <>
        <div className="accountSetupContainer">
            <div className="innerAccountSetupContainer">
                <h1 className="introduction">Hi, welcome to YapBox!</h1>
                <h3 className="introDesc">Let's get started. What's your name?</h3>
                <form className= {inputStyle.field} id= "inputContainer">
                    <input
                    type='text'
                    id='firstName'
                    name='firstName'
                    value={nameData.firstName}
                    onChange={handleNameChange}
                    placeholder='First Name' />
                    <input
                    type='text'
                    id='lastName'
                    name='lastName'
                    value={nameData.lastName}
                    onChange={handleNameChange}
                    placeholder='Last Name' />
                </form>

                {showNext && 
                    <div className="backArrowContainer">
                        <img src={arrow} alt='back arrow' className="backArrow" />
                    </div>
                }
                <div className="girlWaving">
                    <img src={girlWaving} alt='claymation of a girl waving'/>
                </div>
            </div>
        </div>
        </>
    )
}

export default AccountSetup;