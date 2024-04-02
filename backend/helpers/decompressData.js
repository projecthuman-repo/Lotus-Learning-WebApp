const zlib = require('zlib');

// Define the decompressData function
const decompressData = (compressedData) => {
    const compressedDataArray = Object.values(compressedData);
    const compressedBuffer = Buffer.from(compressedDataArray);

    // Retorna una nueva promesa que envuelve la llamada a zlib.gunzip
    return new Promise((resolve, reject) => {
        zlib.gunzip(compressedBuffer, (err, decompressedBuffer) => {
            if (err) {
                console.error('Error decompressing data:', err);
                reject(err); 
            } else {
                const decompressedString = decompressedBuffer.toString();
                const jsonData = JSON.parse(decompressedString);
                resolve(jsonData);
            }
        });
    });
};

// Exporta la función decompressData
module.exports = decompressData;
