/**
 * @description Read the dataFromDataBase and parse it a new object.
 * @param {object} dataFromDataBase Row data about levels and boxes.
 * @returns parsed object.
 */
const parseDataBaseData = (dataFromDataBase) => {

  var levelObject = {};

  // Set boxes of the same level inside on common levelobject.
  dataFromDataBase.results.forEach(e => {
    if (!levelObject[e.level]) {
      levelObject[e.level] = [];
    }

    levelObject[e.level].push(e);
  });

  // Set levels as main array of all objects of levels and boxes.
  var parseData = {
    levels: []
  };

  // Set the key attribute for levels and boxes and paar it with their corrispondigs values.
  Object.entries(levelObject).forEach(([key, e]) => parseData.levels.push({
    type: "level",
    level: key,
    boxes: e.map(element => ({
      type: "box",
      height: parseInt(element.height_totalChanges),
      width: parseInt(element.wide_xxx),
      depth: parseInt(element.depth_xxx),
      boxId: element.boxId,
      boxName: element.boxName,
    }))
  }))
  // Delete empty levels.
  parseData.levels = parseData.levels.filter(e => e.level.length > 0);

  return parseData;

}

exports.parseDataBaseData = parseDataBaseData;