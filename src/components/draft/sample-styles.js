import React from 'react'
import oc from 'open-color-js'

export function jsxSampleStyles(dark) {
  let shared = { fill: 'none', strokeWidth: 1 }
  return [
    {
      ...shared,
      stroke: oc.red6,
      strokeDasharray: '1 2',
      filter: `drop-shadow(0px 0px 1px ${oc.red6})`
    },
    {
      ...shared,
      stroke: oc.blue6,
      strokeDasharray: '12 2',
      filter: `drop-shadow(0px 0px 1px ${oc.blue6})`
    },
    {
      ...shared,
      stroke: oc.green6,
      strokeDasharray: '20 2 1 2',
      filter: `drop-shadow(0px 0px 1px ${oc.green6})`
    },
    {
      ...shared,
      stroke: oc.orange6,
      strokeDasharray: '4 3',
      filter: `drop-shadow(0px 0px 1px ${oc.orange6})`
    },
    {
      ...shared,
      stroke: oc.pink6,
      strokeDasharray: '2 2 22 3 2 2 2 2',
      filter: `drop-shadow(0px 0px 1px ${oc.pink6})`
    },
    {
      ...shared,
      stroke: oc.teal6,
      strokeDasharray: '1 2',
      filter: `drop-shadow(0px 0px 1px ${oc.teal6})`
    },
    {
      ...shared,
      stroke: oc.yellow6,
      strokeDasharray: '12 2',
      filter: `drop-shadow(0px 0px 1px ${oc.yellow6})`
    },
    {
      ...shared,
      stroke: oc.grape6,
      strokeDasharray: '20 2 1 2',
      filter: `drop-shadow(0px 0px 1px ${oc.grape6})`
    },
    {
      ...shared,
      stroke: oc.indigo6,
      strokeDasharray: '4 3',
      filter: `drop-shadow(0px 0px 1px ${oc.indigo6})`
    },
    {
      ...shared,
      stroke: oc.cyan6,
      strokeDasharray: '12 2 22 3 2 2 2 2',
      filter: `drop-shadow(0px 0px 1px ${oc.cyan6})`
    }
  ]
}

export function jsxFocusStyle(dark) {
  return {
    fill: 'url(#sample-fill)',
    stroke: dark ? oc.gray0 : oc.gray9,
    strokeWidth: 1
  }
}

export function sampleStyles(dark) {
  let jsx = jsxSampleStyles(dark)
  let styles = []
  for (const s of jsx)
    styles.push(
      `stroke-width: ${s.strokeWidth}; stroke: ${s.stroke}; stroke-dasharray: ${s.strokeDasharray}; filter: ${s.filter};`
    )

  return styles
}

export function nivoStyles(dark) {
  let jsx = jsxSampleStyles(dark)
  let styles = []
  for (const s of jsx) styles.push(s.stroke)

  return styles
}

export function focusStyle(dark) {
  let style = jsxFocusStyle(dark)
  return `fill: ${style.fill}; stroke: ${style.stroke}; stroke-width: ${style.strokeWidht};`
}

export function extraDefs(dark) {
  return (
    <pattern id="sample-fill" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
      <rect x="0" y="0" width="25" height="25" fill={dark ? oc.gray7 : oc.gray4} />
      <use xlinkHref="#logo" transform="translate(10 10) scale(0.25)" />
    </pattern>
  )
}
