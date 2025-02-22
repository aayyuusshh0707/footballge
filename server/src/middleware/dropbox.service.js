const { Dropbox } = require("dropbox");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const dbx = new Dropbox({
  accessToken: process.env.DROPBOX_ACCESS_TOKEN,
});

/**
 * Uploads a file to Dropbox
 * @param {string} localFilePath - Path of the file in local storage
 * @param {string} dropboxPath - Destination path in Dropbox
 * @returns {Promise<string>} - Returns the shared link of the uploaded file
 */
const uploadFileToDropbox = async (localFilePath, dropboxPath) => {
  try {
    const fileContent = fs.readFileSync(localFilePath);
    const response = await dbx.filesUpload({
      path: dropboxPath,
      contents: fileContent,
      mode: "overwrite",
    });

    // Create a shared link for the uploaded file
    const sharedLinkResponse = await dbx.sharingCreateSharedLinkWithSettings({
      path: response.result.path_lower,
      settings: { requested_visibility: "public" },
    });

    return sharedLinkResponse.result.url.replace("?dl=0", "?raw=1"); // Direct link
  } catch (error) {
    console.error("Error uploading to Dropbox:", error.message);
    throw error;
  }
};

module.exports = { uploadFileToDropbox };
