import initServer from "./src/server.js";

const main = async () => {
  initServer();
};

main().catch(console.error);
