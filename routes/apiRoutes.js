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

    // Get all examples
    app.get("/blogs", (req, res) => {});

    // Get an example
    app.get("/api/examples/:id", function(req, res) {
      console.log({ id: req.params.id });
      db.Example.findAll({ where: { id: req.params.id } }).then(function(
        dbExamples
      ) {
        console.log(dbExamples);
        res.json(dbExamples[0]);
      });
    });

    // Create a new example
    app.post("/api/examples", this.postExampleApi);

    // Delete an example by id
    app.delete("/api/examples/:id", function(req, res) {
      db.Example.destroy({ where: { id: req.params.id } }).then(function(
        dbExample
      ) {
        res.json(dbExample);
      });
    });
  }
};
