/*******************************************************************************
 * Copyright (c) 2017 Kiel University and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *******************************************************************************/
package org.eclipse.elk.js.linker;

import java.util.Set;

import com.google.gwt.core.ext.LinkerContext;
import com.google.gwt.core.ext.TreeLogger;
import com.google.gwt.core.ext.UnableToCompleteException;
import com.google.gwt.core.ext.linker.AbstractLinker;
import com.google.gwt.core.ext.linker.ArtifactSet;
import com.google.gwt.core.ext.linker.CompilationResult;
import com.google.gwt.core.ext.linker.LinkerOrder;
import com.google.gwt.dev.util.DefaultTextOutput;

/**
 * A custom linker that creates a plain javascript file
 * that can be used with node.js.
 */
@LinkerOrder(LinkerOrder.Order.PRIMARY)
public class NodeJsModuleLinker extends AbstractLinker {

    /**
     * {@inheritDoc}
     */
    public ArtifactSet link(final TreeLogger logger, final LinkerContext context,
            final ArtifactSet artifacts) throws UnableToCompleteException {

        ArtifactSet toReturn = new ArtifactSet(artifacts);
        DefaultTextOutput out = new DefaultTextOutput(true);

        // get compilation result
        Set<CompilationResult> results = artifacts.find(CompilationResult.class);
        CompilationResult result = results.iterator().next();
        // get the generated javascript
        String[] javaScript = result.getJavaScript();

        out.print("'use strict';");
        out.newline();
        // create dummies for several things requested by gwt
        out.newline();
        out.print("// -------------- ");
        out.print("   FAKE ELEMENTS GWT ASSUMES EXIST");
        out.print("   -------------- ");
        out.newline();
        // node provides most elements of a browser's window
        out.print("var $wnd;");
        out.newline();
        out.print("if (typeof window !== 'undefined')");
        out.newline();
        out.print("    $wnd = window");
        out.newline();
        out.print("else if (typeof global !== 'undefined')");
        out.newline();
        out.print("    $wnd = global // nodejs");
        out.newline();
        out.print("else if (typeof self !== 'undefined')");
        out.newline();
        out.print("    $wnd = self // web worker");
        out.newline();
        out.newline();

        out.print("var $moduleName,");
        out.newline();
        out.print("    $moduleBase;");
        out.newline();
        out.newline();

        // Workaround for strict mode, see #127
        out.print("// -------------- ");
        out.print("   WORKAROUND STRICT MODE, SEE #127 ");
        out.print("   -------------- ");
        out.newline();
        if (context.isOutputCompact()) {
            out.print("var g, i, o;");
        } else {
            out.print("var _xblockexpression;");
        }
        out.newline();
        out.newline();
        
        out.print("// -------------- ");
        out.print("   GENERATED CODE ");
        out.print("   -------------- ");
        out.newline();

        // add the generade js to the output
        out.print(javaScript[0]);
        out.newline();

        out.print("// -------------- ");
        out.print("   RUN GWT INITIALIZATION CODE ");
        out.print("   -------------- ");
        out.newline();
        out.print("gwtOnLoad(null, '" + context.getModuleName() + "', null);");
        out.newline();

        // the filename of the resulting .js file
        String filename = context.getModuleName() + "-worker.js";
        toReturn.add(emitString(logger, out.toString(), filename));

        return toReturn;
    }

    @Override
    public String getDescription() {
        return "A linker that generates javascript code that can be"
                + " used as a node.js module.";
    }

}
