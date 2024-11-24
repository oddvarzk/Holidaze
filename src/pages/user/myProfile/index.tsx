import { useEffect, useState } from "react";
import { load } from "../../../components/storage";
import createIcon from "../../../assets/createIcon.svg";

interface User {
  name: string;
  email: string;
  avatar: {
    url: string;
    alt: string;
  };
  banner: {
    url: string;
    alt: string;
  };
  vennueManager: boolean;
}

export function MyProfile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = load("user");
    if (userData) {
      setUser(userData);
    } else {
      // Redirect to login if user data is not available
      window.location.href = "/login";
    }
  }, []);

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="container max-w-full mx-auto py-5">
      <div>
        <div>
          {user.avatar && (
            <div className="flex flex-col justify-center text-center">
              <div className="flex justify-center">
                <img
                  className="rounded-full h-32"
                  src={user.avatar.url}
                  alt={user.avatar.alt}
                />
              </div>
              <div className="mb-5">
                <p className="text-btns font-Montserrat mt-1">
                  Edit profile picture
                </p>
              </div>
            </div>
          )}
        </div>
        <div>
          <div className="mx-auto mb-10 w-fit md:max-w-full">
            <h1 className="font-Playfair text-2xl py-5 text-tiner font-medium">
              Your information
            </h1>
            <div className="flex flex-wrap justify-center md:justify-center bg-tin px-1 md:px-5 py-5 text-paleSand md:gap-20 shadow-2xl rounded-lg">
              <div>
                <div className="flex px-5 md:px-5 flex-col font-Montserrat py-5">
                  <p className="font-light mb-3">
                    <span className="font-semibold">Username: </span>
                    {user.name}
                  </p>
                  <p className="font-light mb-3">
                    <span className="font-semibold">Email: </span>
                    {user.email}
                  </p>
                  <p className="font-light mb-3">
                    <span className="font-semibold">Venue Manager: </span>
                    {user.vennueManager}
                  </p>
                  <p className="font-light mb-3">
                    <span className="font-semibold">Active venues: </span>
                    {user.vennueManager}
                  </p>
                </div>
              </div>
              <div className="px-5 mb-3 items-center flex flex-col font-Montserrat">
                <h1 className="py-5">Switch account to venue manager?</h1>
                <button className="bg-btns py-2 px-5 hover:bg-amber-100 hover:text-charcoal">
                  Become venue manager
                </button>
              </div>
            </div>
          </div>
          <div className="px-5 w-fit mx-auto mb-10">
            <div className="flex flex-row gap-5">
              <h1 className="font-Playfair text-2xl text-tiner font-medium">
                Active listings
              </h1>
              <div className="flex mt-1">
                <img className="h-7" src={createIcon}></img>
                <p className="px-1 font-Montserrat mt-1 text-sm text-btns">
                  Create listing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
