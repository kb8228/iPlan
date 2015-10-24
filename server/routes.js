module.exports = function(app, passport) {

  // =====================================
  // FACEBOOK ROUTES =====================
  // =====================================
  // route for facebook authentication and login
  app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

  // handle the callback after facebook has authenticated the user
  // app.get('/auth/facebook/callback',
  //   passport.authenticate('facebook', {
  //     successRedirect : '/events/1',
  //     failureRedirect : '/'
  //   }));
  //Redirect Back to Home Page upon Authentication
  app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
      successRedirect : '/events/1',
      failureRedirect : '/'
  }));


  // route for logging out
  app.get('api/logout', function(req, res) {
    req.session.destroy();
    req.logout();
    res.redirect('/');
  });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}