import { useSelector } from "react-redux";
import { selectUserName, selectUserEmail, selectUserPic } from "../../Features/userSlice";
import { Edit2, LogOut } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

const Profile = () => {
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);
  const userPic = useSelector(selectUserPic);

  // Check if userEmail is not null or undefined before trimming it
  const email = userEmail ? userEmail.trim().toLowerCase() : "default@example.com"; // fallback to default email if null or undefined

  // Generate Gravatar URL from email
  const gravatarUrl = `https://www.gravatar.com/avatar/${email}?d=identicon`;

  return (
    <Card className="max-w-sm mx-auto p-6 bg-gray-100 shadow-lg rounded-lg mt-20">
      <CardContent className="flex flex-col items-center space-y-4">
        {/* User Profile Picture (fallback to Gravatar if no userPic) */}
        <img 
          className="w-20 h-20 rounded-full border-4 border-blue-500" 
          src={userPic || gravatarUrl} 
          alt="User Profile" 
          onError={(e) => { e.target.src = gravatarUrl; }} // Fallback to Gravatar if image fails
        />
        
        {/* User Name */}
        <h1 className="text-xl font-semibold text-gray-800">{userName || "Anonymous User"}</h1>
        
        {/* User Email */}
        <p className="text-sm text-gray-600">{userEmail || "No email provided"}</p>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Edit2 className="w-4 h-4" /> Edit
          </Button>
          <Button variant="destructive" className="flex items-center gap-2">
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Profile;
