const express =require('express');
const expressHandlebars = require('express-handlebars')
const app = express();
const fortune =require('./lib/fortune')
const port = process.env.PORT || 3000;

// public 폴더 정적 처리
app.use(express.static(__dirname + '/public'))

// 핸들바 뷰 엔진 설정
app.engine('handlebars', expressHandlebars({
  deafultLayout: 'main',
}))
app.set('view engine', 'handlebars')

// home, about 렌더링 설정
app.get('/', (req, res) => {
  res.render('home')
})

app.get('/about', (req,res) => {
  res.render('about', { fortune :fortune.getFortune()})
})

// custom 404 page
app.use((req,res) => {
  res.status(404)
  res.render('404')
})

// custom 500 page
app.use((err,req,res,next) => {
  console.error(err.message)
  res.status(500)
  res.render('500')
})

app.listen(port, () => {console.log(
  `Express Started on http://localhost:${port}; ` +
  `press Ctrl-C to terminate.`
)
})


// 미들웨어등록시 app.use를 하면 모든 곳에 적용된다. 
// 그래서 미들웨어가 위에서 모든 엔드포인트를 적용하면 뒤에있는 엔드포인트에 적용이 안된다. 주의!!