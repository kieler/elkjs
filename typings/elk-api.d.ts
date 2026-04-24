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
    /** Angle Penalty */
    "elk.alg.libavoid.anglePenalty"?: string;

    /** Spacing between pairs of ports of the same node */
    "elk.spacing.portConnection"?: string;

    /** Cluster Crossing Penalty */
    "elk.alg.libavoid.clusterCrossingPenalty"?: string;

    /** Crossing Penalty */
    "elk.alg.libavoid.crossingPenalty"?: string;

    /** Enable Hyperedges From Common Source */
    "elk.alg.libavoid.enableHyperedgesFromCommonSource"?: string;

    /** Fixed Shared Path Penalty */
    "elk.alg.libavoid.fixedSharedPathPenalty"?: string;

    /** Ideal Nudging Distance */
    "elk.alg.libavoid.idealNudgingDistance"?: string;

    /** Improve Hyperedge Routes Add/Delete */
    "elk.alg.libavoid.improveHyperedgeRoutesMovingAddingAndDeletingJunctions"?: string;

    /** Improve Hyperedge Routes */
    "elk.alg.libavoid.improveHyperedgeRoutesMovingJunctions"?: string;

    /** Marks a node as a cluster */
    "elk.alg.libavoid.isCluster"?: string;

    /** Nudge Orthogonal Segments */
    "elk.alg.libavoid.nudgeOrthogonalSegmentsConnectedToShapes"?: string;

    /** Nudge Orthogonal Touching Colinear Segments */
    "elk.alg.libavoid.nudgeOrthogonalTouchingColinearSegments"?: string;

    /** Nudge Shared Paths With Common Endpoint */
    "elk.alg.libavoid.nudgeSharedPathsWithCommonEndPoint"?: string;

    /** Penalise Orthogonal Shared Paths */
    "elk.alg.libavoid.penaliseOrthogonalSharedPathsAtConnEnds"?: string;

    /** Perform Unifying Nudging Preprocessing */
    "elk.alg.libavoid.performUnifyingNudgingPreprocessingStep"?: string;

    /** Port Direction Penalty */
    "elk.alg.libavoid.portDirectionPenalty"?: string;

    /** Default process timeout. */
    "elk.alg.libavoid.processTimeout"?: string;

    /** Reverse Direction Penalty */
    "elk.alg.libavoid.reverseDirectionPenalty"?: string;

    /** Segment Penalty */
    "elk.alg.libavoid.segmentPenalty"?: string;

    /** Shape Buffer Distance */
    "elk.alg.libavoid.shapeBufferDistance"?: string;

    /** Layout Algorithm */
    "elk.algorithm"?: string;

    /** Alignment */
    "elk.alignment"?: string;

    /** Animate */
    "elk.animate"?: string;

    /** Animation Time Factor */
    "elk.animTimeFactor"?: string;

    /** Aspect Ratio */
    "elk.aspectRatio"?: string;

    /** Bend Points */
    "elk.bendPoints"?: string;

    /** Box Layout Mode */
    "elk.box.packingMode"?: string;

    /** Child Area Height */
    "elk.childAreaHeight"?: string;

    /** Child Area Width */
    "elk.childAreaWidth"?: string;

    /** Comment Box */
    "elk.commentBox"?: string;

    /** Compaction Strategy */
    "elk.compaction.compactionStrategy"?: string;

    /** Orthogonal Compaction */
    "elk.compaction.orthogonal"?: string;

    /** Content Alignment */
    "elk.contentAlignment"?: string;

    /** Debug Mode */
    "elk.debugMode"?: string;

    /** Direction */
    "elk.direction"?: string;

    /** Connected Components Layout Algorithm */
    "elk.disco.componentCompaction.componentLayoutAlgorithm"?: string;

    /** Connected Components Compaction Strategy */
    "elk.disco.componentCompaction.strategy"?: string;

    /** DCGraph */
    "elk.disco.debug.discoGraph"?: string;

    /** List of Polyominoes */
    "elk.disco.debug.discoPolys"?: string;

    /** Edge Thickness */
    "elk.edge.thickness"?: string;

    /** Edge Type */
    "elk.edge.type"?: string;

    /** Inline Edge Labels */
    "elk.edgeLabels.inline"?: string;

    /** Edge Label Placement */
    "elk.edgeLabels.placement"?: string;

    /** Edge Routing */
    "elk.edgeRouting"?: string;

    /** Expand Nodes */
    "elk.expandNodes"?: string;

    /** Font Name */
    "elk.font.name"?: string;

    /** Font Size */
    "elk.font.size"?: string;

    /** Iterations */
    "elk.force.iterations"?: string;

    /** Force Model */
    "elk.force.model"?: string;

    /** Eades Repulsion */
    "elk.force.repulsion"?: string;

    /** Repulsive Power */
    "elk.force.repulsivePower"?: string;

    /** FR Temperature */
    "elk.force.temperature"?: string;

    /** Adapt Port Positions */
    "elk.graphviz.adaptPortPositions"?: string;

    /** Concentrate Edges */
    "elk.graphviz.concentrate"?: string;

    /** Epsilon */
    "elk.graphviz.epsilon"?: string;

    /** Iterations Factor */
    "elk.graphviz.iterationsFactor"?: string;

    /** Label Angle */
    "elk.graphviz.labelAngle"?: string;

    /** Label Distance */
    "elk.graphviz.labelDistance"?: string;

    /** Layer Spacing Factor */
    "elk.graphviz.layerSpacingFactor"?: string;

    /** Max. Iterations */
    "elk.graphviz.maxiter"?: string;

    /** Distance Model */
    "elk.graphviz.neatoModel"?: string;

    /** Overlap Removal */
    "elk.graphviz.overlapMode"?: string;

    /** Hierarchy Handling (Graphviz Dot) */
    "elk.hierarchyHandling"?: string;

    /** Hypernode */
    "elk.hypernode"?: string;

    /** Activate Inside Self Loops */
    "elk.insideSelfLoops.activate"?: string;

    /** Inside Self Loop */
    "elk.insideSelfLoops.yo"?: string;

    /** Interactive */
    "elk.interactive"?: string;

    /** interactive Layout */
    "elk.interactiveLayout"?: string;

    /** Edge Coords */
    "elk.json.edgeCoords"?: string;

    /** Shape Coords */
    "elk.json.shapeCoords"?: string;

    /** Junction Points */
    "elk.junctionPoints"?: string;

    /** Label Manager */
    "elk.labelManager"?: string;

    /** Label Manager */
    "elk.labels.labelManager"?: string;

    /** Allow Non-Flow Ports To Switch Sides */
    "elk.layered.allowNonFlowPortsToSwitchSides"?: string;

    /** Connected Components Compaction */
    "elk.layered.compaction.connectedComponents"?: string;

    /** Post Compaction Constraint Calculation */
    "elk.layered.compaction.postCompaction.constraints"?: string;

    /** Post Compaction Strategy */
    "elk.layered.compaction.postCompaction.strategy"?: string;

    /** Consider Model Order for Components */
    "elk.layered.considerModelOrder.components"?: string;

    /** Crossing Counter Node Order Influence */
    "elk.layered.considerModelOrder.crossingCounterNodeInfluence"?: string;

    /** Crossing Counter Port Order Influence */
    "elk.layered.considerModelOrder.crossingCounterPortInfluence"?: string;

    /** Cycle Breaking Group Ordering Strategy */
    "elk.layered.considerModelOrder.groupModelOrder.cbGroupOrderStrategy"?: string;

    /** Cycle Breaking Preferred Source Id */
    "elk.layered.considerModelOrder.groupModelOrder.cbPreferredSourceId"?: string;

    /** Cycle Breaking Preferred Target Id */
    "elk.layered.considerModelOrder.groupModelOrder.cbPreferredTargetId"?: string;

    /** Crossing Minimization Enforced Group Orders */
    "elk.layered.considerModelOrder.groupModelOrder.cmEnforcedGroupOrders"?: string;

    /** Crossing Minimization Group Ordering Strategy */
    "elk.layered.considerModelOrder.groupModelOrder.cmGroupOrderStrategy"?: string;

    /** Group ID of the Node Type */
    "elk.layered.considerModelOrder.groupModelOrder.componentGroupId"?: string;

    /** Group ID of the Node Type */
    "elk.layered.considerModelOrder.groupModelOrder.crossingMinimizationId"?: string;

    /** Group ID of the Node Type */
    "elk.layered.considerModelOrder.groupModelOrder.cycleBreakingId"?: string;

    /** Long Edge Ordering Strategy */
    "elk.layered.considerModelOrder.longEdgeStrategy"?: string;

    /** No Model Order */
    "elk.layered.considerModelOrder.noModelOrder"?: string;

    /** Consider Port Order */
    "elk.layered.considerModelOrder.portModelOrder"?: string;

    /** Consider Model Order */
    "elk.layered.considerModelOrder.strategy"?: string;

    /** Force Node Model Order */
    "elk.layered.crossingMinimization.forceNodeModelOrder"?: string;

    /** Greedy Switch Activation Threshold */
    "elk.layered.crossingMinimization.greedySwitch.activationThreshold"?: string;

    /** Greedy Switch Crossing Minimization */
    "elk.layered.crossingMinimization.greedySwitch.type"?: string;

    /** Greedy Switch Crossing Minimization (hierarchical) */
    "elk.layered.crossingMinimization.greedySwitchHierarchical.type"?: string;

    /** Hierarchical Sweepiness */
    "elk.layered.crossingMinimization.hierarchicalSweepiness"?: string;

    /** In Layer Predecessor of */
    "elk.layered.crossingMinimization.inLayerPredOf"?: string;

    /** In Layer Successor of */
    "elk.layered.crossingMinimization.inLayerSuccOf"?: string;

    /** Position Choice Constraint */
    "elk.layered.crossingMinimization.positionChoiceConstraint"?: string;

    /** Position ID */
    "elk.layered.crossingMinimization.positionId"?: string;

    /** Semi-Interactive Crossing Minimization */
    "elk.layered.crossingMinimization.semiInteractive"?: string;

    /** Crossing Minimization Strategy */
    "elk.layered.crossingMinimization.strategy"?: string;

    /** Cycle Breaking Strategy */
    "elk.layered.cycleBreaking.strategy"?: string;

    /** Direction Congruency */
    "elk.layered.directionCongruency"?: string;

    /** Edge Center Label Placement Strategy */
    "elk.layered.edgeLabels.centerLabelPlacementStrategy"?: string;

    /** Edge Label Side Selection */
    "elk.layered.edgeLabels.sideSelection"?: string;

    /** Sloped Edge Zone Width */
    "elk.layered.edgeRouting.polyline.slopedEdgeZoneWidth"?: string;

    /** Self-Loop Distribution */
    "elk.layered.edgeRouting.selfLoopDistribution"?: string;

    /** Self-Loop Ordering */
    "elk.layered.edgeRouting.selfLoopOrdering"?: string;

    /** Spline Routing Mode */
    "elk.layered.edgeRouting.splines.mode"?: string;

    /** Sloppy Spline Layer Spacing Factor */
    "elk.layered.edgeRouting.splines.sloppy.layerSpacingFactor"?: string;

    /** Feedback Edges */
    "elk.layered.feedbackEdges"?: string;

    /** Generate Position and Layer IDs */
    "elk.layered.generatePositionAndLayerIds"?: string;

    /** High Degree Node Threshold */
    "elk.layered.highDegreeNodes.threshold"?: string;

    /** High Degree Node Treatment */
    "elk.layered.highDegreeNodes.treatment"?: string;

    /** High Degree Node Maximum Tree Height */
    "elk.layered.highDegreeNodes.treeHeight"?: string;

    /** Interactive Reference Point */
    "elk.layered.interactiveReferencePoint"?: string;

    /** Layer Bound */
    "elk.layered.layering.coffmanGraham.layerBound"?: string;

    /** Layer Choice Constraint */
    "elk.layered.layering.layerChoiceConstraint"?: string;

    /** Layer Constraint */
    "elk.layered.layering.layerConstraint"?: string;

    /** Layer ID */
    "elk.layered.layering.layerId"?: string;

    /** Upper Bound On Width [MinWidth Layerer] */
    "elk.layered.layering.minWidth.upperBoundOnWidth"?: string;

    /** Upper Layer Estimation Scaling Factor [MinWidth Layerer] */
    "elk.layered.layering.minWidth.upperLayerEstimationScalingFactor"?: string;

    /** Max Node Promotion Iterations */
    "elk.layered.layering.nodePromotion.maxIterations"?: string;

    /** Node Promotion Strategy */
    "elk.layered.layering.nodePromotion.strategy"?: string;

    /** Node Layering Strategy */
    "elk.layered.layering.strategy"?: string;

    /** Unzipping Layer Split */
    "elk.layered.layerUnzipping.layerSplit"?: string;

    /** Minimize Edge Length Heuristic */
    "elk.layered.layerUnzipping.minimizeEdgeLength"?: string;

    /** Reset Alternation on Long Edges */
    "elk.layered.layerUnzipping.resetOnLongEdges"?: string;

    /** Layer Unzipping Strategy */
    "elk.layered.layerUnzipping.strategy"?: string;

    /** Merge Edges */
    "elk.layered.mergeEdges"?: string;

    /** Merge Hierarchy-Crossing Edges */
    "elk.layered.mergeHierarchyEdges"?: string;

    /** BK Edge Straightening */
    "elk.layered.nodePlacement.bk.edgeStraightening"?: string;

    /** BK Fixed Alignment */
    "elk.layered.nodePlacement.bk.fixedAlignment"?: string;

    /** Favor Straight Edges Over Balancing */
    "elk.layered.nodePlacement.favorStraightEdges"?: string;

    /** Linear Segments Deflection Dampening */
    "elk.layered.nodePlacement.linearSegments.deflectionDampening"?: string;

    /** Node Flexibility */
    "elk.layered.nodePlacement.networkSimplex.nodeFlexibility"?: string;

    /** Node Flexibility Default */
    "elk.layered.nodePlacement.networkSimplex.nodeFlexibility.default"?: string;

    /** Node Placement Strategy */
    "elk.layered.nodePlacement.strategy"?: string;

    /** Port Sorting Strategy */
    "elk.layered.portSortingStrategy"?: string;

    /** Direction Priority */
    "elk.layered.priority.direction"?: string;

    /** Shortness Priority (ELK Layered) */
    "elk.layered.priority.shortness"?: string;

    /** Straightness Priority */
    "elk.layered.priority.straightness"?: string;

    /** Spacing Base Value */
    "elk.layered.spacing.baseValue"?: string;

    /** Edge Edge Between Layer Spacing */
    "elk.layered.spacing.edgeEdgeBetweenLayers"?: string;

    /** Edge Node Between Layers Spacing */
    "elk.layered.spacing.edgeNodeBetweenLayers"?: string;

    /** Node Node Between Layers Spacing */
    "elk.layered.spacing.nodeNodeBetweenLayers"?: string;

    /** Thoroughness */
    "elk.layered.thoroughness"?: string;

    /** Add Unnecessary Bendpoints */
    "elk.layered.unnecessaryBendpoints"?: string;

    /** Additional Wrapped Edges Spacing */
    "elk.layered.wrapping.additionalEdgeSpacing"?: string;

    /** Correction Factor for Wrapping */
    "elk.layered.wrapping.correctionFactor"?: string;

    /** Manually Specified Cuts */
    "elk.layered.wrapping.cutting.cuts"?: string;

    /** MSD Freedom */
    "elk.layered.wrapping.cutting.msd.freedom"?: string;

    /** Cutting Strategy */
    "elk.layered.wrapping.cutting.strategy"?: string;

    /** Distance Penalty When Improving Cuts */
    "elk.layered.wrapping.multiEdge.distancePenalty"?: string;

    /** Improve Cuts */
    "elk.layered.wrapping.multiEdge.improveCuts"?: string;

    /** Improve Wrapped Edges */
    "elk.layered.wrapping.multiEdge.improveWrappedEdges"?: string;

    /** Graph Wrapping Strategy */
    "elk.layered.wrapping.strategy"?: string;

    /** Valid Indices for Wrapping */
    "elk.layered.wrapping.validify.forbiddenIndices"?: string;

    /** Validification Strategy */
    "elk.layered.wrapping.validify.strategy"?: string;

    /** Layout Ancestors */
    "elk.layoutAncestors"?: string;

    /** Margins */
    "elk.margins"?: string;

    /** Maximal Animation Time */
    "elk.maxAnimTime"?: string;

    /** Minimal Animation Time */
    "elk.minAnimTime"?: string;

    /** Position Constraint */
    "elk.mrtree.compaction"?: string;

    /** Edge End Texture Length */
    "elk.mrtree.edgeEndTextureLength"?: string;

    /** Edge Routing Mode */
    "elk.mrtree.edgeRoutingMode"?: string;

    /** Position Constraint */
    "elk.mrtree.positionConstraint"?: string;

    /** Search Order */
    "elk.mrtree.searchOrder"?: string;

    /** Tree Level */
    "elk.mrtree.treeLevel"?: string;

    /** Weighting of Nodes */
    "elk.mrtree.weighting"?: string;

    /** Node Label Padding */
    "elk.nodeLabels.padding"?: string;

    /** Node Label Placement */
    "elk.nodeLabels.placement"?: string;

    /** Node Size Constraints */
    "elk.nodeSize.constraints"?: string;

    /** Fixed Graph Size */
    "elk.nodeSize.fixedGraphSize"?: string;

    /** Node Size Minimum */
    "elk.nodeSize.minimum"?: string;

    /** Node Size Options */
    "elk.nodeSize.options"?: string;

    /** No Layout */
    "elk.noLayout"?: string;

    /** Omit Node Micro Layout */
    "elk.omitNodeMicroLayout"?: string;

    /** Upper limit for iterations of overlap removal */
    "elk.overlapRemoval.maxIterations"?: string;

    /** Whether to run a supplementary scanline overlap check. */
    "elk.overlapRemoval.runScanline"?: string;

    /** Padding */
    "elk.padding"?: string;

    /** Layout Partitioning */
    "elk.partitioning.activate"?: string;

    /** Layout Partition */
    "elk.partitioning.partition"?: string;

    /** Fill Polyominoes */
    "elk.polyomino.fill"?: string;

    /** Polyomino Primary Sorting Criterion */
    "elk.polyomino.highLevelSort"?: string;

    /** Polyomino Secondary Sorting Criterion */
    "elk.polyomino.lowLevelSort"?: string;

    /** Polyomino Traversal Strategy */
    "elk.polyomino.traversalStrategy"?: string;

    /** Port Anchor Offset */
    "elk.port.anchor"?: string;

    /** Port Border Offset */
    "elk.port.borderOffset"?: string;

    /** Port Index */
    "elk.port.index"?: string;

    /** Port Side */
    "elk.port.side"?: string;

    /** Port Alignment */
    "elk.portAlignment.default"?: string;

    /** Port Alignment (East) */
    "elk.portAlignment.east"?: string;

    /** Port Alignment (North) */
    "elk.portAlignment.north"?: string;

    /** Port Alignment (South) */
    "elk.portAlignment.south"?: string;

    /** Port Alignment (West) */
    "elk.portAlignment.west"?: string;

    /** Port Constraints */
    "elk.portConstraints"?: string;

    /** Port Labels Next to Port */
    "elk.portLabels.nextToPortIfPossible"?: string;

    /** Port Label Placement */
    "elk.portLabels.placement"?: string;

    /** Treat Port Labels as Group */
    "elk.portLabels.treatAsGroup"?: string;

    /** Position */
    "elk.position"?: string;

    /** Priority (ELK Mr. Tree) */
    "elk.priority"?: string;

    /** Root node for spanning tree construction */
    "elk.processingOrder.preferredRoot"?: string;

    /** Root selection for spanning tree */
    "elk.processingOrder.rootSelection"?: string;

    /** Cost Function for Spanning Tree */
    "elk.processingOrder.spanningTreeCostFunction"?: string;

    /** Tree Construction Strategy */
    "elk.processingOrder.treeConstruction"?: string;

    /** Progress Bar */
    "elk.progressBar"?: string;

    /** Center On Root */
    "elk.radial.centerOnRoot"?: string;

    /** Compaction Step Size */
    "elk.radial.compactionStepSize"?: string;

    /** Compaction */
    "elk.radial.compactor"?: string;

    /** Translation Optimization */
    "elk.radial.optimizationCriteria"?: string;

    /** Order ID */
    "elk.radial.orderId"?: string;

    /** Radius */
    "elk.radial.radius"?: string;

    /** Rotate */
    "elk.radial.rotate"?: string;

    /** Additional Wedge Space */
    "elk.radial.rotation.computeAdditionalWedgeSpace"?: string;

    /** Outgoing Edge Angles */
    "elk.radial.rotation.outgoingEdgeAngles"?: string;

    /** Target Angle */
    "elk.radial.rotation.targetAngle"?: string;

    /** Sorter */
    "elk.radial.sorter"?: string;

    /** Annulus Wedge Criteria */
    "elk.radial.wedgeCriteria"?: string;

    /** Randomization Seed */
    "elk.randomSeed"?: string;

    /** Current position of a node in the order of nodes */
    "elk.rectpacking.currentPosition"?: string;

    /** Desired index of node */
    "elk.rectpacking.desiredPosition"?: string;

    /** In new Row */
    "elk.rectpacking.inNewRow"?: string;

    /** Order nodes by height */
    "elk.rectpacking.orderBySize"?: string;

    /** Compaction iterations */
    "elk.rectpacking.packing.compaction.iterations"?: string;

    /** Row Height Reevaluation */
    "elk.rectpacking.packing.compaction.rowHeightReevaluation"?: string;

    /** Compaction Strategy */
    "elk.rectpacking.packing.strategy"?: string;

    /** Try box layout first */
    "elk.rectpacking.trybox"?: string;

    /** White Space Approximation Strategy */
    "elk.rectpacking.whiteSpaceElimination.strategy"?: string;

    /** Shift Last Placed. */
    "elk.rectpacking.widthApproximation.lastPlaceShift"?: string;

    /** Optimization Goal */
    "elk.rectpacking.widthApproximation.optimizationGoal"?: string;

    /** Width Approximation Strategy */
    "elk.rectpacking.widthApproximation.strategy"?: string;

    /** Target Width */
    "elk.rectpacking.widthApproximation.targetWidth"?: string;

    /** Resolved Layout Algorithm */
    "elk.resolvedAlgorithm"?: string;

    /** Scale Factor */
    "elk.scaleFactor"?: string;

    /** Separate Connected Components */
    "elk.separateConnectedComponents"?: string;

    /** Softwrapping Fuzziness */
    "elk.softwrappingFuzziness"?: string;

    /** Comment Comment Spacing */
    "elk.spacing.commentComment"?: string;

    /** Comment Node Spacing */
    "elk.spacing.commentNode"?: string;

    /** Components Spacing */
    "elk.spacing.componentComponent"?: string;

    /** Edge Spacing */
    "elk.spacing.edgeEdge"?: string;

    /** Edge Label Spacing */
    "elk.spacing.edgeLabel"?: string;

    /** Edge Node Spacing */
    "elk.spacing.edgeNode"?: string;

    /** Individual Spacing (ELK Layered) */
    "elk.spacing.individual"?: string;

    /** Label Spacing */
    "elk.spacing.labelLabel"?: string;

    /** Label Node Spacing */
    "elk.spacing.labelNode"?: string;

    /** Horizontal spacing between Label and Port */
    "elk.spacing.labelPortHorizontal"?: string;

    /** Vertical spacing between Label and Port */
    "elk.spacing.labelPortVertical"?: string;

    /** Node Spacing */
    "elk.spacing.nodeNode"?: string;

    /** Node Self Loop Spacing */
    "elk.spacing.nodeSelfLoop"?: string;

    /** Port Spacing */
    "elk.spacing.portPort"?: string;

    /** Additional Port Space */
    "elk.spacing.portsSurrounding"?: string;

    /** Desired Edge Length */
    "elk.stress.desiredEdgeLength"?: string;

    /** Layout Dimension */
    "elk.stress.dimension"?: string;

    /** Stress Epsilon */
    "elk.stress.epsilon"?: string;

    /** Fixed Position */
    "elk.stress.fixed"?: string;

    /** Iteration Limit */
    "elk.stress.iterationLimit"?: string;

    /** Structure Extraction Strategy */
    "elk.structure.structureExtractionStrategy"?: string;

    /** Topdown Hierarchical Node Aspect Ratio */
    "elk.topdown.hierarchicalNodeAspectRatio"?: string;

    /** Topdown Hierarchical Node Width */
    "elk.topdown.hierarchicalNodeWidth"?: string;

    /** Topdown Node Type */
    "elk.topdown.nodeType"?: string;

    /** Topdown Scale Cap */
    "elk.topdown.scaleCap"?: string;

    /** Topdown Scale Factor */
    "elk.topdown.scaleFactor"?: string;

    /** Topdown Size Approximator */
    "elk.topdown.sizeApproximator"?: string;

    /** Number of size categories */
    "elk.topdown.sizeCategories"?: string;

    /** Weight of a node containing children for determining the graph size */
    "elk.topdown.sizeCategoriesHierarchicalNodeWeight"?: string;

    /** Topdown Layout */
    "elk.topdownLayout"?: string;

    /** Node arrangement strategy */
    "elk.topdownpacking.nodeArrangement.strategy"?: string;

    /** Whitespace elimination strategy */
    "elk.topdownpacking.whitespaceElimination.strategy"?: string;

    /** Underlying Layout Algorithm */
    "elk.underlyingLayoutAlgorithm"?: string;

    /** Validate Graph */
    "elk.validateGraph"?: string;

    /** Validate Options */
    "elk.validateOptions"?: string;

    /** Consider node model order */
    "elk.vertiflex.considerNodeModelOrder"?: string;

    /** Layer distance */
    "elk.vertiflex.layerDistance"?: string;

    /** Edge layout strategy */
    "elk.vertiflex.layoutStrategy"?: string;

    /** Fixed vertical position */
    "elk.vertiflex.verticalConstraint"?: string;

    /** Zoom to Fit */
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
