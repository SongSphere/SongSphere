import { useNavigate, useParams } from "react-router-dom";
import { TUser } from "../types/user";
import Navbar from "../components/navbar";
import { TPartyRoom } from "../types/party-room";
import { useEffect, useState } from "react";
import fetchRoomById from "../services/party/fetch-room-by-id";
import Session from "../session";
import DeleteRoom from "../services/party/delete-room";

const PartyPage = () => {
    const {id} = useParams();
    let navigate = useNavigate();

    const [room, setRoom] = useState<TPartyRoom | null>(null);
    const [user, setUser] = useState<TUser | null>(null);
   
    useEffect(() => {
        setUser(Session.getUser());
      }, [user]);
    
   

    useEffect(() => {
        if(id) {
            fetchRoomById(id).then((res) => {
                setRoom(res);
            });
        }
    }, []);
    if (!user) {
        return <div>fetching user</div>;
      }
    if(!room) {
        return(
            <div>
                Invalid Room Id
            </div>
        )
    }
    return(
        <div className="w-full h-full min-h-screen bg-lgrey">
            <Navbar />
            <h1 className="text-3xl text-center text-navy">Name:{room?.partyName}</h1>
            <h1 className="text-3xl text-center text-navy">Description: {room?.description}</h1>
            <h1 className="text-3xl text-center text-navy">Owner: {room?.ownerUsername}</h1>
            <button className="absolute p-3 text-white bg-navy rounded-xl top-13 right-5"
            onClick={async() => {
                if(user.username === room.ownerUsername) {
                    await DeleteRoom(room).then(() => {
                        navigate(`/`);
                        window.location.reload();
                       })
                }
            }}
            >
                Exit 
            </button>
        </div>
    );
};
export default PartyPage;