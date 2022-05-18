// const { BOX_PADDING_SIZE, LAYER_DEFAULT_HEIGTH } = require('./constants');
const defineRectanglesPositions = require('./defineRectanglesPositions');
const citymapConfiguration = require("../../../shared-utils/conf/citymap");

const LAYER_DEFAULT_HEIGTH = citymapConfiguration.layerDefaultHeight;
const BOX_PADDING_SIZE = citymapConfiguration.boxPaddingSize;

/**
 * @description // Set the position of all boxes in all levels.
 * @param {object} informationAboutLevelsAndBoxes Metrics and information about all the boxes and their level. 
 */
const setBoxesPosition = (informationAboutLevelsAndBoxes, sortType) => {

    for (let levelIndex = 0; levelIndex < informationAboutLevelsAndBoxes.levels.length; levelIndex++) {
        var level = informationAboutLevelsAndBoxes.levels[levelIndex];

        var informationOfBoxesOfOneLevel = calculateBoxPosition(level, sortType);
        var infoBoxes = informationOfBoxesOfOneLevel[0];
        var infoLevel = informationOfBoxesOfOneLevel[1]

        informationAboutLevelsAndBoxes.levels[levelIndex] = {
            ...level,
            _sizesLevelInLevel: {
                width: infoLevel[0] + BOX_PADDING_SIZE,
                depth: infoLevel[1] + BOX_PADDING_SIZE,
                height: LAYER_DEFAULT_HEIGTH
            }
        }
        informationAboutLevelsAndBoxes.levels[levelIndex].boxes = infoBoxes;
    }
    return informationAboutLevelsAndBoxes;
}

/**
 * @description // Set the correct position of each box in it's level.
 * @param {object} informationAboutBoxesOfOneLevel Metrics and information about all the boxes of one level. 
 */
const calculateBoxPosition = (informationAboutBoxesOfOneLevel, sortType) => {

    var boxesInSingleLevel = informationAboutBoxesOfOneLevel.boxes;


    // const firstBoxPointer = boxesInSingleLevel[0];

    // const allBoxesHaveSameDemensions = boxesInSingleLevel.every(box => box.width === firstBoxPointer.width && box.depth === firstBoxPointer.depth);

    // // 
    // if (allBoxesHaveSameDemensions) {
    //     // Sort boxes by the depth.
    //     boxesInSingleLevel.sort((a, b) => {
    //         const depthOfA = a.depth;
    //         const depthOfB = b.depth;
    //         if (depthOfA < depthOfB) {
    //             return 1;
    //         }
    //         if (depthOfA > depthOfB) {
    //             return -1;
    //         }
    //         return 0;
    //     });

    //     if (sortType === "highToLow") {
    //         // Sort boxes by the height.
    //         boxesInSingleLevel.sort((a, b) => {
    //             const heightOfA = a.height;
    //             const heightOfB = b.height;
    //             if (heightOfA < heightOfB) {
    //                 return 1;
    //             }
    //             if (heightOfA > heightOfB) {
    //                 return -1;
    //             }
    //             return 0;
    //         });
    //     }
    //     else if (sortType === "highInCenter") {
    //         // Sort boxes by the height.
    //         boxesInSingleLevel.sort((a, b) => {
    //             const heightOfA = a.height;
    //             const heightOfB = b.height;
    //             if (heightOfA < heightOfB) {
    //                 return 1;
    //             }
    //             if (heightOfA > heightOfB) {
    //                 return -1;
    //             }
    //             return 0;
    //         });



    //         let arrayBoxen = [];
    //         for (let i = 0; i < boxesInSingleLevel.length; i++) {
    //             if (i % 2 === 0) {
    //                 arrayBoxen.push(boxesInSingleLevel[i]);
    //             } else {
    //                 arrayBoxen.unshift(boxesInSingleLevel[i]);
    //             }
    //         }

    //         boxesInSingleLevel = arrayBoxen;


    //     }
    //     else if (sortType === "random") {
    //         // do nothing like default
    //     }

    //     // Sort boxes by the height.
    //     boxesInSingleLevel.sort((a, b) => {
    //         const heightOfA = a.height;
    //         const heightOfB = b.height;
    //         if (heightOfA < heightOfB) {
    //             return 1;
    //         }
    //         if (heightOfA > heightOfB) {
    //             return -1;
    //         }
    //         return 0;
    //     });

    //     // Set the level-Id as attribute inside each object box and set the color attribute, if is undefined set default color '#f5f5f5'.
    //     for (let i = 0; i < boxesInSingleLevel.length; i++) {
    //         boxesInSingleLevel[i].levelId = {};
    //         boxesInSingleLevel[i].levelId = informationAboutBoxesOfOneLevel.LEVEL;
    //         boxesInSingleLevel[i].color = informationAboutBoxesOfOneLevel.Color;
    //         if (boxesInSingleLevel[i].color === undefined) {
    //             boxesInSingleLevel[i].color = '#f5f5f5';
    //         }
    //     }

    //     // Calculate the widest box in matrix of the level.
    //     var widestBoxInMatrix = 0;
    //     for (let i = 0; i < boxesInSingleLevel.length; i++) {
    //         if (widestBoxInMatrix < boxesInSingleLevel[i]._scaledWidth) {
    //             widestBoxInMatrix = boxesInSingleLevel[i]._scaledWidth;
    //         }
    //     }

    //     // Calculate the deepest box in matrix of the level.
    //     var deepestBoxInMatrix = 0;
    //     for (i = 0; i < boxesInSingleLevel.length; i++) {
    //         if (deepestBoxInMatrix < boxesInSingleLevel[i].depth) {
    //             deepestBoxInMatrix = boxesInSingleLevel[i].depth;
    //         }
    //     }

    //     // Distribute boxes with the same depth in the same array.
    //     var arrayOfArraysOfBoxesWithTheSameDepth = [];
    //     var index = 0;
    //     arrayOfArraysOfBoxesWithTheSameDepth[index] = [];

    //     for (let i = 0; i < boxesInSingleLevel.length; i++) {
    //         if (i === 0) {
    //             arrayOfArraysOfBoxesWithTheSameDepth[index].push(boxesInSingleLevel[i]);
    //         }

    //         // If the selected box has the same depth of the previus one, it's placed in the same array.
    //         else if (i !== 0 && boxesInSingleLevel[i].depth === boxesInSingleLevel[i - 1].depth) {
    //             arrayOfArraysOfBoxesWithTheSameDepth[index].push(boxesInSingleLevel[i]);
    //         }

    //         // If the selected box has different depth, it's placed in a new array.
    //         else {
    //             index++;
    //             arrayOfArraysOfBoxesWithTheSameDepth[index] = [];
    //             arrayOfArraysOfBoxesWithTheSameDepth[index].push(boxesInSingleLevel[i]);
    //         }
    //     }

    //     // Calculate the sum of the toal width of the boxes.
    //     var sumWidth = 0;
    //     for (let i = 0; i < boxesInSingleLevel.length; i++) {
    //         sumWidth += boxesInSingleLevel[i]._scaledWidth;
    //     }

    //     // The length of the x-Axis in matrix is set as the square root of the sum of the width of all boxes.
    //     var x_AxisInMatrix = Math.ceil(Math.sqrt(sumWidth));

    //     // If the wideste box is bigger of the x-axis, this take the value of the box.  
    //     if (widestBoxInMatrix > x_AxisInMatrix) {
    //         x_AxisInMatrix = widestBoxInMatrix;
    //     }

    //     // Set arrays of boxes where the sum of the width of all the boxes should not exceed the length of the x_Axis in matrix.
    //     var arraysWithSetAMaxWidth = [];
    //     var indexOfArraysWithSetAMaxWidth = 0;
    //     arraysWithSetAMaxWidth[indexOfArraysWithSetAMaxWidth] = [];
    //     // Counter of the left free width space of each array.  
    //     var arrayLength = x_AxisInMatrix;

    //     // Loop over each array.
    //     for (let i = 0; i < arrayOfArraysOfBoxesWithTheSameDepth.length; i++) {

    //         var singleArrayOfBoxes = arrayOfArraysOfBoxesWithTheSameDepth[i];

    //         // Inside each single array.
    //         for (let indexOfSingleArrayOfBoxes = 0; indexOfSingleArrayOfBoxes < singleArrayOfBoxes.length; indexOfSingleArrayOfBoxes++) {

    //             // The while repeat it self till there is no more boxes in the array.
    //             while (singleArrayOfBoxes.length > 0) {

    //                 let selectedBoxIndex;

    //                 // Choose the the selected box if it width fit perfectly the length of arrayLength. 
    //                 var selectedBox = singleArrayOfBoxes.find((box, index) => {
    //                     if (box._scaledWidth === arrayLength) { selectedBoxIndex = index; }
    //                     return box._scaledWidth === arrayLength;
    //                 });
    //                 // Choose the the selected box if it width is smaller of the length of arrayLength.
    //                 if (selectedBoxIndex === undefined) {
    //                     selectedBox = singleArrayOfBoxes.find((box, index) => {
    //                         if (box._scaledWidth <= arrayLength) { selectedBoxIndex = index; }
    //                         return box._scaledWidth <= arrayLength;
    //                     });
    //                 }
    //                 // If there is no boxes that fit the actual array, set a new array.
    //                 if (selectedBoxIndex === undefined) {
    //                     indexOfArraysWithSetAMaxWidth++;
    //                     arraysWithSetAMaxWidth[indexOfArraysWithSetAMaxWidth] = [];
    //                     arrayLength = x_AxisInMatrix;
    //                 }
    //                 // Insert the selected box into the corresponding array, delete the box from the origin array and set the depth of the array.
    //                 else if (singleArrayOfBoxes.length === 1) {
    //                     arraysWithSetAMaxWidth[indexOfArraysWithSetAMaxWidth]._arrayDepthInMatrix = {};
    //                     arraysWithSetAMaxWidth[indexOfArraysWithSetAMaxWidth]._arrayDepthInMatrix = selectedBox.depth;
    //                     arraysWithSetAMaxWidth[indexOfArraysWithSetAMaxWidth]._arrayDepthInLevel = {};
    //                     arraysWithSetAMaxWidth[indexOfArraysWithSetAMaxWidth]._arrayDepthInLevel = selectedBox.depth;//+ BOX_PADDING_SIZE--------------
    //                     arraysWithSetAMaxWidth[indexOfArraysWithSetAMaxWidth].push(selectedBox);
    //                     arrayLength -= selectedBox._scaledWidth;
    //                     singleArrayOfBoxes.splice(selectedBoxIndex, 1);
    //                     indexOfArraysWithSetAMaxWidth++;
    //                     arraysWithSetAMaxWidth[indexOfArraysWithSetAMaxWidth] = [];
    //                     arrayLength = x_AxisInMatrix;
    //                 }
    //                 // 
    //                 else {
    //                     arraysWithSetAMaxWidth[indexOfArraysWithSetAMaxWidth]._arrayDepthInMatrix = {};
    //                     arraysWithSetAMaxWidth[indexOfArraysWithSetAMaxWidth]._arrayDepthInMatrix = selectedBox.depth;
    //                     arraysWithSetAMaxWidth[indexOfArraysWithSetAMaxWidth]._arrayDepthInLevel = {};
    //                     arraysWithSetAMaxWidth[indexOfArraysWithSetAMaxWidth]._arrayDepthInLevel = selectedBox.depth;//+ BOX_PADDING_SIZE------------------------
    //                     arraysWithSetAMaxWidth[indexOfArraysWithSetAMaxWidth].push(selectedBox);
    //                     arrayLength -= selectedBox._scaledWidth;
    //                     singleArrayOfBoxes.splice(selectedBoxIndex, 1);
    //                 }
    //             }
    //         }
    //     }

    //     // Delete the last element(empty) of the array.
    //     // arraysWithSetAMaxWidth.splice(-1, 1);
    //     arraysWithSetAMaxWidth.pop();

    //     var arraysOfBoxesWithSameDepthAndMaxWidthFixed = arraysWithSetAMaxWidth;

    //     // Determ the exact width of each array and set the sizes of the box in level, according to the padding size between boxes.
    //     var widesteArray = 0;
    //     // Array of Array.
    //     for (let i = 0; i < arraysOfBoxesWithSameDepthAndMaxWidthFixed.length; i++) {
    //         var arrayWidthInLevel = 0;
    //         var arrayWidthInMatrix = 0;
    //         // Array with boxes.
    //         for (let i2 = 0; i2 < arraysOfBoxesWithSameDepthAndMaxWidthFixed[i].length; i2++) {

    //             // Create inside each box object the attribute size in level. 
    //             arraysOfBoxesWithSameDepthAndMaxWidthFixed[i][i2]._boxSizesInLevel = {};
    //             // Width and depth values based on padding between boxes. 
    //             arraysOfBoxesWithSameDepthAndMaxWidthFixed[i][i2]._boxSizesInLevel.width = arraysOfBoxesWithSameDepthAndMaxWidthFixed[i][i2]._scaledWidth + ((arraysOfBoxesWithSameDepthAndMaxWidthFixed[i][i2]._scaledWidth - 1) * BOX_PADDING_SIZE);
    //             arraysOfBoxesWithSameDepthAndMaxWidthFixed[i][i2]._boxSizesInLevel.depth = arraysOfBoxesWithSameDepthAndMaxWidthFixed[i][i2].depth + ((arraysOfBoxesWithSameDepthAndMaxWidthFixed[i][i2].depth - 1) * BOX_PADDING_SIZE);
    //             // Array width based on padding between boxes.
    //             arrayWidthInLevel += arraysOfBoxesWithSameDepthAndMaxWidthFixed[i][i2]._boxSizesInLevel.width + BOX_PADDING_SIZE;
    //             arrayWidthInMatrix += arraysOfBoxesWithSameDepthAndMaxWidthFixed[i][i2]._scaledWidth;
    //         }
    //         // Add an attribute to the array with the value of it's length.
    //         arraysOfBoxesWithSameDepthAndMaxWidthFixed[i]._arrayWidthInLevel = {};
    //         arraysOfBoxesWithSameDepthAndMaxWidthFixed[i]._arrayWidthInLevel = arrayWidthInLevel;
    //         arraysOfBoxesWithSameDepthAndMaxWidthFixed[i]._arrayWidthInMatrix = {};
    //         arraysOfBoxesWithSameDepthAndMaxWidthFixed[i]._arrayWidthInMatrix = arrayWidthInMatrix;

    //         // Find the wideste array.
    //         if (widesteArray < arraysOfBoxesWithSameDepthAndMaxWidthFixed[i]._arrayWidthInLevel) {
    //             widesteArray = arraysOfBoxesWithSameDepthAndMaxWidthFixed[i]._arrayWidthInLevel;
    //         }
    //     }

    //     // x_Axis in Level should be as big as the larger Array.
    //     var x_AxisInLevel = widesteArray;

    //     // If the width of an array is smaller than a given sum they are stored in a new array of arrays of small width.
    //     var smallerArrayWidth = ((x_AxisInLevel * 8) / 10);
    //     // Array with small arrays width.
    //     var arraysSmallWidth = [];
    //     for (let i = 0; i < arraysOfBoxesWithSameDepthAndMaxWidthFixed.length; i++) {
    //         if (arraysOfBoxesWithSameDepthAndMaxWidthFixed[i]._arrayWidthInLevel < smallerArrayWidth) {
    //             arraysSmallWidth.push(arraysOfBoxesWithSameDepthAndMaxWidthFixed[i]);
    //             arraysOfBoxesWithSameDepthAndMaxWidthFixed.splice(i, 1);
    //         }
    //     }
    //     // If there is some array with small width.
    //     if (arraysSmallWidth.length > 0) {

    //         // Sort the arrays of boxes by depth.
    //         arraysSmallWidth.sort((a, b) => {
    //             const depthOfA = a.depth;
    //             const depthOfB = b.depth;
    //             if (depthOfA < depthOfB) {
    //                 return 1;
    //             }
    //             if (depthOfA > depthOfB) {
    //                 return -1;
    //             }
    //             return 0;
    //         });

    //         if (sortType === "highToLow") {
    //             // Sort the arrays of boxes by height.
    //             arraysSmallWidth.sort((a, b) => {
    //                 const heightOfA = a.height;
    //                 const heightOfB = b.height;
    //                 if (heightOfA < heightOfB) {
    //                     return 1;
    //                 }
    //                 if (heightOfA > heightOfB) {
    //                     return -1;
    //                 }
    //                 return 0;
    //             });
    //         }
    //         else if (sortType === "highInCenter") {
    //             // Sort boxes by the height.
    //             arraysSmallWidth.sort((a, b) => {
    //                 const heightOfA = a.height;
    //                 const heightOfB = b.height;
    //                 if (heightOfA < heightOfB) {
    //                     return 1;
    //                 }
    //                 if (heightOfA > heightOfB) {
    //                     return -1;
    //                 }
    //                 return 0;
    //             });

    //             let arrayBoxen = [];
    //             for (let i = 0; i < arraysSmallWidth.length; i++) {
    //                 if (i % 2 === 0) {
    //                     arrayBoxen.push(arraysSmallWidth[i]);
    //                 } else {
    //                     arrayBoxen.unshift(arraysSmallWidth[i]);
    //                 }
    //             }

    //             arraysSmallWidth = arrayBoxen;
    //         }
    //         else if (sortType === "random") {
    //             // do nothing like default
    //         }

    //         var arraysOfBoxesWidthDifferentDepth = [];
    //         var indexOf = 0;
    //         var counterRestOfWidthSpace = x_AxisInLevel;
    //         arraysOfBoxesWidthDifferentDepth[indexOf] = [];

    //         // Assembling arrays of boxes with different depth.
    //         for (let i = 0; i < arraysSmallWidth.length; i++) {
    //             for (let i2 = 0; i2 < arraysSmallWidth[i].length; i2++) {

    //                 // Boxes that still fit the width of one array.
    //                 if (arraysSmallWidth[i][i2]._boxSizesInLevel.width <= counterRestOfWidthSpace) {
    //                     arraysOfBoxesWidthDifferentDepth[indexOf].push(arraysSmallWidth[i][i2]);
    //                     counterRestOfWidthSpace = counterRestOfWidthSpace - arraysSmallWidth[i][i2]._boxSizesInLevel.width;
    //                 }
    //                 // Boxes that should be placed in a new array. 
    //                 else {
    //                     indexOf++
    //                     arraysOfBoxesWidthDifferentDepth[indexOf] = [];
    //                     counterRestOfWidthSpace = x_AxisInLevel;
    //                     arraysOfBoxesWidthDifferentDepth[indexOf].push(arraysSmallWidth[i][i2])
    //                     counterRestOfWidthSpace = counterRestOfWidthSpace - arraysSmallWidth[i][i2]._boxSizesInLevel.width
    //                 }
    //             }
    //         }
    //         // Set the attribute of depth and width of each array
    //         for (let i = 0; i < arraysOfBoxesWidthDifferentDepth.length; i++) {
    //             var counterArrayDepthInLevel = 0;
    //             var counterArrayDepthInMatrix = 0;
    //             var counterArrayWidthInLevel = 0;
    //             for (let i2 = 0; i2 < arraysOfBoxesWidthDifferentDepth[i].length; i2++) {
    //                 if (i2 === 0) {
    //                     // Set depth
    //                     arraysOfBoxesWidthDifferentDepth[i]._arrayDepthInLevel = {};
    //                     arraysOfBoxesWidthDifferentDepth[i]._arrayDepthInLevel = arraysOfBoxesWidthDifferentDepth[i][i2].depth + ((arraysOfBoxesWidthDifferentDepth[i][i2].depth - 1));
    //                     arraysOfBoxesWidthDifferentDepth[i]._arrayDepthInMatrix = {};
    //                     arraysOfBoxesWidthDifferentDepth[i]._arrayDepthInMatrix = arraysOfBoxesWidthDifferentDepth[i][i2].depth;
    //                     counterArrayDepthInLevel = arraysOfBoxesWidthDifferentDepth[i][i2].depth + ((arraysOfBoxesWidthDifferentDepth[i][i2].depth - 1) * BOX_PADDING_SIZE);
    //                     counterArrayDepthInMatrix = arraysOfBoxesWidthDifferentDepth[i][i2].depth;
    //                 }
    //                 counterArrayWidthInLevel += arraysOfBoxesWidthDifferentDepth[i][i2]._boxSizesInLevel.width + BOX_PADDING_SIZE;
    //             }
    //             // Set width.
    //             arraysOfBoxesWidthDifferentDepth[i]._arrayWidthInLevel = {};
    //             arraysOfBoxesWidthDifferentDepth[i]._arrayWidthInLevel = counterArrayWidthInLevel;
    //         }
    //         // The spliced arrays are going to be back in the main array but in the bottom position.
    //         arraysOfBoxesWithSameDepthAndMaxWidthFixed.push(...arraysOfBoxesWidthDifferentDepth);
    //     }

    //     if (sortType === "highInCenter") {
    //         var newMainArray = [];
    //         for (let i = 0; i < arraysOfBoxesWithSameDepthAndMaxWidthFixed.length; i++) {
    //             arraysOfBoxesWithSameDepthAndMaxWidthFixed[i].sort((a, b) => {
    //                 const heightOfA = a.height;
    //                 const heightOfB = b.height;
    //                 if (heightOfA < heightOfB) {
    //                     return 1;
    //                 }
    //                 if (heightOfA > heightOfB) {
    //                     return -1;
    //                 }
    //                 return 0;
    //             });
    //             let arrayOfBoxen = [];
    //             for (let i2 = 0; i2 < arraysOfBoxesWithSameDepthAndMaxWidthFixed[i].length; i2++) {

    //                 if (i2 % 2 === 0) {
    //                     arrayOfBoxen.push(arraysOfBoxesWithSameDepthAndMaxWidthFixed[i][i2]);
    //                     arrayOfBoxen.push();
    //                 } else {
    //                     arrayOfBoxen.unshift(arraysOfBoxesWithSameDepthAndMaxWidthFixed[i][i2]);
    //                 }
    //             }
    //             newMainArray.push(arrayOfBoxen);
    //             newMainArray[i]._arrayDepthInLevel = {};
    //             newMainArray[i]._arrayDepthInLevel = arraysOfBoxesWithSameDepthAndMaxWidthFixed[i]._arrayDepthInLevel;
    //             newMainArray[i]._arrayDepthInMatrix = {};
    //             newMainArray[i]._arrayDepthInMatrix = arraysOfBoxesWithSameDepthAndMaxWidthFixed[i]._arrayDepthInMatrix;
    //             newMainArray[i]._arrayWidthInLevel = {};
    //             newMainArray[i]._arrayWidthInLevel = arraysOfBoxesWithSameDepthAndMaxWidthFixed[i]._arrayWidthInLevel;
    //             newMainArray[i]._arrayWidthInMatrix = {};
    //             newMainArray[i]._arrayWidthInMatrix = arraysOfBoxesWithSameDepthAndMaxWidthFixed[i]._arrayWidthInMatrix;

    //         }

    //         arraysOfBoxesWithSameDepthAndMaxWidthFixed = newMainArray;
    //     }

    //     // Determining the actual position of each arrays in the z-axis.
    //     var depthOfTheZAxisInLevel = 0;
    //     for (let i = 0; i < arraysOfBoxesWithSameDepthAndMaxWidthFixed.length; i++) {
    //         arraysOfBoxesWithSameDepthAndMaxWidthFixed[i]._arrayStartingPositionInMatrix = {};
    //         arraysOfBoxesWithSameDepthAndMaxWidthFixed[i]._arrayStartingPositionInLevel = {};
    //         // First array.
    //         if (i === 0) {
    //             arraysOfBoxesWithSameDepthAndMaxWidthFixed[i]._arrayStartingPositionInMatrix.x = 0;
    //             arraysOfBoxesWithSameDepthAndMaxWidthFixed[i]._arrayStartingPositionInMatrix.z = 0;

    //             arraysOfBoxesWithSameDepthAndMaxWidthFixed[i]._arrayStartingPositionInLevel.x = BOX_PADDING_SIZE;
    //             arraysOfBoxesWithSameDepthAndMaxWidthFixed[i]._arrayStartingPositionInLevel.z = BOX_PADDING_SIZE;
    //         }
    //         // All others.
    //         else {
    //             arraysOfBoxesWithSameDepthAndMaxWidthFixed[i]._arrayStartingPositionInMatrix.x = 0;
    //             arraysOfBoxesWithSameDepthAndMaxWidthFixed[i]._arrayStartingPositionInMatrix.z = arraysOfBoxesWithSameDepthAndMaxWidthFixed[i - 1]._arrayStartingPositionInMatrix.z + arraysOfBoxesWithSameDepthAndMaxWidthFixed[i]._arrayDepthInMatrix;

    //             arraysOfBoxesWithSameDepthAndMaxWidthFixed[i]._arrayStartingPositionInLevel.x = arraysOfBoxesWithSameDepthAndMaxWidthFixed[i - 1]._arrayStartingPositionInLevel.x;
    //             arraysOfBoxesWithSameDepthAndMaxWidthFixed[i]._arrayStartingPositionInLevel.z = arraysOfBoxesWithSameDepthAndMaxWidthFixed[i - 1]._arrayStartingPositionInLevel.z + arraysOfBoxesWithSameDepthAndMaxWidthFixed[i - 1]._arrayDepthInLevel + BOX_PADDING_SIZE;
    //         }
    //         depthOfTheZAxisInLevel = arraysOfBoxesWithSameDepthAndMaxWidthFixed[i]._arrayStartingPositionInLevel.z + arraysOfBoxesWithSameDepthAndMaxWidthFixed[i]._arrayDepthInLevel + BOX_PADDING_SIZE;
    //         depthOfTheZAxisInMatrix = arraysOfBoxesWithSameDepthAndMaxWidthFixed[i]._arrayStartingPositionInMatrix.z + arraysOfBoxesWithSameDepthAndMaxWidthFixed[i]._arrayDepthInMatrix;
    //     }

    //     // Set the sizes of the Level, will be useful in the fuction for positioning the levels.
    //     informationAboutBoxesOfOneLevel._sizesLevelInLevel = {};
    //     informationAboutBoxesOfOneLevel._sizesLevelInLevel.depth = depthOfTheZAxisInLevel;
    //     informationAboutBoxesOfOneLevel._sizesLevelInLevel.height = LAYER_DEFAULT_HEIGTH;
    //     informationAboutBoxesOfOneLevel._sizesLevelInLevel.width = x_AxisInLevel + BOX_PADDING_SIZE;

    //     // Determining the Position of the Boxes in Matrix and in Level
    //     for (let i = 0; i < arraysOfBoxesWithSameDepthAndMaxWidthFixed.length; i++) {
    //         for (let i2 = 0; i2 < arraysOfBoxesWithSameDepthAndMaxWidthFixed[i].length; i2++) {

    //             arraysOfBoxesWithSameDepthAndMaxWidthFixed[i][i2]._boxPositionInMatrix = {};
    //             arraysOfBoxesWithSameDepthAndMaxWidthFixed[i][i2]._boxPositionInLevel = {};
    //             // First box of the array.
    //             if (i2 === 0) {
    //                 arraysOfBoxesWithSameDepthAndMaxWidthFixed[i][i2]._boxPositionInMatrix.x = arraysOfBoxesWithSameDepthAndMaxWidthFixed[i]._arrayStartingPositionInMatrix.x;
    //                 arraysOfBoxesWithSameDepthAndMaxWidthFixed[i][i2]._boxPositionInMatrix.z = arraysOfBoxesWithSameDepthAndMaxWidthFixed[i]._arrayStartingPositionInMatrix.z;

    //                 arraysOfBoxesWithSameDepthAndMaxWidthFixed[i][i2]._boxPositionInLevel.x = BOX_PADDING_SIZE + arraysOfBoxesWithSameDepthAndMaxWidthFixed[i]._arrayStartingPositionInLevel.x;
    //                 arraysOfBoxesWithSameDepthAndMaxWidthFixed[i][i2]._boxPositionInLevel.z = BOX_PADDING_SIZE + arraysOfBoxesWithSameDepthAndMaxWidthFixed[i]._arrayStartingPositionInLevel.z;
    //             }
    //             // All others boxes. 
    //             else {
    //                 arraysOfBoxesWithSameDepthAndMaxWidthFixed[i][i2]._boxPositionInMatrix.x = arraysOfBoxesWithSameDepthAndMaxWidthFixed[i][i2 - 1]._boxPositionInMatrix.x + arraysOfBoxesWithSameDepthAndMaxWidthFixed[i][i2 - 1]._scaledWidth;
    //                 arraysOfBoxesWithSameDepthAndMaxWidthFixed[i][i2]._boxPositionInMatrix.z = arraysOfBoxesWithSameDepthAndMaxWidthFixed[i]._arrayStartingPositionInMatrix.z;

    //                 arraysOfBoxesWithSameDepthAndMaxWidthFixed[i][i2]._boxPositionInLevel.x = BOX_PADDING_SIZE + arraysOfBoxesWithSameDepthAndMaxWidthFixed[i][i2 - 1]._boxPositionInLevel.x + arraysOfBoxesWithSameDepthAndMaxWidthFixed[i][i2 - 1]._boxSizesInLevel.width;
    //                 arraysOfBoxesWithSameDepthAndMaxWidthFixed[i][i2]._boxPositionInLevel.z = BOX_PADDING_SIZE + arraysOfBoxesWithSameDepthAndMaxWidthFixed[i]._arrayStartingPositionInLevel.z;
    //             }
    //         }
    //     }
    // }
    // // // 
    // else {

    for (let i = 0; i < boxesInSingleLevel.length; i++) { // calculate the area of each box 
        const e = boxesInSingleLevel[i];
        if (e.color === undefined) {
            e.color = '#f5f5f5';
        }
        e.levelId = {};
        e.levelId = informationAboutBoxesOfOneLevel.level;
        const area = e.width * e.depth;
        e.area = {};
        e.area = area;
        const maxSide = Math.max(e.width, e.depth);
        e.maxSide = {};
        e.maxSide = maxSide;
    }

    // // temporarily Area is the respective of highToLow and random sortType
    // if (sortType === "highToLow") {
    //     boxesInSingleLevel.sort((a, b) => { // sort the boxes from the bigger 
    //         const areaOfA = a.area;
    //         const areaOfB = b.area;
    //         if (areaOfA < areaOfB) {
    //             return 1;
    //         }
    //         else if (areaOfA > areaOfB) {
    //             return -1;
    //         }
    //         else
    //             return 0;
    //     });
    // }

    // temporarily Maxside is the respective of highInCenter and random sortType
    if (sortType === "highInCenter" || sortType === "random" || sortType === "highToLow") {
        boxesInSingleLevel.sort((a, b) => { // sort the boxes from the bigger 
            const maxSideOfA = a.maxSide;
            const maxSideOfB = b.maxSide;
            if (maxSideOfA < maxSideOfB) {
                return 1;
            }
            else if (maxSideOfA > maxSideOfB) {
                return -1;
            }
            else
                return 0;
        });
    }

    const infoBoxesOneLevel = defineRectanglesPositions(boxesInSingleLevel, "boxes");

    return infoBoxesOneLevel;
    // }

}

exports.setBoxesPosition = setBoxesPosition;

