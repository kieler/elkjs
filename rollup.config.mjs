/*******************************************************************************
 * Copyright (c) 2025 Kiel University and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * https://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GPL-3.0 which is available at
 * https://www.gnu.org/licenses/gpl-3.0-standalone.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-3.0-or-later
 *******************************************************************************/

import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

const plugins = [
  nodeResolve({ browser: true }),
  commonjs()
]

const umd = (file) => ({
  file,
  format: 'umd',
  name: 'ELK',
  exports: 'auto'
})

export default [
  {
    // API only; the worker is provided separately at runtime.
    input: 'build/js/main-api.js',
    output: umd('lib/elk-api.js'),
    plugins
  },
  {
    // Everything in one file: API + the inlined GWT worker.
    input: 'build/js/main-node.js',
    output: umd('lib/elk.bundled.js'),
    plugins
  }
]
