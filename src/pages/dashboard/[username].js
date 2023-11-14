import Layout from "../../components/Layout/Layout";
import UserProfileForm from "../../components/User/UserProfileForm";

const UpdateProfilePage = ({ username }) => {
  return (
    <Layout username={username} >
        <div className="updateProfile">
        <h1>Update Profile</h1>
        <p>Updating profile for user: <strong>{username}</strong></p>
          <UserProfileForm username={username} />
        </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { username } = context.params;
  return {
    props: {
      username,
    },
  };
}

export default UpdateProfilePage;
