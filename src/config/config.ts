

const configuration = {
    db_host: process.env.DB_HOST || "localhost",
    db_user: process.env.DB_USER || "root",
    db_password: process.env.DB_PASSWORD || "",
    db_port: Number(process.env.DB_PORT) || 3306,
    db_name: process.env.DB_NAME || "xyzcommerce",
    app_port: process.env.PORT || 3001,
    TOKEN_SECRET: process.env.TOKEN_SECRET || "8709753475"
}

export default configuration;