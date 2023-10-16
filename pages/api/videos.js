import getVideos from "../../lib/drivev";

export default async function handler(req, res) {
  const { folderId } = req.query;

  if (!folderId) {
    return res.status(400).json({ message: "Missing folderId parameter" });
  }

  const videos = await getVideos(folderId);
  res.status(200).json(videos);
}
