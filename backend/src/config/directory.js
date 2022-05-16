import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootPath = path.normalize(`${__dirname}/../..`);

const directory = {
  root: rootPath,
  //   distDir: `${rootPath}/dist`,
  //   assetsDir: `${rootPath}/public`,
};

export default directory;
