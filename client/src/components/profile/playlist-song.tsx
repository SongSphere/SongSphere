import { TMusicContent } from "../../types/music-content";
import { TUser } from "../../types/user";
import { useNavigate } from "react-router-dom";


interface IListProps {
    song: TMusicContent;
    setSong: React.Dispatch<React.SetStateAction<TMusicContent | null>>;
    user: TUser;
  }
  

const PlaylistSong = (props: IListProps) => {
    let navigate = useNavigate();

    return (
        <div className="flex w-full p-2 border-t-2 cursor-pointer border-t-gray-400 bg-navy drop-shadow-md"
        onClick={() => {
            props.setSong(props.song);
        }}>
            
            <div className="text-lgrey">
                <div>
                    {props.song.name}
                </div>
                <div>
                    {props.song.artist}
                </div>
            </div>
            
        </div>
    )
};
export default PlaylistSong;