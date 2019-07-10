import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "gatsby"
import { optionGroups } from "@freesewing/pattern-info";

const PatternOptions = props => {

  const renderOptions = () => {
    const groups = optionGroups[props.pattern];
    const list = [];
    for (let l1 in groups) {
      let children = [];
      for (let l2 of groups[l1]) {
        if(typeof l2 === "string") {
          children.push(
            <li>
              <Link to={"/docs/patterns/"+props.pattern+"/options/"+l2.toLowerCase()}>
                <FormattedMessage id={"options."+props.pattern+"."+l2+".title"}/>
              </Link>
            </li>
          );
        } else {
          for (let l3 in l2) {
            let grandchildren = [];
            for (let l4 of l2[l3]) {
              grandchildren.push(
                <li>
                  <Link to={"/docs/patterns/"+props.pattern+"/options/"+l4.toLowerCase()}>
                    <FormattedMessage id={"options."+props.pattern+"."+l4+".title"}/>
                  </Link>
                </li>
              );
            }
            children.push(
              <li><b><FormattedMessage id={"optiongroups."+l3}/></b>
                <ul className="links">{grandchildren}</ul>
              </li>
            );
          }
        }
      }
      list.push(
        <li><b><FormattedMessage id={"optiongroups."+l1}/></b>
          <ul className="links">{children}</ul>
        </li>
      );
    }

    return [
      <ul className="links">{list}</ul>
    ];
  }

  return renderOptions();
}

export default PatternOptions;
