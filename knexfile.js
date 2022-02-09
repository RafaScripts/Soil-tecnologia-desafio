module.exports = {
    development: {
        client: 'pg',
        version: '7.2',
        connection: {
            host : '159.223.111.47',
            port : 5432,
            user : 'postgres',
            password : '032211',
            database : 'magrelin'
        },
        migrations: {
            directory: `${__dirname}/src/database/migrations`
        },
        seeds: {
            directory: `${__dirname}/src/database/seeds`
        }
    }
}