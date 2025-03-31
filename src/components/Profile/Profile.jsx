import { useSelector } from "react-redux";
import { selectUserName, selectUserEmail, selectUserPic } from "./Features/userSlice";

const Profile = () => {
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);
  const userPic = useSelector(selectUserPic);

  return (
    <div>
      <img src={userPic} alt="User Profile" />
      <h1>{userName}</h1>
      <p>{userEmail}</p>
    </div>
  );
};
export default Profile;