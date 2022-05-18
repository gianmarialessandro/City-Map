/**
 * @description Searches for the highest box and returns boxes with a height related to the highest.
 * @param {object} informationAboutLevelsAndBoxes Metrics and information about all the boxes and their level.
 *  
 */

const setScaledDimension = (informationAboutLevelsAndBoxes, dimensionType, maxValue) => {
    // Search the highest box.
    const maxDimension = getLevelMaxDimension(informationAboutLevelsAndBoxes, dimensionType);

    // Create a scaled dimensionType.
    for (let levelIndex = 0; levelIndex < informationAboutLevelsAndBoxes.levels.length; levelIndex++) {
        const level = informationAboutLevelsAndBoxes.levels[levelIndex];
        getDimension(level, maxDimension, dimensionType, maxValue);
    }
}

// Set for each boxes the scalde height.
// 
const getDimension = (level, maxDimension, dimensionType, maxValue) => {
    const boxes = level.boxes;

    for (let levelIndex = 0; levelIndex < boxes.length; levelIndex++) {
        boxes[levelIndex][`_scaled${dimensionType.charAt(0).toUpperCase() + dimensionType.slice(1)}`] = maxDimension < maxValue ? boxes[levelIndex][dimensionType] : getRelationToDimension(maxDimension, boxes[levelIndex][dimensionType], maxValue);
    }
}

// Search the biggest dimension box.
const getLevelMaxDimension = (informationAboutLevelsAndBoxes, dimensionType) => {
    if (informationAboutLevelsAndBoxes.boxes) {
        // return level.boxes.reduce((prev, box) => box[dimensionType] > prev ? box[dimensionType] : prev, 0);
        return Math.max(...informationAboutLevelsAndBoxes.boxes.map(e => e[dimensionType]));
    }

    if (informationAboutLevelsAndBoxes.levels) {
        return Math.max(...informationAboutLevelsAndBoxes.levels.map(e => getLevelMaxDimension(e, dimensionType)))
    }
}



// Set the scaled height.
const getRelationToDimension = (maxDimension, dimensionTorealateToTheBiggerDimension, maxValue) => Math.max(Math.floor((dimensionTorealateToTheBiggerDimension * maxValue) / maxDimension), 0.1);


module.exports = setScaledDimension;

