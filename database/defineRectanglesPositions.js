// const { LEVELS_PADDING_SIZE, BOX_PADDING_SIZE } = require('./constants');
const citymapConfiguration = require("../../../shared-utils/conf/citymap");

const LEVELS_PADDING_SIZE = citymapConfiguration.levelsPaddingSize;
const BOX_PADDING_SIZE = citymapConfiguration.boxPaddingSize;

// Funktion-Container für alle einzelnen Schritten um die Position des Boxen oder Level zu berechnen.
// Der erste übergebene Parameter ist entweder das Array der Boxen oder das Array von Level.
// Der zweite übergebene Parameter beschreibt den Typ des Rechtecks mit einem Wort (boxes oder levels).
const defineRectanglesPositions = (rectangles, rectangleType) => {
    
    var arrayOfRectanglesPositions = [];     // Alle Informationen über die bearbeiteten Rechtecke (Box oder Ebene) werden hier gespeichert.
    var arrayOfRectanglesContainer = [];     // Informationen über die Breite und Tiefe des bearbeiteten Rechteck-Containers.
    var arrayOfRectanglesData = [];     // Array, das die beiden vorherigen Arrays enthält.

    // Funktion, die jedes einzelne Rechteck bearbeitet und die von den nachfolgenden Funktion bearbeiteten Position darauf speichert.
    const toAssignThePositions = (rectangles, rectangleType) => {
        var rectangleObject = {}; // Wo das bearbeitete Rechteck zu speichern ist.
        var rectangle = {}; // Wo die verschiedenen Boxes oder Levels übergeben/durchlaufen werden.
        var node; // Knotenpunkt, an dem das Rechteck plaziert werden soll.
        var root; // Wurzel mit allen Knotenpunkten. 
        var len = rectangles.length;

        // Box oder Level, definiert die Maße für Breite und Tiefe des ersten Knotens.
        if (rectangleType === "boxes") {  
            var width = len > 0 ? rectangles[0]._scaledWidth : 0;
            var depth = len > 0 ? rectangles[0]._scaledDepth : 0;
            var padding_Size = BOX_PADDING_SIZE;
        }
        else if (rectangleType === "levels") {
            var width = len > 0 ? rectangles[0]._sizesLevelInLevel.width : 0;
            var depth = len > 0 ? rectangles[0]._sizesLevelInLevel.depth : 0;
            var padding_Size = LEVELS_PADDING_SIZE;
        }

        // Das Haupt Knot(die Wurzel) wird definiert.
        root = { x: 0, z: 0, width: width + padding_Size, depth: depth + padding_Size };

        // Schleife über alle übergebene Boxen oder Levels.
        for (let i = 0; i < len; i++) {
            // Box oder Level, das Recktecke erhält die Breite und Tiefe des entesprechenden Objeckts.
            if (rectangleType === "boxes") {
                rectangle.depth = rectangles[i]._scaledDepth;
                rectangle.width = rectangles[i]._scaledWidth;
            }
            else if (rectangleType === "levels") {
                rectangle.depth = rectangles[i]._sizesLevelInLevel.depth;
                rectangle.width = rectangles[i]._sizesLevelInLevel.width;
            }
            
            // Derzeitge  
            var rectangleElement = rectangles[i];
            
            // Suche nach einem bereits vorhandenen Knoten.
            node = findNode(root, rectangle.width + padding_Size, rectangle.depth + padding_Size);

            // Wenn der Knoten anders als null ist.
            if (node) {
                // Das Rechteck bekommt die Positionen und die Wurzel wird gleichzeitig aktualisiert mit die neue vorhandene Knoten.
                rectangle.pos = splitNode(node, rectangle.width + padding_Size, rectangle.depth + padding_Size);
                // Box oder Level, die berechneten Positionen weden in einem Objekt gespeichert und das Objekt wird einem Array hinzugefügt.
                if (rectangleType === "boxes") {
                    rectangleObject[i] = {
                        ...rectangleElement,
                        x: rectangle.pos.x,
                        z: rectangle.pos.z,
                    }
                    arrayOfRectanglesPositions.push(rectangleObject[i]);
                }

                else if (rectangleType === "levels") {
                    rectangleObject[i] = {
                        ...rectangleElement,
                        _levelPosition: { x: rectangle.pos.x, z: rectangle.pos.z }
                    };
                    arrayOfRectanglesPositions.push(rectangleObject[i]);
                }

            }
            // Falls der Knoten nicht vorhanden ist...
            else {
                // Es wird festgelegt, in welcher Richtung ein neuer Knoten angelegt werden soll.  
                var nodeAndRoot = growNode(root, rectangle.width + padding_Size, rectangle.depth + padding_Size);
                rectangle.pos = nodeAndRoot[0];
                root = nodeAndRoot[1];
                // Box oder Level, die berechneten Positionen weden in einem Objekt gespeichert und das Objekt wird einem Array hinzugefügt.
                if (rectangleType === "boxes") {
                    rectangleObject[i] = {
                        ...rectangleElement,
                        x: rectangle.pos.x,
                        z: rectangle.pos.z,
                    }
                    arrayOfRectanglesPositions.push(rectangleObject[i]);
                }

                else if (rectangleType === "levels") {
                    rectangleObject[i] = {
                        ...rectangleElement,
                        _levelPosition: { x: rectangle.pos.x, z: rectangle.pos.z }
                    };
                    arrayOfRectanglesPositions.push(rectangleObject[i]);
                }

            }
            // Als man das letzte Rechteck erreicht hat, kann man die gesamte Breite und Tiefe aller Rechtecken festlegen. 
            if (i === len - 1) {
                arrayOfRectanglesContainer = [root.width, root.depth];

            }
        }
    }

    // Suche nach ein Node die noch nicht benutzen ist
    const findNode = (root, width, depth) => { // Parameter sind: die Wurzel und die Tiefe und Breite des derzeitiges Rechteck. 
        // Falls der Knoten bereits verwendet wird,  beginnt eine rekursive Funktion mit der Suche nach einem unbenutzen Knoten, entweder nach rechts oder nach unten.
        if (root.used) { 
            const rightNodeFounded = findNode(root.right, width, depth);
            if (rightNodeFounded) {
                return rightNodeFounded;
            }
            const downNodeFounded = findNode(root.down, width, depth);
            return downNodeFounded;
        }
        // Wenn der Knoten nicht verwendet wird und die Breite und Tiefe des Rechtecks kleiner als der Knoten sind, wird der Knoten verwendet. 
        else if ((width <= root.width) && (depth <= root.depth)) { //
            return root;
        }
    
        return null; // Sonst übergibt null
    }

    // Der Knoten wird als bereits verwendet markiert und die ubrige Fläche wird in zwei unter Flächen geteilt,...
    const splitNode = (node, width, depth) => { 
        node.used = true;
        node.down = { x: node.x, z: node.z + depth, width: node.width, depth: node.depth - depth };
        node.right = { x: node.x + width, z: node.z, width: node.width - width, depth: depth };
        return node; // der gesamte Knoten wird zurückgegeben.
    }

    // Es wird festgelegt, in welcher Richtung ein neuer Knoten angelegt werden soll.
    const growNode = (root, width, depth) => {
        var node; // Knotenpunkt, an dem das Rechteck plaziert werden soll.
        
        // Die Variable ist nur definiert, wenn die Breite der Rechtecks kleiner/gleich der Breite des bisher bestimmten Bereichs ist.
        var canGrowDown = (width <= root.width); 
        // Die Variable ist nur definiert, wenn die Tiefe der Rechtecks kleiner/gleich der Tiefe des bisher bestimmten Bereichs ist.
        var canGrowRight = (depth <= root.depth); 
        
        // Um die quadratische Form beizuhalten,
        // Wird definiert nur wenn die Tiefe der bisher bestimmten Bereich hoher als die Breite der selber plus die Breite des derzeitiges Rechtecks.
        var shouldGrowRight = canGrowRight && (root.depth >= (root.width + width));
        // Wird definiert nur wenn die Breite der bisher bestimmten Bereich hoher als die Tiefe der selber plus die Tiefe des derzeitiges Rechtecks.
        var shouldGrowDown = canGrowDown && (root.width >= (root.depth + depth));
        
        // Die erste beide Versuche mit den Variablen, die versuchen, eine quadratische Form beizuhalten.
        if (shouldGrowRight) {
            node = growRight(root, width, depth);
            return node;
        }
        else if (shouldGrowDown) {
            node = growDown(root, width, depth);
            return node;
        }
        // Sonst es wird einfach erst nach rechts und dann nach unten versucht.
        else if (canGrowRight) {
            node = growRight(root, width, depth);
            return node;
        }
        else if (canGrowDown) {
            node = growDown(root, width, depth);
            return node;
        }

        return null; // need to ensure sensible root starting size to avoid this happening
    }

    // Wachstum nach recths.
    const growRight = (root, width, depth) => {
        var arrayOfNodeAndRoot = []; // array wo der Knoten und die Wurzel gespeichert wird.
        root = {
            used: true,
            x: 0,
            z: 0,
            width: root.width + width, // neue Wurzel Breite gleich: alte Wurzel Breite plus derzetiges Rechtecke Breite.
            depth: root.depth, 
            down: root,
            right: { x: root.width, z: 0, width: width, depth: root.depth } // Der neue rechtes Knoten wird definiert. 
        };
        if (node = findNode(root, width, depth)) {
            const rightSpace = splitNode(node, width, depth); // Der ubrige Bereich des rechtes Knoten wird berechnet.
            arrayOfNodeAndRoot.push(rightSpace, root); // Positionen und Maße des Knoten und der Wurzel werden in die Array gespeichert
            return arrayOfNodeAndRoot;
        }

        return null;
    }

    // Wachstum nach unten.
    const growDown = (root, width, depth) => {
        var arrayOfNodeAndRoot = []; // array wo der Knoten und die Wurzel gespeichert wird.
        root = {
            used: true,
            x: 0,
            z: 0,
            width: root.width,
            depth: root.depth + depth, // neue Wurzel Tiefe gleich: alte Wurzel Tiefe plus derzetiges Rechtecke Tiefe.
            down: { x: 0, z: root.depth, width: root.width, depth: depth }, // Der neue unten Knoten wird definiert.
            right: root
        };
        if (node = findNode(root, width, depth)) {
            const downSpace = splitNode(node, width, depth); // Der ubrige Bereich des unteres Knoten wird berechnet.
            arrayOfNodeAndRoot.push(downSpace, root); // Positionen und Maße des Knoten und der Wurzel werden in die Array gespeichert.
            return arrayOfNodeAndRoot;
        }
        return null;
    }

    toAssignThePositions(rectangles, rectangleType);    // Die Funktion wird aufgerufen.
    arrayOfRectanglesData.push(arrayOfRectanglesPositions, arrayOfRectanglesContainer);    // Alle Informationen bisher gesammelt werden in eine Array gespeichert.
    return arrayOfRectanglesData;    // Die Array wird zurückgegeben.
}

module.exports = defineRectanglesPositions;


