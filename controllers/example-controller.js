const ExampleController = (app) => {
    app.get('/hello', (req, res) => {res.send('Test response')})

}
export default ExampleController;