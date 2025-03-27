const { pool } = require("../db/db");

const pinnedMatchController = {
  ensureTableExists: async () => {
    try {
      const MatchTableQuery = `
        CREATE TABLE IF NOT EXISTS PinnedMatches (
          id INT PRIMARY KEY AUTO_INCREMENT,
          matchid VARCHAR(255),  
          updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
      `;
      await pool.query(MatchTableQuery);

      const [rows] = await pool.query("SELECT * FROM PinnedMatches");
      if (rows.length === 0) {
        await pool.query("INSERT INTO PinnedMatches ( matchid) VALUES ('')");
      }
    } catch (error) {
      console.error("Error ensuring table exists:", error);
      throw error;
    }
  },

  // Upload (Insert or Update) pinned match ID
  uploadpin: async (req, res) => {
    try {
      await pinnedMatchController.ensureTableExists();
      const { matchid } = req.body;
      if (!matchid) {
        return res
          .status(400)
          .json({ error: "Missing match ID in request body" });
      }

      // Insert or update matchid
      const query = `
        INSERT INTO PinnedMatches (matchid, updated_at) 
        VALUES (?, NOW()) 
        ON DUPLICATE KEY UPDATE matchid = VALUES(matchid), updated_at = NOW();
      `;
      await pool.execute(query, [matchid]);

      res.json({ message: "Match ID pinned successfully!" });
    } catch (err) {
      console.error("Error pinning match ID:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Delete pinned match ID
  deletePin: async (req, res) => {
    try {
      await pinnedMatchController.ensureTableExists();
      const { matchid } = req.body;
      if (!matchid) {
        return res
          .status(400)
          .json({ error: "Missing match ID in request body" });
      }

      const query = "DELETE FROM PinnedMatches WHERE matchid = ?";
      const [result] = await pool.execute(query, [matchid]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Match ID not found" });
      }

      res.json({ message: "Match ID deleted successfully!" });
    } catch (err) {
      console.error("Error deleting match ID:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  getPin: async (req, res) => {
    try {
      await pinnedMatchController.ensureTableExists();
      const query = "SELECT matchid FROM FeaturedMatch WHERE id = 1";
      const [result] = await pool.query(query);
      res.json(result[0] || { message: "No matchid found" });
    } catch (err) {
      console.error("Error fetching Featured League ID:", err);
      res.status(500).json({ error: "Database error" });
    }
  },
};

module.exports = pinnedMatchController;
