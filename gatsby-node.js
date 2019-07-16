const path = require("path");
const topics = require("./src/config/topics");
const patterns = require("@freesewing/pattern-info").list;

const rootComponent = path.resolve("src/components/app.js");

const redirects = {
  "/privacy": "/docs/about/privacy",
  "/rights": "/docs/about/rights",
  "/faq": "/docs/about/faq",
  "/contact": "/docs/about/contact",
}

const patternMeasurements = {}
for (let pattern of patterns) {
  patternMeasurements["/docs/patterns/"+pattern+"/measurements"] = "app.requiredMeasurements";
}
const pages = {
  single: {
    "/": "app.home",
    "/language": "account.language",
    "/login": "app.logIn",
    "/login": "app.logIn",
    "/logout": "app.logOut",
    "/search": "app.search",
    "/signup": "app.signUp",
    "/model": "app.newModel",
    ...patternMeasurements
  },
  multiple: {
    "/showcase/patterns": {
      matchPath: "/showcase/patterns/*",
    },
    "/blog/years": {
      matchPath: "/blog/years/*",
    },
    "/account": {
      matchPath: "/account/*"
    },
    "/confirm": {
      matchPath: "/confirm/*"
    },
    "/welcome": {
      matchPath: "/welcome/*"
    },
    "/models": {
      matchPath: "/models/*"
    },
    "/recipes": {
      matchPath: "/recipes/*"
    },
    "/patrons": {
      matchPath: "/patrons/*"
    },
    "/draft": {
      matchPath: "/draft/*"
    },
  }
}

const getFileList = function(graphql, language, markdown) {
  return new Promise((resolve, reject) => {
    let query = `{
      allFile(filter: {
        sourceInstanceName: {eq: "markdown"},
        extension: {eq: "md"},
        name: {in: ["${language}","en"]}
      }) { edges { node { relativeDirectory, name, absolutePath }}}
    }`;
    graphql(query).then(res => {
      if (typeof res.data === "undefined") {
        console.log("query failed", query, res);
        return false;
      } else {
        for (let node of res.data.allFile.edges) {
          let slug = "/"+node.node.relativeDirectory;
          let path = node.node.absolutePath;
          let lang = node.node.name;
          if (lang === language) markdown[slug] = { path, language: lang};
          else if (lang === "en" && typeof markdown[slug] === "undefined")
            markdown[slug] = {path, language: lang};
        }
      }
      resolve(true);
    });
  })
};

const parentCrumb = function(baseSlug, titles) {
  if (baseSlug.slice(1).indexOf("/") === -1) return false;
  let chunks = baseSlug.split("/");
  chunks.pop();
  let parentSlug = chunks.join("/");
  if (typeof titles[parentSlug] === "undefined") return false;
  else return { slug: parentSlug, title: titles[parentSlug]};
}
const breadcrumbs = function(baseSlug, titles) {
  let crumbs = [];
  let up = parentCrumb(baseSlug, titles);
  let count = 0;
  while (up && count < 20) {
    crumbs.unshift(up);
    up = parentCrumb(up.slug, titles);
    count++;
  }

  return crumbs;
}

const frontmatter = {
  docs: `title`,
  blog: `title
    date
    year:date(formatString: "YYYY")
    linktitle
    caption
    author
    img {
      childImageSharp {
        fluid(maxWidth: 800) {
          base64
          srcSet
          sizes
          originalImg
          originalName
        }
      }
    }`,
  showcase: `title
    date
    caption
    author
    patterns
    img {
      childImageSharp {
        fluid(maxWidth: 800) {
          base64
          srcSet
          sizes
          originalImg
          originalName
        }
      }
    }`,
};


const getMdx = function(graphql, language, markdown, titles) {
  let promises = [];
  let slugs = Object.keys(markdown);
  slugs.sort();
	for (let slug of slugs) {
    let fm = frontmatter.docs;
    if (markdown[slug].path.indexOf("/blog/") !== -1) fm = frontmatter.blog;
    if (markdown[slug].path.indexOf("/showcase/") !== -1) fm = frontmatter.showcase;

		promises.push(new Promise((resolve, reject) => {
 		  let query = `{
 		  	allMdx(filter: {fileAbsolutePath: {eq: "${markdown[slug].path}"} }) {
 		  		edges {
 		  			node {
 		      		id
 		      		frontmatter { ${fm} }
 		      		code { body }
 		      		excerpt
 		      		tableOfContents
 		  			}
 		  		}
 		  	}
 		  }`;
    	graphql(query).then(res => {
    	  if (typeof res.data === "undefined") {
    	    console.log("query failed", query, res);
    	    reject();
    	  } else if (res.data.allMdx.edges.length > 1) {
    	    console.log("More than one edge found:", query, res);
    	    reject();
    	  } else {
					markdown[slug].node = res.data.allMdx.edges[0];
          titles[slug] = markdown[slug].node.node.frontmatter.title;
    	    resolve(true);
				}
    	});
  	}));
  }

  return Promise.all(promises);
};

const isDescendant = function (topic, slug, level=1) {
  let chunks = slug.split("/");
  if (chunks.length === (level + 2) && chunks[1] === topic) {
    if (level === 1) return true;
    if (level === 2) return "/"+topic+"/"+chunks[2];
    if (level === 3) return "/"+topic+"/"+chunks[2]+"/"+chunks[3];
  }
  else return false;
}

const isChild = function (base, slug) {
  if (slug.slice(0, base.length) !== base) return false;
  let chunks = {
    base: base.split("/"),
    slug: slug.split("/")
  }
  if (chunks.base.length + 1 === chunks.slug.length) return true;

  return false;
}
//
//const isGrandchild = function (topic, slug) {
//  let chunks = slug.split("/");
//  if (chunks.length === 4 && chunks[1] === topic) return "/"+topic+"/"+chunks[2];
//  else return false;
//}

const getSortTitle = function (mdx) {
  let title = mdx.node.node.frontmatter.title;
  if (typeof mdx.node.node.frontmatter.linktitle !== "undefined")
    title = mdx.node.node.frontmatter.title;
  let order = null;
  if (typeof mdx.node.node.frontmatter.order !== "undefined")
    order = mdx.node.node.frontmatter.order;
  if (typeof mdx.node.node.frontmatter.date !== "undefined")
    order = mdx.node.node.frontmatter.date;
  if (order !== null) title = order + title;

  return title;
}

const getTitle = function (mdx) {
  if (typeof mdx.node.node.frontmatter.linktitle !== "undefined")
    return mdx.node.node.frontmatter.linktitle;

  return mdx.node.node.frontmatter.title;
}

const getDocsLevel = (level, data) => {
}

const getTopics = function(markdown) {
  let list = { };
  let slugs = Object.keys(markdown);
  slugs.sort();
  for (let topic of topics) {
    let slug = "/"+topic;
    if (typeof markdown[slug] === "undefined")
      throw new Error(`No page for topic ${topic} at ${slug}`);
    list[topic] = {
      title: markdown[slug].node.node.frontmatter.title,
      children: {},
    }
    // Children of root topic
    let children = {};
    if (topic === "showcase") {
      for (let pattern of patterns) {
        list.showcase.children["/showcase/patterns/"+pattern] = {
          title: pattern.charAt(0).toUpperCase() + pattern.slice(1)
        }
      }
    } else {
	    for (let slug of slugs) {
        if (isDescendant(topic, slug, 1)) children[getSortTitle(markdown[slug])] = slug;
      }
      let childrenOrder = Object.keys(children);
      childrenOrder.sort();
      if (topic === "blog") {
        // These are prefixed by date, put newest first
        childrenOrder.reverse();
        for (let title of childrenOrder) {
          let slug = children[title];
          let year = markdown[children[title]].node.node.frontmatter.year;
          if (typeof list.blog.children[year] === "undefined") {
            list.blog.children["/blog/years/"+year] = { title: year }
          }
        }
      } else {
        for (let title of childrenOrder) {
          let slug = children[title];
          list[topic].children[slug] = {title: getTitle(markdown[slug])};
        }
      }
    }
  }
  const buildDocsLevel = () => {
  }
  // Docs have a deeper hierarchy
  // FIXME: This is not a very efficient way to do this
  for (let parent in list.docs.children) {
	  for (let child of slugs) {
      let grandchildren = false;
      if (isChild(parent, child)) {
        grandchildren = true;
        if (typeof list.docs.children[parent].children === "undefined") {
          list.docs.children[parent].children = {}
        }
        list.docs.children[parent].children[child] = {title: getTitle(markdown[child])}
        if (grandchildren) {
	        for (let grandchild of slugs) {
            let greatgrandchildren = false;
            if (isChild(child, grandchild)) {
              greatgrandchildren = true;
              if (typeof list.docs.children[parent].children[child].children === "undefined") {
                list.docs.children[parent].children[child].children = {}
              }
              list.docs.children[parent].children[child].children[grandchild] = {title: getTitle(markdown[grandchild])}
              if (greatgrandchildren) {
	              for (let greatgrandchild of slugs) {
                  if (isChild(grandchild, greatgrandchild)) {
                    if (typeof list.docs.children[parent].children[child].children[grandchild].children === "undefined") {
                      list.docs.children[parent].children[child].children[grandchild].children = {}
                    }
                    list.docs.children[parent].children[child].children[grandchild].children[greatgrandchild] = {title: getTitle(markdown[greatgrandchild])}
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return list;
}

const getTopic = function(page) {
  let chunks = page.split("/");
  let t = topics.indexOf(chunks[1]);
  if (t === -1) return false;
  else return topics[t];
}

const flattenTopicsToc = function(topicsToc) {
  let slugs = [];
  let titles = {};
  for (let topic of topics) {
    slugs.push("/"+topic);
    titles["/"+topic] = topicsToc[topic].title;
    for (let child in topicsToc[topic].children) {
      slugs.push(child);
      titles[child] = topicsToc[topic].children[child].title;
      if (typeof topicsToc[topic].children !== "undefined") {
        for (let grandchild in topicsToc[topic].children[child].children) {
          slugs.push(grandchild);
          titles[grandchild] = topicsToc[topic].children[child].children[grandchild].title;
        }
      }
    }
  }

  return { slugs, titles };
}

const createRedirects = function(redirects, createRedirect) {
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

const createMdx = function(graphql, language, markdown, titles, createPage) {
  let promises = [];
  let topicsToc = getTopics(markdown);
  // Stuff topicsToc with pattern info (too deep or not available in markdown)
  //for (let pattern of patterns) {
  //  let children = {};
  //  let prefix = "/docs/patterns/"+pattern;
  //  children[prefix+"/options"] = {title: "Pattern options"} // FIXME: Translation
  //  children[prefix+"/measurements"] = {title: "Required measurements"} // FIXME: Translation
  //  children[prefix+"/needs"] = {title: "What you need"} // FIXME: Translation
  //  children[prefix+"/fabric"] = {title: "Fabric options"} // FIXME: Translation
  //  children[prefix+"/cutting"] = {title: "Cutting"} // FIXME: Translation
  //  children[prefix+"/instructions"] = {title: "Instructions"} // FIXME: Translation
  //  topicsToc.docs.children["/docs/patterns"].children[prefix].children = children;
  //}
  let content = flattenTopicsToc(topicsToc);
  let slugs = Object.keys(markdown);
  slugs.sort();
	for (let slug of slugs) {
    let topic = getTopic(slug);
		promises.push(new Promise((resolve, reject) => {
      createPage({
        path: slug,
        component: rootComponent,
        context: {
          node: markdown[slug].node.node,
          topic,
          topics,
          topicsToc,
          content,
          crumbs: breadcrumbs(slug, titles),
          language: markdown[slug].language,
          slug: slug
        }
      });
    	resolve(true);
 	  }));
  }
  for (let i in pages.single) {
		promises.push(new Promise((resolve, reject) => {
      createPage({
        path: i,
        component: rootComponent,
        context: {
          topics,
          topicsToc,
          content,
          crumbs: breadcrumbs(i, titles),
          slug: i,
          title: pages.single[i]
        }
      });
    	resolve(true);
 	  }));
  }
  for (let i in pages.multiple) {
		promises.push(new Promise((resolve, reject) => {
      createPage({
        path: i,
        component: rootComponent,
        ...pages.multiple[i],
        context: {
          topics,
          topicsToc,
          content,
          crumbs: breadcrumbs(i, titles),
          slug: i,
        }
      });
    	resolve(true);
 	  }));
  }
  return Promise.all(promises);
};

exports.createPages = ({ actions, graphql }) => {
  const language = process.env.GATSBY_LANGUAGE;
  if (typeof language === "undefined")
    throw new Error("You MUST set the GATSBY_LANGUAGE environment variable (to 'en' for example)");
  return new Promise((resolve, reject) => {
    const titles = {};
    const markdown = {};
    getFileList(graphql, language, markdown)
      .then(() => {
        console.log("[#-----]", "GraphQl file list query completed");
        getMdx(graphql, language, markdown, titles)
        .then(() => {
          console.log("[##----]", "MDX queries completed");
          createMdx(graphql, language, markdown, titles, actions.createPage)
          .then(() => {
            console.log("[##----]", "MDX pages created");
            createRedirects(redirects, actions.createRedirect)
            .then(() => {
              console.log("[##----]", "Redirects created");
              resolve(true);
            })
          })
        })
      })
    })
};


