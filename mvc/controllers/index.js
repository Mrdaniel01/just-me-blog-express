const data = require('../../data');
const postData = data.postData;
const uniqueTags = data.uniqueTags;
const recentPostAmount = 3;

const getHomePage = function(req, res) {
  res.render ("index", { title: "Just Me", posts: postData, active: "index" });
};

const getBlogPost = function({params}, res) {
  let post = postData.find((val) => val.id == params.postid );
  if (!post) { res.redirect("/404")}
  res.render("post", {
    title: post.title,
    post: post,
    uniqueTags: uniqueTags,
    recentPosts: postData.slice(0, recentPostAmount),
    categoryData: data.categoryData
  });
};

const get404 = function(req, res) {
  res.render('404', {
    title: "404 - I couldn't find that page.",
    uniqueTags: uniqueTags,
    recentPosts: postData.slice(0, recentPostAmount),
    categoryData: data.categoryData
  });
}

const redirect404 = function(req, res) {
  res.redirect("/404")
}

const getAbout = function(req, res){
  res.render('about', { title: 'About Me', active: "about" });
}

const getContact = function(req, res){
  res.render('contact', { title: 'Contact Me', active: "contact" });
}

module.exports = {
  getHomePage,
  getBlogPost,
  get404,
  redirect404,
  getAbout,
  getContact
};
