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

    // CREATE ROUTE
    app.post("/blogs", (req, res) => {
      req.body.blog.body = req.sanitize(req.body.blog.body);
      db.Blog.create({
        title: req.body.blog.title,
        image: req.body.blog.image,
        body: req.body.blog.body
      }).then(() => {
        res.redirect("/blogs");
      });
    });

    // NEW ROUTE FOR CREATING A NEW BLOG POST
    app.get("/blogs/new", (req, res) => {
      res.render("new");
    });

    // SHOW ROUTE
    app.get("/blogs/:id", (req, res) => {
      db.Blog.find({ where: { id: req.params.id } }).then(foundBlog => {
        res.render("show", { blog: foundBlog });
      });
    });
  }
};
