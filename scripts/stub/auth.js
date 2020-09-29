const express = require('express')

const auth = express.Router()
module.exports = auth

const FOREST_ID_COOKIE_NAME = 'cookie_data'

auth.all('/doLogin.do', async (req, resp) => {
  resp.cookie(FOREST_ID_COOKIE_NAME, 'stub-user', {
    domain: 'localhost',
    path: '/',
  })
  resp.redirect('/')
})

auth.all('/doLogout.do', async (req, resp) => {
  resp.clearCookie(FOREST_ID_COOKIE_NAME, { domain: 'localhost', path: '/' })
  resp.redirect('/')
})

auth.use(function authFilter(req, resp, next) {
  const authorized =
    req.headers.cookie && req.headers.cookie.includes(FOREST_ID_COOKIE_NAME)

  if (!authorized && req.url !== '/api/v1/NoticeQuery') {
    resp.sendStatus(401)
    return
  }

  next()
})
