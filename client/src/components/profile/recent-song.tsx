import { TMusicContent } from "../../types/music-content";
import { TUser } from "../../types/user";
import { useNavigate } from "react-router-dom";


interface ISongProps {
    song: TMusicContent;
    setSong: React.Dispatch<React.SetStateAction<TMusicContent | null>>;
    user: TUser;
  }
  

const RecentSong = (props: ISongProps) => {
    let navigate = useNavigate();

    return (
        <div className="flex w-full p-6 mb-8 bg-white rounded-lg drop-shadow-md">
            <div className="w-32 h-32 cursor-pointer"
             onClick={() => {
                navigate(`/posts/${props.song.name}`);
            }}
            >
                <img className="rounded-sm" src={props.song.cover}></img>
            </div>
            <div className="my-auto ml-5 cursor-pointer"
             onClick={() => {
                navigate(`/posts/${props.song.name}`);
            }}
            >
                <h1 className="text-3xl text-navy">{props.song.name}</h1>
                <h1 className="text-3xl text-navy">{props.song.artist}</h1>
            </div>
            <div className="absolute w-10 h-10 cursor-pointer bottom-5 right-5"
             onClick={() => {
                props.setSong(props.song);
            }}
            >
                <img src="/img/icons/play.png" />
            </div>
        </div>
    )
};
export default RecentSong;