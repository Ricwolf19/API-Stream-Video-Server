import React, { useState } from 'react';
import VideoPlayer from './Components/VideoPlayer';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  // Estado para almacenar el ID del video que se está reproduciendo
  const [videoId, setVideoId] = useState(null);

  // Función para reproducir un video
  function playVideo(e, videoId) {
    e.preventDefault();
    setVideoId(videoId);
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Video Streaming App</h1>
      </div>
      <div className="d-flex justify-content-center">
        {/* Botones para reproducir videos */}
        <button
          className="btn btn-primary m-2"
          onClick={(e) => {
            playVideo(e, 'Prensa');
          }}
        >
          Play Video 1
        </button>
        <button
          className="btn btn-primary m-2"
          onClick={(e) => {
            playVideo(e, 'Peso-muerto');
          }}
        >
          Play Video 2
        </button>
        <button
          className="btn btn-primary m-2"
          onClick={(e) => {
            playVideo(e, 'Sentadilla-hack');
          }}
        >
          Play Video 3
        </button>
      </div>
      <div id="video-container" className="text-center">
        {/* Se muestra el reproductor de video si hay un video seleccionado */}
        {videoId && <VideoPlayer videoId={videoId}></VideoPlayer>}
      </div>
      <div className="footer">
        {/* Pie de página con el nombre */}
        <h1>By Ricardo Tapia</h1>
      </div>
    </div>
  );
}

export default App;


/* 

Explicaciones adicionales:

Se utiliza el hook useState para manejar el estado de la aplicación y almacenar el video que se va a reproducir.
La función playVideo se encarga de actualizar el estado con el video seleccionado cuando se hace clic en un botón de reproducción.
El componente VideoPlayer se renderiza solo si hay un video seleccionado (videoId no es null).
Los botones permiten reproducir diferentes videos al hacer clic en ellos, llamando a la función playVideo con el identificador del video correspondiente.

*/