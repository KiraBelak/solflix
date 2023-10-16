import UserLayout from "@/components/layouts/UserLayout";
import { useEffect, useState } from "react";
import LoadingCircle from "@/components/common/LoadingCircle";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { SystemProgram, Transaction, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { toast, Toaster } from "react-hot-toast";
import { ConnectWallet } from "@/components/ConnectWallet";
import axios from "axios";



const SOLANA_NETWORK = process.env.NEXT_PUBLIC_CHAIN_NETWORK;
export default function Dashboard() {
    const [video, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [explorerLink, setExplorerLink] = useState("");
    const [receiver, setReceiver] = useState("FvwsJ2dsdSHnRy76onE9BLx9fy1fNNLYUfJGm7a2Phx6");
    const [balance, setBalance] = useState(0);
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const amount = 0.6;

    const folderId = "1SebiRPQMrgXpYMCb6u4iWTU6K8Uf8DsI";

    useEffect(() => {
        if (publicKey != null && publicKey != undefined) {
          getBalance(publicKey);
        }
      }, [publicKey]);
    

    const getVideos = async () => {
        const rej = await fetch(`/api/videos?folderId=${folderId}`);
        const videosR = await rej.json();
        if (videosR.length > 0) {
          console.log("videos", videosR);
          setVideos(videosR.reverse());
        }
        }

useEffect(() => {
    getVideos();
}
, []);


const watchVideo = (id) => {
    //comprar video
    console.log("comprar video", id);
    onClick(id);

}
const getBalance = async () => {
    try {
      // const connection = new Connection(clusterApiUrl(SOLANA_NETWORK), "confirmed");
      const balance = await connection.getBalance(publicKey);
      // console.log("balance", balance)
      const balancenew = balance / LAMPORTS_PER_SOL;
      console.log("balance new", balancenew);

      setBalance(balancenew);
    } catch (err) {
      // console.error("error al obtener el balance", err);
      toast.error("Error retrieving balance");
    }
  };

const onClick = async (idVideo) => {
    setLoading(true);

    if (!publicKey) throw new WalletNotConnectedError();
    console.log("publicKey", publicKey);
    if (!receiver) throw new Error("Receiver is null");


    if (amount <= 0) {
      toast.error("You must enter a valid amount");
      return;
    }

    if (balance < amount) {
      console.log("balance",balance);
      console.log("amount",amount);
      toast.error("You do not have enough SOL for this transaction");
      return;
    }

    // console.log("amount", amount);

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: receiver,
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );
    // console.log("transaction", transaction);

    const {
      context: { slot: minContextSlot },
      value: { blockhash, lastValidBlockHeight },
    } = await connection.getLatestBlockhashAndContext();

    try {
      toast.loading("Sending transaction");
      // console.log("transaction", transaction );
      // console.log("connection", connection );
      const signature = await sendTransaction(transaction, connection, {
        minContextSlot,
      });
      // console.log("signature", signature);

      await connection.confirmTransaction({
        blockhash,
        lastValidBlockHeight,
        signature,
      });

      // console.log("signature", signature);

      const confirmation = await connection.confirmTransaction(signature, {
        commitment: "confirmed",
      });

      // console.log("confirmation", confirmation);

      if (confirmation.err) {
        // console.log("confirmation", confirmation);
        toast.dismiss();
        toast.error("Transaction cancelled.");
        return;
      }

      const { slot } = confirmation.value;
      // console.info(`Transaction ${signature} confirmed in block ${slot}`);
      const solanaExplorerLink = `https://explorer.solana.com/tx/${signature}?cluster=${SOLANA_NETWORK}`;
      // console.log("solanaExplorerLink", solanaExplorerLink);
      // await getNFT();

      setExplorerLink(solanaExplorerLink);

      toast.success("Transaction confirmed.");
      
      await axios.post(`/api/myVideos`, { pk: publicKey, video: { id: idVideo } });
      
      toast.success("Video purchased correctly.");

      toast.dismiss();

      return;
    } catch (err) {
      // console.error("Error: ", err.message);
      if (err.message == "User rejected the request.") {
        toast.error("Transaction cancelled.");
      }
    }
  };


    return (
        <UserLayout>
            <Toaster position="bottom-center" reverseOrder={false} />
 {video.length > 0 ? (
              <div className="flex flex-wrap w-screen">
                {video.map((video) => (
                  <div
                    key={video.id}
                    className="rounded-lg w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2"
                  >
                    <h3 className="bg-gray-200 w-full h-10 overflow-hidden text-black text-center">
                        {/* quitar del video name la extension */}
                        {video.name.replace(/\.[^/.]+$/, "")}

                    </h3>
                    <img
                      className="w-full h-48 object-cover"
                      src={video.thumbnailLink}
                      alt={video.name}
                    />

                    {/* <iframe
  className="w-full h-full"
  src={`https://drive.google.com/file/d/${video.id}/preview`}
 
></iframe> */}

                    {/* <div className="absolute bottom-0 left-0 p-2 bg-black bg-opacity-50 text-white text-sm w-full">
            {video.name}
          </div> */}
          <div className="flex flex-col justify-center content-center items-center text-center p-4 my-4">
         <button
            onClick={() => watchVideo(video.id)}
            className="inline-block px-6 py-2 text-white font-semibold rounded-full shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 bg-gradient-to-br from-purple-900 to-black"
          >
            Watch
          </button>
          </div>
                  </div>
                ))}

              </div>
            ) : (
              <div>
                <h1>
                  <LoadingCircle color="#000000" />
                </h1>
              </div>
            )}

                
            </UserLayout>
    );
}