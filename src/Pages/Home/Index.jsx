import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Homeleft from "../../Component/HomeComponent/Homeleft";
import EmailverifiedPage from "../../Component/HomeComponent/EmailverifiedPage";

const Home = () => {
  const auth = getAuth();

  const [isEmailVerified, setisEmailVerified] = useState(null);
  const [DisplayName, setDisplayName] = useState(null);
  const [email, setemail] = useState(null);
  // Now track the recently sign in user on useEffect
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { emailVerified, displayName, email } = user;
        setisEmailVerified(emailVerified);
        setDisplayName(displayName);
        setemail(email);
        // console.log("current user is emailverified , ", email);
      }
    });
  }, []);
  return (
    <>
      {isEmailVerified ? (
        <>
          <Homeleft />
        </>
      ) : (
        <>
          <EmailverifiedPage userName={DisplayName} email={email} />
        </>
      )}
    </>
  );
};

export default Home;
