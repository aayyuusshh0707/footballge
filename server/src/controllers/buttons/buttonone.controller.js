const { pool } = require("../../db/db");

const buttononeController = {

  // Get button link
  getLink: async (req, res) => {
    try {
      const query = "SELECT * FROM button_links WHERE id = 1"; // 1 is the button ID
      const [result] = await pool.query(query);
      res.json(result[0] || { message: "No link found" });
    } catch (err) {
      console.error("Error fetching button link:", err);
      res.status(500).json({ error: "Database error" });
    }
  },

  // Update button link

  updateLink: async (req, res) => {
    try {
      const { link } = req.body;
      if (!link) {
        return res.status(400).json({ error: "Missing link in request body" });
      }
      const query = "UPDATE button_links SET url = ? WHERE id = 1";
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

module.exports = buttononeController;
