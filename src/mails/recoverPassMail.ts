import mailConfig from "../config/nodeMailer.config";

export default async (newPassword: string, email: string) => {
    await mailConfig.sendMail({
        from: "Click Counter<bryangomesrocha@gmail.com>",
        to: email,
        subject: "Recuperação de senha.",
        html: `
            <p><span style="font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0);">Voc&ecirc; solicitou uma nova senha para sua conta.&nbsp;</span></p>
            <p>&nbsp;</p>
            <p><span style="font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0);">Segue sua nova senha:&nbsp;</span>${newPassword}</p>
            <p>&nbsp;</p>
            <h3><span style="font-family: 'arial black', sans-serif;"><strong>Lembre-se de n&atilde;o compartilhar este e-mail com ningu&eacute;m.&nbsp;</strong></span></h3>
            <p><span style="font-family: 'arial black', sans-serif;"></span></p>
        `
    }).catch((error) => {
        console.log(error);
    });
};
