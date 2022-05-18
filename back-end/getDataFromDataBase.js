const connectionPool = require("../database").getPool();

const getDataFromDataBase = async (intEnvId, entityFilter, instanceFilter) => {
  let queryString = `SELECT entities.entity AS level, instance AS boxId, displayName AS boxName, totalChanges as height_totalChanges, 1 as wide_xxx, 1 AS depth_xxx FROM instances, entities WHERE refIdEntity IN (SELECT id FROM entities WHERE refIdEnvironment = ?${entityFilter !== undefined ? ` AND entity = ?` : ""}) AND instances.deleted IS NULL AND refIdEntity = entities.id`;
  let queryValues = [intEnvId];

  if (entityFilter !== undefined) {
    queryValues.push(entityFilter);
  }

  if (instanceFilter !== undefined && instanceFilter.length > 0) {
    const instanceFilterStrings = instanceFilter.map(({ entity, instance }) => {
      queryValues.push(entity, instance);
      return `(entity = ? AND instance = ?)`;
    });

    queryString = `${queryString} AND (${instanceFilterStrings.join(" OR ")})`;
  }

  return connectionPool.query(queryString, queryValues).then(([results, fields]) => ({ results }));
};

exports.getDataFromDataBase = getDataFromDataBase;