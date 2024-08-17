import config from "./config";

const baseConfig = config.chains.find((chain) => chain.isBase);

export default baseConfig;
