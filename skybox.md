# How to create a Skybox in Playcanvas

**Step 1:** Download this [blender file](https://github.com/michael-collins/playcanvas-utility-scripts/blob/fcc245d3907195712d99df3fd72fd975b3161839/skybox-generator.blend?raw=true)

**Step 2:** Bake a Cubemap

![blender](https://github.com/michael-collins/playcanvas-utility-scripts/blob/fcc245d3907195712d99df3fd72fd975b3161839/rendering-a-cube-map.png)

**Step 3:** Download the [photoshop cubemap generator template](https://github.com/michael-collins/playcanvas-utility-scripts/blob/f261f2097d843608062bcfed03092607d7cd3d6e/CubeMapGenerator_4096.psd?raw=true)

**Step 4:** Open the baked cubemap in Photoshop and copy the image

![Cubemap image](https://github.com/michael-collins/playcanvas-utility-scripts/blob/f261f2097d843608062bcfed03092607d7cd3d6e/cubemap-photoshop.png)

**Step 4:** Paste and align the image in each artboard of the template file, recreating the cubemap.

![Photoshop template](https://github.com/michael-collins/playcanvas-utility-scripts/blob/9432d895f6ee58d512d49e745d42f2b78120f8db/photoshop-template.png?raw=true)

**Step 5:** Export the artboards to individual files

![Photoshop export](https://github.com/michael-collins/playcanvas-utility-scripts/blob/fcc245d3907195712d99df3fd72fd975b3161839/ExportingCubeMapTiles.png)
![Tiles](https://github.com/michael-collins/playcanvas-utility-scripts/blob/edd6a68f1cf927652ab24a0a133caa322dbc8d30/tiles.png)

**Step 6:** Add cubemap tiles to Playcanvas and replace the default tiles in the cubemap component

![Skybox in Playcanvas](https://github.com/michael-collins/playcanvas-utility-scripts/blob/458dd7a4c875b975f45b42ce3d64103fcfb8f65d/playcanvas-skybox.png)
