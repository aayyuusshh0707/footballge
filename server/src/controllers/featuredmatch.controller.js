const { pool } = require("../db/db");

const FeaturedMatchController = {
  ensureTableExists: async () => {
    try {
      const FeaturedMatchTableQuery = `
        CREATE TABLE IF NOT EXISTS FeaturedMatch (
          id INT PRIMARY KEY AUTO_INCREMENT,
          matchid VARCHAR(255),  
          updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
      `;
      await pool.query(FeaturedMatchTableQuery);

      // Ensure there is always an entry with id = 1
      const [rows] = await pool.query("SELECT * FROM FeaturedMatch WHERE id = 1");
      if (rows.length === 0) {
        await pool.query("INSERT INTO FeaturedMatch (id, matchid) VALUES (1, '')");
      }
    } catch (error) {
      console.error("Error ensuring table exists:", error);
      throw error;
    }
  },

  // Insert or Update Match ID in id = 1 only
  uploadPin: async (req, res) => {
    try {
      await FeaturedMatchController.ensureTableExists();
      const { matchid } = req.body;
      if (!matchid) {
        return res.status(400).json({ error: "Missing Match ID in request body" });
      }

      // Update id = 1 if it exists
      const query = `
        UPDATE FeaturedMatch 
        SET matchid = ?, updated_at = NOW() 
        WHERE id = 1
      `;
      await pool.execute(query, [matchid]);

      res.json({ message: "Featured Match ID pinned successfully!" });
    } catch (err) {
      console.error("Error pinning Featured Match ID:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Delete Match ID by setting it to an empty string at id = 1
  deletePin: async (req, res) => {
    try {
      await FeaturedMatchController.ensureTableExists();

      // Set matchid to an empty string instead of deleting the row
      const query = `
        UPDATE FeaturedMatch 
        SET matchid = '', updated_at = NOW() 
        WHERE id = 1
      `;
      await pool.execute(query);

      res.json({ message: "Featured Match ID cleared successfully!" });
    } catch (err) {
      console.error("Error clearing Featured Match ID:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  getPin: async (req, res) => {
    try {
      await FeaturedMatchController.ensureTableExists();
      const query = "SELECT matchid FROM FeaturedMatch WHERE id = 1";
      const [result] = await pool.query(query);
      res.json(result[0] || { message: "No matchid found" });
    } catch (err) {
      console.error("Error fetching Featured Match ID:", err);
      res.status(500).json({ error: "Database error" });
    }
  },
};

module.exports = FeaturedMatchController;
