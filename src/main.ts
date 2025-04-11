// backend/src/main.ts

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  try {
    const PORT = process.env.PORT ?? 3000; // Vercel portni o'zi belgilashi mumkin
    const app = await NestFactory.create(AppModule);

    // --- Barcha Originlar uchun CORS ni yoqish (Credentials bilan mos) ---
    app.enableCors({
      origin: true, // Kelgan requestning originini aks ettiradi = barchaga ruxsat
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true, // Cookie va Authorization header uchun muhim
      allowedHeaders: "Content-Type, Accept, Authorization", // Kerakli sarlavhalar
      preflightContinue: false,
      optionsSuccessStatus: 204,
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

    await app.listen(PORT, "0.0.0.0", () => {
      // Vercel uchun 0.0.0.0 foydali
      console.log(
        `Server started on port ${PORT} with CORS enabled reflecting request origin`
      );
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}

bootstrap();
