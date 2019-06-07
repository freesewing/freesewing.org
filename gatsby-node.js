const path = require("path");
const topics = require("./src/topics");

const redirects = {
  "/privacy": "/docs/about/privacy",
  "/rights": "/docs/about/rights",
  "/faq": "/docs/about/faq",
  "/contact": "/docs/about/contact",
}

const pages = {
  "/": {
    params: {
      component: path.resolve("src/components/pages/homepage.js"),
    },
    props: {
      i18nTitle: "app.home",
    },
  },
  "/search": {
    params: {
      component: path.resolve("src/components/pages/search.js"),
    },
    props: {
      i18nTitle: "app.search",
    },
  },
  "/languages": {
    params: {
      component: path.resolve("src/components/pages/languages.js"),
    },
    props: {
      i18nTitle: "app.languages"
    },
  },
  "/showcase/pattern": {
    params: {
      component: path.resolve("src/components/templates/index.js"),
      matchPath: "/showcase/*"
    },
    props: {
      titleFrom: "hashtrailer",
    },
  },
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

const isChild = function (topic, slug) {
  let chunks = slug.split("/");
  if (chunks.length === 3 && chunks[1] === topic) return true;
  else return false;
}

const isGrandchild = function (topic, slug) {
  let chunks = slug.split("/");
  if (chunks.length === 4 && chunks[1] === topic) return "/"+topic+"/"+chunks[2];
  else return false;
}

const getSortTitle = function (mdx) {
  let title = mdx.node.node.frontmatter.title;
  if (typeof mdx.node.node.frontmatter.linktitle !== "undefined")
    title = mdx.node.node.frontmatter.title;
  let order = null;
  if (typeof mdx.node.node.frontmatter.order !== "undefined")
    order = mdx.node.node.frontmatter.order;
  if (typeof mdx.node.node.frontmatter.date !== "undefined")
    order = mdx.node.node.frontmatter.date;
  if (order !== null) title = mdx.node.node.frontmatter.order + title;

  return title;
}

const getTitle = function (mdx) {
  if (typeof mdx.node.node.frontmatter.linktitle !== "undefined")
    return mdx.node.node.frontmatter.linktitle;

  return mdx.node.node.frontmatter.title;
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
	  for (let slug of slugs) {
      if (isChild(topic, slug)) children[getSortTitle(markdown[slug])] = slug;
    }
    let childrenOrder = Object.keys(children);
    childrenOrder.sort();
    for (let title of childrenOrder) {
      let slug = children[title];
      list[topic].children[slug] = {title: getTitle(markdown[slug])};
    }

    // Grandchildren of docs topic
    if (topic === "docs") {
      let grandchildren = {};
	    for (let slug of slugs) {
        let child = isGrandchild(topic, slug);
        if (child !== false) {
          if (typeof grandchildren[child] === "undefined") grandchildren[child]= {};
          grandchildren[child][getSortTitle(markdown[slug])] = slug;
        }
      }
      for (let child in grandchildren) {
        let grandchildrenOrder = Object.keys(grandchildren[child]);
        grandchildrenOrder.sort();
        for (let title of grandchildrenOrder) {
          let slug = grandchildren[child][title];

          if (typeof list[topic].children[child].children === "undefined")
            list[topic].children[child].children = {};

          if (typeof markdown[slug] === "undefined")
            console.log('no markdown for', child, grandchildren);

          list[topic].children[child].children[slug] = { title: getTitle(markdown[slug]) };
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
  let template = path.resolve("src/components/templates/index.js");
  let topicsToc = getTopics(markdown);
  let content = flattenTopicsToc(topicsToc);
  let slugs = Object.keys(markdown);
  slugs.sort();
	for (let slug of slugs) {
    let topic = getTopic(slug);
		promises.push(new Promise((resolve, reject) => {
      createPage({
        path: slug,
        component: template,
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
  for (let i in pages) {
		promises.push(new Promise((resolve, reject) => {
      createPage({
        path: i,
        ...pages[i].params,
        context: {
          topics,
          topicsToc,
          content,
          crumbs: breadcrumbs(i, titles),
          slug: i,
          ...pages[i].props,
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


