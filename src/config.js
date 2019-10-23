import fs from 'fs';
import merge from 'merge-deep';
import yaml from 'js-yaml';

function getConfig(options) {
  let config = {};
  let { configPath } = options;
  if (!configPath) {
    configPath = `${process.cwd()}/.openapi-cli.yaml`;

    if (fs.existsSync(`${process.cwd()}/.openapi-cli.yaml`)) {
      configPath = `${process.cwd()}/.openapi-cli.yaml`;
    }

    if (fs.existsSync(`${process.cwd()}/.openapi-cli.yml`)) {
      configPath = `${process.cwd()}/.openapi-cli.yml`;
    }
  }

  const defaultConfigRaw = fs.readFileSync(`${__dirname}/.openapi-cli.yaml`, 'utf-8');
  const defaultConfig = yaml.safeLoad(defaultConfigRaw);

  if (fs.existsSync(configPath)) {
    const configRaw = fs.readFileSync(configPath, 'utf-8');
    config = yaml.safeLoad(configRaw);
  }

  const resolvedConfig = merge(defaultConfig, config, options);
  return resolvedConfig;
}

export default getConfig;
