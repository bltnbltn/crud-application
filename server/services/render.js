const axios = require('axios');

const blogData = [
  {
    id: 23423423524234,
    date: '18 July 2023',
    category: 'Web Design',
    title: 'What Has Happened to All the web Design Ideas?',
    imageUrl: '/images/blog-1.jpg',
  },
  {
    id: 2,
    date: '18 June 2023',
    category: 'Web Design',
    title: 'What Has Happened to All the web Design Ideas?',
    imageUrl: '/images/blog-2.jpg',
  },
];

exports.homeRoutes = (req, res) => {
  axios
    .get('http://localhost:7000/api/articles')
    .then(function (response) {
      // Render the home page with the task data received from the server
      res.render('index', { tasks: response.data });
    })
    .catch((err) => {
      // Handle errors and send an error response
      res.send(err);
    });

  res.render('index', { blogs: blogData });
};
