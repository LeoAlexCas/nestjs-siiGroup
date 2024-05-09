export const envConfig = () => ({
    enviroment: process.env.NODE_ENV || 'dev',
    mongoConnection: process.env.MONGO_CONNECTION,
    port: process.env.PORT || 3002
})