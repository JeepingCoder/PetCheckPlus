const router = require("express").Router();
const { User } = require("../../models");
const withAuth = require("../../utils/auth");

// Get all users
router.get(
  "/",
  /* withAuth, */ async (req, res) => {
    try {
      const userData = await User.findAll({
        attributes: { exclude: ["password"] },
        order: [["name", "ASC"]],
      });

      // Serialize user data so templates can read it
      // const users = userData.map((user) => user.get({ plain: true }));

      // Pass serialized data into Handlebars.js template
      // res.render(/* 'homepage', */ { users });
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// Get one user
router.get(
  "/:id",
  /* withAuth, */ async (req, res) => {
    try {
      const userData = await User.findByPk(req.params.id, {
        attributes: { exclude: ["password"] },
        order: [["name", "ASC"]],
      });

      if (!userData) {
        res.status(404).json({ message: "Id not found" });
        return;
      }
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// Create new user
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// route to update profile
router.put('/edit/:id', async (req, res) => {
  try {
    const updatedPost = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Logout
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
      console.log("Successfully logged out!");
    });
  } else {
    res.status(404).end();
  }
});

// Update user
router.put(
  "/:id",
  /* withAuth, */ async (req, res) => {
    // update a category by its `id` value
    try {
      const userData = await User.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!userData) {
        res.status(404).json({ message: "Id not found" });
        return;
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// Delete user
router.delete(
  "/:id",
  /* withAuth, */ async (req, res) => {
    // delete a category by its `id` value
    try {
      const userData = await User.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!userData) {
        res.status(404).json({ message: "Id not found" });
        return;
      }

      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;
