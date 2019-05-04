import app from '/app'

app.listen(process.env.PORT, err => {
  if (err) {
    process.exit(1)
  }
  console.log(`Server listening at port: ${process.env.PORT}`)
})
