import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { method, body, query } = req;

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();
  const myVideos = db.collection("videos");

    switch (method) {   
        case "GET":
            //obtener todos los contratos por mail
            {   
                const { pk } = query;
                // console.log('publiKey', publiKey);
                const videos = await myVideos.find({ pk: pk }).toArray();
                console.log("videos", videos[0].videos);
                //mandar la data a la pagina
                res.status(200).json(videos);
                

            }
            break;
        case "POST":
            // revisar si existe la pubkey en la base de datos y si no existe crearla
            const { pk, video } = body;
            if (!pk) {
                res.status(400).json({ message: "Public Key is required" });
                return;
            }
            if (!video) {
                res.status(400).json({ message: "Video is required" });
                return;
            }
            
            const search = await myVideos.findOne({ pk: pk });
            if (!search) {
               await myVideos.insertOne({ pk: pk, videos: [video] });
            }
            else {
               await myVideos.updateOne({ pk: pk }, { $push: { videos: video } });
            }
            res.status(201).json({ message: "Video add correctly" });
            break;
    }
    client.close();
}