
const sgMail = require('@sendgrid/mail')

exports.SendConsultAtEmail = async (req, res , next)=>{
    let {name, apellido, servicio , asunto, email} = req.body;
sgMail.setApiKey(process.env.SENDGRID_KEY)
const msg = {
to:"renzoclr@hotmail.com",
from:"renzotor7777@gmail.com",
subject:`Go smile cliente - asunto: ${servicio}`,
text: `nombre del cliente ${name}  ${apellido}`,
html:`<div>
<p>Consulta: ${asunto}</p><br/>
<p>Responder a:  <a>${email}</a></p>
</div>`,
}
try{
await sgMail.send(msg);
console.log("email enviado ")
res.status(200).json({msg:"el correo se envio de forma correcta"})
}catch(err){
next(err);
}





}