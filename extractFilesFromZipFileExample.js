const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');

// Specify the path to the ZIP file and the target folder
const zipFilePath = './downloads/downloaded-file.zip';
const targetFolder = './download/downloaded-file/extracts';

// Create an instance of AdmZip and load the ZIP file
const zip = new AdmZip(zipFilePath);

// List of filenames to extract
const filesToExtract = ['images/pet.jpeg', 'icon/home.gif', 'README.md'];

// Extract files from the ZIP archive
filesToExtract.forEach((filename) => {
  const entry = zip.getEntry(filename);

  if (entry) {
    // const targetFilePath = path.join(targetFolder, filename);
    const targetFilePath = path.join(targetFolder);
    
    // Ensure the target folder exists
    fs.mkdirSync(path.dirname(targetFilePath), { recursive: true });

    // Extract the file
    zip.extractEntryTo(entry, targetFolder, false, true);

    console.log(`Extracted ${filename} to ${targetFilePath}`);
  } else {
    console.error(`File not found in the ZIP archive: ${filename}`);
  }
});
