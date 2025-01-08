exports.dashboard = (req, res) => {
    res.render('dashboard', { user: { username: 'John Doe' } });  // Dummy user data
  };
  