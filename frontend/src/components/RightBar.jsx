import "../styles/RightBar.css"

export default function RightBar() {

    const ProfileRightBar = () => {
        return (<h1>Hey its profile</h1>)
    }
    return (
        <div className="rightBar">
            <div className="rightBarWrapper">
                <ProfileRightBar />
            </div>
        </div>
    )
}