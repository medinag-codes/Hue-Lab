module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show each page (will also have our login/logout links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    app.get('/about', function(req, res) {
      res.render('about.ejs');
  });

  app.get('/contact', function(req, res) {
    res.render('contact.ejs');
  });
    // FORMULATION SECTION =========================
    app.get('/formula/:hex', isLoggedIn, function(req, res) {
      db.collection('formula').find({hex: `#${req.params.hex}`}).toArray((err, result) => {
        if (err) return console.log(err)
        res.send(
          JSON.stringify(result)
        )
      })
  });

    app.get('/formulation', isLoggedIn, function(req, res) {
        db.collection('formula').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('formulation.ejs', {
            user : req.user,
            formula: result
          })
        })
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
      db.collection('formula').find({email: req.user.local.email}).toArray((err, result) => {
        if (err) return console.log(err)
          if (result.length < 1){
            res.redirect('/formulation')
          }
        res.render('profile.ejs', {
          user : req.user,
          formulas: result
        })
      })
  });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout(() => {
          console.log('User has logged out!')
        });
        res.redirect('/');
    });

// formula routes ===============================================================

app.post('/formula',(req, res) => {
  db.collection('formula').save({email: req.body.email, name: req.body.name, hex: req.body.hex, formula: req.body.formula, isDeleted: false, createdAt: new Date()}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    // res.redirect('/profile')
    res.send('formula saved')
  })
})

app.put('/formula', (req, res) => {
  console.log(req.body)
  db.collection('formula')
  .findOneAndUpdate({name: req.body.name}, {
    $set: {
      isDeleted: true
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
          //if user already has an account, profile runs the logic to check if they have less than one formula
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
          //if user is signing up, take them to the formulation page
            successRedirect : '/formulation', // redirect to the secure formulation section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/formulation');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
