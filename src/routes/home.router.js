import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  if (!req.session.id_user) {
    return res.redirect('/auth/login');
  }

  let name = '';

  try {
    const response = await fetch(`http://localhost:3000/user/${req.session.id_user}`);
    const { data, error } = await response.json();
    if (!error) name = data[0].name;
  } catch (error) {
    console.log(error);
  }

  return res.render('home', {
    layout: 'layout',
    title: 'home',
    jsFileName: 'home.js',
    name,
  });
});

export default router;
