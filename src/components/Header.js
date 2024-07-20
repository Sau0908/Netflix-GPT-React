import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  console.log(user);

  const handleSignOutButton = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className=" absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
        <img
          src="https://images.ctfassets.net/4cd45et68cgf/7LrExJ6PAj6MSIPkDyCO86/542b1dfabbf3959908f69be546879952/Netflix-Brand-Logo.png?w=700&h=456"
          alt="Netflix Logo"
          className="w-44 "
        />
        <div className="flex">
          {user && (
            <div>
              <img className="w-12 " src={user?.photoURL} alt="user avatar" />
            </div>
          )}
          {user && (
            <div>
              <button
                onClick={handleSignOutButton}
                className="text-white hover:pointer"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
