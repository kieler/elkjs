/*******************************************************************************
 * Copyright (c) 2019 TypeFox and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *******************************************************************************/

export interface LayoutOptions {
    [key: string]: string
}

export interface ElkPoint {
    x: number
    y: number
}

export interface ElkGraphElement {
    id: string
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
    children?: ElkNode[]
    ports?: ElkPort[]
    edges?: ElkEdge[]
}

export interface ElkPort extends ElkShape { }

export interface ElkLabel extends ElkShape {
    text: string
}

export interface ElkEdge extends ElkGraphElement {
    junctionPoints?: ElkPoint[]
}

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
    sections: ElkEdgeSection[]
}

export interface ElkEdgeSection extends ElkGraphElement {
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
    knownLayoutAlgorithms(): Promise<ElkLayoutAlgorithmDescription>
    knownLayoutOptions(): Promise<ElkLayoutOptionDescription>
    knownLayoutCategories(): Promise<ElkLayoutCategoryDescription>
}

export interface ELKConstructorArguments {
    defaultLayoutOptions?: LayoutOptions
    algorithms?: string[]
    workerUrl?: string
}

declare const ElkConstructor: {
    new(args?: ELKConstructorArguments): ELK;
};
export default ElkConstructor;
