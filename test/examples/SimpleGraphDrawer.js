/* Simple drawing utilities for ELK graphs.
 *
 * Author: Steve Kieffer
 */

const ShapeCoordModes = {
    PARENT: 'PARENT', ROOT: 'ROOT'
};

const EdgeCoordModes = {
    CONTAINER: 'CONTAINER', PARENT: 'PARENT', ROOT: 'ROOT'
};


/* Draws ELK graphs given in JSON format as SVG.
 *
 * Constructing
 * ------------
 *
 * When constructing, you can set graphical styles for nodes, edges, etc.
 * See `constructor()` method.
 *
 * You should also say which of ELK's shape and edge coordinate modes
 * to use (i.e. you must make sure this matches the JSON graphs you're going to ask it to
 * draw). Only a single, global coordinate setting for the whole graph is supported, so
 * if your graph uses different coordinate systems at different points, you can't use this
 * class to draw it.
 *
 * Drawing
 * -------
 *
 * To draw a graph `g` (in ELK JSON format), pass `g` to your instance's `draw()` method.
 * The return value is an instance `s` of the `SvgDrawing` class (see below).
 *
 * You can use the returned `SvgDrawing` instance `s` to do further drawing manually if you want.
 * For that you can use its methods, or access its svg element `s.svg` directly.
 * You can use `s.addTo()` to add the svg element to a web page.
 */
class SimpleGraphDrawer {

    constructor({
        nodeStyle = {stroke: "black", fill: "none"},
        edgeStyle = {stroke: "black", "stroke-width": 1},
        portStyle = {stroke: "black", fill: "black"},
        /* When using monospace 16, a good rule for labels is to use height 20,
        *  and width 10n + 2, where the text is n letters long. */
        labelStyle = {"font-family": "monospace", "font-size": 16},
        shapeCoordMode = ShapeCoordModes.PARENT,
        edgeCoordMode = EdgeCoordModes.CONTAINER,
        arrowHeadLength = 8,
        // arrowHeadFill will default to equal edgeStyle.stroke, giving "solid" arrowheads.
        // If you want "open" arrowheads, then set this to 'none'.
        arrowHeadFill = null,
    }) {
        this.nodeStyle = nodeStyle;
        this.edgeStyle = Object.assign(edgeStyle, {fill: 'none'});
        this.portStyle = portStyle;
        this.labelStyle = labelStyle;
        this.shapeCoordMode = shapeCoordMode;
        this.edgeCoordMode = edgeCoordMode;
        this.arrowHeadLength = arrowHeadLength;

        if (arrowHeadFill === null) {
            arrowHeadFill = edgeStyle.stroke;
        }
        this.arrowHeadStyle = Object.assign(Object.assign({}, this.edgeStyle), {fill: arrowHeadFill});

        this.reset()
    }

    reset() {
        this.svg = null;

        // Map node IDs to global coords:
        this.globalCoords = new Map();

        // Sequence of IDs of nodes we are currently inside of:
        this.currentPath = [];

        this.currentEdge = null;

        // The global coordinates of the node we are currently inside of:
        this.x0 = 0;
        this.y0 = 0;
    }

    draw(root) {
        this.reset()
        this.svg = new SvgDrawing(root.width, root.height);
        this.drawNode(root)
        return this.svg;
    }

    getShapeShift() {
        let dv;
        switch (this.shapeCoordMode) {
            case ShapeCoordModes.PARENT:
                dv = [this.x0, this.y0];
                break;
            case ShapeCoordModes.ROOT:
                dv = [0, 0];
                break;
            default:
                throw "Unknown shape coord mode: " + this.shapeCoordMode;
        }
        return dv;
    }

    getEdgeShift() {
        let dv;
        switch (this.edgeCoordMode) {
            case EdgeCoordModes.CONTAINER:
                const id = this.currentEdge.container;
                dv = this.globalCoords.get(id);
                break;
            case EdgeCoordModes.PARENT:
                dv = [this.x0, this.y0];
                break;
            case EdgeCoordModes.ROOT:
                dv = [0, 0];
                break;
            default:
                throw 'Unknown edge coord mode: ' + this.edgeCoordMode;
        }
        return dv;
    }

    drawRectangle(r, style) {
        const [dx, dy] = this.getShapeShift();
        this.svg.rect(r.x + dx, r.y + dy, r.width, r.height, style);
    }

    enterRectangle(r) {
        this.currentPath.push(r.id);
        if (this.shapeCoordMode === ShapeCoordModes.PARENT) {
            this.x0 += r.x;
            this.y0 += r.y;
        } else {
            this.x0 = r.x;
            this.y0 = r.y;
        }
        this.globalCoords.set(r.id, [this.x0, this.y0]);
    }

    exitRectangle() {
        this.currentPath.pop();
        const n = this.currentPath.length;
        if (n > 0) {
            const id = this.currentPath[n-1];
            const p = this.globalCoords.get(id);
            this.x0 = p[0];
            this.y0 = p[1];
        } else {
            this.x0 = 0;
            this.y0 = 0;
        }
    }

    drawNode(node) {
        this.drawRectangle(node, this.nodeStyle);
        this.enterRectangle(node);

        for (const port of (node.ports || [])) {
            this.drawPort(port);
        }

        for (const edge of (node.edges || [])) {
            this.drawEdge(edge);
        }

        for (const label of (node.labels || [])) {
            this.drawLabel(label);
        }

        for (const child of (node.children || [])) {
            this.drawNode(child);
        }

        this.exitRectangle()
    }

    drawPort(port) {
        this.drawRectangle(port, this.portStyle);
        this.enterRectangle(port);

        for (const label of (port.labels || [])) {
            this.drawLabel(label);
        }

        this.exitRectangle();
    }

    drawLabel(label) {
        const [dx, dy] = this.currentEdge ? this.getEdgeShift() : this.getShapeShift();
        this.svg.text(
            label.x + dx, label.y + dy,
            label.width, label.height,
            label.text, this.labelStyle
        );
    }

    drawEdge(edge) {
        this.currentEdge = edge;

        const sections = edge.sections || [];
        const n = sections.length;
        for (let i = 0; i < n; i++) {
            const section = sections[i];
            this.drawEdgeSection(section, i === n - 1);
        }

        for (const label of (edge.labels || [])) {
            this.drawLabel(label);
        }

        this.currentEdge = null;
    }

    drawEdgeSection(section, drawArrowHead) {
        const [dx, dy] = this.getEdgeShift();

        const points = [];

        function addPoint(point) {
            points.push([point.x + dx, point.y + dy]);
        }

        addPoint(section.startPoint);

        for (const bp of (section.bendPoints || [])) {
            addPoint(bp);
        }

        addPoint(section.endPoint);

        this.svg.polyline(points, this.edgeStyle);

        if (drawArrowHead) {
            const n = points.length;
            const p = points[n-2];
            const q = points[n-1];
            this.svg.arrowHead(p, q, this.arrowHeadLength, this.arrowHeadStyle);
        }
    }

}


/* A simple SVG drawer class.
 */
class SvgDrawing {

    constructor(W, H) {
        this.namespace = "http://www.w3.org/2000/svg";
        this.svg = this.makeElement('svg', {
            xmlns: this.namespace,
            version: "1.1",
            "xmlns:xlink": "http://www.w3.org/1999/xlink",
            width: W,
            height: H
        });
    }

    makeElement(tag, attrs) {
        const elt = document.createElementNS(this.namespace, tag);
        for (const [k, v] of Object.entries(attrs)) {
            elt.setAttribute(k, v);
        }
        return elt;
    }

    addElement(tag, attrs) {
        const elt = this.makeElement(tag, attrs)
        this.svg.appendChild(elt);
        return elt;
    }

    addTo(element) {
        element.appendChild(this.svg);
    }

    rect(x, y, w, h, style) {
        const tag = 'rect';
        const attrs = Object.assign(style, {
            x: x, y: y, width: w, height: h
        });
        this.addElement(tag, attrs);
    }

    /*
     * pointsArray: array of pairs (arrays) of numbers
     */
    polyline(pointsArray, style) {
        const tag = 'polyline';
        const points = pointsArray.map(q => q.join(',')).join(' ');
        const attrs = Object.assign(style, {points});
        this.addElement(tag, attrs);
    }

    /* p and q are two points (length-2 arrays of numbers)
     * We draw an arrowhead at q, for a line from p to q.
     * The sides of the arrowhead will have length L.
     */
    arrowHead(p, q, L, style) {
        const v0x = p[0] - q[0];
        const v0y = p[1] - q[1];
        const M = Math.sqrt(v0x*v0x + v0y*v0y);

        const v1x = v0x * L/M;
        const v1y = v0y * L/M;

        const sr3 = Math.sqrt(3);

        const v2x = (v1x*sr3 - v1y)/2;
        const v2y = (v1x + v1y*sr3)/2;

        const v3x = (v1x*sr3 + v1y)/2;
        const v3y = (-v1x + v1y*sr3)/2;

        const s = [q[0] + v2x, q[1] + v2y];
        const t = [q[0] + v3x, q[1] + v3y];

        this.polyline([s, q, t], style);
    }

    /* Pass the upper-left corner and dimensions of the box you
     * want the text to fit into. The text will be centered in this
     * box, in both dimensions.
     */
    text(x0, y0, width, height, text, style) {
        const tag = 'text';
        const x1 = x0 + width/2;
        const y1 = y0 + height/2;
        const attrs = Object.assign(style, {
            x: x1, y: y1,
            'text-anchor': 'middle',
            'dominant-baseline': 'middle'
        });
        const elt = this.addElement(tag, attrs);
        elt.appendChild(document.createTextNode(text));
    }

}
