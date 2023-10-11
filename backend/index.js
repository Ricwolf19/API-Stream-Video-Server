// Importación de las dependencias necesarias: express para el servidor y fs para trabajar con el sistema de archivos.
const express = require('express');
const fs = require('fs');

// Creación de una instancia de Express, que representa nuestra aplicación.
const app = express();

// Mapa que asocia nombres de videos con sus rutas en el sistema de archivos.
const videoFileMap = {
    'Prensa': 'videos/Prensa.mp4',
    'Peso-muerto': 'videos/Peso-muerto.mp4',
    'Sentadilla-hack': 'videos/Sentadilla-hack.mp4'
};

// Ruta para servir videos basada en el nombre del archivo proporcionado en la URL.
app.get('/videos/:filename', (req, res) => {
    // Obtiene el nombre del archivo de la URL.
    const fileName = req.params.filename;

    // Obtiene la ruta del archivo del mapa basándose en el nombre proporcionado.
    const filePath = videoFileMap[fileName];

    // Verifica si la ruta del archivo es válida.
    if (!filePath) {
        // Si no es válida, devuelve un código de estado 404 y un mensaje de error.
        return res.status(404).send('Archivo no encontrado');
    }

    // Obtiene información sobre el archivo, como su tamaño.
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;

    // Obtiene el encabezado "Range" de la solicitud HTTP para admitir la transmisión por partes (streaming).
    const range = req.headers.range;

    if (range) {
        // Si la solicitud incluye un rango, se está solicitando una parte específica del video.
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        // Calcula el tamaño de la parte solicitada.
        const chunksize = end - start + 1;

        // Crea un flujo de lectura del archivo para la parte solicitada.
        const file = fs.createReadStream(filePath, { start, end });

        // Establece los encabezados de la respuesta para la transmisión parcial.
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4'
        };

        // Responde con el código 206 (Partial Content) y los encabezados adecuados.
        res.writeHead(206, head);

        // Transmite la parte del video al cliente.
        file.pipe(res);
    } else {
        // Si no hay rango especificado, se envía el video completo.
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4'
        };

        // Responde con el código 200 (OK) y los encabezados adecuados.
        res.writeHead(200, head);

        // Transmite el video completo al cliente.
        fs.createReadStream(filePath).pipe(res);
    }
});

// El servidor escucha en el puerto 3000.
app.listen(3000, () => {
    console.log('El servidor está en el puerto 3000');
});


/* 

Explicaciones adicionales:

El servidor utiliza la biblioteca express para manejar las rutas y las solicitudes HTTP.
El mapa videoFileMap asocia nombres de videos con las rutas de archivo correspondientes.
La ruta /videos/:filename se encarga de servir videos según el nombre proporcionado en la URL.
Se utiliza el encabezado Range para admitir la transmisión parcial (streaming) cuando se solicita una parte específica del video.
Se utilizan streams para transmitir partes del video al cliente de manera eficiente, permitiendo una reproducción suave.

*/