exports.succes = (req, res,status, message)=>{
res.status(status|| 200).json({
body:message
})
}
exports.error = (req, res, status, message) => {
    console.log('status antes de enviar: ', status);
    console.log('msg antes de enviar: ', message);
    res.status(status || 500).json({
       error: message 
    })

}