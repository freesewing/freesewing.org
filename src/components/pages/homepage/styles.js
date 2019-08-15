const getStyles = (tablet, mobile) => {
  const styles = {
    container: {
      flexGrow: 2
    },
    headerWrapper: {
      backgroundImage: "url('/horizon.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'bottom'
    },
    header: {
      minHeight: '300px',
      padding: '3rem 2rem',
      fontFamily: "'Roboto Condensed', sans-serif",
      position: 'relative',
      backgroundImage: "url('/flag.svg')",
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '90% -30%'
    },
    innerHeader: {
      maxWidth: '650px',
      padding: '1rem 2rem'
    },
    h1: {
      margin: '0 0 2rem 0',
      padding: 0,
      fontWeight: 900,
      color: '#fff'
    },
    h2: {
      borderColor: 'rgba(255,255,255,0.25)',
      margin: '0 0 1rem 0',
      color: '#fff'
    },
    link: {
      fontSize: '3rem'
    },
    button: {
      margin: '0.5rem',
      width: '180px'
    },
    boxes: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      padding: '2rem 0',
      maxWidth: '1600px',
      margin: 'auto'
    },
    box: {
      padding: '1.5rem',
      maxWidth: 'calc(30% - 1.5rem)',
    },
    solobox: {
      padding: '1.5rem',
      maxWidth: '600px',
      margin: 'auto'
    },
    primaryButton: {
      background: '#fff',
      borderColor: '#fff',
      color: '#212529',
      margin: '0.5rem'
    },
    secondaryButton: {
      background: 'rgba(255,255,255,0.5)',
      color: '#212529',
      borderColor: '#fff'
    },
    stripe: {
      backgroundImage: "url('/support.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'bottom',
      minHeight: '300px',
      padding: '3rem 2rem',
      fontFamily: "'Roboto Condensed', sans-serif"
    },
    pitch: {
      color: 'white',
      fontSize: '125%'
    },
    help: {
      padding: '1rem',
      maxWidth: '50%',
      minWidth: '314px',
      marginBottom: '5rem'
    },
    supportH2: {
      textAlign: 'center',
      border: 0
    },
    m1: {
      margin: '1rem'
    },
    card: {
      width: '32%',
      borderRadius: '6px'
    },
    cardImg: {
      borderTopLeftRadius: '6px',
      borderTopRightRadius: '6px'
    },
    cardText: {
      padding: '0.25rem 1rem 1rem',
      display: 'flex',
      flexDirection: 'column'
    },
    patternList: {
      margin: '0.5rem 0 0 0',
      padding: 0
    },
    patternEntry: {
      listStyleType: 'none',
      display: 'inline'
    },
    h2Box: {},
  }
  if (tablet || mobile) {
    styles.boxes.display = 'block'
    styles.box.maxWidth = '666px'
    styles.box.margin = '0 auto'
    styles.h2Box.marginTop = 0
  }
  if (tablet) {
    styles.header.backgroundSize = '30vh'
    styles.header.backgroundPosition = '90% calc(100% + 40px)'
  }
  if (mobile) {
    styles.header.backgroundSize = '20vh'
    styles.header.backgroundPosition = '90% calc(100% + 20px)'
    styles.innerHeader.padding = '1rem'
    styles.box.maxWidth = '100%'
    styles.box.minWidth = '200px'
    styles.card.width = '100%'
    styles.card.marginBottom = '2rem'
  }

  return styles;
}

export default getStyles;
