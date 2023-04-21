import removeQueue from "../../services/party/remove-queue";
import reorderQueue from "../../services/party/reorder-queue";
import { TMusicContent } from "../../types/music-content";

interface IQueueProps {
  queueIndex: number;
  songs: TMusicContent[] | null;
}

const PastQueue = (props: IQueueProps) => {
  if (props.songs == null) {
    return <div></div>;
  }
  const songs = props.songs.slice(0, props.queueIndex);
  return (
    <div className="pb-10 w-full bg-white rounded-lg h-[calc(70vh-8rem)]">
      {!songs ? (
        <div className="px-20 py-10 text-lg font-semibold text-gray-600">
          No Recently Played Songs
        </div>
      ) : (
        <div className="pt-1 w-[90%] mx-auto overflow-y-auto h-[calc(65vh-8rem)]">
          {songs.map((s, index) => (
            <div className="grid w-full grid-flow-col">
              <div
                className="w-full text-center bg-white border-2 border-solid text-navy border-lblue hover:bg-gray-200"
                key={s.id}
              >
                <div className="flex text-left w-[100%] p-1">
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
  );
};

export default PastQueue;
