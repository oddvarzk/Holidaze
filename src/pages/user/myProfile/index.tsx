import { useEffect, useState } from "react";
import { load } from "../../../components/storage"; // Adjust the import path

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
  // Include other user fields as necessary
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
    <div className="container mx-auto py-5">
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      {/* Display avatar and banner if available */}
      {user.avatar && (
        <div>
          <img src={user.avatar.url} alt={user.avatar.alt} />
        </div>
      )}
      {user.banner && (
        <div>
          <img src={user.banner.url} alt={user.banner.alt} />
        </div>
      )}
      {/* Other user information */}
    </div>
  );
}

export default MyProfile;
