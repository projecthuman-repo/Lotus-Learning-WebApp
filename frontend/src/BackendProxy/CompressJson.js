import pako from 'pako';

const compressJson = (data) => {
    try {
        const jsonStr = JSON.stringify(data);
        const compressedData = pako.gzip(jsonStr);
        return compressedData;
    } catch (error) {
        console.error('Error compressing data:', error);
        throw error; // Rethrow the error to handle it outside if needed
    }
};

export default compressJson;