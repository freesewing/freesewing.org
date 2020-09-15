import React from 'react'
import BreadCrumbs from '../breadcrumbs'
import Loading from '../loading'

// We need this specific loading layout to avoid SSR issues
const DraftLoadingLayout = ({ app }) => {
  let aside = <Loading loading={true} embed />
  return (
    <div className="fs-sa" dataLayout="draft">
      <section>
        <div style={{ padding: '1rem 1rem 0 1rem' }}>
          <BreadCrumbs crumbs={[]} pageTitle={app.translate('app.justAMoment')} />
          <h1>{app.translate('app.justAMoment')}</h1>
        </div>
        <Loading loading={true} embed />
      </section>
    </div>
  )
}

export default DraftLoadingLayout
