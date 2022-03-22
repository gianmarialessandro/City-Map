import React from 'react';
import citymapConfiguration from "../../shared-utils/conf/citymap";


// const BORDER_PADDING = 0.5;

/**
 * @description Sets the level and shadow level to be displayed.
 * @param {object} levels Information about the level.
 * @returns {object} levels (3-dimensional-level and 2-dimensional-shadow-level).
 */

const displayLevels = (levelsAndBoxesData, levelPosition, setActive, active, settings, shadows, boxesColored, levelsColored) => {
    let levelArray = [];
    var arrayColor = [];
    var stringColorArray = [];

    // loop through each levels
    for (let index = 0; index < levelsAndBoxesData.levels.length; index++) {
        var boxes = [];
        var shadowBoxes = [];
        var element = levelsAndBoxesData.levels[index];

        const sizeMainLevel = {
            x: levelsAndBoxesData._sizesMainLevel.width,
            z: levelsAndBoxesData._sizesMainLevel.depth
        }
        const position = {
            x: element._levelPosition.x + (element._sizesLevelInLevel.width / 2),
            y: levelPosition,
            z: element._levelPosition.z + (element._sizesLevelInLevel.depth / 2)
        }
        const size = {
            width: element._sizesLevelInLevel.width,
            height: element._sizesLevelInLevel.height,
            depth: element._sizesLevelInLevel.depth
        }
        var levelColor = {};
        if (levelsColored) {
            if (settings.environmentSettings["conf-entities"][element.level] === undefined) {
                levelColor = {
                    color: '#ffffff'
                }
            } else {
                levelColor = {
                    color: settings.environmentSettings["conf-entities"][element.level].color
                }
            }
        }
        else {
            levelColor = {
                color: '#ffffff'
            }
        }

        // loop through each boxes          
        for (let indexboxes = 0; indexboxes < element.boxes.length; indexboxes++) {
            const e = element.boxes[indexboxes];

            const positionBoxes = {
                x: e.x + (e._scaledWidth / 2) + citymapConfiguration.boxPaddingSize, //0.75,// e.x + (e.width / 2) + 0.5,//e._boxPositionInLevel.x + (e._boxSizesInLevel.depth / 2) - BORDER_PADDING,
                y: e._scaledHeight / 2 + 0.08,
                z: e.z + (e._scaledDepth / 2) + citymapConfiguration.boxPaddingSize//e.z + (e.depth / 2) + 0.5//e._boxPositionInLevel.z + (e._boxSizesInLevel.depth / 2) - BORDER_PADDING
            }
            const sizeBoxes = {
                width: e._scaledWidth, //e.width,//e._boxSizesInLevel.width,
                height: e._scaledHeight,//e._scaledHeight,
                depth: e._scaledDepth//e.depth//e._boxSizesInLevel.depth
            }

            if (e.colorDescription === undefined) {
                e.colorDescription = "unknown"
            }

            const colorBoxes = {};
            if (boxesColored) {
                colorBoxes.color = e.color;
                colorBoxes.description = e.colorDescription;
            }
            else {
                colorBoxes.color = '#f5f5f5';
                colorBoxes.description = e.colorDescription;
            }

            const information = {
                boxId: e.boxId,
                boxName: e.boxName,
                lastChangeInHours: e.height + " (total changes)",
                width: e.width + "(fix)",
                depth: e.depth + "(fix)",
                levelId: e.levelId,
                color: e.color,

            }

            if (!stringColorArray.includes(e.color)) {
                stringColorArray.push(e.color);
                arrayColor.push(<ColorLegende color={colorBoxes} key={indexboxes} />);
            }

            boxes.push(
                <Box position={positionBoxes} size={sizeBoxes} color={colorBoxes} positionInLevel={size} information={information} key={indexboxes} setActive={setActive} active={active} />
            );
            if (shadows) {
                shadowBoxes.push(
                    <ShadowBox position={positionBoxes} size={sizeBoxes} color={colorBoxes} positionInLevel={size} key={indexboxes} />
                );
            }
        }

        levelArray.push(
            <Level position={position} size={size} sizeMainLevel={sizeMainLevel} key={index} color={levelColor} data={element} settings={settings} allColorsOfBoxes={arrayColor}>
                {boxes}
                {shadowBoxes}
            </Level>);
        if (shadows) {
            levelArray.push(
                <ShadowLevel position={position} size={size} sizeMainLevel={sizeMainLevel} key={(levelsAndBoxesData.levels.length + 1) + index} />
            );
        }
    }

    return { levels: levelArray, legends: arrayColor };
}

function Level({ position, size, sizeMainLevel, color, children, data, settings }) {
    // const levelEntityColor = settings.environmentSettings["conf-entities"][data.level].color;

    return (
        <mesh
            position={[position.x - (sizeMainLevel.x / 2), position.y, position.z - (sizeMainLevel.z / 2)]}
        >
            <boxGeometry args={[size.width, size.height, size.depth]} />
            <meshStandardMaterial
                // color={levelEntityColor}
                color={color.color}
                metalness={0.7}
                roughness={0.7}
            />
            {children}
        </mesh>
    );
}

function Box({ position, size, color, positionInLevel, information, setActive, active, showShadow = true }) {
    // function that set the clicked box in active(so it will be coulored) and avoid to propagation of the clicked box on other box in the same trajectory
    const handleCLick = (event) => {
        event.stopPropagation();
        setActive(information);
    };
    return (
        <>
            <mesh
                position={[(position.x + (-positionInLevel.width / 2)), position.y, (position.z + (- positionInLevel.depth / 2))]}
                onClick={handleCLick}
            >
                <boxGeometry args={[size.width, size.height, size.depth]} />
                <meshStandardMaterial
                    color={active && active.boxId === information.boxId && active.levelId === information.levelId ? "#ff0000" : color.color }
                    // metalness={0.2}
                    // roughness={0.5}
                />
            </mesh>
        </>
    );
}

function ShadowBox({ position, size, positionInLevel }) {
    return (
        <mesh
            castShadow={true}
            receiveShadow={true}
            position={[(position.x + (-positionInLevel.width / 2)), position.y, (position.z + (- positionInLevel.depth / 2))]}
        >
            <boxGeometry args={[size.width + 0.01, size.height + 0.01, size.depth + 0.01]} />
            <shadowMaterial opacity={0.075} />
        </mesh>
    );
}

function ShadowLevel({ position, size, sizeMainLevel }) {
    return (
        <mesh
            position={[position.x - (sizeMainLevel.x / 2), position.y + 0.09, position.z - (sizeMainLevel.z / 2)]}
            rotation={[-Math.PI / 2, 0, 0]}
            castShadow={true}
            receiveShadow={true}
        >
            <planeGeometry args={[size.width, size.depth]} />
            <shadowMaterial opacity={0.075} />
        </mesh>
    );
}

function ColorLegende({ color }) {
    return (
        <>
            <div className='KeyValue'>
                <div className='KeyValue-Key' >
                    <span className='ColorLegend' style={{ backgroundColor: color.color }}></span>
                </div>
                <div>
                    <div className='KeyValue-Value descriptionWidth'>{color.description}</div>
                </div>
            </div>
        </>
    )
}

export default displayLevels;
