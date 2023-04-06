export type TPartyRoom = {
    id?: string;
    ownerUsername: string;
    ownerEmail: string;
    partyName: string;
    description: string;
    members: Array<String>;
};