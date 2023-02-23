/*
  This is a temporary test component for linking to Apple Music API
*/

import React from "react";

// import services
import { useEffect } from "react";
import styled from "styled-components";
import search from "../services/apple-search";

const useScript = (url: string) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

const AppleSearch = () => {
  return (
    <div>
      {/* <form onSubmit={(event) => search(event.target. as string, "songs")}>
        {/* <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <label> */}
      <input
        placeholder="Enter Post Title"
        onChange={(event) => search(event.target.value as string, "songs")}
      />
      <button data-apple-music-skip-to-previous-item></button>
      {/* </label>
        <input type="submit" value="Submit" />
      </form> */}
      {/* <apple-music-artwork
      alt="Fearless (Taylor's Version)"
      source="https://is2-ssl.mzstatic.com/image/thumb/Music124/v4/e0/d7/50/e0d750e8-b290-a8ff-88fe-8cbed749120c/21UMGIM09915.rgb.jpg/{w}x{h}bb.{f}"
      width="250"
      ></apple-music-artwork> */}
      <h1 id="name"></h1>
      <script>
        const artworkElement = document.querySelector('apple-music-artwork');
        artworkElement.source = album.attributes.artwork;
      </script>
    </div>
  );
};

// const AppleSearch = () => {
//   return (
//     <div>
//       <h1>Adding 'a' and 'b'</h1>
//       <form>
//         a: <input type="number" name="a" id="a"><br>
//         b: <input type="number" name="b" id="b"><br>
//         <Button onClick={search(a, b)}>Add</Button>
//         <Button onClick={setUp}>Authorize Apple Music</Button>
//       </form>
//     </div>
//   );
// };

export default AppleSearch;
