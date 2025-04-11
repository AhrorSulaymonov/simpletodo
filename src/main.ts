import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  try {
    const PORT = process.env.PORT ?? 3003; // Yoki 3000? Portni tekshiring!
    const app = await NestFactory.create(AppModule);

    // --- Barcha Originlar uchun CORS ni yoqish (Credentials bilan) ---
    app.enableCors({
      origin: true, // Kelgan requestning originini aks ettiradi
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true, // Cookie va Authorization header uchun muhim
      allowedHeaders: "Content-Type, Accept, Authorization",
    });
    // ---------------------------------------------------------

    app.use(cookieParser());
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: false,
        transform: true,
      })
    );
    app.setGlobalPrefix("api");

    await app.listen(PORT, () => {
      console.log(
        `Server started at: http://localhost:${PORT} with CORS enabled for all origins (reflecting request origin)`
      );
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}

bootstrap();
