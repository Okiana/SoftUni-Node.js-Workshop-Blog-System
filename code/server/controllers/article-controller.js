let moment = require('moment')
let memoryArr = require('../config/db')

let GetDateTime = () => {
  let date = new Date()
  return moment(date).format('YYYY/MM/DD HH:mm:ss')
}

module.exports = {
  showArticleForm: (req, res) => {
    res.render('articles/articleForm')
  },
  createArticle: (req, res) => {
    let id = memoryArr.length
    let title = req.body.title
    let imageName
    if (req.file) imageName = req.file.filename
    let description = req.body.description
    let date = GetDateTime()
    let state = 'Ok'
    let shown = 0
    memoryArr.push({'id': id, 'title': title, 'description': description, 'date': date, 'state': state, 'shown': shown, 'image': imageName})
    res.redirect('/')
  },
  allArticles: (req, res) => {
    res.render('articles/articlesAll', {title: 'All articles', articles: memoryArr})
  },
  articleId: (req, res) => {
    let id = req.params.id
    let viewedArticle = []
    memoryArr.forEach((elem) => {
      if (parseInt(elem.id) === parseInt(id)) {
        viewedArticle.push(elem)
        elem.shown++
        console.log(elem)
      }
    })

    res.render('articles/articleDetails', {title: 'View article details', articles: viewedArticle})
  },
  changeButton: (req, res) => {
    let id = req.params.id
    memoryArr.forEach((elem) => {
      if (parseInt(elem.id) === parseInt(id)) {
        if (elem.state === 'Deleted') elem.state = 'Ok'
        else elem.state = 'Deleted'
        console.log(elem)
      }
      console.log('Must check that ------------------------------------------')
      memoryArr.forEach((elem) => console.log(elem))
      res.redirect('back')
    })
  }
}

