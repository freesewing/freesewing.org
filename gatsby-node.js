const path = require("path");
const topics = require("./src/topics");
const pages = {
  "/": "homepage",
  "/search": "search",
  "/languages": "languages"
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
    crumbs.push(up);
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
    category
    blurb
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
	for (let i in markdown) {
    let fm = frontmatter.docs;
    if (markdown[i].path.indexOf("/blog/") !== -1) fm = frontmatter.blog;

		promises.push(new Promise((resolve, reject) => {
 		  let query = `{
 		  	allMdx(filter: {fileAbsolutePath: {eq: "${markdown[i].path}"} }) {
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
					markdown[i].node = res.data.allMdx.edges[0];
          titles[i] = markdown[i].node.node.frontmatter.title;
    	    resolve(true);
				}
    	});
  	}));
  }

  return Promise.all(promises);
};

const isChild = function (topic, page) {
  let chunks = page.split("/");
  if (chunks.length === 3 && chunks[1] === topic) return true;
  else return false;
}

const getTopics = function(markdown) {
  let list = { };
  for (let topic of topics) {
    let pageSlug = "/"+topic;
    if (typeof markdown[pageSlug] === "undefined")
      throw new Error(`No page for topic ${topic} at ${pageSlug}`);
    list[topic] = {
      title: markdown[pageSlug].node.node.frontmatter.title,
      children: {},
    }
    let children = {};
    for (let page in markdown) {
      if (isChild(topic, page)) {
        let title = markdown[page].node.node.frontmatter.title;
        if (typeof markdown[page].node.node.frontmatter.linktitle !== "undefined")
          title = markdown[page].node.node.frontmatter.title;
        let order = null;
        if (typeof markdown[page].node.node.frontmatter.order !== "undefined")
          order = markdown[page].node.node.frontmatter.order;
        if (typeof markdown[page].node.node.frontmatter.date !== "undefined")
          order = markdown[page].node.node.frontmatter.date;
        if (order !== null) title = markdown[page].node.node.frontmatter.order + title;
        children[title] = page;
      }
    }
    let childrenOrder = Object.keys(children);
    childrenOrder.sort();
    for (let c of childrenOrder) {
      let link = children[c];

      if (typeof markdown[link].node.node.frontmatter.linktitle !== "undefined")
        list[topic].children[link] = markdown[link].node.node.frontmatter.linktitle;
      else list[topic].children[link] = markdown[link].node.node.frontmatter.title;
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
      titles[child] = topicsToc[topic].children[child];
    }
  }

  return { slugs, titles };
}

const createMdx = function(graphql, language, markdown, titles, createPage) {
  let promises = [];
  let template = path.resolve("src/components/templates/index.js");
  let topicsToc = getTopics(markdown);
  let content = flattenTopicsToc(topicsToc);
	for (let i in markdown) {
    let topic = getTopic(i);
		promises.push(new Promise((resolve, reject) => {
      createPage({
        path: i,
        component: template,
        context: {
          node: markdown[i].node.node,
          //markdown,
          topic,
          topics,
          topicsToc,
          content,
          crumbs: breadcrumbs(i, titles),
          language: markdown[i].language,
          slug: i
        }
      });
    	resolve(true);
 	  }));
  }
  for (let i in pages) {
		promises.push(new Promise((resolve, reject) => {
      createPage({
        path: i,
        component: path.resolve("src/components/pages/"+pages[i]+".js"),
        context: {
          //markdown,
          topics,
          topicsToc,
          content,
          crumbs: breadcrumbs(i, titles),
          slug: i
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
            resolve(true);
          })
        })
      })
    })
};


