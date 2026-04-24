/*******************************************************************************
 * Copyright (c) 2019 TypeFox and others.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 *******************************************************************************/

/**
 * ELK Layout Options with descriptions based on https://www.eclipse.org/elk/reference/options.html
 */
export interface LayoutOptions {
    /** This penalty is applied in its full amount to tight acute bends in the connector path. A smaller portion of the penalty is applied for slight bends, i.e., where the bend is close to 180 degrees. This is useful for polyline routing where there is some evidence that tighter corners are worse for readability, but that slight bends might not be so bad, especially when smoothed by curves. */
    "elk.alg.libavoid.anglePenalty"?: string;

    /** Spacing between pairs of ports of the same node. */
    "elk.spacing.portConnection"?: string;

    /** This penalty is applied whenever a connector path crosses a cluster boundary. */
    "elk.alg.libavoid.clusterCrossingPenalty"?: string;

    /** This penalty is applied whenever a connector path crosses another connector path. It takes shared paths into consideration and the penalty is only applied if there is an actual crossing. */
    "elk.alg.libavoid.crossingPenalty"?: string;

    /** This option enables a post-processing step that creates hyperedges for all edges with the same source. Be aware that this step will significantly decrease performance. */
    "elk.alg.libavoid.enableHyperedgesFromCommonSource"?: string;

    /** This penalty is applied whenever a connector path shares some segments with an immovable portion of an existing connector route (such as the first or last segment of a connector). */
    "elk.alg.libavoid.fixedSharedPathPenalty"?: string;

    /** This parameter defines the spacing distance that will be used for nudging apart overlapping corners and line segments of connectors. */
    "elk.alg.libavoid.idealNudgingDistance"?: string;

    /** This option causes hyperedge routes to be locally improved fixing obviously bad paths. It can cause junctions and connectors to be added or removed from hyperedges. As part of this process libavoid will effectively move junctions by setting new ideal positions for each remaining or added junction. If set, this option overrides the improveHyperedgeRoutesMovingJunctions option. */
    "elk.alg.libavoid.improveHyperedgeRoutesMovingAddingAndDeletingJunctions"?: string;

    /** This option causes hyperedge routes to be locally improved fixing obviously bad paths. As part of this process libavoid will effectively move junctions, setting new ideal positions for each junction. */
    "elk.alg.libavoid.improveHyperedgeRoutesMovingJunctions"?: string;

    /** This option marks a node as a cluster, resulting in its children being handled as relative to the graph itself while the marked node is only added as a cluster. Note that clusters are experimental and can therefore have a negative impact on performance. The cluster node cannot have: - clusters as children - outgoing or incoming connections (directly to the node) - ports Edges into or out of the cluster must be added across the cluster’s borders, without the use of hierarchical ports. */
    "elk.alg.libavoid.isCluster"?: string;

    /** This option causes the final segments of connectors, which are attached to shapes, to be nudged apart. Usually these segments are fixed, since they are considered to be attached to ports. */
    "elk.alg.libavoid.nudgeOrthogonalSegmentsConnectedToShapes"?: string;

    /** This option can be used to control whether colinear line segments that touch just at their ends will be nudged apart. The overlap will usually be resolved in the other dimension, so this is not usually required. */
    "elk.alg.libavoid.nudgeOrthogonalTouchingColinearSegments"?: string;

    /** This option determines whether intermediate segments of connectors that are attached to common endpoints will be nudged apart. Usually these segments get nudged apart, but you may want to turn this off if you would prefer that entire shared paths terminating at a common end point should overlap. */
    "elk.alg.libavoid.nudgeSharedPathsWithCommonEndPoint"?: string;

    /** This option penalises and attempts to reroute orthogonal shared connector paths terminating at a common junction or shape connection pin. When multiple connector paths enter or leave the same side of a junction (or shape pin), the router will attempt to reroute these to different sides of the junction or different shape pins. This option depends on the fixedSharedPathPenalty penalty having been set. */
    "elk.alg.libavoid.penaliseOrthogonalSharedPathsAtConnEnds"?: string;

    /** This option can be used to control whether the router performs a preprocessing step before orthogonal nudging where is tries to unify segments and centre them in free space. This generally results in better quality ordering and nudging. */
    "elk.alg.libavoid.performUnifyingNudgingPreprocessingStep"?: string;

    /** This penalty is applied to port selection choice when the other end of the connector being routed does not appear in any of the 90 degree visibility cones centered on the visibility directions for the port. */
    "elk.alg.libavoid.portDirectionPenalty"?: string;

    /** Default timeout for waiting for the libavoid server to give some output. This option is read from the root of the graph. */
    "elk.alg.libavoid.processTimeout"?: string;

    /** This penalty is applied whenever a connector path travels in the direction opposite of the destination from the source endpoint. By default this penalty is set to zero. This shouldn’t be needed in most cases but can be useful if you use penalties such as crossingPenalty which cause connectors to loop around obstacles. */
    "elk.alg.libavoid.reverseDirectionPenalty"?: string;

    /** This penalty is applied for each segment in the connector path beyond the first. This should always normally be set when doing orthogonal routing to prevent step-like connector paths. */
    "elk.alg.libavoid.segmentPenalty"?: string;

    /** This parameter defines the spacing distance that will be added to the sides of each shape when determining obstacle sizes for routing. This controls how closely connectors pass shapes, and can be used to prevent connectors overlapping with shape boundaries. */
    "elk.alg.libavoid.shapeBufferDistance"?: string;

    /** Select a specific layout algorithm. */
    "elk.algorithm"?: string;

    /** Alignment of the selected node relative to other nodes; the exact meaning depends on the used algorithm. */
    "elk.alignment"?: string;

    /** Whether the shift from the old layout to the new computed layout shall be animated. */
    "elk.animate"?: string;

    /** Factor for computation of animation time. The higher the value, the longer the animation time. If the value is 0, the resulting time is always equal to the minimum defined by ‘Minimal Animation Time’. */
    "elk.animTimeFactor"?: string;

    /** The desired aspect ratio of the drawing, that is the quotient of width by height. */
    "elk.aspectRatio"?: string;

    /** A fixed list of bend points for the edge. This is used by the ‘Fixed Layout’ algorithm to specify a pre-defined routing for an edge. The vector chain must include the source point, any bend points, and the target point, so it must have at least two points. */
    "elk.bendPoints"?: string;

    /** Configures the packing mode used by the {@link BoxLayoutProvider}. If SIMPLE is not required (neither priorities are used nor the interactive mode), GROUP_DEC can improve the packing and decrease the area. GROUP_MIXED and GROUP_INC may, in very specific scenarios, work better. */
    "elk.box.packingMode"?: string;

    /** The height of the area occupied by the laid out children of a node. */
    "elk.childAreaHeight"?: string;

    /** The width of the area occupied by the laid out children of a node. */
    "elk.childAreaWidth"?: string;

    /** Whether the node should be regarded as a comment box instead of a regular node. In that case its placement should be similar to how labels are handled. Any edges incident to a comment box specify to which graph elements the comment is related. */
    "elk.commentBox"?: string;

    /** This option defines how the compaction is applied. */
    "elk.compaction.compactionStrategy"?: string;

    /** Restricts the translation of nodes to orthogonal directions in the compaction phase. */
    "elk.compaction.orthogonal"?: string;

    /** Specifies how the content of a node are aligned. Each node can individually control the alignment of its contents. I.e. if a node should be aligned top left in its parent node, the parent node should specify that option. */
    "elk.contentAlignment"?: string;

    /** Whether additional debug information shall be generated. */
    "elk.debugMode"?: string;

    /** Overall direction of edges: horizontal (right / left) or vertical (down / up). */
    "elk.direction"?: string;

    /** A layout algorithm that is to be applied to each connected component before the components themselves are compacted. If unspecified, the positions of the components’ nodes are not altered. */
    "elk.disco.componentCompaction.componentLayoutAlgorithm"?: string;

    /** Strategy for packing different connected components in order to save space and enhance readability of a graph. */
    "elk.disco.componentCompaction.strategy"?: string;

    /** Access to the DCGraph is intended for the debug view, */
    "elk.disco.debug.discoGraph"?: string;

    /** Access to the polyominoes is intended for the debug view, */
    "elk.disco.debug.discoPolys"?: string;

    /** The thickness of an edge. This is a hint on the line width used to draw an edge, possibly requiring more space to be reserved for it. */
    "elk.edge.thickness"?: string;

    /** The type of an edge. This is usually used for UML class diagrams, where associations must be handled differently from generalizations. */
    "elk.edge.type"?: string;

    /** If true, an edge label is placed directly on its edge. May only apply to center edge labels. This kind of label placement is only advisable if the label’s rendering is such that it is not crossed by its edge and thus stays legible. */
    "elk.edgeLabels.inline"?: string;

    /** Gives a hint on where to put edge labels. */
    "elk.edgeLabels.placement"?: string;

    /** What kind of edge routing style should be applied for the content of a parent node. Algorithms may also set this option to single edges in order to mark them as splines. The bend point list of edges with this option set to SPLINES must be interpreted as control points for a piecewise cubic spline. */
    "elk.edgeRouting"?: string;

    /** If active, nodes are expanded to fill the area of their parent. */
    "elk.expandNodes"?: string;

    /** Font name used for a label. */
    "elk.font.name"?: string;

    /** Font size used for a label. */
    "elk.font.size"?: string;

    /** The number of iterations on the force model. */
    "elk.force.iterations"?: string;

    /** Determines the model for force calculation. */
    "elk.force.model"?: string;

    /** Factor for repulsive forces in Eades’ model. */
    "elk.force.repulsion"?: string;

    /** Determines how many bend points are added to the edge; such bend points are regarded as repelling particles in the force model */
    "elk.force.repulsivePower"?: string;

    /** The temperature is used as a scaling factor for particle displacements. */
    "elk.force.temperature"?: string;

    /** Whether ports should be moved to the point where edges cross the node’s bounds. */
    "elk.graphviz.adaptPortPositions"?: string;

    /** Merges multiedges into a single edge and causes partially parallel edges to share part of their paths. */
    "elk.graphviz.concentrate"?: string;

    /** Terminating condition. If the length squared of all energy gradients are less than epsilon, the algorithm stops. */
    "elk.graphviz.epsilon"?: string;

    /** Multiplicative scale factor for the maximal number of iterations used during crossing minimization, node ranking, and node positioning. */
    "elk.graphviz.iterationsFactor"?: string;

    /** Angle between head / tail positioned edge labels and the corresponding edge. */
    "elk.graphviz.labelAngle"?: string;

    /** Distance of head / tail positioned edge labels to the source or target node. */
    "elk.graphviz.labelDistance"?: string;

    /** Factor for the spacing of different layers (ranks). */
    "elk.graphviz.layerSpacingFactor"?: string;

    /** The maximum number of iterations. */
    "elk.graphviz.maxiter"?: string;

    /** Specifies how the distance matrix is computed for the input graph. */
    "elk.graphviz.neatoModel"?: string;

    /** Determines if and how node overlaps should be removed. */
    "elk.graphviz.overlapMode"?: string;

    /** Determines whether separate layout runs are triggered for different compound nodes in a hierarchical graph. Setting a node’s hierarchy handling to INCLUDE_CHILDREN will lay out that node and all of its descendants in a single layout run, until a descendant is encountered which has its hierarchy handling set to SEPARATE_CHILDREN. In general, SEPARATE_CHILDREN will ensure that a new layout run is triggered for a node with that setting. Including multiple levels of hierarchy in a single layout run may allow cross-hierarchical edges to be laid out properly. If the root node is set to INHERIT (or not set at all), the default behavior is SEPARATE_CHILDREN. */
    "elk.hierarchyHandling"?: string;

    /** Whether the node should be handled as a hypernode. */
    "elk.hypernode"?: string;

    /** Whether this node allows to route self loops inside of it instead of around it. If set to true, this will make the node a compound node if it isn’t already, and will require the layout algorithm to support compound nodes with hierarchical ports. */
    "elk.insideSelfLoops.activate"?: string;

    /** Whether a self loop should be routed inside a node instead of around that node. */
    "elk.insideSelfLoops.yo"?: string;

    /** Whether the algorithm should be run in interactive mode for the content of a parent node. What this means exactly depends on how the specific algorithm interprets this option. Usually in the interactive mode algorithms try to modify the current layout as little as possible. */
    "elk.interactive"?: string;

    /** Whether the graph should be changeable interactively and by setting constraints */
    "elk.interactiveLayout"?: string;

    /** For layouts transferred into JSON graphs, specify the coordinate system to be used for edge route points and edge labels. */
    "elk.json.edgeCoords"?: string;

    /** For layouts transferred into JSON graphs, specify the coordinate system to be used for nodes, ports, and labels of nodes and ports. */
    "elk.json.shapeCoords"?: string;

    /** This option is not used as option, but as output of the layout algorithms. It is attached to edges and determines the points where junction symbols should be drawn in order to represent hyperedges with orthogonal routing. Whether such points are computed depends on the chosen layout algorithm and edge routing style. The points are put into the vector chain with no specific order. */
    "elk.junctionPoints"?: string;

    /** Label managers can shorten labels upon a layout algorithm’s request. */
    "elk.labelManager"?: string;

    /** The label manager responsible for a given part of the graph. A label manager can either be attached to a compound node (in which case it is responsible for all labels inside) or to specific labels. The label manager can then be called by layout algorithms to modify labels that are too wide to try and shorten them to a given target width. */
    "elk.labels.labelManager"?: string;

    /** Specifies whether non-flow ports may switch sides if their node’s port constraints are either FIXED_SIDE or FIXED_ORDER. A non-flow port is a port on a side that is not part of the currently configured layout flow. For instance, given a left-to-right layout direction, north and south ports would be considered non-flow ports. Further note that the underlying criterium whether to switch sides or not solely relies on the minimization of edge crossings. Hence, edge length and other aesthetics criteria are not addressed. */
    "elk.layered.allowNonFlowPortsToSwitchSides"?: string;

    /** Tries to further compact components (disconnected sub-graphs). */
    "elk.layered.compaction.connectedComponents"?: string;

    /** Specifies whether and how post-process compaction is applied. */
    "elk.layered.compaction.postCompaction.constraints"?: string;

    /** Specifies whether and how post-process compaction is applied. */
    "elk.layered.compaction.postCompaction.strategy"?: string;

    /** If set to NONE the usual ordering strategy (by cumulative node priority and size of nodes) is used. INSIDE_PORT_SIDES orders the components with external ports only inside the groups with the same port side. FORCE_MODEL_ORDER enforces the mode order on components. This option might produce bad alignments and sub optimal drawings in terms of used area since the ordering should be respected. */
    "elk.layered.considerModelOrder.components"?: string;

    /** Indicates with what percentage (1 for 100%) violations of the node model order are weighted against the crossings e.g. a value of 0.5 means two model order violations are as important as on edge crossing. This allows some edge crossings in favor of preserving the model order. It is advised to set this value to a very small positive value (e.g. 0.001) to have minimal crossing and a optimal node order. Defaults to no influence (0). */
    "elk.layered.considerModelOrder.crossingCounterNodeInfluence"?: string;

    /** Indicates with what percentage (1 for 100%) violations of the port model order are weighted against the crossings e.g. a value of 0.5 means two model order violations are as important as on edge crossing. This allows some edge crossings in favor of preserving the model order. It is advised to set this value to a very small positive value (e.g. 0.001) to have minimal crossing and a optimal port order. Defaults to no influence (0). */
    "elk.layered.considerModelOrder.crossingCounterPortInfluence"?: string;

    /** Determines how to count ordering violations during cycle breaking. NONE: They do not count. ENFORCED: A group with a higher model order is before a node with a smaller. MODEL_ORDER: The model order counts instead of the model order group id ordering. */
    "elk.layered.considerModelOrder.groupModelOrder.cbGroupOrderStrategy"?: string;

    /** The model order group id for which should be preferred as a source if possible. */
    "elk.layered.considerModelOrder.groupModelOrder.cbPreferredSourceId"?: string;

    /** The model order group id for which should be preferred as a target if possible. */
    "elk.layered.considerModelOrder.groupModelOrder.cbPreferredTargetId"?: string;

    /** Holds all group ids which are enforcing their order during crossing minimization strategies. E.g. if only groups 2 and -1 (default) enforce their ordering. Other groups e.g. the group of timer nodes can be ordered arbitrarily if it helps and the mentioned groups may not change their order. */
    "elk.layered.considerModelOrder.groupModelOrder.cmEnforcedGroupOrders"?: string;

    /** Determines how to count ordering violations during crossing minimization. NONE: They do not count. ENFORCED: A group with a lower id is before a group with a higher id. MODEL_ORDER: The model order counts instead of the model order group id ordering. */
    "elk.layered.considerModelOrder.groupModelOrder.cmGroupOrderStrategy"?: string;

    /** Used to define partial ordering groups during component packing. A lower group id means that the group is sorted before other groups. A group model order of 0 is the default group. */
    "elk.layered.considerModelOrder.groupModelOrder.componentGroupId"?: string;

    /** Used to define partial ordering groups during crossing minimization. A lower group id means that the group is sorted before other groups. A group model order of 0 is the default group. */
    "elk.layered.considerModelOrder.groupModelOrder.crossingMinimizationId"?: string;

    /** Used to define partial ordering groups during cycle breaking. A lower group id means that the group is sorted before other groups. A group model order of 0 is the default group. */
    "elk.layered.considerModelOrder.groupModelOrder.cycleBreakingId"?: string;

    /** Indicates whether long edges are sorted under, over, or equal to nodes that have no connection to a previous layer in a left-to-right or right-to-left layout. Under and over changes to right and left in a vertical layout. */
    "elk.layered.considerModelOrder.longEdgeStrategy"?: string;

    /** Set on a node to not set a model order for this node even though it is a real node. */
    "elk.layered.considerModelOrder.noModelOrder"?: string;

    /** If disabled the port order of output ports is derived from the edge order and input ports are ordered by their incoming connections. If enabled all ports are ordered by the port model order. */
    "elk.layered.considerModelOrder.portModelOrder"?: string;

    /** Preserves the order of nodes and edges in the model file if this does not lead to additional edge crossings. Depending on the strategy this is not always possible since the node and edge order might be conflicting. */
    "elk.layered.considerModelOrder.strategy"?: string;

    /** The node order given by the model does not change to produce a better layout. E.g. if node A is before node B in the model this is not changed during crossing minimization. This assumes that the node model order is already respected before crossing minimization. This can be achieved by setting considerModelOrder.strategy to NODES_AND_EDGES. */
    "elk.layered.crossingMinimization.forceNodeModelOrder"?: string;

    /** By default it is decided automatically if the greedy switch is activated or not. The decision is based on whether the size of the input graph (without dummy nodes) is smaller than the value of this option. A ‘0’ enforces the activation. */
    "elk.layered.crossingMinimization.greedySwitch.activationThreshold"?: string;

    /** Greedy Switch strategy for crossing minimization. The greedy switch heuristic is executed after the regular crossing minimization as a post-processor. Note that if ‘hierarchyHandling’ is set to ‘INCLUDE_CHILDREN’, the ‘greedySwitchHierarchical.type’ option must be used. */
    "elk.layered.crossingMinimization.greedySwitch.type"?: string;

    /** Activates the greedy switch heuristic in case hierarchical layout is used. The differences to the non-hierarchical case (see ‘greedySwitch.type’) are: 1) greedy switch is inactive by default, 3) only the option value set on the node at which hierarchical layout starts is relevant, and 2) if it’s activated by the user, it properly addresses hierarchy-crossing edges. */
    "elk.layered.crossingMinimization.greedySwitchHierarchical.type"?: string;

    /** How likely it is to use cross-hierarchy (1) vs bottom-up (-1). */
    "elk.layered.crossingMinimization.hierarchicalSweepiness"?: string;

    /** Allows to set a constraint which specifies of which node the current node is the predecessor. If set to ’s’ then the node is the predecessor of ’s’ and is in the same layer */
    "elk.layered.crossingMinimization.inLayerPredOf"?: string;

    /** Allows to set a constraint which specifies of which node the current node is the successor. If set to ’s’ then the node is the successor of ’s’ and is in the same layer */
    "elk.layered.crossingMinimization.inLayerSuccOf"?: string;

    /** Allows to set a constraint regarding the position placement of a node in a layer. Assumed the layer in which the node placed includes n other nodes and i < n. If set to i, it expresses that the node should be placed at the i-th position. Should i>=n be true then the node is placed at the last position in the layer. Note that this option is not part of any of ELK Layered’s default configurations but is only evaluated as part of the InteractiveLayeredGraphVisitor, which must be applied manually or used via the `DiagramLayoutEngine. */
    "elk.layered.crossingMinimization.positionChoiceConstraint"?: string;

    /** Position within a layer that was determined by ELK Layered for a node. This is only generated if interactiveLayot or generatePositionAndLayerIds is set. */
    "elk.layered.crossingMinimization.positionId"?: string;

    /** Preserves the order of nodes within a layer but still minimizes crossings between edges connecting long edge dummies. Derives the desired order from positions specified by the ‘org.eclipse.elk.position’ layout option. Requires a crossing minimization strategy that is able to process ‘in-layer’ constraints. */
    "elk.layered.crossingMinimization.semiInteractive"?: string;

    /** Strategy for crossing minimization. */
    "elk.layered.crossingMinimization.strategy"?: string;

    /** Strategy for cycle breaking. Cycle breaking looks for cycles in the graph and determines which edges to reverse to break the cycles. Reversed edges will end up pointing to the opposite direction of regular edges (that is, reversed edges will point left if edges usually point right). */
    "elk.layered.cycleBreaking.strategy"?: string;

    /** Specifies how drawings of the same graph with different layout directions compare to each other: either a natural reading direction is preserved or the drawings are rotated versions of each other. */
    "elk.layered.directionCongruency"?: string;

    /** Determines in which layer center labels of long edges should be placed. */
    "elk.layered.edgeLabels.centerLabelPlacementStrategy"?: string;

    /** Method to decide on edge label sides. */
    "elk.layered.edgeLabels.sideSelection"?: string;

    /** Width of the strip to the left and to the right of each layer where the polyline edge router is allowed to refrain from ensuring that edges are routed horizontally. This prevents awkward bend points for nodes that extent almost to the edge of their layer. */
    "elk.layered.edgeRouting.polyline.slopedEdgeZoneWidth"?: string;

    /** Alter the distribution of the loops around the node. It only takes effect for PortConstraints.FREE. */
    "elk.layered.edgeRouting.selfLoopDistribution"?: string;

    /** Alter the ordering of the loops they can either be stacked or sequenced. It only takes effect for PortConstraints.FREE. */
    "elk.layered.edgeRouting.selfLoopOrdering"?: string;

    /** Specifies the way control points are assembled for each individual edge. CONSERVATIVE ensures that edges are properly routed around the nodes but feels rather orthogonal at times. SLOPPY uses fewer control points to obtain curvier edge routes but may result in edges overlapping nodes. */
    "elk.layered.edgeRouting.splines.mode"?: string;

    /** Spacing factor for routing area between layers when using sloppy spline routing. */
    "elk.layered.edgeRouting.splines.sloppy.layerSpacingFactor"?: string;

    /** Whether feedback edges should be highlighted by routing around the nodes. */
    "elk.layered.feedbackEdges"?: string;

    /** If enabled position id and layer id are generated, which are usually only used internally when setting the interactiveLayout option. This option should be specified on the root node. */
    "elk.layered.generatePositionAndLayerIds"?: string;

    /** Whether a node is considered to have a high degree. */
    "elk.layered.highDegreeNodes.threshold"?: string;

    /** Makes room around high degree nodes to place leafs and trees. */
    "elk.layered.highDegreeNodes.treatment"?: string;

    /** Maximum height of a subtree connected to a high degree node to be moved to separate layers. */
    "elk.layered.highDegreeNodes.treeHeight"?: string;

    /** Determines which point of a node is considered by interactive layout phases. */
    "elk.layered.interactiveReferencePoint"?: string;

    /** The maximum number of nodes allowed per layer. */
    "elk.layered.layering.coffmanGraham.layerBound"?: string;

    /** Allows to set a constraint regarding the layer placement of a node. Let i be the value of teh constraint. Assumed the drawing has n layers and i < n. If set to i, it expresses that the node should be placed in i-th layer. Should i>=n be true then the node is placed in the last layer of the drawing. Note that this option is not part of any of ELK Layered’s default configurations but is only evaluated as part of the InteractiveLayeredGraphVisitor, which must be applied manually or used via the `DiagramLayoutEngine. */
    "elk.layered.layering.layerChoiceConstraint"?: string;

    /** Determines a constraint on the placement of the node regarding the layering. */
    "elk.layered.layering.layerConstraint"?: string;

    /** Layer identifier that was calculated by ELK Layered for a node. This is only generated if interactiveLayot or generatePositionAndLayerIds is set. */
    "elk.layered.layering.layerId"?: string;

    /** Defines a loose upper bound on the width of the MinWidth layerer. If set to ‘-1’ multiple values are tested and the best result is selected. */
    "elk.layered.layering.minWidth.upperBoundOnWidth"?: string;

    /** Multiplied with Upper Bound On Width for defining an upper bound on the width of layers which haven’t been determined yet, but whose maximum width had been (roughly) estimated by the MinWidth algorithm. Compensates for too high estimations. If set to ‘-1’ multiple values are tested and the best result is selected. */
    "elk.layered.layering.minWidth.upperLayerEstimationScalingFactor"?: string;

    /** Limits the number of iterations for node promotion. */
    "elk.layered.layering.nodePromotion.maxIterations"?: string;

    /** Reduces number of dummy nodes after layering phase (if possible). */
    "elk.layered.layering.nodePromotion.strategy"?: string;

    /** Strategy for node layering. */
    "elk.layered.layering.strategy"?: string;

    /** Defines the number of sublayers to split a layer into. The property can be set to the nodes in a layer, which then applies the property for the layer. If multiple nodes set the value to different values, then the lowest value is chosen. */
    "elk.layered.layerUnzipping.layerSplit"?: string;

    /** Use a heuristic to decide whether or not to actually perform the layer split with the goal of minimizing the total edge length. This option only works when layerSplit is set to 2. The property can be set to the nodes in a layer, which then applies the property for the layer. If any node sets the value to true, then the value is set to true for the entire layer. */
    "elk.layered.layerUnzipping.minimizeEdgeLength"?: string;

    /** If set to true, nodes will always be placed in the first sublayer after a long edge when using the ALTERNATING strategy. Otherwise long edge dummies are treated the same as regular nodes. The default value is true. The property can be set to the nodes in a layer, which then applies the property for the layer. If any node sets the value to false, then the value is set to false for the entire layer. */
    "elk.layered.layerUnzipping.resetOnLongEdges"?: string;

    /** The strategy to use for unzipping a layer into multiple sublayers while maintaining the existing ordering of nodes and edges after crossing minimization. The default value is ‘NONE’. */
    "elk.layered.layerUnzipping.strategy"?: string;

    /** Edges that have no ports are merged so they touch the connected nodes at the same points. When this option is disabled, one port is created for each edge directly connected to a node. When it is enabled, all such incoming edges share an input port, and all outgoing edges share an output port. */
    "elk.layered.mergeEdges"?: string;

    /** If hierarchical layout is active, hierarchy-crossing edges use as few hierarchical ports as possible. They are broken by the algorithm, with hierarchical ports inserted as required. Usually, one such port is created for each edge at each hierarchy crossing point. With this option set to true, we try to create as few hierarchical ports as possible in the process. In particular, all edges that form a hyperedge can share a port. */
    "elk.layered.mergeHierarchyEdges"?: string;

    /** Specifies whether the Brandes Koepf node placer tries to increase the number of straight edges at the expense of diagram size. There is a subtle difference to the ‘favorStraightEdges’ option, which decides whether a balanced placement of the nodes is desired, or not. In bk terms this means combining the four alignments into a single balanced one, or not. This option on the other hand tries to straighten additional edges during the creation of each of the four alignments. */
    "elk.layered.nodePlacement.bk.edgeStraightening"?: string;

    /** Tells the BK node placer to use a certain alignment (out of its four) instead of the one producing the smallest height, or the combination of all four. */
    "elk.layered.nodePlacement.bk.fixedAlignment"?: string;

    /** Favor straight edges over a balanced node placement. The default behavior is determined automatically based on the used ’edgeRouting’. For an orthogonal style it is set to true, for all other styles to false. */
    "elk.layered.nodePlacement.favorStraightEdges"?: string;

    /** Dampens the movement of nodes to keep the diagram from getting too large. */
    "elk.layered.nodePlacement.linearSegments.deflectionDampening"?: string;

    /** Aims at shorter and straighter edges. Two configurations are possible: (a) allow ports to move freely on the side they are assigned to (the order is always defined beforehand), (b) additionally allow to enlarge a node wherever it helps. If this option is not configured for a node, the ’nodeFlexibility.default’ value is used, which is specified for the node’s parent. */
    "elk.layered.nodePlacement.networkSimplex.nodeFlexibility"?: string;

    /** Default value of the ’nodeFlexibility’ option for the children of a hierarchical node. */
    "elk.layered.nodePlacement.networkSimplex.nodeFlexibility.default"?: string;

    /** Strategy for node placement. */
    "elk.layered.nodePlacement.strategy"?: string;

    /** Only relevant for nodes with FIXED_SIDE port constraints. Determines the way a node’s ports are distributed on the sides of a node if their order is not prescribed. The option is set on parent nodes. */
    "elk.layered.portSortingStrategy"?: string;

    /** Defines how important it is to have a certain edge point into the direction of the overall layout. This option is evaluated during the cycle breaking phase. */
    "elk.layered.priority.direction"?: string;

    /** Defines how important it is to keep an edge as short as possible. This option is evaluated during the layering phase. */
    "elk.layered.priority.shortness"?: string;

    /** Defines how important it is to keep an edge straight, i.e. aligned with one of the two axes. This option is evaluated during node placement. */
    "elk.layered.priority.straightness"?: string;

    /** An optional base value for all other layout options of the ‘spacing’ group. It can be used to conveniently alter the overall ‘spaciousness’ of the drawing. Whenever an explicit value is set for the other layout options, this base value will have no effect. The base value is not inherited, i.e. it must be set for each hierarchical node. */
    "elk.layered.spacing.baseValue"?: string;

    /** Spacing to be preserved between pairs of edges that are routed between the same pair of layers. Note that ‘spacing.edgeEdge’ is used for the spacing between pairs of edges crossing the same layer. */
    "elk.layered.spacing.edgeEdgeBetweenLayers"?: string;

    /** The spacing to be preserved between nodes and edges that are routed next to the node’s layer. For the spacing between nodes and edges that cross the node’s layer ‘spacing.edgeNode’ is used. */
    "elk.layered.spacing.edgeNodeBetweenLayers"?: string;

    /** The spacing to be preserved between any pair of nodes of two adjacent layers. Note that ‘spacing.nodeNode’ is used for the spacing between nodes within the layer itself. */
    "elk.layered.spacing.nodeNodeBetweenLayers"?: string;

    /** How much effort should be spent to produce a nice layout. */
    "elk.layered.thoroughness"?: string;

    /** Adds bend points even if an edge does not change direction. If true, each long edge dummy will contribute a bend point to its edges and hierarchy-crossing edges will always get a bend point where they cross hierarchy boundaries. By default, bend points are only added where an edge changes direction. */
    "elk.layered.unnecessaryBendpoints"?: string;

    /** To visually separate edges that are wrapped from regularly routed edges an additional spacing value can be specified in form of this layout option. The spacing is added to the regular edgeNode spacing. */
    "elk.layered.wrapping.additionalEdgeSpacing"?: string;

    /** At times and for certain types of graphs the executed wrapping may produce results that are consistently biased in the same fashion: either wrapping to often or to rarely. This factor can be used to correct the bias. Internally, it is simply multiplied with the ‘aspect ratio’ layout option. */
    "elk.layered.wrapping.correctionFactor"?: string;

    /** Allows the user to specify her own cuts for a certain graph. */
    "elk.layered.wrapping.cutting.cuts"?: string;

    /** The MSD cutting strategy starts with an initial guess on the number of chunks the graph should be split into. The freedom specifies how much the strategy may deviate from this guess. E.g. if an initial number of 3 is computed, a freedom of 1 allows 2, 3, and 4 cuts. */
    "elk.layered.wrapping.cutting.msd.freedom"?: string;

    /** The strategy by which the layer indexes are determined at which the layering crumbles into chunks. */
    "elk.layered.wrapping.cutting.strategy"?: string;

    "elk.layered.wrapping.multiEdge.distancePenalty"?: string;

    /** For general graphs it is important that not too many edges wrap backwards. Thus a compromise between evenly-distributed cuts and the total number of cut edges is sought. */
    "elk.layered.wrapping.multiEdge.improveCuts"?: string;

    /** The initial wrapping is performed in a very simple way. As a consequence, edges that wrap from one chunk to another may be unnecessarily long. Activating this option tries to shorten such edges. */
    "elk.layered.wrapping.multiEdge.improveWrappedEdges"?: string;

    /** For certain graphs and certain prescribed drawing areas it may be desirable to split the laid out graph into chunks that are placed side by side. The edges that connect different chunks are ‘wrapped’ around from the end of one chunk to the start of the other chunk. The points between the chunks are referred to as ‘cuts’. */
    "elk.layered.wrapping.strategy"?: string;

    "elk.layered.wrapping.validify.forbiddenIndices"?: string;

    /** When wrapping graphs, one can specify indices that are not allowed as split points. The validification strategy makes sure every computed split point is allowed. */
    "elk.layered.wrapping.validify.strategy"?: string;

    /** Whether the hierarchy levels on the path from the selected element to the root of the diagram shall be included in the layout process. */
    "elk.layoutAncestors"?: string;

    /** Margins define additional space around the actual bounds of a graph element. For instance, ports or labels being placed on the outside of a node’s border might introduce such a margin. The margin is used to guarantee non-overlap of other graph elements with those ports or labels. */
    "elk.margins"?: string;

    /** The maximal time for animations, in milliseconds. */
    "elk.maxAnimTime"?: string;

    /** The minimal time for animations, in milliseconds. */
    "elk.minAnimTime"?: string;

    /** Turns on Tree compaction which decreases the size of the whole tree by placing nodes of multiple levels in one large level */
    "elk.mrtree.compaction"?: string;

    /** Should be set to the length of the texture at the end of an edge. This value can be used to improve the Edge Routing. */
    "elk.mrtree.edgeEndTextureLength"?: string;

    /** Chooses an Edge Routing algorithm. */
    "elk.mrtree.edgeRoutingMode"?: string;

    /** When set to a positive number this option will force the algorithm to place the node to the specified position within the trees layer if weighting is set to constraint */
    "elk.mrtree.positionConstraint"?: string;

    /** Which search order to use when computing a spanning tree. */
    "elk.mrtree.searchOrder"?: string;

    /** The index for the tree level the node is in */
    "elk.mrtree.treeLevel"?: string;

    /** Which weighting to use when computing a node order. */
    "elk.mrtree.weighting"?: string;

    /** Define padding for node labels that are placed inside of a node. */
    "elk.nodeLabels.padding"?: string;

    /** Hints for where node labels are to be placed; if empty, the node label’s position is not modified. */
    "elk.nodeLabels.placement"?: string;

    /** What should be taken into account when calculating a node’s size. Empty size constraints specify that a node’s size is already fixed and should not be changed. */
    "elk.nodeSize.constraints"?: string;

    /** By default, the fixed layout provider will enlarge a graph until it is large enough to contain its children. If this option is set, it won’t do so. */
    "elk.nodeSize.fixedGraphSize"?: string;

    /** The minimal size to which a node can be reduced. */
    "elk.nodeSize.minimum"?: string;

    /** Options modifying the behavior of the size constraints set on a node. Each member of the set specifies something that should be taken into account when calculating node sizes. The empty set corresponds to no further modifications. */
    "elk.nodeSize.options"?: string;

    /** No layout is done for the associated element. This is used to mark parts of a diagram to avoid their inclusion in the layout graph, or to mark parts of the layout graph to prevent layout engines from processing them. If you wish to exclude the contents of a compound node from automatic layout, while the node itself is still considered on its own layer, use the ‘Fixed Layout’ algorithm for that node. */
    "elk.noLayout"?: string;

    /** Node micro layout comprises the computation of node dimensions (if requested), the placement of ports and their labels, and the placement of node labels. The functionality is implemented independent of any specific layout algorithm and shouldn’t have any negative impact on the layout algorithm’s performance itself. Yet, if any unforeseen behavior occurs, this option allows to deactivate the micro layout. */
    "elk.omitNodeMicroLayout"?: string;

    "elk.overlapRemoval.maxIterations"?: string;

    "elk.overlapRemoval.runScanline"?: string;

    /** The padding to be left to a parent element’s border when placing child elements. This can also serve as an output option of a layout algorithm if node size calculation is setup appropriately. */
    "elk.padding"?: string;

    /** Whether to activate partitioned layout. This will allow to group nodes through the Layout Partition option. a pair of nodes with different partition indices is then placed such that the node with lower index is placed to the left of the other node (with left-to-right layout direction). Depending on the layout algorithm, this may only be guaranteed to work if all nodes have a layout partition configured, or at least if edges that cross partitions are not part of a partition-crossing cycle. */
    "elk.partitioning.activate"?: string;

    /** Partition to which the node belongs. This requires Layout Partitioning to be active. Nodes with lower partition IDs will appear to the left of nodes with higher partition IDs (assuming a left-to-right layout direction). */
    "elk.partitioning.partition"?: string;

    /** Use the Profile Fill algorithm to fill polyominoes to prevent small polyominoes from being placed inside of big polyominoes with large holes. Might increase packing area. */
    "elk.polyomino.fill"?: string;

    /** Possible primary sorting criteria for the processing order of polyominoes. */
    "elk.polyomino.highLevelSort"?: string;

    /** Possible secondary sorting criteria for the processing order of polyominoes. They are used when polyominoes are equal according to the primary sorting criterion HighLevelSortingCriterion. */
    "elk.polyomino.lowLevelSort"?: string;

    /** Traversal strategy for trying different candidate positions for polyominoes. */
    "elk.polyomino.traversalStrategy"?: string;

    /** The offset to the port position where connections shall be attached. */
    "elk.port.anchor"?: string;

    /** The offset of ports on the node border. With a positive offset the port is moved outside of the node, while with a negative offset the port is moved towards the inside. An offset of 0 means that the port is placed directly on the node border, i.e. if the port side is north, the port’s south border touches the nodes’s north border; if the port side is east, the port’s west border touches the nodes’s east border; if the port side is south, the port’s north border touches the node’s south border; if the port side is west, the port’s east border touches the node’s west border. */
    "elk.port.borderOffset"?: string;

    /** The index of a port in the fixed order around a node. The order is assumed as clockwise, starting with the leftmost port on the top side. This option must be set if ‘Port Constraints’ is set to FIXED_ORDER and no specific positions are given for the ports. Additionally, the option ‘Port Side’ must be defined in this case. */
    "elk.port.index"?: string;

    /** The side of a node on which a port is situated. This option must be set if ‘Port Constraints’ is set to FIXED_SIDE or FIXED_ORDER and no specific positions are given for the ports. */
    "elk.port.side"?: string;

    /** Defines the default port distribution for a node. May be overridden for each side individually. */
    "elk.portAlignment.default"?: string;

    /** Defines how ports on the eastern side are placed, overriding the node’s general port alignment. */
    "elk.portAlignment.east"?: string;

    /** Defines how ports on the northern side are placed, overriding the node’s general port alignment. */
    "elk.portAlignment.north"?: string;

    /** Defines how ports on the southern side are placed, overriding the node’s general port alignment. */
    "elk.portAlignment.south"?: string;

    /** Defines how ports on the western side are placed, overriding the node’s general port alignment. */
    "elk.portAlignment.west"?: string;

    /** Defines constraints of the position of the ports of a node. */
    "elk.portConstraints"?: string;

    /** Use ‘portLabels.placement’: NEXT_TO_PORT_OF_POSSIBLE. */
    "elk.portLabels.nextToPortIfPossible"?: string;

    /** Decides on a placement method for port labels; if empty, the node label’s position is not modified. */
    "elk.portLabels.placement"?: string;

    /** If this option is true (default), the labels of a port will be treated as a group when it comes to centering them next to their port. If this option is false, only the first label will be centered next to the port, with the others being placed below. This only applies to labels of eastern and western ports and will have no effect if labels are not placed next to their port. */
    "elk.portLabels.treatAsGroup"?: string;

    /** The position of a node, port, or label. This is used by the ‘Fixed Layout’ algorithm to specify a pre-defined position. */
    "elk.position"?: string;

    /** Defines the priority of an object; its meaning depends on the specific layout algorithm and the context where it is used. */
    "elk.priority"?: string;

    /** The identifier of the node that is preferred as the root of the spanning tree. If this is null, the first node is chosen. */
    "elk.processingOrder.preferredRoot"?: string;

    /** This sets the method used to select a root node for the construction of a spanning tree */
    "elk.processingOrder.rootSelection"?: string;

    /** The cost function is used in the creation of the spanning tree. */
    "elk.processingOrder.spanningTreeCostFunction"?: string;

    /** Whether a minimum spanning tree or a maximum spanning tree should be constructed. */
    "elk.processingOrder.treeConstruction"?: string;

    /** Whether a progress bar shall be displayed during layout computations. */
    "elk.progressBar"?: string;

    /** Centers the layout on the root of the tree i.e. so that the central node is also the center node of the final layout. This introduces additional whitespace. */
    "elk.radial.centerOnRoot"?: string;

    /** Determine the size of steps with which the compaction is done. Step size 1 correlates to a compaction of 1 pixel per Iteration. */
    "elk.radial.compactionStepSize"?: string;

    /** With the compacter option it can be determined how compaction on the graph is done. It can be chosen between none, the radial compaction or the compaction of wedges separately. */
    "elk.radial.compactor"?: string;

    /** Find the optimal translation of the nodes of the first radii according to this criteria. For example edge crossings can be minimized. */
    "elk.radial.optimizationCriteria"?: string;

    /** The id can be used to define an order for nodes of one radius. This can be used to sort them in the layer accordingly. */
    "elk.radial.orderId"?: string;

    /** The radius option can be used to set the initial radius for the radial layouter. */
    "elk.radial.radius"?: string;

    /** The rotate option determines whether a rotation of the layout should be performed. */
    "elk.radial.rotate"?: string;

    /** If set to true, modifies the target angle by rotating further such that space is left for an edge to pass in between the nodes. This option should only be used in conjunction with top-down layout. */
    "elk.radial.rotation.computeAdditionalWedgeSpace"?: string;

    /** Calculate the required angle of connected nodes to leave space for an incoming edge. This option should only be used in conjunction with top-down layout. */
    "elk.radial.rotation.outgoingEdgeAngles"?: string;

    /** The angle in radians that the layout should be rotated to after layout. */
    "elk.radial.rotation.targetAngle"?: string;

    /** Sort the nodes per radius according to the sorting algorithm. The strategies are none, by the given order id, or sorting them by polar coordinates. */
    "elk.radial.sorter"?: string;

    /** Determine how the wedge for the node placement is calculated. It can be chosen between wedge determination by the number of leaves or by the maximum sum of diagonals. */
    "elk.radial.wedgeCriteria"?: string;

    /** Seed used for pseudo-random number generators to control the layout algorithm. If the value is 0, the seed shall be determined pseudo-randomly (e.g. from the system time). */
    "elk.randomSeed"?: string;

    /** The rectangles are ordered. Normally according to their definition the the model. This option specifies the current position of a node. */
    "elk.rectpacking.currentPosition"?: string;

    /** The rectangles are ordered. Normally according to their definition the the model. This option allows to specify a desired position that has preference over the original position. */
    "elk.rectpacking.desiredPosition"?: string;

    /** If set to true this node begins in a new row. Consequently this node cannot be moved in a previous layer during compaction. Width approximation does does not take this into account. */
    "elk.rectpacking.inNewRow"?: string;

    /** If set to true the nodes will be sorted by their height before computing the layout. The largest node will be in the first position. */
    "elk.rectpacking.orderBySize"?: string;

    /** Defines the number of compaction iterations. E.g. if set to 2 the width is initially approximated, then the drawing is compacted and based on the resulting drawing the target width is decreased or increased and a second compaction step is executed and the result compared to the first one. The best run is used based on the scale measure. */
    "elk.rectpacking.packing.compaction.iterations"?: string;

    /** During the compaction step the height of a row is normally not changed. If this options is set, the blocks of other rows might be added if they exceed the row height. If this is the case the whole row has to be packed again to be optimal regarding the new row height. This option should, therefore, be used with care since it might be computation heavy. */
    "elk.rectpacking.packing.compaction.rowHeightReevaluation"?: string;

    /** Strategy for finding an initial placement on nodes. */
    "elk.rectpacking.packing.strategy"?: string;

    /** Whether one should check whether the regions are stackable to see whether box layout would do the job. For example, nodes with the same height are not stackable inside a row. Therefore, box layout will perform better and faster. */
    "elk.rectpacking.trybox"?: string;

    /** Strategy for expanding nodes such that whitespace in the parent is eliminated. */
    "elk.rectpacking.whiteSpaceElimination.strategy"?: string;

    /** When placing a rectangle behind or below the last placed rectangle in the first iteration, it is sometimes possible to shift the rectangle further to the left or right, resulting in less whitespace. True (default) enables the shift and false disables it. Disabling the shift produces a greater approximated area by the first iteration and a layout, when using ONLY the first iteration (default not the case), where it is sometimes impossible to implement a size transformation of rectangles that will fill the bounding box and eliminate empty spaces. */
    "elk.rectpacking.widthApproximation.lastPlaceShift"?: string;

    /** Optimization goal for approximation of the bounding box given by the first iteration. Determines whether layout is sorted by the maximum scaling, aspect ratio, or area. Depending on the strategy the aspect ratio might be nearly ignored. */
    "elk.rectpacking.widthApproximation.optimizationGoal"?: string;

    /** Strategy for finding an initial width of the drawing. */
    "elk.rectpacking.widthApproximation.strategy"?: string;

    /** Option to place the rectangles in the given target width instead of approximating the width using the desired aspect ratio. The padding is not included in this. Meaning a drawing will have width of targetwidth + horizontal padding. */
    "elk.rectpacking.widthApproximation.targetWidth"?: string;

    /** Meta data associated with the selected algorithm. */
    "elk.resolvedAlgorithm"?: string;

    /** The scaling factor to be applied to the corresponding node in recursive layout. It causes the corresponding node’s size to be adjusted, and its ports and labels to be sized and placed accordingly after the layout of that node has been determined (and before the node itself and its siblings are arranged). The scaling is not reverted afterwards, so the resulting layout graph contains the adjusted size and position data. This option is currently not supported if ‘Layout Hierarchy’ is set. */
    "elk.scaleFactor"?: string;

    /** Whether each connected component should be processed separately. */
    "elk.separateConnectedComponents"?: string;

    /** Determines the amount of fuzziness to be used when performing softwrapping on labels. The value expresses the percent of overhang that is permitted for each line. If the next line would take up less space than this threshold, it is appended to the current line instead of being placed in a new line. */
    "elk.softwrappingFuzziness"?: string;

    /** Spacing to be preserved between a comment box and other comment boxes connected to the same node. The space left between comment boxes of different nodes is controlled by the node-node spacing. */
    "elk.spacing.commentComment"?: string;

    /** Spacing to be preserved between a node and its connected comment boxes. The space left between a node and the comments of another node is controlled by the node-node spacing. */
    "elk.spacing.commentNode"?: string;

    /** Spacing to be preserved between pairs of connected components. This option is only relevant if ‘separateConnectedComponents’ is activated. */
    "elk.spacing.componentComponent"?: string;

    /** Spacing to be preserved between any two edges. Note that while this can somewhat easily be satisfied for the segments of orthogonally drawn edges, it is harder for general polylines or splines. */
    "elk.spacing.edgeEdge"?: string;

    /** The minimal distance to be preserved between a label and the edge it is associated with. Note that the placement of a label is influenced by the ’edgelabels.placement’ option. */
    "elk.spacing.edgeLabel"?: string;

    /** Spacing to be preserved between nodes and edges. */
    "elk.spacing.edgeNode"?: string;

    /** Allows to specify individual spacing values for graph elements that shall be different from the value specified for the element’s parent. */
    "elk.spacing.individual"?: string;

    /** Determines the amount of space to be left between two labels of the same graph element. */
    "elk.spacing.labelLabel"?: string;

    /** Spacing to be preserved between labels and the border of node they are associated with. Note that the placement of a label is influenced by the ’nodelabels.placement’ option. */
    "elk.spacing.labelNode"?: string;

    /** Horizontal spacing to be preserved between labels and the ports they are associated with. Note that the placement of a label is influenced by the ‘portlabels.placement’ option. */
    "elk.spacing.labelPortHorizontal"?: string;

    /** Vertical spacing to be preserved between labels and the ports they are associated with. Note that the placement of a label is influenced by the ‘portlabels.placement’ option. */
    "elk.spacing.labelPortVertical"?: string;

    /** The minimal distance to be preserved between each two nodes. */
    "elk.spacing.nodeNode"?: string;

    /** Spacing to be preserved between a node and its self loops. */
    "elk.spacing.nodeSelfLoop"?: string;

    /** Spacing between pairs of ports of the same node. */
    "elk.spacing.portPort"?: string;

    /** Additional space around the sets of ports on each node side. For each side of a node, this option can reserve additional space before and after the ports on each side. For example, a top spacing of 20 makes sure that the first port on the western and eastern side is 20 units away from the northern border. */
    "elk.spacing.portsSurrounding"?: string;

    /** Either specified for parent nodes or for individual edges, where the latter takes higher precedence. */
    "elk.stress.desiredEdgeLength"?: string;

    /** Dimensions that are permitted to be altered during layout. */
    "elk.stress.dimension"?: string;

    /** Termination criterion for the iterative process. */
    "elk.stress.epsilon"?: string;

    /** Prevent that the node is moved by the layout algorithm. */
    "elk.stress.fixed"?: string;

    /** Maximum number of performed iterations. Takes higher precedence than ’epsilon'. */
    "elk.stress.iterationLimit"?: string;

    /** This option defines what kind of triangulation or other partitioning of the plane is applied to the vertices. */
    "elk.structure.structureExtractionStrategy"?: string;

    /** The fixed aspect ratio of a hierarchical node when using topdown layout. Default is 1/sqrt(2). If this value is set on a parallel node it applies to its children, when set on a hierarchical node it applies to the node itself. */
    "elk.topdown.hierarchicalNodeAspectRatio"?: string;

    /** The fixed size of a hierarchical node when using topdown layout. If this value is set on a parallel node it applies to its children, when set on a hierarchical node it applies to the node itself. */
    "elk.topdown.hierarchicalNodeWidth"?: string;

    /** The different node types used for topdown layout. If the node type is set to {@link TopdownNodeTypes.PARALLEL_NODE} the algorithm must be set to a {@link TopdownLayoutProvider} such as {@link TopdownPacking}. The {@link nodeSize.fixedGraphSize} option is technically only required for hierarchical nodes. */
    "elk.topdown.nodeType"?: string;

    /** Determines the upper limit for the topdown scale factor. The default value is 1.0 which ensures that nested children never end up appearing larger than their parents in terms of unit sizes such as the font size. If the limit is larger, nodes will fully utilize the available space, but it is counteriniuitive for inner nodes to have a larger scale than outer nodes. */
    "elk.topdown.scaleCap"?: string;

    /** The scaling factor to be applied to the nodes laid out within the node in recursive topdown layout. The difference to ‘Scale Factor’ is that the node itself is not scaled. This value has to be set on hierarchical nodes. */
    "elk.topdown.scaleFactor"?: string;

    /** The size approximator to be used to set sizes of hierarchical nodes during topdown layout. The default value is null, which results in nodes keeping whatever size is defined for them e.g. through parent parallel node or by manually setting the size. */
    "elk.topdown.sizeApproximator"?: string;

    /** Defines the number of categories to use for the FIXED_INTEGER_RATIO_BOXES size approximator. */
    "elk.topdown.sizeCategories"?: string;

    /** When determining the graph size for the size categorisation, this value determines how many times a node containing children is weighted more than a simple node. For example setting this value to four would result in a graph containing a simple node and a hierarchical node to be counted as having a size of five. */
    "elk.topdown.sizeCategoriesHierarchicalNodeWeight"?: string;

    /** Turns topdown layout on and off. If this option is enabled, hierarchical layout will be computed first for the root node and then for its children recursively. Layouts are then scaled down to fit the area provided by their parents. Graphs must follow a certain structure for topdown layout to work properly. {@link TopdownNodeTypes.PARALLEL_NODE} nodes must have children of type {@link TopdownNodeTypes.HIERARCHICAL_NODE} and must define {@link topdown.hierarchicalNodeWidth} and {@link topdown.hierarchicalNodeAspectRatio} for their children. Furthermore they need to be laid out using an algorithm that is a {@link TopdownLayoutProvider}. Hierarchical nodes can also be parents of other hierarchical nodes and can optionally use a {@link TopdownSizeApproximator} to dynamically set sizes during topdown layout. In this case {@link topdown.hierarchicalNodeWidth} and {@link topdown.hierarchicalNodeAspectRatio} should be set on the node itself rather than the parent. The values are then used by the size approximator as base values. Hierarchical nodes require the layout option {@link nodeSize.fixedGraphSize} to be true to prevent the algorithm used there from resizing the hierarchical node. This option is not supported if ‘Hierarchy Handling’ is set to ‘INCLUDE_CHILDREN’ */
    "elk.topdownLayout"?: string;

    /** Strategy for node arrangement. The strategy determines the size of the resulting graph. */
    "elk.topdownpacking.nodeArrangement.strategy"?: string;

    /** Strategy for whitespace elimination. */
    "elk.topdownpacking.whitespaceElimination.strategy"?: string;

    /** A layout algorithm that is applied to the graph before it is compacted. If this is null, nothing is applied before compaction. */
    "elk.underlyingLayoutAlgorithm"?: string;

    /** Whether the graph shall be validated before any layout algorithm is applied. If this option is enabled and at least one error is found, the layout process is aborted and a message is shown to the user. */
    "elk.validateGraph"?: string;

    /** Whether layout options shall be validated before any layout algorithm is applied. If this option is enabled and at least one error is found, the layout process is aborted and a message is shown to the user. */
    "elk.validateOptions"?: string;

    /** Consider node model as a secondary criterion when using straight line routing. */
    "elk.vertiflex.considerNodeModelOrder"?: string;

    /** The distance to use between nodes of different layers if no vertical constraints are set. */
    "elk.vertiflex.layerDistance"?: string;

    /** Strategy for the layout of the children. ‘straight’ for straight line drawings, ‘bend’ for a possible bend. When straight edges are prioritized the nodes will be reordered in order to guarantee that straight edges are possible. If bend points are enabled on the other hand, the given model order of the nodes is maintained and bend points are introduced to prevent edge node overlaps. */
    "elk.vertiflex.layoutStrategy"?: string;

    /** The Y position that the node should be fixed at. */
    "elk.vertiflex.verticalConstraint"?: string;

    /** Whether the zoom level shall be set to view the whole diagram after layout. */
    "elk.zoomToFit"?: string;

    [key: string]: any;
}

export interface ElkPoint {
    x: number
    y: number
}

export interface ElkGraphElement {
    id?: string
    labels?: ElkLabel[]
    layoutOptions?: LayoutOptions
}

export interface ElkShape extends ElkGraphElement {
    x?: number
    y?: number
    width?: number
    height?: number
}

export interface ElkNode extends ElkShape {
    id: string
    children?: ElkNode[]
    ports?: ElkPort[]
    edges?: ElkExtendedEdge[]
}

export interface ElkPort extends ElkShape {
    id: string
}

export interface ElkLabel extends ElkShape {
    text?: string
}

/**
 * @deprecated use ElkExtendedEdge directly
 */
export interface ElkEdge extends ElkGraphElement {
    id: string
    container?: string
    junctionPoints?: ElkPoint[]
}

/**
 * @deprecated use ElkExtendedEdge instead
 */
export interface ElkPrimitiveEdge extends ElkEdge {
    source: string
    sourcePort?: string
    target: string
    targetPort?: string
    sourcePoint?: ElkPoint
    targetPoint?: ElkPoint
    bendPoints?: ElkPoint[]
}

export interface ElkExtendedEdge extends ElkEdge {
    sources: string[]
    targets: string[]
    sections?: ElkEdgeSection[]
}

export interface ElkEdgeSection extends ElkGraphElement {
    id: string
    startPoint: ElkPoint
    endPoint: ElkPoint
    bendPoints?: ElkPoint[]
    incomingShape?: string
    outgoingShape?: string
    incomingSections?: string[]
    outgoingSections?: string[]
}

export interface ElkLayoutArguments {
    layoutOptions?: LayoutOptions
    logging?: boolean
    measureExecutionTime?: boolean
}

export interface ElkCommonDescription {
    id?: string
    name?: string
    description?: string
}

export interface ElkLayoutAlgorithmDescription extends ElkCommonDescription {
    category?: string
    knownOptions?: string[]
    supportedFeatures?: string[]
}

export interface ElkLayoutOptionDescription extends ElkCommonDescription {
    group?: string
    type?: string
    targets?: string[]
}

export interface ElkLayoutCategoryDescription extends ElkCommonDescription {
    knownLayouters?: string[]
}

export interface ELK {
    layout<T extends ElkNode>(
        graph: T,
        args?: ElkLayoutArguments
    ): Promise<Omit<T, 'children'> & { children?: (T['children'][number] & ElkNode)[] }>;
    knownLayoutAlgorithms(): Promise<ElkLayoutAlgorithmDescription[]>
    knownLayoutOptions(): Promise<ElkLayoutOptionDescription[]>
    knownLayoutCategories(): Promise<ElkLayoutCategoryDescription[]>
    terminateWorker(): void;
}

export interface ELKConstructorArguments {
    defaultLayoutOptions?: LayoutOptions
    algorithms?: string[]
    workerUrl?: string
    workerFactory?: (url?: string) => Worker
}

declare const ElkConstructor: {
    new(args?: ELKConstructorArguments): ELK;
};
export default ElkConstructor;
