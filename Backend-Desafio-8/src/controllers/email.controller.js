import { transporter } from "../services/email.service.js";
import "dotenv/config";

export const sendGmail = async (req, res) => {
  try {
    const { dest, name } = req.body;
    const gmailOptions = {
      from: process.env.EMAIL,
      to: dest,
      subject: "Camino al proyecto final",
      html: `<h1>Hola ${name}, te damos la bienvenida a la Tercer entrega final!</h1>`,
    };
    const response = await transporter.sendMail(gmailOptions);
    console.log("email enviado!");
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};
