import { useState } from "react";
import removeQueue from "../../services/party/remove-queue";
import reorderQueue from "../../services/party/reorder-queue";
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
];

const PartyRoomQueue = () => {
  let [songs, setSongs] = useState<TMusicContent[]>([]);

  return (
    <div className="relative flex w-full h-full mt-8">
      <div className="flex items-center justify-center w-full h-full">
        <div className="w-full h-[75vh] bg-white rounded-lg drop-shadow-md">
          <div className="pt-5 mb-2 text-2xl font-bold text-gray-700 pl-11">
            Queue
          </div>
          <div className="w-[95%] mx-auto border-b-2 border-gray-300"></div>
          <div className="pt-3 w-[90%] mx-auto overflow-y-auto h-[calc(75vh-8rem)]">
            {songsList.map((s, index) => (
              <div className="grid w-full grid-flow-col">
                <div
                  className="w-full text-center bg-white border-2 border-solid text-navy border-lblue hover:bg-gray-200"
                  key={s.id}
                >
                  <div className="flex text-left w-[100%] p-1">
                    <div className="flex flex-col inset-x-0 bottom-0">
                      <button
                        className=""
                        onClick={async () => {
                          removeQueue(index);
                        }}
                      >
                        <img
                          width={20}
                          src="https://www.pngall.com/wp-content/uploads/6/Delete-Button-PNG-HD-Image.png"
                        />
                      </button>
                      <button
                        className="h-8"
                        onClick={async () => {
                          reorderQueue(index, "up");
                        }}
                      >
                        <img
                          width={20}
                          src="https://www.freeiconspng.com/thumbs/up-arrow-png/black-up-arrow-png-6.png"
                        />
                      </button>
                      <button
                        className="h-6"
                        onClick={async () => {
                          reorderQueue(index, "down");
                        }}
                      >
                        <img
                          className="rotate-180"
                          width={20}
                          src="https://www.freeiconspng.com/thumbs/up-arrow-png/black-up-arrow-png-6.png"
                        />
                      </button>
                    </div>
                    <div className="w-20 h-20">
                      <img src={s.cover} />
                    </div>
                    <div className="pl-4">
                      <div className="mb-1 font-bold text-gray-800 text-md">
                        {s.name}
                      </div>
                      <div className="text-sm italic text-gray-500">
                        {s.artist} - {s.albumName}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartyRoomQueue;
