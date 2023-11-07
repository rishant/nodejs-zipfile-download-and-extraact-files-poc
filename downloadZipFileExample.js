const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Artifactory URL of the file you want to download
const artifactoryUrl = 'https://your-artifactory-url.com/path/to/your/downloaded-file.zip';

// Local directory where you want to save the downloaded file
const localDirectory = './downloads'; // Change this to your desired subdirectory

// Ensure the local directory exists
if (!fs.existsSync(localDirectory)) {
  fs.mkdirSync(localDirectory, { recursive: true });
}

// Build the complete local file path, including the subdirectory
const localFilePath = path.join(localDirectory, 'downloaded-file.zip');

// Define Artifactory authentication if required (username and password or API key)
const username = 'your-username';
const password = 'your-password';

// Axios request configuration
const axiosConfig = {
  method: 'get',
  url: artifactoryUrl,
  responseType: 'stream', // This ensures the response is treated as a stream
};

// Add authentication to the Axios config if required
if (username && password) {
  axiosConfig.auth = {
    username,
    password,
  };
}

axios(axiosConfig)
  .then((response) => {

    // Track the download progress and print status updates
    let totalBytes = 0;
    response.data.on('data', (chunk) => {
        totalBytes += chunk.length;
        console.log(`Downloaded ${totalBytes} bytes`);
    });
    
    // Pipe the stream to the local file
    response.data.pipe(fs.createWriteStream(localFilePath,{ flags: 'a', highWaterMark: 64 * 1024 })); // Adjust the buffer size here (64 KB in this example)

    response.data.on('end', () => {
      console.log('File downloaded successfully!');
    });
  })
  .catch((error) => {
    console.error('Error downloading file:', error);
  });
