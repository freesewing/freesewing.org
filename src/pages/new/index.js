import React from 'react'
import useApp from '../../hooks/useApp'
import AppWrapper from '../../components/app/wrapper'
import { Link } from 'gatsby'

const Page = (props) => {
  const app = useApp()

  return (
    <AppWrapper app={app} title="Create a new author or maker">
      <ul>
        <li>
          <Link to="/new/maker">Create a new maker (for showcase posts on freesewing.org)</Link>
        </li>
        <li>
          <Link to="/new/author">
            Create a new author (for blog posts on eithe freesewing.org or freesewing.dev)
          </Link>
        </li>
      </ul>
    </AppWrapper>
  )
}

export default Page
