const express =require('express');
const expressHandlebars = require('express-handlebars')
const app = express();
const port = process.env.PORT || 3000;

// 핸들바 뷰 엔진 설정
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.type('text/plain')
  res.send('Meadowlark Travel');
})

app.get('/about', (req, res) => {
  res.type('text/plain')
  res.send('About Meadowlark Travel')
})

// custom 404 page
app.use((req,res) => {
  res.type('text/plain')
  res.status(404)
  res.send('404 - Not Found')
})

// custom 500 page
app.use((err,req,res,next) => {
  console.error(err.message)
  res.type('text/plain')
  res.status(500)
  res.send('500 - Server Error')
})

app.listen(port, () => {console.log(
  `Express Started on http://localhost:${port}; ` +
  `press Ctrl-C to terminate.`
)
})

// 미들웨어등록시 app.use를 하면 모든 곳에 적용된다. 
// 그래서 미들웨어가 위에서 모든 엔드포인트를 적용하면 뒤에있는 엔드포인트에 적용이 안된다. 주의!!