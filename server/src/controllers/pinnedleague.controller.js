const { pool } = require("../db/db");

const pinnedLeagueController = {
  ensureTableExists: async () => {
    try {
      const LeagueTableQuery = `
        CREATE TABLE IF NOT EXISTS PinnedLeague (
          id INT PRIMARY KEY AUTO_INCREMENT,
          Leagueid VARCHAR(255),  
          updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
      `;
      await pool.query(LeagueTableQuery);

      const [rows] = await pool.query("SELECT * FROM PinnedLeague");
      if (rows.length === 0) {
        await pool.query("INSERT INTO PinnedLeague ( Leagueid) VALUES ('')");
      }
    } catch (error) {
      console.error("Error ensuring table exists:", error);
      throw error;
    }
  },

  // Upload (Insert or Update) pinned League ID
  uploadpin: async (req, res) => {
    try {
      await pinnedLeagueController.ensureTableExists();
      const { Leagueid } = req.body;
      if (!Leagueid) {
        return res.status(400).json({ error: "Missing League ID in request body" });
      }

      // Insert or update Leagueid
      const query = `
        INSERT INTO PinnedLeague (Leagueid, updated_at) 
        VALUES (?, NOW()) 
        ON DUPLICATE KEY UPDATE Leagueid = VALUES(Leagueid), updated_at = NOW();
      `;
      await pool.execute(query, [Leagueid]);

      res.json({ message: "League ID pinned successfully!" });
    } catch (err) {
      console.error("Error pinning League ID:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Delete pinned League ID
  deletePin: async (req, res) => {
    try {
      await pinnedLeagueController.ensureTableExists();
      const { Leagueid } = req.body;
      if (!Leagueid) {
        return res.status(400).json({ error: "Missing League ID in request body" });
      }

      const query = "DELETE FROM PinnedLeague WHERE Leagueid = ?";
      const [result] = await pool.execute(query, [Leagueid]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "League ID not found" });
      }

      res.json({ message: "League ID deleted successfully!" });
    } catch (err) {
      console.error("Error deleting League ID:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  getPin: async (req, res) => {
    try {
      await pinnedLeagueController.ensureTableExists();
      const query = "SELECT Leagueid FROM FeaturedMatch WHERE id = 1";
      const [result] = await pool.query(query);
      res.json(result[0] || { message: "No matchid found" });
    } catch (err) {
      console.error("Error fetching Featured League ID:", err);
      res.status(500).json({ error: "Database error" });
    }
  },
};

module.exports = pinnedLeagueController;

