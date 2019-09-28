const path = require("path");
const rootComponent = path.resolve("./src/components/app/index.js");
module.exports = {
  mdxPages: function(pages, navigation, titles, createPage) {
    let promises = [];
	  for (let slug in pages) {
      let data = {
        path: slug,
        component: rootComponent,
        context: {
          node: pages[slug],
          slug,
          navigation,
          titles
        }
      }
	  	promises.push(new Promise((resolve, reject) => {
        createPage(data)
      	resolve(true);
 	    }));
    }

    return Promise.all(promises);
  },
  otherPages: function(pages, navigation, titles, createPage) {
    let promises = [];
	  for (let slug in pages) {
      let data = {
        path: slug,
        component: rootComponent,
        context: {
          node: { frontmatter: pages[slug].frontmatter },
          slug,
          navigation,
          titles
        }
      }
      if (pages[slug].matchPath) data.matchPath = pages[slug].matchPath
	  	promises.push(new Promise((resolve, reject) => {
        createPage(data)
      	resolve(true);
 	    }));
    }

    return Promise.all(promises);
  },
  redirects: function(redirects, createRedirect) {
    let promises = [];
	  for (let from in redirects) {
	  	promises.push(new Promise((resolve, reject) => {
        createRedirect({
          fromPath: from,
          toPath: redirects[from],
          isPermanent: true,
          redirectInBrowser: true,
        });
      	resolve(true);
 	    }));
    }

    return Promise.all(promises);
  }
}
