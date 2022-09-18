module.exports = {
  apps: [
    {
      name: 'koa-template',
      script: './dist/app.js',
      verbose: true,
      autorestart: true,
      instances: 1,
      ignore_watch: ['node_modules', 'log'],
      max_restarts: 5,
      max_memory_restart: '512M',
      error_file: "./logs/app-err.log",
      out_file: "./logs/app-out.log",
      log: "./logs/app.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
