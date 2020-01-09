const authExports = (module.exports = {});
const db = require("../models");

authExports.signup = function(req, res) {
  res.render("signup");
};

authExports.login = function(req, res) {
  res.render("login");
};

authExports.blogs = function(req, res) {
  db.Blog.findAll({}).then(blogs => {
    res.render("index", { blogs: blogs });
  });
};

authExports.createBlogs = function(req, res) {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  db.Blog.create({
    title: req.body.blog.title,
    image: req.body.blog.image,
    body: req.body.blog.body
  }).then(() => {
    res.redirect("/blogs");
  });
};

authExports.newBlog = function(req, res) {
  res.render("new");
};

authExports.showBlog = function(req, res) {
  db.Blog.findOne({ where: { id: req.params.id } }).then(foundBlog => {
    res.render("show", { blog: foundBlog });
  });
};

authExports.editBlog = function(req, res) {
  db.Blog.findOne({ where: { id: req.params.id } }).then(foundBlog => {
    res.render("edit", { blog: foundBlog });
  });
};

authExports.updateBlog = function(req, res) {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  db.Blog.findOne({ where: { id: req.params.id } }).then(updatedBlog => {
    updatedBlog
      .update({
        title: req.body.blog.title,
        image: req.body.blog.image,
        body: req.body.blog.body
      })
      .then(() => {
        res.redirect("/blogs");
      });
  });
};

authExports.deleteBlog = function(req, res) {
  db.Blog.destroy({ where: { id: req.params.id } }).then(() => {
    res.redirect("/");
  });
};

authExports.logout = function(req, res) {
  req.session.destroy(function(err) {
    res.redirect("/signup");
  });
};
