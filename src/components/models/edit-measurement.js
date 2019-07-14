import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import ValidIcon from "@material-ui/icons/CheckCircle";
import InvalidIcon from "@material-ui/icons/Warning";
import { FormattedMessage } from "react-intl";
import Button from "@material-ui/core/Button";
import measurementAsMm from "@freesewing/utils/measurementAsMm";
import formatMm from "@freesewing/utils/formatMm";
import { useStaticQuery, graphql } from "gatsby"
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import { MDXProvider } from '@mdx-js/react';
import MeasurementsImages from "../measurements/images";

const EditMeasurement = props => {
  const [updated, setUpdated] = useState(false);
  const [mm, setMm] = useState('');
  const [value, setValue] = useState(props.app.models[props.model].measurements
    ? props.app.models[props.model].measurements[props.measurement]
      ? formatMm(
          props.app.models[props.model].measurements[props.measurement],
          props.app.models[props.model].units,
          "text"
        )
      : ''
    : '');
  const [valid, setValid] = useState(
    typeof measurementAsMm(value, props.app.models[props.model].units) === "number" ? true : false
  );
	const mdx = useStaticQuery(graphql`
		{
  		allMdx(
				filter: { fileAbsolutePath: {regex: "//docs/measurements/[^/]*/en.md/"} },
				sort: {fields: [frontmatter___title], order: ASC}
			) {
    		edges {
      		node {
						parent { ... on File {relativeDirectory} }
      	  	code { body }
      		}
    		}
  		}
		}`
  );

  const units = props.app.models[props.model].units;

  const updateMeasurement = evt => {
    let value = evt.target.value;
    setValue(evt.target.value);
    let mm = measurementAsMm(value, units);
    let valid = (typeof measurementAsMm(value, units) === "number") ? true : false;
    if (valid) {
      setMm(mm);
      setUpdated(true);
    }
    setValid(valid);
  }
  const saveMeasurement = () => {
    const data = {
      measurements: {}
    }
    data.measurements[props.measurement] = mm;
    props.app.backend.saveModel(
      props.model,
      data,
      props.app.frontend.intl.formatMessage({id: "measurements."+props.measurement}),
      "/models/"+props.model
    )
  }

	let docs = null;
	for (let node of Object.values(mdx.allMdx.edges)) {
		let m = node.node.parent.relativeDirectory.split("/").pop();
		if (m === props.measurement.toLowerCase()) docs = node.node.code.body;
	}

	return (
    <React.Fragment>
      <TextField
        fullWidth={true}
        label={props.app.frontend.intl.formatMessage({ id: "measurements."+props.measurement})}
        margin="normal"
        variant="outlined"
        value={value}
        type="text"
        onChange={updateMeasurement}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              { units === "imperial" ? '"' : 'cm' }
              &nbsp;
              { typeof measurementAsMm(value, units) === "number"
                ? <ValidIcon style={{ color: "#40c057" }} />
                : <InvalidIcon color="error" />
              }
            </InputAdornment>
          )
        }}
      />
      <p style={{textAlign: "right"}}>
        <Button
          size="large"
          variant="outlined"
          color="primary"
          href={"/models/"+props.model}
        >
          <FormattedMessage id="app.cancel" />
        </Button>
        <Button
          size="large"
          style={{marginLeft: '1rem'}}
          variant="contained"
          color="primary"
          disabled={!updated || !valid}
          onClick={saveMeasurement}
        >
          <FormattedMessage id="app.save" />
        </Button>
      </p>
      <h5><FormattedMessage id="app.howToTakeMeasurements" /></h5>
      <MeasurementsImages measurement={props.measurement} />
      <MDXProvider components={props.components}>
        <MDXRenderer>
          {docs}
        </MDXRenderer>
      </MDXProvider>
    </React.Fragment>
  );
}

export default EditMeasurement;
