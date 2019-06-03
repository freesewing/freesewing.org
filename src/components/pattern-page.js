import React from "react";

const PatternPage = props => {

	const pattern = props.pattern;
	const Pattern = pattern.charAt(0).toUpperCase() + pattern.slice(1);
  const styles = {
    badge: {
      marginRight: "0.5rem"
    }
  }

  return (
    <React.Fragment>
      <p>
        <a
          href={"https://www.npmjs.com/package/@freesewing/"+pattern}
          title={"@freesewing/"+pattern+" on NPM"}
          style={styles.badge}
        >
          <img
            src={"https://img.shields.io/npm/v/@freesewing/"+pattern+".svg"}
            alt={"@freesewing/"+pattern+" on NPM"}
          />
        </a>
        <a
          href="https://opensource.org/licenses/MIT"
          title="License: MIT"
          style={styles.badge}
        >
          <img
            src={"https://img.shields.io/npm/l/@freesewing/"+pattern+".svg?label=License"}
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
          href={"https://github.com/freesewing/freesewing/issues?q=is%3Aissue+is%3Aopen+label%3Apkg%3A"+pattern}
          title={"Open issues tagged pkg:"+pattern}
          style={styles.badge}
        >
          <img
            src={"https://img.shields.io/github/issues/freesewing/freesewing/pkg:"+pattern+".svg?label=Issues"}
            alt={"Open issues tagged pkg:"+pattern}
          />
        </a>
      </p>
      <p>This is the FreeSewing {Pattern} pattern:</p>
      <ul className="links">
        <li><a href={"https://freesewing.org/patterns/"+pattern}>{Pattern} on freesewing.org</a></li>
        <li><a href={"https://freesewing.org/showcase/category/"+pattern}>{Pattern} examples</a></li>
        <li><a href={"https://freesewing.org/docs/patterns/"+pattern+"/measurements"}>{Pattern} required measurements</a></li>
        <li><a href={"https://freesewing.org/docs/patterns/"+pattern+"/options"}>{Pattern} options</a></li>
        <li><a href={"https://npmjs.com/package/@freesewing/"+pattern}>Package on NPM</a></li>
        <li><a href={"https://github.com/freesewing/freesewing/tree/develop/packages/"+pattern}>Code on GitHub</a></li>
      </ul>
    </React.Fragment>
  );
}

export default PatternPage;
