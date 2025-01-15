const nodemailer = require("nodemailer");
const sendEmail = async (
	email,
	symbol,
	currentPrice,
	condition,
	targetPrice
) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.HOST,
			service: process.env.SERVICE,
			port: 587,
			secure: true,
			auth: {
				user: process.env.USER,
				pass: process.env.PASS,
			},
		});
		const subject = `Crypto Alert : ${symbol}`;
		const conditionText = condition === "greaterThan" ? "above" : "below";

		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: email,
			subject,
			text: `Hello,
    
Your alert for ${symbol} has been triggered. The price is now ${conditionText} your target price of ${targetPrice}.
    
Current Price: ${currentPrice}.
    
Thank you,
Crypto Alert Team`,
		};

		await transporter.sendMail(mailOptions);
		console.log("email sent sucessfully");
	} catch (error) {
		console.log(error, "email not sent");
	}
};

module.exports = sendEmail;
