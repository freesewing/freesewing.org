import React from "react";

const RepoPage = props => {

	const repo = props.repo;
  const styles = {
    badge: {
      marginRight: "0.5rem"
    }
  }

  return (
    <React.Fragment>
      <p>
        <a
          href={"https://github.com/freesewing/"+repo}
          title="Repository size"
          style={styles.badge}
        >
          <img
            src={"https://img.shields.io/github/repo-size/freesewing/"+repo+".svg"}
            alt="Repository size"
          />
        </a>
        <a
          href={"https://github.com/freesewing/"+repo}
          title="Commit activity"
          style={styles.badge}
        >
          <img
            src={"https://img.shields.io/github/commit-activity/m/freesewing/"+repo+".svg"}
            alt="Commit activity"
          />
        </a>
        <a
          href={"https://github.com/freesewing/"+repo}
          title="Contributors"
          style={styles.badge}
        >
          <img
            src={"https://img.shields.io/github/contributors/freesewing/"+repo+".svg"}
            alt="Contributors"
          />
        </a>
        <a
          href={"https://github.com/freesewing/"+repo+"/issues"}
          title="Issues"
          style={styles.badge}
        >
          <img
            src={"https://img.shields.io/github/issues/freesewing/"+repo+".svg"}
            alt="Issues"
          />
        </a>
        <a
          href={"https://github.com/freesewing/"+repo+"/pulls"}
          title="Issues"
          style={styles.badge}
        >
          <img
            src={"https://img.shields.io/github/issues-pr/freesewing/"+repo+".svg"}
            alt="Issues"
          />
        </a>
        <a
          href={"https://github.com/freesewing/"+repo+"/pulls"}
          title="Stars"
          style={styles.badge}
        >
          <img
            src={"https://img.shields.io/github/stars/freesewing/"+repo+".svg"}
            alt="Stars"
          />
        </a>
      </p>
      <p>This is the FreeSewing {repo} repository:</p>
      <ul className="links">
        <li><a href={"https://github.com/freesewing/"+repo}>freesewing/{repo} on GitHub</a></li>
        <li><a href={"https://github.com/freesewing/"+repo+"/issues"}>freesewing/{repo} Issues</a></li>
        <li><a href={"https://github.com/freesewing/"+repo+"/pulls"}>freesewing/{repo} Pull requests</a></li>
      </ul>
    </React.Fragment>
  );
}

export default RepoPage;
