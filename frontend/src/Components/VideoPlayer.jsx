import React, { useRef, useEffect } from 'react';
import './VideoPlayer.css';  // Importamos un archivo CSS para estilos

const VideoPlayer = ({ videoId }) => {
  // Creamos una referencia para el elemento de video
  const videoRef = useRef(null);

  useEffect(() => {
    // Acciones a ejecutar cuando cambia la prop videoId o se monta el componente
    if (videoRef.current) {
      // Pausa el video, elimina la fuente y lo vuelve a cargar
      videoRef.current.pause();
      videoRef.current.removeAttribute('src');
      videoRef.current.load();
    }
  }, [videoId]);  // Aseguramos que se recargue si videoId cambia

  // Renderizamos un contenedor con la clase video-container y un video dentro
  return (
    <div className="video-container">  {/* Contenedor para centrar */}
      <video ref={videoRef} className="video" controls autoPlay>
        <source src={`http://localhost:3000/videos/${videoId}`} type='video/mp4' />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoPlayer;

