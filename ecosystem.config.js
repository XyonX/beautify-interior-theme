module.exports = {
  apps: [
    {
      name: "ourshop",
      script: "npm",
      args: "run start",
      cwd: "/var/www/beautify-interior",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
