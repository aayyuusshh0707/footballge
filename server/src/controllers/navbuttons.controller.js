const { pool } = require("../db/db");

const buttononeController = {
  ensureTableExists: async () => {
    try {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS button_links (
          id INT PRIMARY KEY NOT NULL,
          url TEXT NOT NULL,
          updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `;
      await pool.query(createTableQuery);

      // Check if a record with id=1 exists, if not, insert a default empty link
      const [rows] = await pool.query(
        "SELECT id FROM button_links WHERE id = 1"
      );
      if (rows.length === 0) {
        await pool.query("INSERT INTO button_links (id, url) VALUES (1, '')");
      }
    } catch (error) {
      console.error("Error ensuring table exists:", error);
      throw error;
    }
  },

  // Get button link
  getLink: async (req, res) => {
    try {
      await buttononeController.ensureTableExists();
      const query = "SELECT * FROM button_links WHERE id = 1";
      const [result] = await pool.query(query);
      res.json(result[0] || { message: "No link found" });
    } catch (err) {
      console.error("Error fetching button link:", err);
      res.status(500).json({ error: "Database error" });
    }
  },

  // Upload (Insert or Update) button link
  uploadLink: async (req, res) => {
    try {
      await buttononeController.ensureTableExists(); // Ensure table exists before inserting
      const { link } = req.body;
      if (!link) {
        return res.status(400).json({ error: "Missing link in request body" });
      }

      // Use INSERT ... ON DUPLICATE KEY UPDATE to handle both insert and update
      const query = `
        INSERT INTO button_links (id, url, updated_at) 
        VALUES (1, ?, NOW()) 
        ON DUPLICATE KEY UPDATE url = ?, updated_at = NOW()
      `;
      const [result] = await pool.execute(query, [link, link]);

      res.json({ message: "Button link uploaded successfully!" });
    } catch (err) {
      console.error("Error uploading button link:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Update button link
  updateLink: async (req, res) => {
    try {
      await buttononeController.ensureTableExists(); // Ensure table exists before updating
      const { link } = req.body;
      if (!link) {
        return res.status(400).json({ error: "Missing link in request body" });
      }
      const query =
        "UPDATE button_links SET url = ?, updated_at = NOW() WHERE id = 1";
      const [result] = await pool.execute(query, [link]);

      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ error: "No records updated. Check if ID exists." });
      }

      res.json({ message: "Button link updated successfully!" });
    } catch (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

const buttonTwoController = {
  ensureTableExists: async () => {
    try {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS button_links (
          id INT PRIMARY KEY NOT NULL,
          url TEXT NOT NULL,
          updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `;
      await pool.query(createTableQuery);

      // Check if a record with id=2 exists, if not, insert a default empty link
      const [rows] = await pool.query(
        "SELECT id FROM button_links WHERE id = 2"
      );
      if (rows.length === 0) {
        await pool.query("INSERT INTO button_links (id, url) VALUES (2, '')");
      }
    } catch (error) {
      console.error("Error ensuring table exists:", error);
      throw error;
    }
  },

  // Get button link
  getLink: async (req, res) => {
    try {
      await buttonTwoController.ensureTableExists();
      const query = "SELECT * FROM button_links WHERE id = 2";
      const [result] = await pool.query(query);
      res.json(result[0] || { message: "No link found" });
    } catch (err) {
      console.error("Error fetching button link:", err);
      res.status(500).json({ error: "Database error" });
    }
  },

  // Upload (Insert or Update) button link
  uploadLink: async (req, res) => {
    try {
      await buttonTwoController.ensureTableExists(); // Ensure table exists before inserting
      const { link } = req.body;
      if (!link) {
        return res.status(400).json({ error: "Missing link in request body" });
      }

      // Use INSERT ... ON DUPLICATE KEY UPDATE to handle both insert and update
      const query = `
        INSERT INTO button_links (id, url, updated_at) 
        VALUES (2, ?, NOW()) 
        ON DUPLICATE KEY UPDATE url = ?, updated_at = NOW()
      `;
      const [result] = await pool.execute(query, [link, link]);

      res.json({ message: "Button link uploaded successfully!" });
    } catch (err) {
      console.error("Error uploading button link:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Update button link
  updateLink: async (req, res) => {
    try {
      await buttonTwoController.ensureTableExists(); // Ensure table exists before updating
      const { link } = req.body;
      if (!link) {
        return res.status(400).json({ error: "Missing link in request body" });
      }
      const query =
        "UPDATE button_links SET url = ?, updated_at = NOW() WHERE id = 2";
      const [result] = await pool.execute(query, [link]);

      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ error: "No records updated. Check if ID exists." });
      }

      res.json({ message: "Button link updated successfully!" });
    } catch (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

const buttonThreeController = {
  ensureTableExists: async () => {
    try {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS button_links (
          id INT PRIMARY KEY NOT NULL,
          url TEXT NOT NULL,
          updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `;
      await pool.query(createTableQuery);

      // Check if a record with id=3 exists, if not, insert a default empty link
      const [rows] = await pool.query(
        "SELECT id FROM button_links WHERE id = 3"
      );
      if (rows.length === 0) {
        await pool.query("INSERT INTO button_links (id, url) VALUES (3, '')");
      }
    } catch (error) {
      console.error("Error ensuring table exists:", error);
      throw error;
    }
  },

  // Get button link
  getLink: async (req, res) => {
    try {
      await buttonThreeController.ensureTableExists(); // Updated to use own controller
      const query = "SELECT * FROM button_links WHERE id = 3"; // Changed id to 3
      const [result] = await pool.query(query);
      res.json(result[0] || { message: "No link found" });
    } catch (err) {
      console.error("Error fetching button link:", err);
      res.status(500).json({ error: "Database error" });
    }
  },

  // Upload (Insert or Update) button link
  uploadLink: async (req, res) => {
    try {
      await buttonThreeController.ensureTableExists(); // Updated to use own controller
      const { link } = req.body;
      if (!link) {
        return res.status(400).json({ error: "Missing link in request body" });
      }

      // Use INSERT ... ON DUPLICATE KEY UPDATE to handle both insert and update
      const query = `
        INSERT INTO button_links (id, url, updated_at) 
        VALUES (3, ?, NOW()) 
        ON DUPLICATE KEY UPDATE url = ?, updated_at = NOW()
      `; // Changed id to 3
      const [result] = await pool.execute(query, [link, link]);

      res.json({ message: "Button link uploaded successfully!" });
    } catch (err) {
      console.error("Error uploading button link:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Update button link
  updateLink: async (req, res) => {
    try {
      await buttonThreeController.ensureTableExists(); // Updated to use own controller
      const { link } = req.body;
      if (!link) {
        return res.status(400).json({ error: "Missing link in request body" });
      }
      const query =
        "UPDATE button_links SET url = ?, updated_at = NOW() WHERE id = 3"; // Changed id to 3
      const [result] = await pool.execute(query, [link]);

      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ error: "No records updated. Check if ID exists." });
      }

      res.json({ message: "Button link updated successfully!" });
    } catch (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = {
  buttononeController,
  buttonTwoController,
  buttonThreeController,
};
