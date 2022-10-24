/*******************************************************************************
 * Copyright (c) 2019 TypeFox and others.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 *******************************************************************************/

export interface LayoutOptionsParents {
  /** Layout Algorithm:
   * Select a specific layout algorithm.
   */
  algorithm?: string;
  /** Resolved Layout Algorithm:
   * Meta data associated with the selected algorithm.
   */
  resolvedAlgorithm?: any;
  /** Aspect Ratio:
   * The desired aspect ratio of the drawing, that is the quotient of width by height.
   */
  aspectRatio?: number;
  /** Content Alignment:
   * Specifies how the content of a node are aligned. Each node can individually control the alignment of its contents. I.e. if a node should be aligned top left in its parent node, the parent node should specify that option.
   */
  contentAlignment?: any;
  /** Debug Mode:
   * Whether additional debug information shall be generated.
   */
  debugMode?: boolean;
  /** Direction:
   * Overall direction of edges: horizontal (right / left) or vertical (down / up).
   */
  direction?: any;
  /** Edge Routing:
   * What kind of edge routing style should be applied for the content of a parent node. Algorithms may also set this option to single edges in order to mark them as splines. The bend point list of edges with this option set to SPLINES must be interpreted as control points for a piecewise cubic spline.
   */
  edgeRouting?: any;
  /** Expand Nodes:
   * If active, nodes are expanded to fill the area of their parent.
   */
  expandNodes?: boolean;
  /** Hierarchy Handling:
   * Determines whether separate layout runs are triggered for different compound nodes in a hierarchical graph. Setting a node's hierarchy handling to `INCLUDE_CHILDREN` will lay out that node and all of its descendants in a single layout run, until a descendant is encountered which has its hierarchy handling set to `SEPARATE_CHILDREN`. In general, `SEPARATE_CHILDREN` will ensure that a new layout run is triggered for a node with that setting. Including multiple levels of hierarchy in a single layout run may allow cross-hierarchical edges to be laid out properly. If the root node is set to `INHERIT` (or not set at all), the default behavior is `SEPARATE_CHILDREN`.
   */
  hierarchyHandling?: any;
  /** Padding:
   * The padding to be left to a parent element's border when placing child elements. This can also serve as an output option of a layout algorithm if node size calculation is setup appropriately.
   */
  padding?: any;
  /** Interactive:
   * Whether the algorithm should be run in interactive mode for the content of a parent node. What this means exactly depends on how the specific algorithm interprets this option. Usually in the interactive mode algorithms try to modify the current layout as little as possible.
   */
  interactive?: boolean;
  /** interactive Layout:
   * Whether the graph should be changeable interactively and by setting constraints
   */
  interactiveLayout?: boolean;
  /** Omit Node Micro Layout:
   * Node micro layout comprises the computation of node dimensions (if requested), the placement of ports and their labels, and the placement of node labels. The functionality is implemented independent of any specific layout algorithm and shouldn't have any negative impact on the layout algorithm's performance itself. Yet, if any unforeseen behavior occurs, this option allows to deactivate the micro layout.
   */
  omitNodeMicroLayout?: boolean;
  /** Randomization Seed:
   * Seed used for pseudo-random number generators to control the layout algorithm. If the value is 0, the seed shall be determined pseudo-randomly (e.g. from the system time).
   */
  randomSeed?: number;
  /** Separate Connected Components:
   * Whether each connected component should be processed separately.
   */
  separateConnectedComponents?: boolean;
  /** Label Manager:
   * Label managers can shorten labels upon a layout algorithm's request.
   */
  labelManager?: any;
  /** Animate:
   * Whether the shift from the old layout to the new computed layout shall be animated.
   */
  animate?: boolean;
  /** Animation Time Factor:
   * Factor for computation of animation time. The higher the value, the longer the animation time. If the value is 0, the resulting time is always equal to the minimum defined by 'Minimal Animation Time'.
   */
  animTimeFactor?: number;
  /** Layout Ancestors:
   * Whether the hierarchy levels on the path from the selected element to the root of the diagram shall be included in the layout process.
   */
  layoutAncestors?: boolean;
  /** Maximal Animation Time:
   * The maximal time for animations, in milliseconds.
   */
  maxAnimTime?: number;
  /** Minimal Animation Time:
   * The minimal time for animations, in milliseconds.
   */
  minAnimTime?: number;
  /** Progress Bar:
   * Whether a progress bar shall be displayed during layout computations.
   */
  progressBar?: boolean;
  /** Validate Graph:
   * Whether the graph shall be validated before any layout algorithm is applied. If this option is enabled and at least one error is found, the layout process is aborted and a message is shown to the user.
   */
  validateGraph?: boolean;
  /** Validate Options:
   * Whether layout options shall be validated before any layout algorithm is applied. If this option is enabled and at least one error is found, the layout process is aborted and a message is shown to the user.
   */
  validateOptions?: boolean;
  /** Zoom to Fit:
   * Whether the zoom level shall be set to view the whole diagram after layout.
   */
  zoomToFit?: boolean;
  /** Box Layout Mode:
   * Configures the packing mode used by the {@link BoxLayoutProvider}. If SIMPLE is not required (neither priorities are used nor the interactive mode), GROUP_DEC can improve the packing and decrease the area. GROUP_MIXED and GROUP_INC may, in very specific scenarios, work better.
   */
  "box.packingMode"?: any;
  /** Comment Comment Spacing:
   * Spacing to be preserved between a comment box and other comment boxes connected to the same node. The space left between comment boxes of different nodes is controlled by the node-node spacing.
   */
  "spacing.commentComment"?: number;
  /** Comment Node Spacing:
   * Spacing to be preserved between a node and its connected comment boxes. The space left between a node and the comments of another node is controlled by the node-node spacing.
   */
  "spacing.commentNode"?: number;
  /** Components Spacing:
   * Spacing to be preserved between pairs of connected components. This option is only relevant if 'separateConnectedComponents' is activated.
   */
  "spacing.componentComponent"?: number;
  /** Edge Spacing:
   * Spacing to be preserved between any two edges. Note that while this can somewhat easily be satisfied for the segments of orthogonally drawn edges, it is harder for general polylines or splines.
   */
  "spacing.edgeEdge"?: number;
  /** Edge Label Spacing:
   * The minimal distance to be preserved between a label and the edge it is associated with. Note that the placement of a label is influenced by the 'edgelabels.placement' option.
   */
  "spacing.edgeLabel"?: number;
  /** Edge Node Spacing:
   * Spacing to be preserved between nodes and edges.
   */
  "spacing.edgeNode"?: number;
  /** Label Spacing:
   * Determines the amount of space to be left between two labels of the same graph element.
   */
  "spacing.labelLabel"?: number;
  /** Label Node Spacing:
   * Spacing to be preserved between labels and the border of node they are associated with. Note that the placement of a label is influenced by the 'nodelabels.placement' option.
   */
  "spacing.labelNode"?: number;
  /** Horizontal spacing between Label and Port:
   * Horizontal spacing to be preserved between labels and the ports they are associated with. Note that the placement of a label is influenced by the 'portlabels.placement' option.
   */
  "spacing.labelPortHorizontal"?: number;
  /** Vertical spacing between Label and Port:
   * Vertical spacing to be preserved between labels and the ports they are associated with. Note that the placement of a label is influenced by the 'portlabels.placement' option.
   */
  "spacing.labelPortVertical"?: number;
  /** Node Spacing:
   * The minimal distance to be preserved between each two nodes.
   */
  "spacing.nodeNode"?: number;
  /** Node Self Loop Spacing:
   * Spacing to be preserved between a node and its self loops.
   */
  "spacing.nodeSelfLoop"?: number;
  /** Port Spacing:
   * Spacing between pairs of ports of the same node.
   */
  "spacing.portPort"?: number;
  /** Additional Port Space:
   * Additional space around the sets of ports on each node side. For each side of a node, this option can reserve additional space before and after the ports on each side. For example, a top spacing of 20 makes sure that the first port on the western and eastern side is 20 units away from the northern border.
   */
  "spacing.portsSurrounding"?: any;
  /** Layout Partition:
   * Partition to which the node belongs. This requires Layout Partitioning to be active. Nodes with lower partition IDs will appear to the left of nodes with higher partition IDs (assuming a left-to-right layout direction).
   */
  "partitioning.partition"?: number;
  /** Layout Partitioning:
   * Whether to activate partitioned layout. This will allow to group nodes through the Layout Partition option. a pair of nodes with different partition indices is then placed such that the node with lower index is placed to the left of the other node (with left-to-right layout direction). Depending on the layout algorithm, this may only be guaranteed to work if all nodes have a layout partition configured, or at least if edges that cross partitions are not part of a partition-crossing cycle.
   */
  "partitioning.activate"?: boolean;
  /** Node Label Padding:
   * Define padding for node labels that are placed inside of a node.
   */
  "nodeLabels.padding"?: any;
  /** Fixed Graph Size:
   * By default, the fixed layout provider will enlarge a graph until it is large enough to contain its children. If this option is set, it won't do so.
   */
  "nodeSize.fixedGraphSize"?: boolean;
  /** Direction Congruency:
   * Specifies how drawings of the same graph with different layout directions compare to each other: either a natural reading direction is preserved or the drawings are rotated versions of each other.
   */
  "layered.directionCongruency"?: any;
  /** Feedback Edges:
   * Whether feedback edges should be highlighted by routing around the nodes.
   */
  "layered.feedbackEdges"?: boolean;
  /** Interactive Reference Point:
   * Determines which point of a node is considered by interactive layout phases.
   */
  "layered.interactiveReferencePoint"?: any;
  /** Merge Edges:
   * Edges that have no ports are merged so they touch the connected nodes at the same points. When this option is disabled, one port is created for each edge directly connected to a node. When it is enabled, all such incoming edges share an input port, and all outgoing edges share an output port.
   */
  "layered.mergeEdges"?: boolean;
  /** Merge Hierarchy-Crossing Edges:
   * If hierarchical layout is active, hierarchy-crossing edges use as few hierarchical ports as possible. They are broken by the algorithm, with hierarchical ports inserted as required. Usually, one such port is created for each edge at each hierarchy crossing point. With this option set to true, we try to create as few hierarchical ports as possible in the process. In particular, all edges that form a hyperedge can share a port.
   */
  "layered.mergeHierarchyEdges"?: boolean;
  /** Port Sorting Strategy:
   * Only relevant for nodes with FIXED_SIDE port constraints. Determines the way a node's ports are distributed on the sides of a node if their order is not prescribed. The option is set on parent nodes.
   */
  "layered.portSortingStrategy"?: any;
  /** Thoroughness:
   * How much effort should be spent to produce a nice layout.
   */
  "layered.thoroughness"?: number;
  /** Add Unnecessary Bendpoints:
   * Adds bend points even if an edge does not change direction. If true, each long edge dummy will contribute a bend point to its edges and hierarchy-crossing edges will always get a bend point where they cross hierarchy boundaries. By default, bend points are only added where an edge changes direction.
   */
  "layered.unnecessaryBendpoints"?: boolean;
  /** Generate Position and Layer IDs:
   * If enabled position id and layer id are generated, which are usually only used internally when setting the interactiveLayout option. This option should be specified on the root node.
   */
  "layered.generatePositionAndLayerIds"?: boolean;
  /** Cycle Breaking Strategy:
   * Strategy for cycle breaking. Cycle breaking looks for cycles in the graph and determines which edges to reverse to break the cycles. Reversed edges will end up pointing to the opposite direction of regular edges (that is, reversed edges will point left if edges usually point right).
   */
  "layered.cycleBreaking.strategy"?: any;
  /** Node Layering Strategy:
   * Strategy for node layering.
   */
  "layered.layering.strategy"?: any;
  /** Upper Bound On Width [MinWidth Layerer]:
   * Defines a loose upper bound on the width of the MinWidth layerer. If set to '-1' multiple values are tested and the best result is selected.
   */
  "layered.layering.minWidth.upperBoundOnWidth"?: number;
  /** Upper Layer Estimation Scaling Factor [MinWidth Layerer]:
   * Multiplied with Upper Bound On Width for defining an upper bound on the width of layers which haven't been determined yet, but whose maximum width had been (roughly) estimated by the MinWidth algorithm. Compensates for too high estimations. If set to '-1' multiple values are tested and the best result is selected.
   */
  "layered.layering.minWidth.upperLayerEstimationScalingFactor"?: number;
  /** Node Promotion Strategy:
   * Reduces number of dummy nodes after layering phase (if possible).
   */
  "layered.layering.nodePromotion.strategy"?: any;
  /** Max Node Promotion Iterations:
   * Limits the number of iterations for node promotion.
   */
  "layered.layering.nodePromotion.maxIterations"?: number;
  /** Layer Bound:
   * The maximum number of nodes allowed per layer.
   */
  "layered.layering.coffmanGraham.layerBound"?: number;
  /** Crossing Minimization Strategy:
   * Strategy for crossing minimization.
   */
  "layered.crossingMinimization.strategy"?: any;
  /** Force Node Model Order:
   * The node order given by the model does not change to produce a better layout. E.g. if node A is before node B in the model this is not changed during crossing minimization. This assumes that the node model order is already respected before crossing minimization. This can be achieved by setting considerModelOrder.strategy to NODES_AND_EDGES.
   */
  "layered.crossingMinimization.forceNodeModelOrder"?: boolean;
  /** Hierarchical Sweepiness:
   * How likely it is to use cross-hierarchy (1) vs bottom-up (-1).
   */
  "layered.crossingMinimization.hierarchicalSweepiness"?: number;
  /** Semi-Interactive Crossing Minimization:
   * Preserves the order of nodes within a layer but still minimizes crossings between edges connecting long edge dummies. Derives the desired order from positions specified by the 'org.eclipse.elk.position' layout option. Requires a crossing minimization strategy that is able to process 'in-layer' constraints.
   */
  "layered.crossingMinimization.semiInteractive"?: boolean;
  /** Greedy Switch Activation Threshold:
   * By default it is decided automatically if the greedy switch is activated or not. The decision is based on whether the size of the input graph (without dummy nodes) is smaller than the value of this option. A '0' enforces the activation.
   */
  "layered.crossingMinimization.greedySwitch.activationThreshold"?: number;
  /** Greedy Switch Crossing Minimization:
   * Greedy Switch strategy for crossing minimization. The greedy switch heuristic is executed after the regular crossing minimization as a post-processor. Note that if 'hierarchyHandling' is set to 'INCLUDE_CHILDREN', the 'greedySwitchHierarchical.type' option must be used.
   */
  "layered.crossingMinimization.greedySwitch.type"?: any;
  /** Greedy Switch Crossing Minimization (hierarchical):
   * Activates the greedy switch heuristic in case hierarchical layout is used. The differences to the non-hierarchical case (see 'greedySwitch.type') are: 1) greedy switch is inactive by default, 3) only the option value set on the node at which hierarchical layout starts is relevant, and 2) if it's activated by the user, it properly addresses hierarchy-crossing edges.
   */
  "layered.crossingMinimization.greedySwitchHierarchical.type"?: any;
  /** Node Placement Strategy:
   * Strategy for node placement.
   */
  "layered.nodePlacement.strategy"?: any;
  /** Favor Straight Edges Over Balancing:
   * Favor straight edges over a balanced node placement. The default behavior is determined automatically based on the used 'edgeRouting'. For an orthogonal style it is set to true, for all other styles to false.
   */
  "layered.nodePlacement.favorStraightEdges"?: boolean;
  /** BK Edge Straightening:
   * Specifies whether the Brandes Koepf node placer tries to increase the number of straight edges at the expense of diagram size. There is a subtle difference to the 'favorStraightEdges' option, which decides whether a balanced placement of the nodes is desired, or not. In bk terms this means combining the four alignments into a single balanced one, or not. This option on the other hand tries to straighten additional edges during the creation of each of the four alignments.
   */
  "layered.nodePlacement.bk.edgeStraightening"?: any;
  /** BK Fixed Alignment:
   * Tells the BK node placer to use a certain alignment (out of its four) instead of the one producing the smallest height, or the combination of all four.
   */
  "layered.nodePlacement.bk.fixedAlignment"?: any;
  /** Linear Segments Deflection Dampening:
   * Dampens the movement of nodes to keep the diagram from getting too large.
   */
  "layered.nodePlacement.linearSegments.deflectionDampening"?: number;
  /** Node Flexibility Default:
   * Default value of the 'nodeFlexibility' option for the children of a hierarchical node.
   */
  "layered.nodePlacement.networkSimplex.nodeFlexibility.default"?: any;
  /** Spline Routing Mode:
   * Specifies the way control points are assembled for each individual edge. CONSERVATIVE ensures that edges are properly routed around the nodes but feels rather orthogonal at times. SLOPPY uses fewer control points to obtain curvier edge routes but may result in edges overlapping nodes.
   */
  "layered.edgeRouting.splines.mode"?: any;
  /** Sloppy Spline Layer Spacing Factor:
   * Spacing factor for routing area between layers when using sloppy spline routing.
   */
  "layered.edgeRouting.splines.sloppy.layerSpacingFactor"?: number;
  /** Sloped Edge Zone Width:
   * Width of the strip to the left and to the right of each layer where the polyline edge router is allowed to refrain from ensuring that edges are routed horizontally. This prevents awkward bend points for nodes that extent almost to the edge of their layer.
   */
  "layered.edgeRouting.polyline.slopedEdgeZoneWidth"?: number;
  /** Spacing Base Value:
   * An optional base value for all other layout options of the 'spacing' group. It can be used to conveniently alter the overall 'spaciousness' of the drawing. Whenever an explicit value is set for the other layout options, this base value will have no effect. The base value is not inherited, i.e. it must be set for each hierarchical node.
   */
  "layered.spacing.baseValue"?: number;
  /** Edge Node Between Layers Spacing:
   * The spacing to be preserved between nodes and edges that are routed next to the node's layer. For the spacing between nodes and edges that cross the node's layer 'spacing.edgeNode' is used.
   */
  "layered.spacing.edgeNodeBetweenLayers"?: number;
  /** Edge Edge Between Layer Spacing:
   * Spacing to be preserved between pairs of edges that are routed between the same pair of layers. Note that 'spacing.edgeEdge' is used for the spacing between pairs of edges crossing the same layer.
   */
  "layered.spacing.edgeEdgeBetweenLayers"?: number;
  /** Node Node Between Layers Spacing:
   * The spacing to be preserved between any pair of nodes of two adjacent layers. Note that 'spacing.nodeNode' is used for the spacing between nodes within the layer itself.
   */
  "layered.spacing.nodeNodeBetweenLayers"?: number;
  /** Connected Components Compaction:
   * Tries to further compact components (disconnected sub-graphs).
   */
  "layered.compaction.connectedComponents"?: boolean;
  /** Post Compaction Strategy:
   * Specifies whether and how post-process compaction is applied.
   */
  "layered.compaction.postCompaction.strategy"?: any;
  /** Post Compaction Constraint Calculation:
   * Specifies whether and how post-process compaction is applied.
   */
  "layered.compaction.postCompaction.constraints"?: any;
  /** High Degree Node Treatment:
   * Makes room around high degree nodes to place leafs and trees.
   */
  "layered.highDegreeNodes.treatment"?: boolean;
  /** High Degree Node Threshold:
   * Whether a node is considered to have a high degree.
   */
  "layered.highDegreeNodes.threshold"?: number;
  /** High Degree Node Maximum Tree Height:
   * Maximum height of a subtree connected to a high degree node to be moved to separate layers.
   */
  "layered.highDegreeNodes.treeHeight"?: number;
  /** Graph Wrapping Strategy:
   * For certain graphs and certain prescribed drawing areas it may be desirable to split the laid out graph into chunks that are placed side by side. The edges that connect different chunks are 'wrapped' around from the end of one chunk to the start of the other chunk. The points between the chunks are referred to as 'cuts'.
   */
  "layered.wrapping.strategy"?: any;
  /** Additional Wrapped Edges Spacing:
   * To visually separate edges that are wrapped from regularly routed edges an additional spacing value can be specified in form of this layout option. The spacing is added to the regular edgeNode spacing.
   */
  "layered.wrapping.additionalEdgeSpacing"?: number;
  /** Correction Factor for Wrapping:
   * At times and for certain types of graphs the executed wrapping may produce results that are consistently biased in the same fashion: either wrapping to often or to rarely. This factor can be used to correct the bias. Internally, it is simply multiplied with the 'aspect ratio' layout option.
   */
  "layered.wrapping.correctionFactor"?: number;
  /** Cutting Strategy:
   * The strategy by which the layer indexes are determined at which the layering crumbles into chunks.
   */
  "layered.wrapping.cutting.strategy"?: any;
  /** Manually Specified Cuts:
   * Allows the user to specify her own cuts for a certain graph.
   */
  "layered.wrapping.cutting.cuts"?: any;
  /** MSD Freedom:
   * The MSD cutting strategy starts with an initial guess on the number of chunks the graph should be split into. The freedom specifies how much the strategy may deviate from this guess. E.g. if an initial number of 3 is computed, a freedom of 1 allows 2, 3, and 4 cuts.
   */
  "layered.wrapping.cutting.msd.freedom"?: number;
  /** Validification Strategy:
   * When wrapping graphs, one can specify indices that are not allowed as split points. The validification strategy makes sure every computed split point is allowed.
   */
  "layered.wrapping.validify.strategy"?: any;
  /** Valid Indices for Wrapping:
   * undefined
   */
  "layered.wrapping.validify.forbiddenIndices"?: any;
  /** Improve Cuts:
   * For general graphs it is important that not too many edges wrap backwards. Thus a compromise between evenly-distributed cuts and the total number of cut edges is sought.
   */
  "layered.wrapping.multiEdge.improveCuts"?: boolean;
  /** Distance Penalty When Improving Cuts:
   * undefined
   */
  "layered.wrapping.multiEdge.distancePenalty"?: number;
  /** Improve Wrapped Edges:
   * The initial wrapping is performed in a very simple way. As a consequence, edges that wrap from one chunk to another may be unnecessarily long. Activating this option tries to shorten such edges.
   */
  "layered.wrapping.multiEdge.improveWrappedEdges"?: boolean;
  /** Edge Label Side Selection:
   * Method to decide on edge label sides.
   */
  "layered.edgeLabels.sideSelection"?: any;
  /** Edge Center Label Placement Strategy:
   * Determines in which layer center labels of long edges should be placed.
   */
  "layered.edgeLabels.centerLabelPlacementStrategy"?: any;
  /** Consider Model Order:
   * Preserves the order of nodes and edges in the model file if this does not lead to additional edge crossings. Depending on the strategy this is not always possible since the node and edge order might be conflicting.
   */
  "layered.considerModelOrder.strategy"?: any;
  /** Consider Model Order for Components:
   * If set to NONE the usual ordering strategy (by cumulative node priority and size of nodes) is used. INSIDE_PORT_SIDES orders the components with external ports only inside the groups with the same port side. FORCE_MODEL_ORDER enforces the mode order on components. This option might produce bad alignments and sub optimal drawings in terms of used area since the ordering should be respected.
   */
  "layered.considerModelOrder.components"?: any;
  /** Long Edge Ordering Strategy:
   * Indicates whether long edges are sorted under, over, or equal to nodes that have no connection to a previous layer in a left-to-right or right-to-left layout. Under and over changes to right and left in a vertical layout.
   */
  "layered.considerModelOrder.longEdgeStrategy"?: any;
  /** Crossing Counter Node Order Influence:
   * Indicates with what percentage (1 for 100%) violations of the node model order are weighted against the crossings e.g. a value of 0.5 means two model order violations are as important as on edge crossing. This allows some edge crossings in favor of preserving the model order. It is advised to set this value to a very small positive value (e.g. 0.001) to have minimal crossing and a optimal node order. Defaults to no influence (0).
   */
  "layered.considerModelOrder.crossingCounterNodeInfluence"?: number;
  /** Crossing Counter Port Order Influence:
   * Indicates with what percentage (1 for 100%) violations of the port model order are weighted against the crossings e.g. a value of 0.5 means two model order violations are as important as on edge crossing. This allows some edge crossings in favor of preserving the model order. It is advised to set this value to a very small positive value (e.g. 0.001) to have minimal crossing and a optimal port order. Defaults to no influence (0).
   */
  "layered.considerModelOrder.crossingCounterPortInfluence"?: number;
  /** Desired Edge Length:
   * Either specified for parent nodes or for individual edges, where the latter takes higher precedence.
   */
  "stress.desiredEdgeLength"?: number;
  /** Layout Dimension:
   * Dimensions that are permitted to be altered during layout.
   */
  "stress.dimension"?: any;
  /** Stress Epsilon:
   * Termination criterion for the iterative process.
   */
  "stress.epsilon"?: number;
  /** Iteration Limit:
   * Maximum number of performed iterations. Takes higher precedence than 'epsilon'.
   */
  "stress.iterationLimit"?: number;
  /** Weighting of Nodes:
   * Which weighting to use when computing a node order.
   */
  "mrtree.weighting"?: any;
  /** Search Order:
   * Which search order to use when computing a spanning tree.
   */
  "mrtree.searchOrder"?: any;
  /** Radius:
   * The radius option can be used to set the initial radius for the radial layouter.
   */
  "radial.radius"?: number;
  /** Compaction:
   * With the compacter option it can be determined how compaction on the graph is done. It can be chosen between none, the radial compaction or the compaction of wedges separately.
   */
  "radial.compactor"?: any;
  /** Compaction Step Size:
   * Determine the size of steps with which the compaction is done. Step size 1 correlates to a compaction of 1 pixel per Iteration.
   */
  "radial.compactionStepSize"?: number;
  /** Sorter:
   * Sort the nodes per radius according to the sorting algorithm. The strategies are none, by the given order id, or sorting them by polar coordinates.
   */
  "radial.sorter"?: any;
  /** Annulus Wedge Criteria:
   * Determine how the wedge for the node placement is calculated. It can be chosen between wedge determination by the number of leaves or by the maximum sum of diagonals.
   */
  "radial.wedgeCriteria"?: any;
  /** Translation Optimization:
   * Find the optimal translation of the nodes of the first radii according to this criteria. For example edge crossings can be minimized.
   */
  "radial.optimizationCriteria"?: any;
  /** Force Model:
   * Determines the model for force calculation.
   */
  "force.model"?: any;
  /** Iterations:
   * The number of iterations on the force model.
   */
  "force.iterations"?: number;
  /** FR Temperature:
   * The temperature is used as a scaling factor for particle displacements.
   */
  "force.temperature"?: number;
  /** Eades Repulsion:
   * Factor for repulsive forces in Eades' model.
   */
  "force.repulsion"?: number;
  /** Polyomino Traversal Strategy:
   * Traversal strategy for trying different candidate positions for polyominoes.
   */
  "polyomino.traversalStrategy"?: any;
  /** Polyomino Secondary Sorting Criterion:
   * Possible secondary sorting criteria for the processing order of polyominoes. They are used when polyominoes are equal according to the primary sorting criterion HighLevelSortingCriterion.
   */
  "polyomino.lowLevelSort"?: any;
  /** Polyomino Primary Sorting Criterion:
   * Possible primary sorting criteria for the processing order of polyominoes.
   */
  "polyomino.highLevelSort"?: any;
  /** Fill Polyominoes:
   * Use the Profile Fill algorithm to fill polyominoes to prevent small polyominoes from being placed inside of big polyominoes with large holes. Might increase packing area.
   */
  "polyomino.fill"?: boolean;
  /** Connected Components Compaction Strategy:
   * Strategy for packing different connected components in order to save space and enhance readability of a graph.
   */
  "disco.componentCompaction.strategy"?: any;
  /** Connected Components Layout Algorithm:
   * A layout algorithm that is to be applied to each connected component before the components themselves are compacted. If unspecified, the positions of the components' nodes are not altered.
   */
  "disco.componentCompaction.componentLayoutAlgorithm"?: string;
  /** DCGraph:
   * Access to the DCGraph is intended for the debug view,
   */
  "disco.debug.discoGraph"?: any;
  /** List of Polyominoes:
   * Access to the polyominoes is intended for the debug view,
   */
  "disco.debug.discoPolys"?: any;
  /** Underlying Layout Algorithm:
   * A layout algorithm that is applied to the graph before it is compacted. If this is null, nothing is applied before compaction.
   */
  underlyingLayoutAlgorithm?: string;
  /** Structure Extraction Strategy:
   * This option defines what kind of triangulation or other partitioning of the plane is applied to the vertices.
   */
  "structure.structureExtractionStrategy"?: any;
  /** Tree Construction Strategy:
   * Whether a minimum spanning tree or a maximum spanning tree should be constructed.
   */
  "processingOrder.treeConstruction"?: any;
  /** Cost Function for Spanning Tree:
   * The cost function is used in the creation of the spanning tree.
   */
  "processingOrder.spanningTreeCostFunction"?: any;
  /** Root node for spanning tree construction:
   * The identifier of the node that is preferred as the root of the spanning tree. If this is null, the first node is chosen.
   */
  "processingOrder.preferredRoot"?: string;
  /** Root selection for spanning tree:
   * This sets the method used to select a root node for the construction of a spanning tree
   */
  "processingOrder.rootSelection"?: any;
  /** Compaction Strategy:
   * This option defines how the compaction is applied.
   */
  "compaction.compactionStrategy"?: any;
  /** Orthogonal Compaction:
   * Restricts the translation of nodes to orthogonal directions in the compaction phase.
   */
  "compaction.orthogonal"?: boolean;
  /** Upper limit for iterations of overlap removal:
   * undefined
   */
  "overlapRemoval.maxIterations"?: number;
  /** Whether to run a supplementary scanline overlap check.:
   * undefined
   */
  "overlapRemoval.runScanline"?: boolean;

  [key: string]: any;
}

export interface LayoutOptionsNodes {
  /** Alignment:
   * Alignment of the selected node relative to other nodes; the exact meaning depends on the used algorithm.
   */
  alignment?: any;
  /** Hierarchy Handling:
   * Determines whether separate layout runs are triggered for different compound nodes in a hierarchical graph. Setting a node's hierarchy handling to `INCLUDE_CHILDREN` will lay out that node and all of its descendants in a single layout run, until a descendant is encountered which has its hierarchy handling set to `SEPARATE_CHILDREN`. In general, `SEPARATE_CHILDREN` will ensure that a new layout run is triggered for a node with that setting. Including multiple levels of hierarchy in a single layout run may allow cross-hierarchical edges to be laid out properly. If the root node is set to `INHERIT` (or not set at all), the default behavior is `SEPARATE_CHILDREN`.
   */
  hierarchyHandling?: any;
  /** Padding:
   * The padding to be left to a parent element's border when placing child elements. This can also serve as an output option of a layout algorithm if node size calculation is setup appropriately.
   */
  padding?: any;
  /** Port Constraints:
   * Defines constraints of the position of the ports of a node.
   */
  portConstraints?: any;
  /** Position:
   * The position of a node, port, or label. This is used by the 'Fixed Layout' algorithm to specify a pre-defined position.
   */
  position?: any;
  /** Priority:
   * Defines the priority of an object; its meaning depends on the specific layout algorithm and the context where it is used.
   */
  priority?: number;
  /** Comment Box:
   * Whether the node should be regarded as a comment box instead of a regular node. In that case its placement should be similar to how labels are handled. Any edges incident to a comment box specify to which graph elements the comment is related.
   */
  commentBox?: boolean;
  /** Hypernode:
   * Whether the node should be handled as a hypernode.
   */
  hypernode?: boolean;
  /** Margins:
   * Margins define additional space around the actual bounds of a graph element. For instance, ports or labels being placed on the outside of a node's border might introduce such a margin. The margin is used to guarantee non-overlap of other graph elements with those ports or labels.
   */
  margins?: any;
  /** No Layout:
   * No layout is done for the associated element. This is used to mark parts of a diagram to avoid their inclusion in the layout graph, or to mark parts of the layout graph to prevent layout engines from processing them. If you wish to exclude the contents of a compound node from automatic layout, while the node itself is still considered on its own layer, use the 'Fixed Layout' algorithm for that node.
   */
  noLayout?: boolean;
  /** Scale Factor:
   * The scaling factor to be applied to the corresponding node in recursive layout. It causes the corresponding node's size to be adjusted, and its ports and labels to be sized and placed accordingly after the layout of that node has been determined (and before the node itself and its siblings are arranged). The scaling is not reverted afterwards, so the resulting layout graph contains the adjusted size and position data. This option is currently not supported if 'Layout Hierarchy' is set.
   */
  scaleFactor?: number;
  /** Port Spacing:
   * Spacing between pairs of ports of the same node.
   */
  "spacing.portPort"?: number;
  /** Individual Spacing:
   * Allows to specify individual spacing values for graph elements that shall be different from the value specified for the element's parent.
   */
  "spacing.individual"?: any;
  /** Layout Partition:
   * Partition to which the node belongs. This requires Layout Partitioning to be active. Nodes with lower partition IDs will appear to the left of nodes with higher partition IDs (assuming a left-to-right layout direction).
   */
  "partitioning.partition"?: number;
  /** Node Label Placement:
   * Hints for where node labels are to be placed; if empty, the node label's position is not modified.
   */
  "nodeLabels.placement"?: any;
  /** Port Alignment:
   * Defines the default port distribution for a node. May be overridden for each side individually.
   */
  "portAlignment.default"?: any;
  /** Port Alignment (North):
   * Defines how ports on the northern side are placed, overriding the node's general port alignment.
   */
  "portAlignment.north"?: any;
  /** Port Alignment (South):
   * Defines how ports on the southern side are placed, overriding the node's general port alignment.
   */
  "portAlignment.south"?: any;
  /** Port Alignment (West):
   * Defines how ports on the western side are placed, overriding the node's general port alignment.
   */
  "portAlignment.west"?: any;
  /** Port Alignment (East):
   * Defines how ports on the eastern side are placed, overriding the node's general port alignment.
   */
  "portAlignment.east"?: any;
  /** Node Size Constraints:
   * What should be taken into account when calculating a node's size. Empty size constraints specify that a node's size is already fixed and should not be changed.
   */
  "nodeSize.constraints"?: any;
  /** Node Size Options:
   * Options modifying the behavior of the size constraints set on a node. Each member of the set specifies something that should be taken into account when calculating node sizes. The empty set corresponds to no further modifications.
   */
  "nodeSize.options"?: any;
  /** Node Size Minimum:
   * The minimal size to which a node can be reduced.
   */
  "nodeSize.minimum"?: any;
  /** Port Label Placement:
   * Decides on a placement method for port labels; if empty, the node label's position is not modified.
   */
  "portLabels.placement"?: any;
  /** Port Labels Next to Port:
   * Use 'portLabels.placement': NEXT_TO_PORT_OF_POSSIBLE.
   */
  "portLabels.nextToPortIfPossible"?: boolean;
  /** Treat Port Labels as Group:
   * If this option is true (default), the labels of a port will be treated as a group when it comes to centering them next to their port. If this option is false, only the first label will be centered next to the port, with the others being placed below. This only applies to labels of eastern and western ports and will have no effect if labels are not placed next to their port.
   */
  "portLabels.treatAsGroup"?: boolean;
  /** Activate Inside Self Loops:
   * Whether this node allows to route self loops inside of it instead of around it. If set to true, this will make the node a compound node if it isn't already, and will require the layout algorithm to support compound nodes with hierarchical ports.
   */
  "insideSelfLoops.activate"?: boolean;
  /** Layer Constraint:
   * Determines a constraint on the placement of the node regarding the layering.
   */
  "layered.layering.layerConstraint"?: any;
  /** Layer Choice Constraint:
   * Allows to set a constraint regarding the layer placement of a node. Let i be the value of teh constraint. Assumed the drawing has n layers and i < n. If set to i, it expresses that the node should be placed in i-th layer. Should i>=n be true then the node is placed in the last layer of the drawing. Note that this option is not part of any of ELK Layered's default configurations but is only evaluated as part of the `InteractiveLayeredGraphVisitor`, which must be applied manually or used via the `DiagramLayoutEngine.
   */
  "layered.layering.layerChoiceConstraint"?: number;
  /** Layer ID:
   * Layer identifier that was calculated by ELK Layered for a node. This is only generated if interactiveLayot or generatePositionAndLayerIds is set.
   */
  "layered.layering.layerId"?: number;
  /** Position Choice Constraint:
   * Allows to set a constraint regarding the position placement of a node in a layer. Assumed the layer in which the node placed includes n other nodes and i < n. If set to i, it expresses that the node should be placed at the i-th position. Should i>=n be true then the node is placed at the last position in the layer. Note that this option is not part of any of ELK Layered's default configurations but is only evaluated as part of the `InteractiveLayeredGraphVisitor`, which must be applied manually or used via the `DiagramLayoutEngine.
   */
  "layered.crossingMinimization.positionChoiceConstraint"?: number;
  /** Position ID:
   * Position within a layer that was determined by ELK Layered for a node. This is only generated if interactiveLayot or generatePositionAndLayerIds is set.
   */
  "layered.crossingMinimization.positionId"?: number;
  /** Node Flexibility:
   * Aims at shorter and straighter edges. Two configurations are possible: (a) allow ports to move freely on the side they are assigned to (the order is always defined beforehand), (b) additionally allow to enlarge a node wherever it helps. If this option is not configured for a node, the 'nodeFlexibility.default' value is used, which is specified for the node's parent.
   */
  "layered.nodePlacement.networkSimplex.nodeFlexibility"?: any;
  /** Self-Loop Distribution:
   * Alter the distribution of the loops around the node. It only takes effect for PortConstraints.FREE.
   */
  "layered.edgeRouting.selfLoopDistribution"?: any;
  /** Self-Loop Ordering:
   * Alter the ordering of the loops they can either be stacked or sequenced. It only takes effect for PortConstraints.FREE.
   */
  "layered.edgeRouting.selfLoopOrdering"?: any;
  /** No Model Order:
   * Set on a node to not set a model order for this node even though it is a real node.
   */
  "layered.considerModelOrder.noModelOrder"?: boolean;
  /** Fixed Position:
   * Prevent that the node is moved by the layout algorithm.
   */
  "stress.fixed"?: boolean;
  /** Order ID:
   * The id can be used to define an order for nodes of one radius. This can be used to sort them in the layer accordingly.
   */
  "radial.orderId"?: number;
  /** Optimization Goal:
   * Optimization goal for approximation of the bounding box given by the first iteration. Determines whether layout is sorted by the maximum scaling, aspect ratio, or area. Depending on the strategy the aspect ratio might be nearly ignored.
   */
  "rectpacking.optimizationGoal"?: any;
  /** Shift Last Placed.:
   * When placing a rectangle behind or below the last placed rectangle in the first iteration, it is sometimes possible to shift the rectangle further to the left or right, resulting in less whitespace. True (default) enables the shift and false disables it. Disabling the shift produces a greater approximated area by the first iteration and a layout, when using ONLY the first iteration (default not the case), where it is sometimes impossible to implement a size transformation of rectangles that will fill the bounding box and eliminate empty spaces.
   */
  "rectpacking.lastPlaceShift"?: boolean;
  /** Current position of a node in the order of nodes:
   * The rectangles are ordered. Normally according to their definition the the model. This option specifies the current position of a node.
   */
  "rectpacking.currentPosition"?: number;
  /** Desired index of node:
   * The rectangles are ordered. Normally according to their definition the the model. This option allows to specify a desired position that has preference over the original position.
   */
  "rectpacking.desiredPosition"?: number;
  /** Only Area Approximation:
   * If enabled only the width approximation step is executed and the nodes are placed accordingly. The nodes are layouted according to the packingStrategy. If set to true not expansion of nodes is taking place.
   */
  "rectpacking.onlyFirstIteration"?: boolean;
  /** Compact Rows:
   * Enables compaction. Compacts blocks if they do not use the full height of the row. This option allows to have a smaller drawing. If this option is disabled all nodes are placed next to each other in rows.
   */
  "rectpacking.rowCompaction"?: boolean;
  /** Fit Aspect Ratio:
   * Expands nodes if expandNodes is true to fit the aspect ratio instead of only in their bounds. The option is only useful if the used packingStrategy is ASPECT_RATIO_DRIVEN, otherwise this may result in unreasonable ndoe expansion.
   */
  "rectpacking.expandToAspectRatio"?: boolean;
  /** Target Width:
   * Option to place the rectangles in the given target width instead of approximating the width using the desired aspect ratio. The padding is not included in this. Meaning a drawing will have width of targetwidth + horizontal padding.
   */
  "rectpacking.targetWidth"?: number;

  [key: string]: any;
}

export interface LayoutOptionsEdges {
  /** Bend Points:
   * A fixed list of bend points for the edge. This is used by the 'Fixed Layout' algorithm to specify a pre-defined routing for an edge. The vector chain must include the source point, any bend points, and the target point, so it must have at least two points.
   */
  bendPoints?: any;
  /** Priority:
   * Defines the priority of an object; its meaning depends on the specific layout algorithm and the context where it is used.
   */
  priority?: number;
  /** Junction Points:
   * This option is not used as option, but as output of the layout algorithms. It is attached to edges and determines the points where junction symbols should be drawn in order to represent hyperedges with orthogonal routing. Whether such points are computed depends on the chosen layout algorithm and edge routing style. The points are put into the vector chain with no specific order.
   */
  junctionPoints?: any;
  /** No Layout:
   * No layout is done for the associated element. This is used to mark parts of a diagram to avoid their inclusion in the layout graph, or to mark parts of the layout graph to prevent layout engines from processing them. If you wish to exclude the contents of a compound node from automatic layout, while the node itself is still considered on its own layer, use the 'Fixed Layout' algorithm for that node.
   */
  noLayout?: boolean;
  /** Individual Spacing:
   * Allows to specify individual spacing values for graph elements that shall be different from the value specified for the element's parent.
   */
  "spacing.individual"?: any;
  /** Inside Self Loop:
   * Whether a self loop should be routed inside a node instead of around that node.
   */
  "insideSelfLoops.yo"?: boolean;
  /** Edge Thickness:
   * The thickness of an edge. This is a hint on the line width used to draw an edge, possibly requiring more space to be reserved for it.
   */
  "edge.thickness"?: number;
  /** Edge Type:
   * The type of an edge. This is usually used for UML class diagrams, where associations must be handled differently from generalizations.
   */
  "edge.type"?: any;
  /** Direction Priority:
   * Defines how important it is to have a certain edge point into the direction of the overall layout. This option is evaluated during the cycle breaking phase.
   */
  "layered.priority.direction"?: number;
  /** Shortness Priority:
   * Defines how important it is to keep an edge as short as possible. This option is evaluated during the layering phase.
   */
  "layered.priority.shortness"?: number;
  /** Straightness Priority:
   * Defines how important it is to keep an edge straight, i.e. aligned with one of the two axes. This option is evaluated during node placement.
   */
  "layered.priority.straightness"?: number;
  /** Desired Edge Length:
   * Either specified for parent nodes or for individual edges, where the latter takes higher precedence.
   */
  "stress.desiredEdgeLength"?: number;
  /** Repulsive Power:
   * Determines how many bend points are added to the edge; such bend points are regarded as repelling particles in the force model
   */
  "force.repulsivePower"?: number;

  [key: string]: any;
}

export interface LayoutOptionsPorts {
  /** Position:
   * The position of a node, port, or label. This is used by the 'Fixed Layout' algorithm to specify a pre-defined position.
   */
  position?: any;
  /** No Layout:
   * No layout is done for the associated element. This is used to mark parts of a diagram to avoid their inclusion in the layout graph, or to mark parts of the layout graph to prevent layout engines from processing them. If you wish to exclude the contents of a compound node from automatic layout, while the node itself is still considered on its own layer, use the 'Fixed Layout' algorithm for that node.
   */
  noLayout?: boolean;
  /** Individual Spacing:
   * Allows to specify individual spacing values for graph elements that shall be different from the value specified for the element's parent.
   */
  "spacing.individual"?: any;
  /** Port Anchor Offset:
   * The offset to the port position where connections shall be attached.
   */
  "port.anchor"?: any;
  /** Port Index:
   * The index of a port in the fixed order around a node. The order is assumed as clockwise, starting with the leftmost port on the top side. This option must be set if 'Port Constraints' is set to FIXED_ORDER and no specific positions are given for the ports. Additionally, the option 'Port Side' must be defined in this case.
   */
  "port.index"?: number;
  /** Port Side:
   * The side of a node on which a port is situated. This option must be set if 'Port Constraints' is set to FIXED_SIDE or FIXED_ORDER and no specific positions are given for the ports.
   */
  "port.side"?: any;
  /** Port Border Offset:
   * The offset of ports on the node border. With a positive offset the port is moved outside of the node, while with a negative offset the port is moved towards the inside. An offset of 0 means that the port is placed directly on the node border, i.e. if the port side is north, the port's south border touches the nodes's north border; if the port side is east, the port's west border touches the nodes's east border; if the port side is south, the port's north border touches the node's south border; if the port side is west, the port's east border touches the node's west border.
   */
  "port.borderOffset"?: number;
  /** Allow Non-Flow Ports To Switch Sides:
   * Specifies whether non-flow ports may switch sides if their node's port constraints are either FIXED_SIDE or FIXED_ORDER. A non-flow port is a port on a side that is not part of the currently configured layout flow. For instance, given a left-to-right layout direction, north and south ports would be considered non-flow ports. Further note that the underlying criterium whether to switch sides or not solely relies on the minimization of edge crossings. Hence, edge length and other aesthetics criteria are not addressed.
   */
  "layered.allowNonFlowPortsToSwitchSides"?: boolean;

  [key: string]: any;
}

export interface LayoutOptionsLabels {
  /** Position:
   * The position of a node, port, or label. This is used by the 'Fixed Layout' algorithm to specify a pre-defined position.
   */
  position?: any;
  /** Label Manager:
   * Label managers can shorten labels upon a layout algorithm's request.
   */
  labelManager?: any;
  /** No Layout:
   * No layout is done for the associated element. This is used to mark parts of a diagram to avoid their inclusion in the layout graph, or to mark parts of the layout graph to prevent layout engines from processing them. If you wish to exclude the contents of a compound node from automatic layout, while the node itself is still considered on its own layer, use the 'Fixed Layout' algorithm for that node.
   */
  noLayout?: boolean;
  /** Individual Spacing:
   * Allows to specify individual spacing values for graph elements that shall be different from the value specified for the element's parent.
   */
  "spacing.individual"?: any;
  /** Node Label Placement:
   * Hints for where node labels are to be placed; if empty, the node label's position is not modified.
   */
  "nodeLabels.placement"?: any;
  /** Edge Label Placement:
   * Gives a hint on where to put edge labels.
   */
  "edgeLabels.placement"?: any;
  /** Inline Edge Labels:
   * If true, an edge label is placed directly on its edge. May only apply to center edge labels. This kind of label placement is only advisable if the label's rendering is such that it is not crossed by its edge and thus stays legible.
   */
  "edgeLabels.inline"?: boolean;
  /** Font Name:
   * Font name used for a label.
   */
  "font.name"?: string;
  /** Font Size:
   * Font size used for a label.
   */
  "font.size"?: number;
  /** Edge Center Label Placement Strategy:
   * Determines in which layer center labels of long edges should be placed.
   */
  "layered.edgeLabels.centerLabelPlacementStrategy"?: any;

  [key: string]: any;
}

// generated by File GenerateTypings\LayoutOptions.js
export interface LayoutOptions
  extends LayoutOptionsParents,
    LayoutOptionsNodes,
    LayoutOptionsEdges,
    LayoutOptionsPorts,
    LayoutOptionsLabels {}

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
  layout(graph: ElkNode, args?: ElkLayoutArguments): Promise<ElkNode>;
  knownLayoutAlgorithms(): Promise<ElkLayoutAlgorithmDescription[]>
  knownLayoutOptions(): Promise<ElkLayoutOptionDescription[]>
  knownLayoutCategories(): Promise<ElkLayoutCategoryDescription[]>
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
