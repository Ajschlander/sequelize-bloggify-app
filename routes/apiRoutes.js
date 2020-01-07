const db = require("../models");

module.exports = {
  postExampleApi: async function(req, res) {
    const dbBlog = await db.Blog.create(req.body);
    res.json(dbBlog);
  },
  api: function(app) {
    // REROUTE TO /BLOGS
    app.get("/", (req, res) => {
      res.redirect("/blogs");
    });

    // GET ROUTE FOR THE HOME PAGE WITH ALL THE BLOGS IN THE DB
    app.get("/blogs", (req, res) => {
      db.Blog.findAll({}).then(blogs => {
        res.render("index", { blogs: blogs });
      });
    });

    // NEW ROUTE FOR CREATING A NEW BLOG POST
    app.get("/blogs/new", (req, res) => {
      res.render("new");
    });
  }
};
