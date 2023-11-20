import { useRouter } from "next/router";
import Layout from "../../components/Layout/Layout";
import UserProfileForm from "../../components/User/UserProfileForm";
import { useEffect, useState } from "react";

const UpdateProfilePage = () => {

  
  const [user, setUser] = useState(null);
  if(user){
    console.log(user)
  }
  // console.log(user.username)

  useEffect(() => {
    // Retrieve user details from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <Layout >
        <div className="updateProfile">
        <h1>Create Profile</h1>
        {/* <p>Updating profile for user: <strong>{user[username]}</strong></p> */}
        {user && (
          <>
          <p>
            Updating profile for user: <strong>{user.username}</strong>
          </p>
           <UserProfileForm user={user} /> 
          </>
        )}
        </div>
    </Layout>
  );
};

export default UpdateProfilePage;
