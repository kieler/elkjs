/*******************************************************************************
 * Copyright (c) 2020 Kiel University and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *******************************************************************************/
package org.eclipse.elk.js;

import org.eclipse.elk.core.*;
import org.eclipse.elk.core.data.*;
import org.eclipse.elk.core.options.*;
import org.eclipse.elk.core.util.*;

import org.eclipse.elk.alg.layered.options.*;

/**
 * 
 */
public class ElkJsBytecoder  {

    private static final LayoutMetaDataService SERVICE = LayoutMetaDataService.getInstance();

    public static void main(String[] args) {
        registerLayoutAlgorithms(null);
    }

    public static void registerLayoutAlgorithms(final Object arrayObj) {
        // Note that since ELK changed the registration mechanism to service loaders (ELK #402),
        // it is necessary to manually register the core options as well. 
        SERVICE.registerLayoutMetaDataProviders(new CoreOptions());

        // TODO Next level for bytecoder:
        // SERVICE.registerLayoutMetaDataProviders(new LayeredMetaDataProvider());

        // TODO And another level: 
        // new RecursiveGraphLayoutEngine().layout(null, null);

        // TODO Afterwards, try converting json graph etc ...

        System.out.println("Done");
    }

}
