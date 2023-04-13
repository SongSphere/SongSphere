import { useState } from "react";
import removeQueue from "../../services/party/remove-queue";
import reorderQueue from "../../services/party/reorder-queue";
import { TMusicContent } from "../../types/music-content";

interface IQueue {
  songsList: TMusicContent[];
  setCurrentlyPlayingSong: React.Dispatch<
    React.SetStateAction<TMusicContent | null>
  >;
}

const PartyRoomQueue = (props: IQueue) => {
  return (
    <div className="relative flex w-full h-full mt-8">
      <div className="flex items-center justify-center w-full h-full">
        <div className="w-full h-[75vh] bg-white rounded-lg drop-shadow-md">
          <div className="pt-5 mb-2 text-2xl font-bold text-gray-700 pl-11">
            Queue
          </div>
          <div className="w-[95%] mx-auto border-b-2 border-gray-300"></div>
          <div className="pt-3 w-[90%] mx-auto overflow-y-auto h-[calc(75vh-8rem)]">
            {props.songsList.map((s, index) => (
              <div className="grid w-full grid-flow-col">
                <div
                  className="w-full text-center bg-white border-2 border-solid text-navy border-lblue hover:bg-gray-200"
                  key={s.id}
                >
                  <div className="flex text-left w-[100%] p-1">
                    <div className="inset-x-0 bottom-0 flex flex-col">
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
