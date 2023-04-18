const uuidType = 'uuid';
const uuidPattern = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;

/**
 * Whether the passed object is of type uuid
 * @param {any} uuid
 * @returns {boolean}
 */
const isUUID = (uuid) => uuidPattern.test(uuid);

export { uuidType };
export default {
  is: isUUID,
  pattern: uuidPattern,
  type: uuidType,
};
