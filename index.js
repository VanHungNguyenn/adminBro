const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')
const Users = require('./models/userModel')
const mongoose = require('mongoose')

AdminBro.registerAdapter(AdminBroMongoose)

const express = require('express')
const app = express()
const PORT = 3001

const run = async () => {
	await mongoose.connect('mongodb://127.0.0.1:27017/Manage')
	const AdminBroOptions = {
		resources: [Users],
		rootPath: '/',
	}
	const adminBro = new AdminBro(AdminBroOptions)

	const router = AdminBroExpress.buildRouter(adminBro)

	app.use(adminBro.options.rootPath, router)
	app.listen(PORT, () =>
		console.log(`AdminBro is under http://localhost:${PORT}`)
	)
}

run()
