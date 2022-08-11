const config = {
  isProd: process.env.NODE_ENV === "production",
  port: Number(process.env.PORT),
};

export default config;
