export default {
  github:
    'https://github.com/login/oauth/authorize' +
    '?client_id=' +
    process.env.GATSBY_GITHUB_CLIENT_ID +
    '&redirect_uri=' +
    `${process.env.GATSBY_BACKEND}oauth/callback/from/github` +
    '&scope=' +
    'read:user user:email' +
    '&state=',
  google:
    'https://accounts.google.com/o/oauth2/v2/auth' +
    '?response_type=code' +
    '&client_id=' +
    process.env.GATSBY_GOOGLE_CLIENT_ID +
    '&redirect_uri=' +
    `${process.env.GATSBY_BACKEND}oauth/callback/from/google` +
    '&scope=' +
    'https://www.googleapis.com/auth/userinfo.profile' +
    ' ' +
    'https://www.googleapis.com/auth/userinfo.email' +
    '&access_type=online' +
    '&state=',
}
