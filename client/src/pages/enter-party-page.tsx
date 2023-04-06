import { TUser } from "../types/user";
import React, { useState } from "react";
import { useEffect } from "react";
import Session from "../session";
import { TPartyRoom } from "../types/party-room";
import CreateRoom from "../services/party/createRoom";

const EnterPartyPage = () => {
    const [user, setUser] = useState<TUser | null>(null);
    const [description, setDescription] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [id, setId] = useState<string>("");

    useEffect(() => {
        setUser(Session.getUser());
    }, [Session.getUser()])
    return(
        <div className="w-full h-full min-h-screen bg-lblue">
            <div className="grid grid-cols-2">
                <div className="w-11/12 p-3 m-5 bg-white rounded-xl">
                    <h1 className="text-3xl text-center text-navy">Create A Party Room</h1>
                    <div className="flex">
                        <h1 className="text-xl text-navy">Name:</h1>
                        <form className="mt-1 ml-2">
                            <label>
                            <input
                                className="e-input"
                                type="text"
                                value={name}
                                placeholder={"Enter Party Room Name"}
                                onChange={(e) => {
                                setName(e.target.value);
                                }}
                            />
                            </label>
                        </form>
                    </div>
                    <div className="flex">
                        <h1 className="text-xl text-navy">Description:</h1>
                        <form className="mt-1 ml-2">
                            <label>
                            <input
                                className="e-input"
                                type="text"
                                value={description}
                                placeholder={"Enter Description"}
                                onChange={(e) => {
                                setDescription(e.target.value);
                                }}
                            />
                            </label>
                        </form>
                    </div>
                    <button className="p-3 text-white rounded-xl bg-navy"
                    onClick={async () =>{
                        if(user) {
                            const newRoom: TPartyRoom = {
                                ownerUsername: user.username,
                                ownerEmail: user.email,
                                partyName: name,
                                description: description,
                                members: [],
                            };
                            await CreateRoom(newRoom)
                            .then((res) => {
                                if (!res) {
                                 
                                } else {
                                  
                                }
                              })
                              .catch((error) => {
                                
                              });
                        }
                    }}
                    >
                        Create
                    </button>
                </div>
                <div className="w-11/12 p-3 m-5 bg-white rounded-xl">
                <h1 className="text-3xl text-center text-navy">Enter An Existing Party Room</h1>
                    <div className="flex">
                        <h1 className="text-xl text-navy">Room Id:</h1>
                        <form className="mt-1 ml-2">
                            <label>
                            <input
                                className="e-input"
                                type="text"
                                value={id}
                                placeholder={"Enter Party Room Id"}
                                onChange={(e) => {
                                setId(e.target.value);
                                }}
                            />
                            </label>
                        </form>
                    </div>
                    <button className="p-3 text-white rounded-xl bg-navy">
                        Enter
                    </button>
                </div>
               
                
            </div>
        </div>
    );
};
export default EnterPartyPage;