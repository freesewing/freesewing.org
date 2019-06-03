import React from "react";

const PluginPage = props => {

	const plugin = props.plugin;
  const styles = {
    badge: {
      marginRight: "0.5rem"
    }
  }

  return (
    <React.Fragment>
      <p>
        <a
          href={"https://www.npmjs.com/package/@freesewing/plugin-"+plugin}
          title={"@freesewing/plugin-"+plugin+" on NPM"}
          style={styles.badge}
        >
          <img
            src={"https://img.shields.io/npm/v/@freesewing/plugin-"+plugin+".svg"}
            alt={"@freesewing/plugin-"+plugin+" on NPM"}
          />
        </a>
        <a
          href="https://opensource.org/licenses/MIT"
          title="License: MIT"
          style={styles.badge}
        >
          <img
            src={"https://img.shields.io/npm/l/@freesewing/plugin-"+plugin+".svg?label=License"}
            alt="License: MIT"
          />
        </a>
        <a
          href="https://deepscan.io/dashboard#view=project&tid=2114&pid=2993&bid=23256"
          title="Code quality on DeepScan"
          style={styles.badge}
        >
          <img
            src="https://deepscan.io/api/teams/2114/projects/2993/branches/23256/badge/grade.svg"
            alt="Code quality on DeepScan"
          />
        </a>
        <a
          href={"https://github.com/freesewing/freesewing/issues?q=is%3Aissue+is%3Aopen+label%3Apkg%3Aplugin-"+plugin}
          title={"Open issues tagged pkg:plugin-"+plugin}
          style={styles.badge}
        >
          <img
            src={"https://img.shields.io/github/issues/freesewing/freesewing/pkg:plugin-"+plugin+".svg?label=Issues"}
            alt={"Open issues tagged pkg:plugin-"+plugin}
          />
        </a>
      </p>
      <p>This is the {plugin} plugin:</p>
      <ul className="links">
        <li><a href={"/plugins/"+plugin}>plugin-{plugin} documentation</a></li>
        <li><a href={"https://npmjs.com/package/@freesewing/plugin-"+plugin}>Package on NPM</a></li>
        <li><a href={"https://github.com/freesewing/freesewing/tree/develop/packages/plugin-"+plugin}>Code on GitHub</a></li>
      </ul>
    </React.Fragment>
  );
}

export default PluginPage;
