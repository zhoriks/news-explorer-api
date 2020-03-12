const uriRegExp = /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!-]))?/;
const mongoIdRegExp = /^[0-9a-fA-F]{24}$/;

module.exports = {
  uriRegExp,
  mongoIdRegExp,
};
