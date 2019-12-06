import React from 'react'

const LanguageIcon = props => {
  const icons = {
    en: (
      <g transform="scale(0.6) translate(0, 5)">
        <clipPath id="t" key="clip">
          <path d="M25,15 h25 v15 z v15 h-25 z h-25 v-15 z v-15 h25 z" />
        </clipPath>
        <path key="color1" d="M0,0 v30 h50 v-30 z" fill="#00247d" />
        <path key="color2" d="M0,0 L50,30 M50,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path
          key="color3"
          d="M0,0 L50,30 M50,0 L0,30"
          clipPath="url(#t)"
          stroke="#cf142b"
          strokeWidth="4"
        />
        <path key="color4" d="M25,0 v30 M0,15 h50" stroke="#fff" strokeWidth="10" />
        <path key="color5" d="M25,0 v30 M0,15 h50" stroke="#cf142b" strokeWidth="6" />
      </g>
    ),
    de: (
      <g>
        <rect width="32" height="8" fill="#000" x="0" y="0" />
        <rect width="32" height="8" fill="#FF0000" x="0" y="8" />
        <rect width="32" height="8" fill="#FFCC00" x="0" y="16" />
      </g>
    ),
    es: (
      <g>
        <rect width="32" height="6" fill="#AA151B" x="0" y="18" />
        <rect width="32" height="12" fill="#F1BF00" x="0" y="6" />
        <rect width="32" height="6" fill="#AA151B" x="0" y="0" />
      </g>
    ),
    fr: (
      <g>
        <rect key="stripe1" width="10.66" height="24" fill="#001e96" x="0" y="0" />
        <rect key="stripe2" width="10.66" height="24" fill="#FFFFFF" x="10.66" y="0" />
        <rect key="stripe3" width="10.66" height="24" fill="#EF4135" x="21.33" y="0" />
      </g>
    ),
    nl: (
      <g>
        <rect key="stripe1" width="32" height="8" fill="#fff" x="0" y="8" />
        <rect key="stripe2" width="32" height="8" fill="#21468b" x="0" y="16" />
        <rect key="stripe3" width="32" height="8" fill="#ae1c28" x="0" y="0" />
      </g>
    )
  }

  return (
    <svg
      class="language-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="24"
      style={props.style || {}}
    >
      {icons[props.language]}
    </svg>
  )
}

export default LanguageIcon
