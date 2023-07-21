import { Router } from 'express';

const router = Router();

router.get('/login', (req, res) => {
  if (req.session.id_user) {
    return res.redirect('/');
  }

  return res.render('login', {
    layout: 'layout',
    title: 'login',
    jsFileName: 'login.js',
  });
});

router.get('/signup', (req, res) => {
  if (req.session.id_user) {
    return res.redirect('/');
  }

  return res.render('signup', {
    layout: 'layout',
    title: 'sign up',
    jsFileName: 'signup.js',
  });
});

router.get('/logout', (req, res) => {
  if (!req.session.id_user) {
    return res.redirect('/auth/login');
  }
  req.session.destroy();
  return res.redirect('/auth/login');
});

export default router;
