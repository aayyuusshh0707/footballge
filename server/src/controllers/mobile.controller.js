const { pool } = require("../db/db");
const { uploadFileToDropbox } = require("../middleware/dropbox.service");
const fs = require("fs");

// Long Banner id=1
const bannerController = {
  ensureTableExists: async () => {
    try {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS mobilebanners (
          id INT PRIMARY KEY NOT NULL,
          file_name VARCHAR(255) NOT NULL,
          banner_url TEXT,
          link TEXT,
          uploaded_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `;
      await pool.query(createTableQuery);

      const [rows] = await pool.query("SELECT id FROM mobilebanners WHERE id = 1");
      if (rows.length === 0) {
        await pool.query(
          "INSERT INTO mobilebanners (id, file_name, banner_url, link) VALUES (1, 'Longbanner', '', '')"
        );
      }
    } catch (error) {
      console.error("Error ensuring table exists:", error);
      throw error;
    }
  },

  // Upload new banner
  uploadBanner: async (req, res) => {
    try {
      await bannerController.ensureTableExists();

      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const localFilePath = req.file.path;
      const dropboxPath = `/banners/${req.file.filename}`;
      const dropboxLink = await uploadFileToDropbox(localFilePath, dropboxPath);

      try {
        await fs.promises.unlink(localFilePath);
      } catch (err) {
        console.error("Error deleting file:", err);
      }

      await pool.query(
        "INSERT INTO mobilebanners (id, file_name, banner_url, uploaded_at) VALUES (1, 'LongBanner', ?, NOW()) ON DUPLICATE KEY UPDATE file_name = 'LongBanner', banner_url = ?, uploaded_at = NOW()",
        [dropboxLink, dropboxLink]
      );

      return res.status(200).json({
        message: "Banner uploaded successfully",
        banner_url: dropboxLink,
      });
    } catch (error) {
      console.error("Upload error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // Update existing banner
  updateBanner: async (req, res) => {
    try {
      await bannerController.ensureTableExists();

      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const localFilePath = req.file.path;
      const dropboxPath = `/banners/${req.file.filename}`;
      const dropboxLink = await uploadFileToDropbox(localFilePath, dropboxPath);

      try {
        await fs.promises.unlink(localFilePath);
      } catch (err) {
        console.error("Error deleting file:", err);
      }

      const [existingBanner] = await pool.query(
        "SELECT banner_url FROM mobilebanners WHERE id = 1"
      );
      if (existingBanner.length === 0) {
        return res.status(404).json({ error: "No banner found to update" });
      }

      await pool.query(
        "UPDATE mobilebanners SET banner_url = ?, uploaded_at = NOW() WHERE id = 1",
        [dropboxLink]
      );

      return res.status(200).json({
        message: "Banner updated successfully",
        banner_url: dropboxLink,
      });
    } catch (error) {
      console.error("Update error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // Upload new link
  uploadLink: async (req, res) => {
    try {
      await bannerController.ensureTableExists();
      const { link } = req.body;

      if (!link) {
        return res.status(400).json({ error: "Missing link in request body" });
      }

      await pool.query(
        "INSERT INTO mobilebanners (id, file_name, link, uploaded_at) VALUES (1, 'Longbanner', ?, NOW()) ON DUPLICATE KEY UPDATE link = ?, uploaded_at = NOW()",
        [link, link]
      );

      return res.status(200).json({
        message: "Link uploaded successfully",
        link,
      });
    } catch (error) {
      console.error("Link upload error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // Update existing link
  updateLink: async (req, res) => {
    try {
      await bannerController.ensureTableExists();
      const { link } = req.body;

      if (!link) {
        return res.status(400).json({ error: "Missing link in request body" });
      }

      const [existingBanner] = await pool.query(
        "SELECT link FROM mobilebanners WHERE id = 1"
      );
      if (existingBanner.length === 0) {
        return res
          .status(404)
          .json({ error: "No banner found to update link" });
      }

      await pool.query(
        "UPDATE mobilebanners SET link = ?, uploaded_at = NOW() WHERE id = 1",
        [link]
      );

      return res.status(200).json({
        message: "Link updated successfully",
        link,
      });
    } catch (error) {
      console.error("Link update error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getLink: async (req, res) => {
    try {
      await bannerController.ensureTableExists();
      const [result] = await pool.query(
        "SELECT link FROM mobilebanners WHERE id = 1"
      );

      if (result.length === 0 || !result[0].link) {
        return res.status(404).json({ message: "No link found" });
      }

      return res.status(200).json(result[0]);
    } catch (error) {
      console.error("Error fetching link:", error);
      return res.status(500).json({ error: "Database error" });
    }
  },

  getBanner: async (req, res) => {
    try {
      await bannerController.ensureTableExists();
      const [rows] = await pool.query(
        "SELECT banner_url FROM mobilebanners WHERE id = 1"
      );

      if (rows.length === 0) {
        return res.status(404).json({ message: "No banner found" });
      }

      return res.status(200).json(rows[0]);
    } catch (error) {
      console.error("Error fetching banner:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

// Match Banner id=2
const MatchbannerController = {
  ensureTableExists: async () => {
    try {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS mobilebanners (
          id INT PRIMARY KEY NOT NULL,
          file_name VARCHAR(255) NOT NULL,
          banner_url TEXT,
          link TEXT,
          uploaded_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `;
      await pool.query(createTableQuery);

      const [rows] = await pool.query("SELECT id FROM mobilebanners WHERE id = 2");
      if (rows.length === 0) {
        await pool.query(
          "INSERT INTO mobilebanners (id, file_name, banner_url, link) VALUES (2, 'Matchbanner', '', '')"
        );
      }
    } catch (error) {
      console.error("Error ensuring table exists:", error);
      throw error;
    }
  },

  // Upload new banner
  uploadBanner: async (req, res) => {
    try {
      await bannerController.ensureTableExists();

      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const localFilePath = req.file.path;
      const dropboxPath = `/banners/${req.file.filename}`;
      const dropboxLink = await uploadFileToDropbox(localFilePath, dropboxPath);

      try {
        await fs.promises.unlink(localFilePath);
      } catch (err) {
        console.error("Error deleting file:", err);
      }

      await pool.query(
        "INSERT INTO mobilebanners (id, file_name, banner_url, uploaded_at) VALUES (2, 'MatchBanner', ?, NOW()) ON DUPLICATE KEY UPDATE file_name = 'MatchBanner', banner_url = ?, uploaded_at = NOW()",
        [dropboxLink, dropboxLink]
      );

      return res.status(200).json({
        message: "Banner uploaded successfully",
        banner_url: dropboxLink,
      });
    } catch (error) {
      console.error("Upload error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // Update existing banner
  updateBanner: async (req, res) => {
    try {
      await bannerController.ensureTableExists();

      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const localFilePath = req.file.path;
      const dropboxPath = `/banners/${req.file.filename}`;
      const dropboxLink = await uploadFileToDropbox(localFilePath, dropboxPath);

      try {
        await fs.promises.unlink(localFilePath);
      } catch (err) {
        console.error("Error deleting file:", err);
      }

      const [existingBanner] = await pool.query(
        "SELECT banner_url FROM mobilebanners WHERE id = 2"
      );
      if (existingBanner.length === 0) {
        return res.status(404).json({ error: "No banner found to update" });
      }

      await pool.query(
        "UPDATE mobilebanners SET banner_url = ?, uploaded_at = NOW() WHERE id = 2",
        [dropboxLink]
      );

      return res.status(200).json({
        message: "Banner updated successfully",
        banner_url: dropboxLink,
      });
    } catch (error) {
      console.error("Update error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // Upload new link
  uploadLink: async (req, res) => {
    try {
      await bannerController.ensureTableExists();
      const { link } = req.body;

      if (!link) {
        return res.status(400).json({ error: "Missing link in request body" });
      }

      await pool.query(
        "INSERT INTO mobilebanners (id, file_name, link, uploaded_at) VALUES (2, 'Matchbanner', ?, NOW()) ON DUPLICATE KEY UPDATE link = ?, uploaded_at = NOW()",
        [link, link]
      );

      return res.status(200).json({
        message: "Link uploaded successfully",
        link,
      });
    } catch (error) {
      console.error("Link upload error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // Update existing link
  updateLink: async (req, res) => {
    try {
      await bannerController.ensureTableExists();
      const { link } = req.body;

      if (!link) {
        return res.status(400).json({ error: "Missing link in request body" });
      }

      const [existingBanner] = await pool.query(
        "SELECT link FROM mobilebanners WHERE id = 2"
      );
      if (existingBanner.length === 0) {
        return res
          .status(404)
          .json({ error: "No banner found to update link" });
      }

      await pool.query(
        "UPDATE mobilebanners SET link = ?, uploaded_at = NOW() WHERE id = 2",
        [link]
      );

      return res.status(200).json({
        message: "Link updated successfully",
        link,
      });
    } catch (error) {
      console.error("Link update error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getLink: async (req, res) => {
    try {
      await bannerController.ensureTableExists();
      const [result] = await pool.query(
        "SELECT link FROM mobilebanners WHERE id = 2"
      );

      if (result.length === 0 || !result[0].link) {
        return res.status(404).json({ message: "No link found" });
      }

      return res.status(200).json(result[0]);
    } catch (error) {
      console.error("Error fetching link:", error);
      return res.status(500).json({ error: "Database error" });
    }
  },

  getBanner: async (req, res) => {
    try {
      await bannerController.ensureTableExists();
      const [rows] = await pool.query(
        "SELECT banner_url FROM mobilebanners WHERE id = 2"
      );

      if (rows.length === 0) {
        return res.status(404).json({ message: "No banner found" });
      }

      return res.status(200).json(rows[0]);
    } catch (error) {
      console.error("Error fetching banner:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

// Side Banner 1 id=3
const SidebannerController = {
  ensureTableExists: async () => {
    try {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS mobilebanners (
          id INT PRIMARY KEY NOT NULL,
          file_name VARCHAR(255) NOT NULL,
          banner_url TEXT,
          link TEXT,
          uploaded_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `;
      await pool.query(createTableQuery);

      const [rows] = await pool.query("SELECT id FROM mobilebanners WHERE id = 3");
      if (rows.length === 0) {
        await pool.query(
          "INSERT INTO mobilebanners (id, file_name, banner_url, link) VALUES (3, 'Sidebanner', '', '')"
        );
      }
    } catch (error) {
      console.error("Error ensuring table exists:", error);
      throw error;
    }
  },

  // Upload new banner
  uploadBanner: async (req, res) => {
    try {
      await bannerController.ensureTableExists();

      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const localFilePath = req.file.path;
      const dropboxPath = `/banners/${req.file.filename}`;
      const dropboxLink = await uploadFileToDropbox(localFilePath, dropboxPath);

      try {
        await fs.promises.unlink(localFilePath);
      } catch (err) {
        console.error("Error deleting file:", err);
      }

      await pool.query(
        "INSERT INTO mobilebanners (id, file_name, banner_url, uploaded_at) VALUES (3, 'SideBanner', ?, NOW()) ON DUPLICATE KEY UPDATE file_name = 'SideBanner', banner_url = ?, uploaded_at = NOW()",
        [dropboxLink, dropboxLink]
      );

      return res.status(200).json({
        message: "Banner uploaded successfully",
        banner_url: dropboxLink,
      });
    } catch (error) {
      console.error("Upload error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // Update existing banner
  updateBanner: async (req, res) => {
    try {
      await bannerController.ensureTableExists();

      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const localFilePath = req.file.path;
      const dropboxPath = `/banners/${req.file.filename}`;
      const dropboxLink = await uploadFileToDropbox(localFilePath, dropboxPath);

      try {
        await fs.promises.unlink(localFilePath);
      } catch (err) {
        console.error("Error deleting file:", err);
      }

      const [existingBanner] = await pool.query(
        "SELECT banner_url FROM mobilebanners WHERE id = 3"
      );
      if (existingBanner.length === 0) {
        return res.status(404).json({ error: "No banner found to update" });
      }

      await pool.query(
        "UPDATE mobilebanners SET banner_url = ?, uploaded_at = NOW() WHERE id = 3",
        [dropboxLink]
      );

      return res.status(200).json({
        message: "Banner updated successfully",
        banner_url: dropboxLink,
      });
    } catch (error) {
      console.error("Update error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // Upload new link
  uploadLink: async (req, res) => {
    try {
      await bannerController.ensureTableExists();
      const { link } = req.body;

      if (!link) {
        return res.status(400).json({ error: "Missing link in request body" });
      }

      await pool.query(
        "INSERT INTO mobilebanners (id, file_name, link, uploaded_at) VALUES (3, 'Sidebanner', ?, NOW()) ON DUPLICATE KEY UPDATE link = ?, uploaded_at = NOW()",
        [link, link]
      );

      return res.status(200).json({
        message: "Link uploaded successfully",
        link,
      });
    } catch (error) {
      console.error("Link upload error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // Update existing link
  updateLink: async (req, res) => {
    try {
      await bannerController.ensureTableExists();
      const { link } = req.body;

      if (!link) {
        return res.status(400).json({ error: "Missing link in request body" });
      }

      const [existingBanner] = await pool.query(
        "SELECT link FROM mobilebanners WHERE id = 3"
      );
      if (existingBanner.length === 0) {
        return res
          .status(404)
          .json({ error: "No banner found to update link" });
      }

      await pool.query(
        "UPDATE mobilebanners SET link = ?, uploaded_at = NOW() WHERE id = 3",
        [link]
      );

      return res.status(200).json({
        message: "Link updated successfully",
        link,
      });
    } catch (error) {
      console.error("Link update error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getLink: async (req, res) => {
    try {
      await bannerController.ensureTableExists();
      const [result] = await pool.query(
        "SELECT link FROM mobilebanners WHERE id = 3"
      );

      if (result.length === 0 || !result[0].link) {
        return res.status(404).json({ message: "No link found" });
      }

      return res.status(200).json(result[0]);
    } catch (error) {
      console.error("Error fetching link:", error);
      return res.status(500).json({ error: "Database error" });
    }
  },

  getBanner: async (req, res) => {
    try {
      await bannerController.ensureTableExists();
      const [rows] = await pool.query(
        "SELECT banner_url FROM mobilebanners WHERE id = 3"
      );

      if (rows.length === 0) {
        return res.status(404).json({ message: "No banner found" });
      }

      return res.status(200).json(rows[0]);
    } catch (error) {
      console.error("Error fetching banner:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

// Side Banner 2 id=4
const SidebannerTwoController = {
  ensureTableExists: async () => {
    try {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS mobilebanners (
          id INT PRIMARY KEY NOT NULL,
          file_name VARCHAR(255) NOT NULL,
          banner_url TEXT,
          link TEXT,
          uploaded_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `;
      await pool.query(createTableQuery);

      const [rows] = await pool.query("SELECT id FROM mobilebanners WHERE id = 4");
      if (rows.length === 0) {
        await pool.query(
          "INSERT INTO mobilebanners (id, file_name, banner_url, link) VALUES (4, 'SidebannerTwo', '', '')"
        );
      }
    } catch (error) {
      console.error("Error ensuring table exists:", error);
      throw error;
    }
  },

  // Upload new banner
  uploadBanner: async (req, res) => {
    try {
      await SidebannerController.ensureTableExists();

      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const localFilePath = req.file.path;
      const dropboxPath = `/banners/${req.file.filename}`;
      const dropboxLink = await uploadFileToDropbox(localFilePath, dropboxPath);

      try {
        await fs.promises.unlink(localFilePath);
      } catch (err) {
        console.error("Error deleting file:", err);
      }

      await pool.query(
        "INSERT INTO mobilebanners (id, file_name, banner_url, uploaded_at) VALUES (4, 'SidebannerTwo', ?, NOW()) ON DUPLICATE KEY UPDATE file_name = 'SidebannerTwo', banner_url = ?, uploaded_at = NOW()",
        [dropboxLink, dropboxLink]
      );

      return res.status(200).json({
        message: "Banner uploaded successfully",
        banner_url: dropboxLink,
      });
    } catch (error) {
      console.error("Upload error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // Update existing banner
  updateBanner: async (req, res) => {
    try {
      await SidebannerController.ensureTableExists();

      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const localFilePath = req.file.path;
      const dropboxPath = `/banners/${req.file.filename}`;
      const dropboxLink = await uploadFileToDropbox(localFilePath, dropboxPath);

      try {
        await fs.promises.unlink(localFilePath);
      } catch (err) {
        console.error("Error deleting file:", err);
      }

      const [existingBanner] = await pool.query(
        "SELECT banner_url FROM mobilebanners WHERE id = 4"
      );
      if (existingBanner.length === 0) {
        return res.status(404).json({ error: "No banner found to update" });
      }

      await pool.query(
        "UPDATE mobilebanners SET banner_url = ?, uploaded_at = NOW() WHERE id = 4",
        [dropboxLink]
      );

      return res.status(200).json({
        message: "Banner updated successfully",
        banner_url: dropboxLink,
      });
    } catch (error) {
      console.error("Update error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // Upload new link
  uploadLink: async (req, res) => {
    try {
      await SidebannerController.ensureTableExists();
      const { link } = req.body;

      if (!link) {
        return res.status(400).json({ error: "Missing link in request body" });
      }

      await pool.query(
        "INSERT INTO mobilebanners (id, file_name, link, uploaded_at) VALUES (4, 'SidebannerTwo', ?, NOW()) ON DUPLICATE KEY UPDATE link = ?, uploaded_at = NOW()",
        [link, link]
      );

      return res.status(200).json({
        message: "Link uploaded successfully",
        link,
      });
    } catch (error) {
      console.error("Link upload error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // Update existing link
  updateLink: async (req, res) => {
    try {
      await SidebannerController.ensureTableExists();
      const { link } = req.body;

      if (!link) {
        return res.status(400).json({ error: "Missing link in request body" });
      }

      const [existingBanner] = await pool.query(
        "SELECT link FROM mobilebanners WHERE id = 4"
      );
      if (existingBanner.length === 0) {
        return res
          .status(404)
          .json({ error: "No banner found to update link" });
      }

      await pool.query(
        "UPDATE mobilebanners SET link = ?, uploaded_at = NOW() WHERE id = 4",
        [link]
      );

      return res.status(200).json({
        message: "Link updated successfully",
        link,
      });
    } catch (error) {
      console.error("Link update error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getLink: async (req, res) => {
    try {
      await SidebannerController.ensureTableExists();
      const [result] = await pool.query(
        "SELECT link FROM mobilebanners WHERE id = 4"
      );

      if (result.length === 0 || !result[0].link) {
        return res.status(404).json({ message: "No link found" });
      }

      return res.status(200).json(result[0]);
    } catch (error) {
      console.error("Error fetching link:", error);
      return res.status(500).json({ error: "Database error" });
    }
  },

  getBanner: async (req, res) => {
    try {
      await SidebannerController.ensureTableExists();
      const [rows] = await pool.query(
        "SELECT banner_url FROM mobilebanners WHERE id = 4"
      );

      if (rows.length === 0) {
        return res.status(404).json({ message: "No banner found" });
      }

      return res.status(200).json(rows[0]);
    } catch (error) {
      console.error("Error fetching banner:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

// Side Long Banner id=5
const SideLongbannerController = {
  ensureTableExists: async () => {
    try {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS mobilebanners (
          id INT PRIMARY KEY NOT NULL,
          file_name VARCHAR(255) NOT NULL,
          banner_url TEXT,
          link TEXT,
          uploaded_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `;
      await pool.query(createTableQuery);

      const [rows] = await pool.query("SELECT id FROM mobilebanners WHERE id = 5");
      if (rows.length === 0) {
        await pool.query(
          "INSERT INTO mobilebanners (id, file_name, banner_url, link) VALUES (5, 'LongSideBanner', '', '')"
        );
      }
    } catch (error) {
      console.error("Error ensuring table exists:", error);
      throw error;
    }
  },

  // Upload new banner
  uploadBanner: async (req, res) => {
    try {
      await SidebannerController.ensureTableExists();

      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const localFilePath = req.file.path;
      const dropboxPath = `/banners/${req.file.filename}`;
      const dropboxLink = await uploadFileToDropbox(localFilePath, dropboxPath);

      try {
        await fs.promises.unlink(localFilePath);
      } catch (err) {
        console.error("Error deleting file:", err);
      }

      await pool.query(
        "INSERT INTO mobilebanners (id, file_name, banner_url, uploaded_at) VALUES (5, 'LongSideBanner', ?, NOW()) ON DUPLICATE KEY UPDATE file_name = 'LongSideBanner', banner_url = ?, uploaded_at = NOW()",
        [dropboxLink, dropboxLink]
      );

      return res.status(200).json({
        message: "Banner uploaded successfully",
        banner_url: dropboxLink,
      });
    } catch (error) {
      console.error("Upload error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // Update existing banner
  updateBanner: async (req, res) => {
    try {
      await SidebannerController.ensureTableExists();

      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const localFilePath = req.file.path;
      const dropboxPath = `/banners/${req.file.filename}`;
      const dropboxLink = await uploadFileToDropbox(localFilePath, dropboxPath);

      try {
        await fs.promises.unlink(localFilePath);
      } catch (err) {
        console.error("Error deleting file:", err);
      }

      const [existingBanner] = await pool.query(
        "SELECT banner_url FROM mobilebanners WHERE id = 5"
      );
      if (existingBanner.length === 0) {
        return res.status(404).json({ error: "No banner found to update" });
      }

      await pool.query(
        "UPDATE mobilebanners SET banner_url = ?, uploaded_at = NOW() WHERE id = 5",
        [dropboxLink]
      );

      return res.status(200).json({
        message: "Banner updated successfully",
        banner_url: dropboxLink,
      });
    } catch (error) {
      console.error("Update error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // Upload new link
  uploadLink: async (req, res) => {
    try {
      await SidebannerController.ensureTableExists();
      const { link } = req.body;

      if (!link) {
        return res.status(400).json({ error: "Missing link in request body" });
      }

      await pool.query(
        "INSERT INTO mobilebanners (id, file_name, link, uploaded_at) VALUES (5, 'LongSideBanner', ?, NOW()) ON DUPLICATE KEY UPDATE link = ?, uploaded_at = NOW()",
        [link, link]
      );

      return res.status(200).json({
        message: "Link uploaded successfully",
        link,
      });
    } catch (error) {
      console.error("Link upload error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // Update existing link
  updateLink: async (req, res) => {
    try {
      await SidebannerController.ensureTableExists();
      const { link } = req.body;

      if (!link) {
        return res.status(400).json({ error: "Missing link in request body" });
      }

      const [existingBanner] = await pool.query(
        "SELECT link FROM mobilebanners WHERE id = 5"
      );
      if (existingBanner.length === 0) {
        return res
          .status(404)
          .json({ error: "No banner found to update link" });
      }

      await pool.query(
        "UPDATE mobilebanners SET link = ?, uploaded_at = NOW() WHERE id = 5",
        [link]
      );

      return res.status(200).json({
        message: "Link updated successfully",
        link,
      });
    } catch (error) {
      console.error("Link update error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getLink: async (req, res) => {
    try {
      await SidebannerController.ensureTableExists();
      const [result] = await pool.query(
        "SELECT link FROM mobilebanners WHERE id = 5"
      );

      if (result.length === 0 || !result[0].link) {
        return res.status(404).json({ message: "No link found" });
      }

      return res.status(200).json(result[0]);
    } catch (error) {
      console.error("Error fetching link:", error);
      return res.status(500).json({ error: "Database error" });
    }
  },

  getBanner: async (req, res) => {
    try {
      await SidebannerController.ensureTableExists();
      const [rows] = await pool.query(
        "SELECT banner_url FROM mobilebanners WHERE id = 5"
      );

      if (rows.length === 0) {
        return res.status(404).json({ message: "No banner found" });
      }

      return res.status(200).json(rows[0]);
    } catch (error) {
      console.error("Error fetching banner:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = {
  bannerController,
  MatchbannerController,
  SidebannerController,
  SidebannerTwoController,
  SideLongbannerController,
};