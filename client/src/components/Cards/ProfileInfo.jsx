import { getInitials } from "../../utils/getInitials"


const ProfileInfo = ({userInfo, onLogout}) => {
  return (
    <div className="flex items-center gap-3">
      {userInfo && <div className="border-[2px] rounded-full p-3 font-medium bg-slate-100 cursor-pointer">{getInitials(userInfo?.fullName)}</div>}
      <div>
      <p className="text-sm font-medium">
        {userInfo?.fullName}
      </p>
      {userInfo && <button className="text-sm text-slate-700 underline" onClick={onLogout}>Logout</button>}
      </div>
    </div>
  )
}

export default ProfileInfo
