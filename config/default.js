module.exports = {
  app: {
    port: 8090,
    name: '',
    baseUrl: ''
  },
  jwt: {
    secret: 'JWTLOREMIPSUM234rBac',
    expirationInSeconds: 8640000
  },
  mongoDB: {
    url: 'mongodb://127.0.0.1:27017/jobsDB'
  },
  ssl: false,
  sslSettings: {
    key: './path_ssl/domain_key.pem',
    cert_g: './path_ssl/cert_g.pem',
    cert_g1: './path_ssl/cert_g1.pem',
    cert_g2: './path_ssl/cert_g2.pem'
  },
  elastic:{
    url:'https://elastic:71vsKBEfyIe5irVYY3qCWdIj@3eda15761304466cb1a13325e91af22f.ap-southeast-1.aws.found.io:9243'
  },
  redis:{
    port: 6379,
    host:'127.0.0.1'
  }
}

