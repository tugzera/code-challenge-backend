import { join } from 'path';

const scriptsPath = join(__dirname, '..', 'database', 'migrations', 'scripts');
console.log('PATH2', scriptsPath);

export const SCRIPT_CONSTANTS = {
  CREATE_SCHEMA: `${scriptsPath}/1725017388754-create-schema.sql`,
  CREATE_SCHEMA_DOWN: `${scriptsPath}/1725017388754-create-schema-down.sql`,
};
