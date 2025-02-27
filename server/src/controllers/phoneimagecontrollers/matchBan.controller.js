const { pool } = require("../../db/db");
const { uploadFileToDropbox } = require("../../middleware/dropbox.service");
const fs = require("fs");

const MatchbannerController = {
  uploadBanner: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const localFilePath = req.file.path;
      const dropboxPath = `/phonebanners/${req.file.filename}`;

      // Upload to Dropbox
      const dropboxLink = await uploadFileToDropbox(localFilePath, dropboxPath);

      // Delete the local file
      fs.unlink(localFilePath, (err) => {
        if (err) console.error("Error deleting file:", err);
      });

      // Update banner table with the new Dropbox link
      const updateQuery = `UPDATE Phone_banners  SET file_url = ? WHERE id = 5`;
      await pool.query(updateQuery, [dropboxLink]);

      res
        .status(200)
        .json({ message: "File uploaded successfully", link: dropboxLink });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getBanner: async (req, res) => {
    try {
      const [rows] = await pool.query(
        "SELECT file_url FROM Phone_banners  WHERE id = 5"
      );

      if (rows.length === 0) {
        return res.status(404).json({ message: "No banner found" });
      }

      return res.status(200).json({ file_url: rows[0].file_url });
    } catch (error) {
      console.error("Error fetching banner:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = MatchbannerController;
