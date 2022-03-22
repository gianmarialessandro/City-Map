// const { LEVELS_PADDING_SIZE, LAYER_DEFAULT_HEIGTH } = require('./constants');
const defineRectanglesPositions = require('./defineRectanglesPositions');
const citymapConfiguration = require("../../../shared-utils/conf/citymap");

const LAYER_DEFAULT_HEIGTH = citymapConfiguration.layerDefaultHeight;
const LEVELS_PADDING_SIZE = citymapConfiguration.levelsPaddingSize;

/**
 * @description // Set the correct position of each level in main level.
 * @param {object} informationAboutLevelsAndBoxes Metrics and information about all the boxes and their level. 
 */
const setLevelsPosition = (informationAboutLevelsAndBoxes) => {
    var levels = informationAboutLevelsAndBoxes.levels;

    for (let i = 0; i < levels.length; i++) { // calculate the area of each box 
        const e = levels[i];
        const area = e._sizesLevelInLevel.width * e._sizesLevelInLevel.depth;
        e._sizesLevelInLevel.area = {};
        e._sizesLevelInLevel.area = area;
        const maxSide = Math.max(e._sizesLevelInLevel.width, e._sizesLevelInLevel.depth);
        e._sizesLevelInLevel.maxSide = {};
        e._sizesLevelInLevel.maxSide = maxSide;
    }

    // temporarily Maxside is the respective of highInCenter and random sortType
    levels.sort((a, b) => { // sort the boxes from the bigger 
        const maxSideOfA = a._sizesLevelInLevel.maxSide;
        const maxSideOfB = b._sizesLevelInLevel.maxSide;
        if (maxSideOfA < maxSideOfB) {
            return 1;
        }
        else if (maxSideOfA > maxSideOfB) {
            return -1;
        }
        else
            return 0;
    });

    const informationOFAllLevels = defineRectanglesPositions(levels, "levels");

    var infoAllLevels = informationOFAllLevels[0];
    var infoMainLevel = informationOFAllLevels[1];

    informationAboutLevelsAndBoxes.levels = infoAllLevels;

    informationAboutLevelsAndBoxes._sizesMainLevel = {};
    informationAboutLevelsAndBoxes._sizesMainLevel.width = infoMainLevel[0] + LEVELS_PADDING_SIZE;
    informationAboutLevelsAndBoxes._sizesMainLevel.depth = infoMainLevel[1] + LEVELS_PADDING_SIZE;
    informationAboutLevelsAndBoxes._sizesMainLevel.height = LAYER_DEFAULT_HEIGTH;

    return informationAboutLevelsAndBoxes;


    // // Sort Levels by their depth.
    // levels.sort((a, b) => {
    //     const depthOfA = a._sizesLevelInLevel.depth;
    //     const depthOfB = b._sizesLevelInLevel.depth;
    //     if (depthOfA < depthOfB) {
    //         return 1;
    //     }
    //     if (depthOfA > depthOfB) {
    //         return -1;
    //     }
    //     return 0;
    // });

    // // Calculate the widest level.
    // var widestLevel = 0;
    // for (let i = 0; i < levels.length; i++) {
    //     if (widestLevel < levels[i]._sizesLevelInLevel.width) {
    //         widestLevel = levels[i]._sizesLevelInLevel.width;
    //     }
    // }

    // // Calculate the deepest level.
    // var deepestLevel = 0;
    // for (i = 0; i < levels.length; i++) {
    //     if (deepestLevel < levels[i]._sizesLevelInLevel.depth) {
    //         deepestLevel = levels[i]._sizesLevelInLevel.depth;
    //     }
    // }

    // // Calculate the sum of all levels width.
    // var widthSumOfAllLevels = 0;
    // for (let i = 0; i < levels.length; i++) {
    //     widthSumOfAllLevels += levels[i]._sizesLevelInLevel.width;
    // }

    // // The length of the x-Axis in level is set as the square root of the sum of all levels width.
    // x_AxisInLevels = Math.ceil(Math.sqrt(widthSumOfAllLevels));

    // // If the wideste level is bigger of the x-axis, this take the value of the level.    
    // if (widestLevel > x_AxisInLevels) {
    //     x_AxisInLevels = widestLevel;
    // }

    // // Set levels with the same depth in the same array.
    // var levelsWithSameDepth = [];
    // var indexOfLevelsWithSameDepth = 0;
    // levelsWithSameDepth[indexOfLevelsWithSameDepth] = [];
    // for (let i = 0; i < levels.length; i++) {
    //     if (i === 0) {
    //         levelsWithSameDepth[indexOfLevelsWithSameDepth].push(levels[i]);
    //     } else if (levels[i]._sizesLevelInLevel.depth === levels[i - 1]._sizesLevelInLevel.depth) {
    //         levelsWithSameDepth[indexOfLevelsWithSameDepth].push(levels[i]);
    //     } else {
    //         indexOfLevelsWithSameDepth++;
    //         levelsWithSameDepth[indexOfLevelsWithSameDepth] = [];
    //         levelsWithSameDepth[indexOfLevelsWithSameDepth].push(levels[i]);
    //     }
    // }

    // // Set arrays of level where the sum of all levels width should not exceed the length of the x_AxisInLevel.
    // var arrayOfLevelsWithSameDepthAndMaxWidth = [];
    // var indexOf = 0;
    // arrayOfLevelsWithSameDepthAndMaxWidth[indexOf] = [];
    // // Counter of the left free width space of each array.
    // var arrayLength = x_AxisInLevels;

    // // Loop over each array.
    // for (let i = 0; i < levelsWithSameDepth.length; i++) {
    //     var levelArray = levelsWithSameDepth[i];

    //     // Inside each single array.
    //     for (let i2 = 0; i2 < levelArray.length; i2++) {

    //         // The while repeat it self till there is no more boxes in the array.
    //         // Add the selected level in the arrayOfLevelsWithSameDepthAndMaxWidth and write in each level it's own depth.
    //         while (levelArray.length > 0) {
    //             let selectedLevelIndex;

    //             // Choose the the selected level if it width fit perfectly the length of arrayLength.
    //             var selectedLevel = levelArray.find((level, index) => {
    //                 if (level._sizesLevelInLevel.width === arrayLength) { selectedLevelIndex = index; }
    //                 return level._sizesLevelInLevel.width === arrayLength;
    //             });
    //             // Choose the the selected level if it width is smaller of the length of arrayLength.
    //             if (selectedLevelIndex === undefined) {
    //                 selectedLevel = levelArray.find((level, index) => {
    //                     if (level._sizesLevelInLevel.width <= arrayLength) { selectedLevelIndex = index; }
    //                     return level._sizesLevelInLevel.width <= arrayLength;
    //                 });
    //             }
    //             // If there is no levels that fit the actual array, set a new array.
    //             if (selectedLevelIndex === undefined) {
    //                 indexOf++;
    //                 arrayOfLevelsWithSameDepthAndMaxWidth[indexOf] = [];
    //                 arrayLength = x_AxisInLevels;
    //             }
    //             // Insert the selected level into the corresponding array, delete the level from the origin array and set the array depth.
    //             else if (levelArray.length === 1) {
    //                 arrayOfLevelsWithSameDepthAndMaxWidth[indexOf]._arrayLevelSizes = {};
    //                 arrayOfLevelsWithSameDepthAndMaxWidth[indexOf]._arrayLevelSizes.depth = selectedLevel._sizesLevelInLevel.depth;
    //                 arrayOfLevelsWithSameDepthAndMaxWidth[indexOf].push(selectedLevel);
    //                 arrayLength -= selectedLevel._sizesLevelInLevel.width + LEVELS_PADDING_SIZE; //--------------------------------
    //                 levelArray.splice(selectedLevelIndex, 1);
    //                 indexOf++;
    //                 arrayOfLevelsWithSameDepthAndMaxWidth[indexOf] = [];
    //                 arrayLength = x_AxisInLevels;
    //             }

    //             else {
    //                 arrayOfLevelsWithSameDepthAndMaxWidth[indexOf]._arrayLevelSizes = {};
    //                 arrayOfLevelsWithSameDepthAndMaxWidth[indexOf]._arrayLevelSizes.depth = selectedLevel._sizesLevelInLevel.depth;
    //                 arrayOfLevelsWithSameDepthAndMaxWidth[indexOf].push(selectedLevel);
    //                 arrayLength -= selectedLevel._sizesLevelInLevel.width + LEVELS_PADDING_SIZE; //--------------------------------
    //                 levelArray.splice(selectedLevelIndex, 1);
    //             }
    //         }
    //     }
    // }

    // // Delete the last element(empty) of the array.
    // // arrayOfLevelsWithSameDepthAndMaxWidth.splice(-1, 1);
    // arrayOfLevelsWithSameDepthAndMaxWidth.pop();

    // // Determ the exact width and depth of each array.
    // var widesteArray = 0;
    // for (let i = 0; i < arrayOfLevelsWithSameDepthAndMaxWidth.length; i++) {
    //     var arrayWidth = 0;
    //     var arrayDepth = 0;
    //     for (let i2 = 0; i2 < arrayOfLevelsWithSameDepthAndMaxWidth[i].length; i2++) {
    //         arrayWidth += arrayOfLevelsWithSameDepthAndMaxWidth[i][i2]._sizesLevelInLevel.width;
    //         arrayDepth = arrayOfLevelsWithSameDepthAndMaxWidth[i][i2]._sizesLevelInLevel.depth;
    //     }
    //     arrayOfLevelsWithSameDepthAndMaxWidth[i]._arrayLevelSizes = {};
    //     arrayOfLevelsWithSameDepthAndMaxWidth[i]._arrayLevelSizes.width = arrayWidth;
    //     arrayOfLevelsWithSameDepthAndMaxWidth[i]._arrayLevelSizes.depth = arrayDepth;
    //     if (widesteArray < arrayOfLevelsWithSameDepthAndMaxWidth[i]._arrayLevelSizes.width) {
    //         widesteArray = arrayOfLevelsWithSameDepthAndMaxWidth[i]._arrayLevelSizes.width;
    //     }
    // }

    // // If the width of an array is smaller than a given number they are stored in a new array of arrays with smaller width.
    // var smallerArrayWidthLength = ((widesteArray * 8) / 10);
    // var arraysSmallerWidth = [];
    // for (let i = 0; i < arrayOfLevelsWithSameDepthAndMaxWidth.length; i++) {

    //     if (arrayOfLevelsWithSameDepthAndMaxWidth[i]._arrayLevelSizes.width < smallerArrayWidthLength) {

    //         arraysSmallerWidth.push(arrayOfLevelsWithSameDepthAndMaxWidth[i]);
    //         arrayOfLevelsWithSameDepthAndMaxWidth.splice(i, 1)
    //     }
    // }

    // // If there is some array with small width. 
    // if (arraysSmallerWidth.length > 0) {
    //     // Sort levels by depth.
    //     arraysSmallerWidth.sort((a, b) => {
    //         const depthOfA = a._arrayLevelSizes.depth;
    //         const depthOfB = b._arrayLevelSizes.depth;
    //         if (depthOfA < depthOfB) {
    //             return 1;
    //         }
    //         if (depthOfA > depthOfB) {
    //             return -1;
    //         }
    //         return 0;
    //     });

    //     var arraysOfLevelsDifferentDepth = [];
    //     var indexOfArraysOfLevelsDifferentDepth = 0;
    //     var counterRestOfWidthSpace = widesteArray;
    //     arraysOfLevelsDifferentDepth[indexOfArraysOfLevelsDifferentDepth] = [];

    //     // Assembling arrays with level of different depth.
    //     for (let i = 0; i < arraysSmallerWidth.length; i++) {
    //         for (let i2 = 0; i2 < arraysSmallerWidth[i].length; i2++) {
    //             // Levels that still fit the width of one array.
    //             if ((arraysSmallerWidth[i][i2]._sizesLevelInLevel.width + LEVELS_PADDING_SIZE) <= counterRestOfWidthSpace) {
    //                 arraysOfLevelsDifferentDepth[indexOfArraysOfLevelsDifferentDepth].push(arraysSmallerWidth[i][i2]);
    //                 counterRestOfWidthSpace = counterRestOfWidthSpace - (arraysSmallerWidth[i][i2]._sizesLevelInLevel.width + LEVELS_PADDING_SIZE);
    //             }
    //             // Levels that should be placed in a new array.
    //             else {
    //                 indexOfArraysOfLevelsDifferentDepth++;
    //                 arraysOfLevelsDifferentDepth[indexOfArraysOfLevelsDifferentDepth] = [];
    //                 counterRestOfWidthSpace = widesteArray;
    //                 arraysOfLevelsDifferentDepth[indexOfArraysOfLevelsDifferentDepth].push(arraysSmallerWidth[i][i2]);
    //                 counterRestOfWidthSpace = counterRestOfWidthSpace - (arraysSmallerWidth[i][i2]._sizesLevelInLevel.width + LEVELS_PADDING_SIZE);
    //             }
    //         }
    //     }

    //     for (let i = 0; i < arraysOfLevelsDifferentDepth.length; i++) {
    //         var counterArrayDepth = 0;
    //         var counterArrayWidth = 0;
    //         var counterWidesteArray = 0;
    //         for (let i2 = 0; i2 < arraysOfLevelsDifferentDepth[i].length; i2++) {
    //             if (i2 === 0) {
    //                 counterArrayDepth = arraysOfLevelsDifferentDepth[i][i2]._sizesLevelInLevel.depth;
    //             }
    //             counterArrayWidth += arraysOfLevelsDifferentDepth[i][i2]._sizesLevelInLevel.width;
    //             if (counterArrayWidth > counterWidesteArray) {
    //                 counterWidesteArray = counterArrayWidth;
    //             }
    //         }
    //         arraysOfLevelsDifferentDepth[i]._arrayLevelSizes = {};
    //         arraysOfLevelsDifferentDepth[i]._arrayLevelSizes.depth = counterArrayDepth;
    //         arraysOfLevelsDifferentDepth[i]._arrayLevelSizes.width = counterArrayWidth;
    //     }

    //     // The spliced arrays are going to be back in the main array but in the bottom position.
    //     arrayOfLevelsWithSameDepthAndMaxWidth.push(...arraysOfLevelsDifferentDepth);
    // }
    // if (counterWidesteArray > widesteArray) {
    //     widesteArray = counterWidesteArray;
    // }

    // // Sort levels by width.
    // arrayOfLevelsWithSameDepthAndMaxWidth.sort((a, b) => {
    //     const widthOfA = a._arrayLevelSizes.width;
    //     const widthOfB = b._arrayLevelSizes.width;
    //     if (widthOfA < widthOfB) {
    //         return 1;
    //     }
    //     if (widthOfA > widthOfB) {
    //         return -1;
    //     }
    //     return 0;
    // });

    // // Determining the starting position of each arrays.
    // var sumOfLevelDepth = 0;
    // for (let i = 0; i < arrayOfLevelsWithSameDepthAndMaxWidth.length; i++) {
    //     arrayOfLevelsWithSameDepthAndMaxWidth[i]._arrayLevelStartingPosition = {};

    //     if (i === 0) {
    //         arrayOfLevelsWithSameDepthAndMaxWidth[i]._arrayLevelStartingPosition.x = 0;
    //         arrayOfLevelsWithSameDepthAndMaxWidth[i]._arrayLevelStartingPosition.z = 0;
    //     }
    //     else {
    //         arrayOfLevelsWithSameDepthAndMaxWidth[i]._arrayLevelStartingPosition.x = 0;
    //         arrayOfLevelsWithSameDepthAndMaxWidth[i]._arrayLevelStartingPosition.z = arrayOfLevelsWithSameDepthAndMaxWidth[i - 1]._arrayLevelStartingPosition.z + arrayOfLevelsWithSameDepthAndMaxWidth[i - 1]._arrayLevelSizes.depth + LEVELS_PADDING_SIZE;
    //     }
    //     sumOfLevelDepth += arrayOfLevelsWithSameDepthAndMaxWidth[i]._arrayLevelSizes.depth + LEVELS_PADDING_SIZE;
    // }

    // // Determining the position of the levels.
    // for (let i = 0; i < arrayOfLevelsWithSameDepthAndMaxWidth.length; i++) {
    //     for (let i2 = 0; i2 < arrayOfLevelsWithSameDepthAndMaxWidth[i].length; i2++) {

    //         arrayOfLevelsWithSameDepthAndMaxWidth[i][i2]._levelPosition = {};
    //         // First level of the array.
    //         if (i2 === 0) {
    //             arrayOfLevelsWithSameDepthAndMaxWidth[i][i2]._levelPosition.x = arrayOfLevelsWithSameDepthAndMaxWidth[i]._arrayLevelStartingPosition.x;
    //             arrayOfLevelsWithSameDepthAndMaxWidth[i][i2]._levelPosition.z = arrayOfLevelsWithSameDepthAndMaxWidth[i]._arrayLevelStartingPosition.z;
    //         }
    //         // Following levels of the array.
    //         else {
    //             arrayOfLevelsWithSameDepthAndMaxWidth[i][i2]._levelPosition.x = arrayOfLevelsWithSameDepthAndMaxWidth[i][i2 - 1]._levelPosition.x + arrayOfLevelsWithSameDepthAndMaxWidth[i][i2 - 1]._sizesLevelInLevel.width + LEVELS_PADDING_SIZE;
    //             arrayOfLevelsWithSameDepthAndMaxWidth[i][i2]._levelPosition.z = arrayOfLevelsWithSameDepthAndMaxWidth[i]._arrayLevelStartingPosition.z;
    //         }


    //     }
    // }


    // // Set the sizes af the main level.
    // informationAboutLevelsAndBoxes._sizesMainLevel = {};
    // informationAboutLevelsAndBoxes._sizesMainLevel.width = widesteArray;
    // informationAboutLevelsAndBoxes._sizesMainLevel.depth = sumOfLevelDepth;

}


exports.setLevelsPosition = setLevelsPosition;