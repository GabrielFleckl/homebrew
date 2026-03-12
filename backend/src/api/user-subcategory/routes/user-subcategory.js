module.exports = {
  routes: [
    {
      method: "POST",
      path: "/user-subcategories/update-status",
      handler: "user-subcategory.updateCompletedStatus",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/user-subcategories/completed",
      handler: "user-subcategory.findCompleted",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/user-subcategories/ranking",
      handler: "user-subcategory.getRanking",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/user-subcategories/ranking/:userId',
      handler: 'user-subcategory.findRanking',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
