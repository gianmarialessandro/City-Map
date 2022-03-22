const getDataFromDataBase = require('./getDataFromDataBase');
const parseDataBaseData = require('./parseDataBaseData');
const setScaledDimension = require('./setScaledDimension');
const setBoxesPosition = require('./setBoxesPosition');
const setLevelsPosition = require('./setLevelsPosition');
const getTopologyInstancesById = require("../getTopologyHelpers").getTopologyInstancesById;
const { logger } = require('../logging');

const cityMapFunction = async (environmentExtId, environmentId, filter, userId, sortType) => {
  let { entityFilter, topologyIdFilter } = filter;

  if (Array.isArray(entityFilter)) {
    entityFilter = entityFilter[0];
  }

  let topologyInstances;
  if (topologyIdFilter !== undefined) {
    topologyInstances = await getTopologyInstancesById(environmentExtId, topologyIdFilter, userId);
  }

  // get data from database (environmentId)
  const dataFromDataBase = await getDataFromDataBase.getDataFromDataBase(environmentId, entityFilter, topologyInstances);
  // const dataFromDataBase = getDataFromDataBase.getDataFromDataBase();

  // Parse data from database.
  const informationAboutLevelsAndBoxes = parseDataBaseData.parseDataBaseData(dataFromDataBase);

  // Set a scaled height for each boxes.
  setScaledDimension(informationAboutLevelsAndBoxes, "height",25);

  // Set a scaled depth for each boxes.
  setScaledDimension(informationAboutLevelsAndBoxes, "depth",20);

  // Set a scaled width for each boxes.
  setScaledDimension(informationAboutLevelsAndBoxes, "width",20);

  // Set the position of each box in the level.
  setBoxesPosition.setBoxesPosition(informationAboutLevelsAndBoxes, sortType);

  // Set the position of each level in main level.
  setLevelsPosition.setLevelsPosition(informationAboutLevelsAndBoxes);

  return informationAboutLevelsAndBoxes;

};
module.exports = cityMapFunction;

