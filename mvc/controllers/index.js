const data = require('../../data');
const postData = data.postData;
const uniqueTags = data.uniqueTags;
const categoryData = data.categoryData;
const recentPostAmount = 3;
const defaultData = {
  categoryData: categoryData
}

const getHomePage = function(req, res) {

let data = {
  ...defaultData,
  title: "Just Me",
    posts: postData,
    active: "index",
    categoryData: categoryData
}

  res.render ("index", data);
};

const getBlogPost = function({params}, res) {
  let post = postData.find((val) => val.id == params.postid );
  if (!post) { res.redirect("/404")}

  let data = {
    ...defaultData,
    title: post.title,
    post: post,
    uniqueTags: uniqueTags,
    recentPosts: postData.slice(0, recentPostAmount),
  }
  res.render("post", data);
};

const get404 = function(req, res) {

  let data = {
    ...defaultData,
    title: "404 - I couldn't find that page.",
    uniqueTags: uniqueTags,
    recentPosts: postData.slice(0, recentPostAmount),
    categoryData: categoryData
  }

  res.render('404', data);
}

const redirect404 = function(req, res) {
  res.redirect("/404")
}

const getAbout = function(req, res){

  let data = {
    ...defaultData,
    title: 'About Me',
    active: "about",
    categoryData: categoryData
  }

  res.render('about', data);
}

const getContact = function(req, res){

  let data = {
    ...defaultData,
    title: 'Contact Me',
    active: "contact",
    categoryData: categoryData
  }

  res.render('contact', data);
}


const getFilteredList = function({query}, res, next) {
  let filteredPosts = postData.filter((val) => {
      return val.category == query.category || val.tags.includes(query.tag);
  });

  const defaultData = {
    title: "Just Me - Filtered",
    active: query.category,
    posts: filteredPosts,
    categoryData: data.categoryData
  }
  res.render('filter', defaultData);
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
