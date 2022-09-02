import { ContainerRegistry } from "./container-register";
import { DBService } from "./database/database-connector";
import { ExpressApp } from "./express-app";

const containerRegistry = new ContainerRegistry();
const container = containerRegistry.getContainer();

const dbService = container.resolve<DBService>("dbService");
const expressApp = container.resolve<ExpressApp>("expressApp");

process.on("SIGINT", async () => {
  await expressApp.stop();
});

const bootstrap = async () => {
  try {
    await dbService.init();
    expressApp.start();
  } catch (error) {
    console.error(error);
  }
};

bootstrap();
