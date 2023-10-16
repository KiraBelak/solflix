const { google } = require('googleapis');
const key = require('../service-account-key.json'); 
async function getVideos(carpeta) {
    // Autenticar la aplicación con la API de Google Drive
    const auth = new google.auth.GoogleAuth({
      credentials: key,
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });
  
    // Crear un cliente para la API de Google Drive
    const drive = google.drive({
      version: 'v3',
      auth,
    });
  
    // Obtener la lista de videos de Google Drive
    const folderId = carpeta; // Reemplazar con el ID de la carpeta
    const mimeTypeFilter = "mimeType='video/mp4'";
    const folderFilter = `'${folderId}' in parents`;
  
    const { data } = await drive.files.list({
      q: `${mimeTypeFilter} and ${folderFilter}`,
      fields: 'files(id, name, thumbnailLink)',
      pageSize: 1000,
    });
  
    const videos = data.files;
  
    // Crear un objeto JSON con la información de los videos
    const videoList = videos.map((video) => ({
      id: video.id,
      name: video.name,
      thumbnailLink: video.thumbnailLink,
      videoUrl: `https://drive.google.com/file/d/${video.id}/preview`,
      dowloalUrl: `https://drive.google.com/uc?export=download&id=${video.id}`
    }));
  
    return videoList;
  }
  
  export default getVideos;
  