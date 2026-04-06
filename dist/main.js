"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _core = require("@nestjs/core");
const _common = require("@nestjs/common");
const _swagger = require("@nestjs/swagger");
const _appmodule = require("./app.module");
async function bootstrap() {
    const app = await _core.NestFactory.create(_appmodule.AppModule);
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new _common.ValidationPipe({
        whitelist: true,
        transform: true
    }));
    app.enableCors();
    const config = new _swagger.DocumentBuilder().setTitle('Nexus CRM API').setDescription('CRM Backend API Documentation').setVersion('1.0').addBearerAuth().build();
    const document = _swagger.SwaggerModule.createDocument(app, config);
    _swagger.SwaggerModule.setup('swagger-ui', app, document);
    await app.listen(3000);
    console.log('Server running on http://localhost:3000');
    console.log('Swagger UI: http://localhost:3000/swagger-ui');
}
bootstrap();

//# sourceMappingURL=main.js.map