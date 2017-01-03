const placeholder = () => true;

const getIdFromHash = () => {
  const { hash } = window.location;
  const pathParts = hash.split('/');
  const pathIdWithQuery = pathParts[pathParts.length - 1];
  return pathIdWithQuery.split('?')[0];
};

export {
  placeholder,
  getIdFromHash
};
