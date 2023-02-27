const PostPage = () => {
  return (
    //page container
    <div className="grid justify-center w-screen h-screen grid-cols-4 grid-rows-4 bg-navy">
      <div className="grid grid-cols-3 col-start-2 col-end-4 row-start-1 row-end-4 rounded-lg bg-lgrey">
        <div className="col-span-2 rounded-lg">
          <form>
            <select>
              <option selected value="null">
                Search For
              </option>
              <option value="song">Song</option>
              <option value="artist">Artist</option>
              <option value="album">Album</option>
            </select>
          </form>
          <h1>Enter Caption:</h1>
          <form>
            <label w-20 h-20>
              <input type="text" />
            </label>
          </form>
          <button className="my-5 border-black rounded-md text-lgrey bg-navy">
            Sumbit
          </button>
        </div>
        <div className="col-span-1 rounded-lg">
          <form>
            <label w-20 h-20>
              {" "}
              Search
              <input type="text" />
            </label>
          </form>
          <button className="my-5 border-black rounded-md text-lgrey bg-navy">
            Sumbit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
