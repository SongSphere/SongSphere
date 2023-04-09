import { useState } from "react";
import { TMusicContent } from "../../types/music-content";

const songsList = [
  {
    name: "Mo Bamba",
    artist: "Sheck Wes",
    albumName: "MUDBOY",
    id: "1xzBco0xcoJEDXktl7Jxrr",
    service: "spotify",
    cover: "https://i.scdn.co/image/ab67616d0000b27359cd47039c5b10ed919fbaa8",
  },
  {
    name: "monster",
    artist: "21 Savage",
    albumName: "i am > i was",
    id: "2FUNBaa5DwItJtYEBgAblU",
    service: "spotify",
    cover: "https://i.scdn.co/image/ab67616d0000b273280689ecc5e4b2038bb5e4bd",
  },
  {
    name: "Money Trees",
    artist: "Kendrick Lamar",
    albumName: "good kid, m.A.A.d city",
    id: "2HbKqm4o0w5wEeEFXm2sD4",
    service: "spotify",
    cover: "https://i.scdn.co/image/ab67616d0000b273d28d2ebdedb220e479743797",
  },
  {
    name: "Mockingbird",
    artist: "Eminem",
    albumName: "Encore (Deluxe Version)",
    id: "561jH07mF1jHuk7KlaeF0s",
    service: "spotify",
    cover: "https://i.scdn.co/image/ab67616d0000b273726d48d93d02e1271774f023",
  },
  {
    name: "spend the money (feat. Lil Uzi Vert)",
    artist: "Fousheé",
    albumName: "spend the money (feat. Lil Uzi Vert)",
    id: "41YVTpCekLuRWZn4YpqCAW",
    service: "spotify",
    cover: "https://i.scdn.co/image/ab67616d0000b273a5694d81dcfcaf3579f1ac0c",
  },
  {
    name: "Savage Mode",
    artist: "21 Savage",
    albumName: "Savage Mode",
    id: "52hRcWmjRNFuVJv3Qi7EeF",
    service: "spotify",
    cover: "https://i.scdn.co/image/ab67616d0000b2732dd1ac4a61495080ef8f78ca",
  },
  {
    name: "Moonlight",
    artist: "Kali Uchis",
    albumName: "Moonlight",
    id: "2i2gDpKKWjvnRTOZRhaPh2",
    service: "spotify",
    cover: "https://i.scdn.co/image/ab67616d0000b273b13b4a434585f484548e42c9",
  },
  {
    name: "More Than My Hometown",
    artist: "Morgan Wallen",
    albumName: "Dangerous: The Double Album",
    id: "5OELUCYgOHKFAvCERnAvfS",
    service: "spotify",
    cover: "https://i.scdn.co/image/ab67616d0000b2737d6813fd233f3bc4977cceca",
  },
  {
    albumName: "DAMN.",
    artist: "Kendrick Lamar",
    category: "song",
    cover: "https://i.scdn.co/image/ab67616d0000b2738b52c6b9bc4e43d873869699",
    id: "6SwRhMLwNqEi6alNPVG00n",
    name: "LOYALTY. FEAT. RIHANNA.",
    service: "spotify",
  },
  {
    albumName: "My Turn (Deluxe)",
    artist: "Lil Baby",
    category: "song",
    cover: "https://i.scdn.co/image/ab67616d0000b27376a4577dd654bf457a4ad1f8",
    id: "5m0yZ33oOy0yYBtdTXuxQe",
    name: "Low Down",
    service: "spotify",
  },
  {
    albumName: "i am > i was",
    artist: "21 Savage",
    category: "song",
    cover: "https://i.scdn.co/image/ab67616d0000b273280689ecc5e4b2038bb5e4bd",
    id: "2t8yVaLvJ0RenpXUIAC52d",
    name: "a lot",
    service: "spotify",
  },
  {
    albumName: "SOS",
    artist: "SZA",
    category: "song",
    cover: "https://i.scdn.co/image/ab67616d0000b27370dbc9f47669d120ad874ec1",
    id: "2GAhgAjOhEmItWLfgisyOn",
    name: "Low",
    service: "spotify",
  },
  {
    albumName: "The Human Condition",
    artist: "Jon Bellion",
    category: "song",
    cover: "https://i.scdn.co/image/ab67616d0000b273804533fa6608d1c8d420dbeb",
    id: "0SuLAslEMFZAXf0SwY7syi",
    name: "All Time Low",
    service: "spotify",
  },
  {
    albumName: "The Way It Is",
    artist: "Keyshia Cole",
    category: "song",
    cover: "https://i.scdn.co/image/ab67616d0000b2732cc2323c681b3f84cdc8379a",
    id: "0W4NhJhcqKCqEP2GIpDCDq",
    name: "Love",
    service: "spotify",
  },
  {
    albumName: "French Exit",
    artist: "TV Girl",
    category: "song",
    cover: "https://i.scdn.co/image/ab67616d0000b273e1bc1af856b42dd7fdba9f84",
    id: "6dBUzqjtbnIa1TwYbyw5CM",
    name: "Lovers Rock",
    service: "spotify",
  },
];

const PartyRoomQueue = () => {
  let [songs, setSongs] = useState<TMusicContent[]>([]);

  return (
    <div className="relative flex w-full h-full mt-8">
      <div className="flex items-center justify-center w-full h-full">
        <div className="w-full h-[75vh] bg-white rounded-lg drop-shadow-md">
          <div className="pt-5 mb-4 text-2xl font-bold text-gray-700 pl-11">
            Queue
          </div>
          <div className="w-[90%] mx-auto overflow-y-auto h-[calc(75vh-8rem)]">
            {songsList.map((s) => (
              <div className="grid w-full grid-flow-col">
                <button
                  className="w-full text-center bg-white border-2 border-solid text-navy border-lblue hover:text-gray-400 hover:text-lg"
                  key={s.id}
                >
                  <div className="flex text-center w-[100%]">
                    <div className="w-20 h-20 ">
                      <img src={s.cover} />
                    </div>
                    {s.name}
                    <br />
                    {s.artist}
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartyRoomQueue;
