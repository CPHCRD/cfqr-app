const appVersion = process.env.APP_VERSION;

const getIdFromHash = () => {
  const { hash } = window.location;
  const pathParts = hash.split('/');
  const pathIdWithQuery = pathParts[pathParts.length - 1];
  return pathIdWithQuery.split('?')[0];
};

const stringToColour = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash); // eslint-disable-line no-bitwise
  }
  let colour = '#';
  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xFF; // eslint-disable-line no-bitwise
    colour += (`00${value.toString(16)}`).substr(-2);
  }
  return colour;
};

export {
  appVersion,
  getIdFromHash,
  stringToColour
};
