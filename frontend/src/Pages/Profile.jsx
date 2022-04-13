import "../styles/Profile.css"
import TopBar from "../components/Topbar";
import RightBar from "../components/RightBar"
import Feed from "../components/Feed"

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <>
        <TopBar />
        <div className="profile">
            <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                        <img className="profileCoverImg" src={`${PF}post/middleEarth.jpg`}alt="" />
                        <img className="profileUserImg" src="assets/Frodo.jpeg" alt="" />
                    </div>
                    <div className="profileInfo">
                        <h4 className="profileInfoName">Frodo Baggins</h4>
                        <span className="profileInfoDesc">Hello my friends from the middle Earth!</span>
                    </div>
                </div>
                <div className="profileRightBottom"></div>
                <Feed />
                <RightBar />
            </div>
        </div>
      
    </>
    )
}