import { AiOutlineUser } from "react-icons/ai";

interface authorizedViewProps {
  userLogout: () => void;
  userDetail: {
    firstName: string;
    lastName: string;
  };
}

export default function AuthorizedView({
  userLogout,
  userDetail,
}: authorizedViewProps) {
  return (
    <div className="flex items-center">
      <AiOutlineUser />
      <div className="text flex flex-col">
        <div className="cursor-pointer">
          <span className="navbar-tool-tooltip">
            Welcome {userDetail.firstName}
          </span>
          <div className="mx-3">
            <div className="flex flex-col mr-3">
              <span>Hello,</span>{" "}
              <span className="text-blue-500 font-bold">
                {`${userDetail.lastName} ${userDetail.firstName}`}{" "}
              </span>
            </div>
          </div>
        </div>
        <div onClick={userLogout} className="logout-user cursor-pointer">
          <span className="mx-1">Logout</span>
          <p className="logout mb-0 hover:text-red-500">Logout</p>
        </div>
      </div>
    </div>
  );
}
