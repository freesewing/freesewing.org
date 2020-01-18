import React from 'react'

const MobileIcons = ({ app }) => (
  <div style={{ margin: '2rem 0' }}>
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        margin: '2rem 0'
      }}
    >
      <Button href="/" color="primary" style={{ fontSize: '64px' }}>
        <HomeIcon fontSize="inherit" />
      </Button>
      <Button href="/patrons" color="primary" style={{ fontSize: '64px' }}>
        <PatronIcon fontSize="inherit" style={{ color: '#e64980' }} />
      </Button>
    </div>
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        margin: '2rem 0'
      }}
    >
      <Button href="/search" color="primary" style={{ fontSize: '64px' }}>
        <SearchIcon fontSize="inherit" />
      </Button>
      <Button href="/language" color="primary" style={{ fontSize: '64px' }}>
        <LanguageIcon fontSize="inherit" />
      </Button>
      <Button onClick={app.frontend.toggleDarkMode} color="primary" style={{ fontSize: '64px' }}>
        <DarkModeIcon fontSize="inherit" style={{ transform: 'rotate(26deg)', color: '#ffd43b' }} />
      </Button>
    </div>
  </div>
)

export default MobileIcons
