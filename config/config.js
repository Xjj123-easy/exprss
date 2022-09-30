module.exports = {
    app: {
        port: process.env.POST || 3000
    },
    database: {
        url: process.env.dev || "mongodb://127.0.0.1:27017/nodejs"
    },
    secret: "da272155-adf8-5ec7-86dc-ccafeb9ebce3"
}