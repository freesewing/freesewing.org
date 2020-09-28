import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Markdown from 'react-markdown'
import Spinner from '@freesewing/components/Spinner'

const LatestNews = (props) => {
  useEffect(() => {
    axios
      .get('https://raw.githubusercontent.com/freesewing/freesewing/develop/LATEST_NEWS.md')
      .then((result) => setNews(result.data))
      .catch((err) => console.log(err))
  }, [])
  const [news, setNews] = useState(false)

  return news ? <Markdown source={news} /> : <Spinner size="150" />
}

export default LatestNews
