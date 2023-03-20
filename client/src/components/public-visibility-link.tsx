import fetchUser from "../services/general/fetch-user";
import SetVisibilityPublic from "../services/settings/set-visibility-public";


import { TUser } from "../types/user";

interface IPublicVisibilityLinkProps {
    user: TUser | null;
    setUser: React.Dispatch<React.SetStateAction<TUser | null>>
}

const SetPublicLink = (props: IPublicVisibilityLinkProps) => {

    return(
        <div>
            <button 
                className="p-2 bg-blue-400 rounded-md"
                onClick={async () => {
                    try {
                        await SetVisibilityPublic(props.user?.email);
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
                Set Visibility Public
            </button>

        </div>

    );
}

export default SetPublicLink;