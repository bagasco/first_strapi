// path: ./src/api/restaurant/routes/custom-restaurant.js

module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/posts-plural/like/:id',
        handler: 'like.index',
      },
    ],
  };
  