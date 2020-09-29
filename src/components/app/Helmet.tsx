import React from 'react'
import { useSelector } from 'react-redux'
import ReactHelmet from 'react-helmet'

export default function Helmet() {
  const { lang, dir, title } = useSelector(state => ({
    lang: state.ui.lang,
    dir: state.ui.dir,
    title: state.ui.title,
  }))

  return (
    <ReactHelmet
      htmlAttributes={{ lang, dir }}
      // https://github.com/nfl/react-helmet/issues/373#issuecomment-392650715
      title={title ? `${title} - CE Portal` : 'CE Portal'}
    />
  )
}
