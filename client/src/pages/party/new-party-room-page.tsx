import PartyRoomLayout from "../../layouts/party-room-layout";

const PartyRoomPage = () => {
  const left = <div>left</div>;
  const middle = <div>middle</div>;
  const right = <div>right</div>;
  return <PartyRoomLayout left={left} middle={middle} right={right} />;
};

export default PartyRoomPage;
