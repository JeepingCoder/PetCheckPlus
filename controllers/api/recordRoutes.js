const router = require("express").Router();
const {Pet, Record } = require("../../models");
const withAuth = require("../../utils/auth");

// Get all records
router.get("/",/* withAuth, */ async (req, res) => {
    // find all records
    try {
      const recordData = await Record.findAll({
        include: [{ model: Pet }],
      });
      res.status(200).json(recordData);
    } catch (err) {
      res.json(500).json(err);
    }
  }
);

// Get one record
router.get("/:id",/* withAuth, */ async (req, res) => {
    try {
      const recordData = await Record.findByPk(req.params.id, {
        // be sure to include its associated Product data
        include: [{ model: Pet }],
      });
      if (!recordData) {
        res.status(404).json({ message: "Id not found" });
        return;
      }
      res.status(200).json(recordData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);

// Create record
router.post("/",/* withAuth, */ async (req, res) => {
    try {
      const newRecord = await Record.create({
        ...req.body,
        record_id: req.session.record_id,
      });

      res.status(200).json(newRecord);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

// Update record
router.put("/:id",/* withAuth, */ async (req, res) => {
    try {
      const recordData = await Record.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!recordData) {
        res.status(404).json({ message: "Id not found" });
        return;
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// Delete Record
router.delete("/:id",/* withAuth, */ async (req, res) => {
    try {
      const recordData = await Record.destroy({
        where: {
          id: req.params.id,
        },
      });

      if (!recordData) {
        res.status(404).json({ message: "No record found with this id!" });
        return;
      }

      res.status(200).json(recordData);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;
