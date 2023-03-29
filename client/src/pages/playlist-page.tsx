import { TUser } from "../types/user";
import Navbar from "../components/navbar";
import { useState } from "react";
import { useEffect } from "react";
import Session from "../session";
import fetchUserByUsername from "../services/user/fetch-user-username";
import React from "react";

const PlaylistPage = () => {
    const [user, setUser] = useState<TUser | null>(null);
    const[followers, setFollowers] = React.useState(false);
    useEffect(() => {
        setUser(Session.getUser());
        
      }, [Session.getUser()]);
      useEffect(() => {
        if(user) {
          if(user.following.length > 0) {
            setFollowers(true);
          }
        }
      }, [user])
    return(
        <div className="w-screen h-screen bg-lblue">
            <Navbar />
            <div>
            {followers ? (
                <div>
                    <div className="mt-10 text-center text-white">
                        <h1 className="text-4xl">My Playlist</h1>
                        <h1 className="text-xl">A custom playlist made just for you based on the people you follow</h1>
                    </div>
                </div>
            ):(
                <div className="mt-10 text-center text-white">
                    <div className="text-4xl">
                        You dont follow anyone yet, so we cant make a playlist for you.
                    </div>
                    <div className="text-2xl">
                        Come back later to see a playlist created based on the people you follow!
                    </div>
                </div>
                
            )}
            </div>
            
        </div>
    )

};
export default PlaylistPage