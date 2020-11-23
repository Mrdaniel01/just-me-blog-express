const data = require('../../data');
const postData = data.postData;
const uniqueTags = data.uniqueTags;
const categoryData = data.categoryData;
const recentPostAmount = 3;

const getHomePage = function(req, res) {
  res.render ("index", {
    title: "Just Me",
    posts: postData,
    active: "index",
    categoryData: categoryData
  });
};

const getBlogPost = function({params}, res) {
  let post = postData.find((val) => val.id == params.postid );
  if (!post) { res.redirect("/404")}
  res.render("post", {
    title: post.title,
    post: post,
    uniqueTags: uniqueTags,
    recentPosts: postData.slice(0, recentPostAmount),
    categoryData: categoryData
  });
};

const get404 = function(req, res) {
  res.render('404', {
    title: "404 - I couldn't find that page.",
    uniqueTags: uniqueTags,
    recentPosts: postData.slice(0, recentPostAmount),
    categoryData: categoryData
  });
}

const redirect404 = function(req, res) {
  res.redirect("/404")
}

const getAbout = function(req, res){
  res.render('about', {
    title: 'About Me',
    active: "about",
    categoryData: categoryData
  });
}

const getContact = function(req, res){
  res.render('contact', {
    title: 'Contact Me',
    active: "contact",
    categoryData: categoryData
  });
}


const getFilteredList = function({query}, res, next) {
  let filteredPosts = postData.filter((val) => {
      return val.category == query.category || val.tags.includes(query.tag);
  });

  //const templateData = 
  res.render('filter', {
    title: "Just Me - Filtered",
    active: query.category,
    posts: filteredPosts,
    categoryData: data.categoryData
});
}

module.exports = {
  getHomePage,
  getBlogPost,
  get404,
  redirect404,
  getAbout,
  getContact,
  getFilteredList
};
