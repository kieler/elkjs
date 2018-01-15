/*******************************************************************************
 * Copyright (c) 2018 Kiel University and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *******************************************************************************/
package org.eclipse.elk.alg.common.utils;

import org.eclipse.elk.core.math.ElkRectangle;
import org.eclipse.elk.core.math.KVector;

/**
 * Emulation that does nothing.
 */
public class SVGImage {
    /** Path to the file where the image should be saved. The file extension
     *  and a possible numeration are appended automatically. */
    public String fileName = null;
    /** Enables the outpout. */
    public boolean debug = false;
    /** The image will be scaled down if it exceeds this size. */
    public double maxArea = 8294400; // 4k

    /**
     * The constructor disables the output if the filename is null.
     * 
     * @param file the SVG's filename
     */
    public SVGImage(final String file) {
    }
    
    /**
     * Select an SVG group.
     * 
     * @param key the identifier of an existing or a new group
     * @return the image with the selected group being active
     */
    public SVGImage g(final String key) {
        return this;
    }

    /**
     * Add SVG groups.
     * 
     * @param keys the new groups' identifiers
     */
    public void addGroups(final String... keys) {
    }
    
    /**
     * Clears the specified group.
     * 
     * @param key identifier of the group
     */
    public void clearGroup(final String key) {
    }

    /**
     * Removes group.
     * 
     * @param key identifier of the group
     */
    public void removeGroup(final String key) {
    }

    /**
     * Sets the SVG's viewbox to a fixed size and position and disables its
     * automatic updating.
     * 
     * @param x x
     * @param y y
     * @param w width
     * @param h height
     */
    public void setViewBox(final double x, final double y, final double w, final double h) {
    }

    /**
     * Clears the entire image and resets the output according to the 
     * availability of a filename.
     */
    public void clear() {
    }
    
    // CHECKSTYLEOFF Javadoc

    public void addElementStr(final String element) {
    }

    public void addCircle(final double x, final double y) {
    }

    public void addCircle(final double x, final double y, final double r, final String attributes) {
    }

    public void addLine(final double x1, final double y1, final double x2, final double y2) {
    }

    public void addLine(final double x1, final double y1, final double x2, final double y2, final String attributes) {
    }

    public void addRect(final double x, final double y, final double w, final double h, final String attributes) {
    }

    public void addRect(final ElkRectangle r, final String attributes) {
    }

    public void addPoly(final String attributes, final KVector... points) {
    }
    
    public void addText(final double x, final double y, final String text, final String attributes) {
    }

    private void updateViewBox(final KVector... points) {
    }

    /**
     * Writes the SVG to the given file.
     * 
     * @param fName filename without file extension
     */
    public void save(final String fName) {
    }

    /**
     * Writes the SVG.
     */
    public void save() {
    }

    /**
     * Writes the SVG to the given file and appends an incrementing number.
     * 
     * @param fName filename without file extension
     */
    public void isave(final String fName) {
    }

    /**
     * Writes the SVG and appends an incrementing number.
     */
    public void isave() {
    }
}
