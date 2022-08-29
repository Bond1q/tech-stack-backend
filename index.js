import express from "express";
import mongoose from "mongoose";
import router from './router.js'
import cors from 'cors'
const PORT = 5000;
const DB_URL = `mongodb+srv://user:user@cluster0.avfcj4q.mongodb.net/?retryWrites=true&w=majority`

const app = express()

app.use(express.json())
app.use('', router)



async function startApp() {
	try {
		await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
		app.listen(process.env.PORT || PORT, () => console.log('SERVER START'))

	} catch (error) {
		console.log(error);
	}
}
startApp()