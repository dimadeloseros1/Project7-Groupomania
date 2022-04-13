import "../styles/Share.css"
import { PermMedia } from "@mui/icons-material"

export default function Share() {
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src="/assets/Frodo.jpeg" alt="frodo-pic" />
                    <input 
                        placeholder="What's in your mind?"
                        className="shareInput" 
                    />
                </div>
                <hr className="shareHr"/>
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <PermMedia htmlColor="orange" className="shareIcon" />
                            <span className="shareOptionText">Photo or video</span>
                        </div>
                    </div>
                    <button className="shareButton">Share</button>
                </div>
            </div>
        </div>
    )
}