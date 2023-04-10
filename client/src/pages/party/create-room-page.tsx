const CreateRoomPage = () => {
  return (
    <form>
      <label>
        Party Room Name:
        <input type="text" name="name" />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default CreateRoomPage;
