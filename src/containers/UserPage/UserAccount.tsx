import { Helmet } from "react-helmet";
import UserLayout from "./UserLayout";
import { FC } from "react";
import UserCard from "./UserComponents/UserCard";
import UserWishList from "./UserComponents/UserWishList";
import UserReviews from "./UserComponents/UserReviews";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

// import ButtonPrimary from "shared/Button/ButtonPrimary";

export interface UserAccountProps {
  className?: string;
}

const UserAccount: FC<UserAccountProps> = ({ className = "" }) => {
  
  const navigate = useNavigate();
  const { user, loading,logout } = useAuth();

  if (loading) return <div>loading......</div>;

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className={`nc-UserAccount ${className}`} data-nc-id="UserAccount">
      <Helmet>
        <title>Solitary Holidays || Accounts</title>
      </Helmet>
      <UserLayout>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 pr-4 md:pr-8">
            <div className="sticky top-20">
              <UserCard userId={user?.id} logout={logout}/>
            </div>
            
          </div>
          {/* Right Side - UserWishList (top) and UserReviews (bottom) */}
          <div className="lg:w-1/2 mt-4 lg:mt-0">
            <div className="lg:pl-4">
              <UserWishList userId={user?.id}/>
            </div>
            <div className="lg:pl-4 mt-4">
              <UserReviews userId={user?.id}/>
            </div>
          </div>
        </div>
      </UserLayout>
    </div>
  );
};

export default UserAccount;
