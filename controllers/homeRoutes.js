const router = require("express").Router();
const { Pet, User } = require("../models");
const withAuth = require("../utils/auth");




// Homepage Get route
router.get("/homepage",/* withAuth, */ async (req, res) => {
    try {
      res.render('homepage');
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// Use withAuth middleware to prevent access to route
router.get("/profile",/* withAuth, */ async (req, res) => {
    try {
    if (req.session.logged_in) {
        res.render('profile');
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
    res.render('update-profile', { id: req.params.id });
  } catch (err) {
    console.log({ error: err })
    res.status(500).json(err); 
  }
});



module.exports = router;
