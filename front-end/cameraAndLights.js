// Camera position
/**
 * @description set the right position of the camera in relation with the number of building
 * @param {number} levelPosition
 * @returns {object} coordinate of x, y, z for the position of the Camera
 */
const getCameraAndLights = (levelsAndBoxesData) => {
    const levelWidth = levelsAndBoxesData._sizesMainLevel.width;
    const levelDepth = levelsAndBoxesData._sizesMainLevel.depth;
    // console.log("depth", levelDepth)
    // console.log("width", levelWidth)

    // find highest box
    var heightesBox = 0;
    for (let i = 0; i < levelsAndBoxesData.levels.length; i++) {
        var singleBoxes = levelsAndBoxesData.levels[i].boxes;

        for (let i = 0; i < singleBoxes.length; i++) {
            if (heightesBox < singleBoxes[i]._scaledHeight) {
                heightesBox = singleBoxes[i]._scaledHeight;
            }
        }
    }

    if (heightesBox > 60 && levelDepth < 129) {
        return ({
            position: { x: 70, y: 95, z: 70 },
            levelPosition: -45,
            ambientLight: 0.7,
            directionalLightOne: 0.8,
            directionalLightTwo: 0.6,
            directionalLightThree: 0.8,
            directionalLightOnePosition: { x: -30, y: 70, z: 30 },
            directionalLightTwoPosition: { x: 0, y: 85, z: 0 },
            directionalLightThreePosition: { x: 30, y: 70, z: 30 },
            sizes: { width: levelWidth, depth: levelDepth }

        })
    }
    else if (levelDepth >= 130 && levelDepth <= 229 ) {
        return ({
            position: { x: 190, y: 100, z: 150 },
            levelPosition: -45,
            ambientLight: 0.7,
            directionalLightOne: 0.8,
            directionalLightTwo: 0.6,
            directionalLightThree: 0.8,
            directionalLightOnePosition: { x: -30, y: 70, z: 30 },
            directionalLightTwoPosition: { x: 0, y: 85, z: 0 },
            directionalLightThreePosition: { x: 30, y: 70, z: 30 },
            sizes: { width: levelWidth, depth: levelDepth }

        })
    }
    else if (heightesBox > 60 && levelDepth >= 230 && levelDepth < 300) {
        return ({
            position: { x: 130, y: 20, z: 120 },
            levelPosition: -45,
            ambientLight: 0.7,
            directionalLightOne: 0.8,
            directionalLightTwo: 0.6,
            directionalLightThree: 0.8,
            directionalLightOnePosition: { x: -30, y: 70, z: 30 },
            directionalLightTwoPosition: { x: 0, y: 85, z: 0 },
            directionalLightThreePosition: { x: 30, y: 70, z: 30 },
            sizes: { width: levelWidth, depth: levelDepth }

        })
    }
    else if (heightesBox > 60 && levelDepth >= 300) {
        return ({
            position: { x: 180, y: 20, z: 300 },
            levelPosition: -45,
            ambientLight: 0.7,
            directionalLightOne: 0.8,
            directionalLightTwo: 0.6,
            directionalLightThree: 0.8,
            directionalLightOnePosition: { x: -30, y: 70, z: 30 },
            directionalLightTwoPosition: { x: 0, y: 85, z: 0 },
            directionalLightThreePosition: { x: 30, y: 70, z: 30 },
            sizes: { width: levelWidth, depth: levelDepth }

        })
    }
    else if (heightesBox <= 60 && heightesBox > 30 && levelDepth < 50) {
        return ({
            position: { x: 35, y: 20, z: 35 },
            levelPosition: -10,
            ambientLight: 0.7,
            directionalLightOne: 0.8,
            directionalLightTwo: 0.6,
            directionalLightThree: 0.8,
            directionalLightOnePosition: { x: -30, y: 70, z: 30 },
            directionalLightTwoPosition: { x: 0, y: 85, z: 0 },
            directionalLightThreePosition: { x: 30, y: 70, z: 30 },
            sizes: { width: levelWidth, depth: levelDepth }

        })
    }
    else if (heightesBox <= 60 && heightesBox > 30 && levelDepth < 150 && levelDepth >= 50) {
        return ({
            position: { x: 76, y: 50, z: 75 },
            levelPosition: -10,
            ambientLight: 0.7,
            directionalLightOne: 0.8,
            directionalLightTwo: 0.6,
            directionalLightThree: 0.8,
            directionalLightOnePosition: { x: -30, y: 70, z: 30 },
            directionalLightTwoPosition: { x: 0, y: 85, z: 0 },
            directionalLightThreePosition: { x: 30, y: 70, z: 30 },
            sizes: { width: levelWidth, depth: levelDepth }

        })
    }
    else if (heightesBox <= 60 && heightesBox > 30 && levelDepth < 250 && levelDepth >= 150) {
        return ({
            position: { x: 55, y: 20, z: 75 },
            levelPosition: -10,
            ambientLight: 0.7,
            directionalLightOne: 0.9,
            directionalLightTwo: 0.6,
            directionalLightThree: 0.9,
            directionalLightOnePosition: { x: -30, y: 70, z: 30 },
            directionalLightTwoPosition: { x: 0, y: 85, z: 0 },
            directionalLightThreePosition: { x: 30, y: 70, z: 30 },
            sizes: { width: levelWidth, depth: levelDepth }

        })
    }
    else if (heightesBox <= 60 && heightesBox > 30 && levelDepth >= 250) {
        return ({
            position: { x: 90, y: 20, z: 100 },
            levelPosition: -10,
            ambientLight: 0.7,
            directionalLightOne: 0.8,
            directionalLightTwo: 0.6,
            directionalLightThree: 0.8,
            directionalLightOnePosition: { x: -30, y: 70, z: 30 },
            directionalLightTwoPosition: { x: 0, y: 85, z: 0 },
            directionalLightThreePosition: { x: 30, y: 70, z: 30 },
            sizes: { width: levelWidth, depth: levelDepth }

        })
    }
    else if (heightesBox <= 30 && heightesBox > 1 && levelDepth < 50 && levelDepth >= 10) {
        return ({
            position: { x: 25, y: 20, z: 25 },
            levelPosition: -5,
            ambientLight: 0.7,
            directionalLightOne: 0.8,
            directionalLightTwo: 0.6,
            directionalLightThree: 0.8,
            directionalLightOnePosition: { x: -30, y: 70, z: 30 },
            directionalLightTwoPosition: { x: 0, y: 85, z: 0 },
            directionalLightThreePosition: { x: 30, y: 70, z: 30 },
            sizes: { width: levelWidth, depth: levelDepth }

        })
    }
    else if (heightesBox <= 30 && levelDepth < 150 && levelDepth >= 50) {
        return ({
            position: { x: 70, y: 55, z: 70 },
            levelPosition: -5,
            ambientLight: 0.7,
            directionalLightOne: 0.8,
            directionalLightTwo: 0.6,
            directionalLightThree: 0.8,
            directionalLightOnePosition: { x: -30, y: 70, z: 30 },
            directionalLightTwoPosition: { x: 0, y: 85, z: 0 },
            directionalLightThreePosition: { x: 30, y: 70, z: 30 },
            sizes: { width: levelWidth, depth: levelDepth }

        })
    }
    else if (heightesBox <= 30 && levelDepth < 250 && levelDepth >= 150) {
        return ({
            position: { x: 45, y: 20, z: 75 },
            levelPosition: -5,
            ambientLight: 0.7,
            directionalLightOne: 0.8,
            directionalLightTwo: 0.6,
            directionalLightThree: 0.8,
            directionalLightOnePosition: { x: -30, y: 70, z: 30 },
            directionalLightTwoPosition: { x: 0, y: 85, z: 0 },
            directionalLightThreePosition: { x: 30, y: 70, z: 30 },
            sizes: { width: levelWidth, depth: levelDepth }

        })
    }
    else if (heightesBox <= 30 && levelDepth >= 250) {
        return ({
            position: { x: 90, y: 20, z: 120 },
            levelPosition: -10,
            ambientLight: 0.7,
            directionalLightOne: 0.8,
            directionalLightTwo: 0.6,
            directionalLightThree: 0.8,
            directionalLightOnePosition: { x: -30, y: 70, z: 30 },
            directionalLightTwoPosition: { x: 0, y: 85, z: 0 },
            directionalLightThreePosition: { x: 30, y: 70, z: 30 },
            sizes: { width: levelWidth, depth: levelDepth }

        })
    }
    else if (heightesBox <= 30 && heightesBox > 1 && levelDepth <= 50 && levelDepth >= 1) {
        return ({
            position: { x: 3, y: 5, z: 10 },
            levelPosition: -5,
            ambientLight: 0.7,
            directionalLightOne: 0.8,
            directionalLightTwo: 0.6,
            directionalLightThree: 0.8,
            directionalLightOnePosition: { x: -30, y: 70, z: 30 },
            directionalLightTwoPosition: { x: 0, y: 85, z: 0 },
            directionalLightThreePosition: { x: 30, y: 70, z: 30 },
            sizes: { width: levelWidth, depth: levelDepth }

        })
    }

    else {
        return ({
            position: { x: 3, y: 5, z: 5 },
            levelPosition: 0,
            ambientLight: 0.3,
            directionalLightOne: 0.75,
            directionalLightTwo: 0.4,
            directionalLightThree: 0.75,
            directionalLightOnePosition: { x: -30, y: 70, z: 30 },
            directionalLightTwoPosition: { x: 0, y: 85, z: 0 },
            directionalLightThreePosition: { x: 30, y: 70, z: 30 },
            sizes: { width: levelWidth, depth: levelDepth }

        })
    }
}

export default getCameraAndLights;