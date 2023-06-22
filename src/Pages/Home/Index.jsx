import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Homeleft from "../../Component/HomeComponent/Homeleft";
import EmailverifiedPage from "../../Component/HomeComponent/EmailverifiedPage";
import HomeRight from "../../Component/HomeComponent/HomeRight";

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
      }
    });
  }, []);

  return (
    <>
      {isEmailVerified ? (
        <div className="flex">
          <div className="h-screen">
            <Homeleft active="home" />
          </div>
          <div className="">
            <HomeRight />
          </div>
        </div>
      ) : (
        <>
          <EmailverifiedPage userName={DisplayName} email={email} />
        </>
      )}
    </>
  );
};
{
  /* h-[40%] w-[32%] */
}
export default Home;
