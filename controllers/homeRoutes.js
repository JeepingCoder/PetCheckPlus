const router = require("express").Router();
const { Pet, User } = require("../models");
const withAuth = require("../utils/auth");
const uploadController = require("../controllers/upload");
const upload = require("../middleware/upload");

// Homepage Get route
router.get("/",/* withAuth, */ async (req, res) => {
    try {
      res.render('homepage');
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
    try {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Pet }],
      });
  
      const user = userData.get({ plain: true });

    if (req.session.logged_in) {
      res.render('profile', {
        ...user,
        logged_in: req.session.logged_in
      });
        return;
      } else if (!req.session.logged_in) {
        res.redirect("/login");
        return;
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  } else if (!req.session.logged_in) {
    res.render("login");
    return;
  }

  
});

// route to render update profile
router.get('/user/edit/:id', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id,);
    const user = userData.get({ plain: true });

    res.render('update-profile', {
      ...user,
      logged_in: req.session.logged_in
    });
    // res.render('update-profile', user);
  } catch (err) {
    console.log({ error: err })
    res.status(500).json(err); 
  }
});

router.post("/upload", upload.single("file"), uploadController.uploadFiles);


module.exports = router;
