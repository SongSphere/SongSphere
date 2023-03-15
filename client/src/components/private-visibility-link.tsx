import fetchUser from "../services/fetch-user";
import setVisibilityPrivate from "../services/set-visibility-private";
import setVisibilityPublic from "../services/set-visibility-public";


import { TUser } from "../types/user";

interface IPrivateVisibilityLinkProps {
    user: TUser | null;
    setUser: React.Dispatch<React.SetStateAction<TUser | null>>


}

const SetPrivateLink = (props: IPrivateVisibilityLinkProps) => {
    return (
        <div>
            <button 
                className="p-2 bg-blue-400 rounded-md"
                onClick={async () => {
                    try {
                        await setVisibilityPrivate(props.user?.email);
                    } catch (error) {
                        console.error(error);

                    }

                    try {
                        await props.setUser(await fetchUser());
                      } catch (error) {
                        console.error(error);
                    }
                }}
                >
                Set Visibility Private
            </button>


            
        </div>

    );

};

export default SetPrivateLink;