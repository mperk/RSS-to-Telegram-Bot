import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PrismaService } from "./prisma.service";
import * as fs from "fs";

async function bootstrap() {
  const conf_dir = "./config";

  fs.mkdir(conf_dir, { recursive: true }, (err) => {
    if (err) throw err;
  });

  const showVerbose = process.env.VERBOSE === "true";

  const logLevels = ["error", "warn"];

  if (showVerbose) {
    logLevels.push("verbose");
  }

  // @ts-ignore
  const app = await NestFactory.create(AppModule, {
    logger: logLevels
  });

  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);
  await app.listen(3000);
}

bootstrap();
