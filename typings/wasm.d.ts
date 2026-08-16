/*******************************************************************************
 * Copyright (c) 2026 Kiel University and others.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 *******************************************************************************/

import type { ELK, LayoutOptions } from "./elk-api";

export interface WasmLocateFile {
  (name: string): string | URL;
}

export interface CreateELKArguments {
  defaultLayoutOptions?: LayoutOptions;
  algorithms?: string[];
  locateFile?: WasmLocateFile;
}

export function createELK(args?: CreateELKArguments): Promise<ELK>;
export default createELK;
