/*******************************************************************************
 * Copyright (c) 2019 TypeFox and others.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 *******************************************************************************/

export interface LayoutOptions {
    [key: string]: string
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
