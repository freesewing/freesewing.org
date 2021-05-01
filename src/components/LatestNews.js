import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Markdown from 'react-markdown'
import Spinner from '@freesewing/components/Spinner'

const LatestNews = (props) => {
  useEffect(() => {
    axios
      .get('https://raw.githubusercontent.com/freesewing/freesewing/develop/LATEST_NEWS.md')
      .then((result) => {
        let n = []
        let a = false
        for (let line of result.data.split('\n')) {
          if (line.slice(0, 5) === '#####') {
            if (a) n.push(a)
            a = ''
          }
          a += '\n' + line
        }
        n.push(a)
        setNews(n)
      })
      .catch((err) => console.log(err))
  }, [])
  const [news, setNews] = useState(false)

  return news ? (
    news.map((a) => (
      <div className="news-article shadow">
        <Markdown>{a}</Markdown>
      </div>
    ))
  ) : (
    <Spinner size="150" />
  )
}

export default LatestNews
