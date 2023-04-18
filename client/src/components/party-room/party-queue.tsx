import removeQueue from "../../services/party/remove-queue";
import reorderQueue from "../../services/party/reorder-queue";
import { TMusicContent } from "../../types/music-content";

interface IQueueProps {
  queueIndex: number;
  currentlyPlayingSong: TMusicContent | null;
  upNextSongs: TMusicContent[] | null;
}

const PartyRoomQueue = (props: IQueueProps) => {
  return (
    <div className="w-full h-full p-4 bg-slate-900">
      <div className="pb-10 bg-white rounded-lg h-128">
        <h3 className="pt-10 text-3xl font-semibold text-center">Queue</h3>
        <div className="w-[95%] mx-auto border-b-2 border-gray-300"></div>
        <div className="w-[95%] mx-auto border-b-2 border-gray-300"></div>
        {!props.currentlyPlayingSong ? (
          <div className="px-20 py-10 text-lg font-semibold text-gray-600">
            No songs currently in the queue.
          </div>
        ) : (
          <div>
            <div className="p-1 font-semibold text-gray-700 text-l pl-11">
              currently playing
            </div>
            <div className="pt-1 w-[90%] mx-auto">
              <div className="grid w-full grid-flow-col">
                <div
                  className="w-full text-center bg-white border-2 border-solid text-navy border-lblue hover:bg-gray-200"
                  key={props.currentlyPlayingSong.id}
                >
                  <div className="flex text-left w-[100%] p-1">
                    <div className="w-20 h-20 pl-2">
                      <img src={props.currentlyPlayingSong.cover} />
                    </div>
                    <div className="pl-4">
                      <div className="mb-1 font-bold text-gray-800 text-md">
                        {props.currentlyPlayingSong.name}
                      </div>
                      <div className="text-sm italic text-gray-500">
                        {props.currentlyPlayingSong.artist} -{" "}
                        {props.currentlyPlayingSong.albumName}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-1 font-semibold text-gray-700 text-l pl-11">
              up next
            </div>
            {!props.upNextSongs ? (
              <div className="px-20 py-10 text-lg font-semibold text-gray-600">
                No songs up next.
              </div>
            ) : (
              <div className="pt-1 w-[90%] mx-auto overflow-y-auto h-[calc(65vh-8rem)]">
                {props.upNextSongs.map((s, index) => (
                  <div className="grid w-full grid-flow-col">
                    <div
                      className="w-full text-center bg-white border-2 border-solid text-navy border-lblue hover:bg-gray-200"
                      key={s.id}
                    >
                      <div className="flex text-left w-[100%] p-1">
                        <div className="inset-x-0 bottom-0 flex flex-col pt-1 pl-1">
                          <button
                            className=""
                            onClick={async () => {
                              removeQueue(index + props.queueIndex + 1);
                            }}
                          >
                            <img
                              width={15}
                              src="https://www.pngall.com/wp-content/uploads/6/Delete-Button-PNG-HD-Image.png"
                            />
                          </button>
                          <button
                            className="h-8"
                            onClick={async () => {
                              reorderQueue(index + props.queueIndex + 1, "up");
                            }}
                          >
                            <img
                              width={15}
                              src="https://www.freeiconspng.com/thumbs/up-arrow-png/black-up-arrow-png-6.png"
                            />
                          </button>
                          <button
                            className="h-6"
                            onClick={async () => {
                              reorderQueue(
                                index + props.queueIndex + 1,
                                "down"
                              );
                            }}
                          >
                            <img
                              className="rotate-180"
                              width={15}
                              src="https://www.freeiconspng.com/thumbs/up-arrow-png/black-up-arrow-png-6.png"
                            />
                          </button>
                        </div>
                        <div className="w-20 h-20 pl-2">
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
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PartyRoomQueue;
