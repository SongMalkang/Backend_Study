// src/config/swaggerConfig.ts
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerSpec = YAML.load(path.join(__dirname, '../documents/swagger.yaml'));

export { swaggerUi, swaggerSpec };