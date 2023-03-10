const router = require("express").Router();
const { Pet, User, Record } = require("../../models");
const withAuth = require("../../utils/auth");

// Get all pets
router.get( "/",/* withAuth, */ async (req, res) => {
    // find all pets
    try {
      const petData = await Pet.findAll({
        include: [{ model: User }, { model: Record }],
      });
      res.status(200).json(petData);
    } catch (err) {
      res.json(500).json(err);
    }
  }
);

// Get one pet
router.get("/:id",/* withAuth, */ async (req, res) => {
    // find a single pet by its `id`
    try {
      const petData = await Pet.findByPk(req.params.id, {
        include: [{ model: User }, { model: Record }],
      });
      if (!petData) {
        res.status(404).json({ message: "Id not found" });
        return;
      }
      const pet = petData.get({ plain: true });
      res.render('pet-profile', {
        ...pet,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// Add Pet
router.post("/",/* withAuth, */ async (req, res) => {
    try {
      const newPet = await Pet.create({
        ...req.body,
        user_id: req.session.user_id,
      });

      res.status(200).json(newPet);
    } catch (err) {
      res.status(400).json(err);
    }
  res.redirect('/profile');
  }
);

// Update Pet
router.put("/:id",/* withAuth, */ async (req, res) => {
    // update a category by its `id` value
    try {
      const [affectedRows] = await Pet.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (affectedRows > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
  
    } catch (err) {
      res.status(500).json(err);
    }
  }
//   try {
//     const updatePet = await Pet.findByPk(req.params.id, {
//       include: [{ model: User }, { model: Record }],
//     });
//     if (!petData) {
//       res.status(404).json({ message: "Id not found" });
//       return;
//     }
//     const pet = updatePet.get({ plain: true });
//     res.render('pet-profile', {
//       ...pet,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// }
);

// Delete Pet
router.delete("/delete/:id", withAuth, async (req, res) => {
    try {
      const petData = await Pet.destroy({
        where: {
          id: req.params.id,
        },
      });

      if (!petData) {
        res.status(404).json({ message: "No pet found with this id!" });
        return;
      }

      res.status(200).json(petData);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;
