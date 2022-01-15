---
layout: layouts/post.njk
title: Prepare SVG for import
date:   2022-01-15
---

SVG is a very particular format for 2 main reasons: 
- It is written in `XML`: most of the time "human readable", just like our good ol' `HTML`.  
- It is a vector based graphic, which make it easily scalable (it is in the name: Scalable Vector Graphics)

For a bit more details, you can check out MDN Documentation page [SVG: Scalable Vector Graphics](https://developer.mozilla.org/en-US/docs/Web/SVG)https://www.w3.org/TR/2018/CR-SVG2-20181004/

Now let's have a look at how to integrate SVG documents into your dev workflow.


## Design Handoff

Most of the time, the developer is provided with either a raw SVG file or even have to make the export himself from the design app, Sketch, Figma, Adobe XD or Illustrator. In the latter case, we often need to extract part of the graphic, from an High fidelity mockup or from a Icon collection board.

At this point, we need to make some contextual decisions: what will be the viewport of you image, how is it supposed to scale, and how flexible it must be ?
## Layout
### Canvas
  
### ViewBox

Check the documentation of the  [viewBox attribute on MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox)

This attribute is not exactly mandatory but there is only very few use cases where you would not want to set it (check Lea Verou talk in the resources at the end of this article).  If no unit is provided the default is `px` or user units

> I am referring here to the viewBox attribute on the `svg` element, but it is interesting to point out that there is other "non-root" element that can also make use of it, such as `view`, `marker`, `pattern` and `symbol`. Those elements are useful to define reusable part, we will explore them on another article. 

On a integration task specification, we will often get size requirements for our visual elements. The `viewBox` has no impact on this constraint. You can choose any suitable values but most of the time you will want it to respect the aspect ratio of the final result. The viewBox define which part of the svg canvas can be visible. 

It is expressed as follow:
```svg
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">...</svg>
```
We have 4 values, `min-x min-y width height`.

`min-x` and `min-y` 
Describe the origin of the SVG grid. Most of the we want to keep them at `0` as it make math easier, but this can still be useful for animation or SVG *sprites*. Sara article, linked at the end of this article explore this aspect in depth.

`width` and `height`
They are pretty much what we can expect, with one important point: they are unitless, they are not related to any pixel convention. That said, they often use the sames value as the expected size in the final document. This is purely for convenience: you should choose the values for readability making the math inside the SVG easier, in case you plan to animate the svg later. In most cases for simple elements, for example icons, you should keep the coordinate systems in sync with the design expectation.

#### Points of cautions:

SVG are scalable but it does not solve everything. 
- **Sometimes not precise enough:** since the elements must eventually be translated to pixel, the vectors will be rasterized just like how text font work. This can have unwanted side effect if some parts of the graphic are too close to the edge of a clipped area (like what `viewBox` create). This is especially frequent on curved elements. This must be taken into account when choosing the viewBox: the easiest way to solve this is to reserve a small **safe zone** around the elements you want to be displayed. **This is rarely simple to do directly in the code and you will either have to use a *GUI* SVG Editor application or ask your designer to take this into account when preparing the assets.**  

- Graphics are designed with a certain size in mind. Even if it can scale nicely and adapt to different resolution properly, deviating from the original intent can make it less relevant. If it is scaled down, some details may not be visible anymore. On the opposite side, a small and simple icon can be very pertinent at small size, but be pretty boring if scaled too much. Do not expect miracle and use separate elements if necessary. There is smart solution leveraging media-query that you could explore, you can find related links in the resources section.

### Height and Width:
This pair of attributes is sometime referred to as viewport, not to confuse with `viewBox` or the browser window viewport. The height and width attribute of the svg element define how the svg viewport will be sized on the screen: the size it will be drawn to. Contrary to the height and width values of the `viewBox` attribute, we are dealing with units here. You do not have to use one, in which case it will probably resolve to `px`. Other possible values are the same as the one defined in CSS (em, ex, px, pt, pc, cm, mm, in and percentages).
Those attributes are not mandatory and will default to the value `auto`, which is equivalent to `100%`. 

In general, to keep thing generic you will probably skip those values when working with components and rely on CSS and or props to set the viewport properly.

### preserveAspectRatio

[MDN, preserveAspectRatio](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio)
If you read the points above, you may have realised that it is possible that the ratio expressed by the `viewBox` is different from the one defined by the given `height` and `width` attibutes. The `preserveAspectRatio` attribute let you define how the `viewBox` will fill the viewport (`height` and `width`, remember). This is most probably the ancestor of the CSS Object-fit property that you may already have encountered. However, the syntax is a bit more though as it also manage the origin of scaling transformation applied.

```
preserveAspectRatio="<align> [<meetOrSlice>]"

```
`<align>` is a string values compose of alignment type (Min, Mid, Max) for both axis (x, Y) like the following examples: `xMidYMax` or `xMaxYMin` or the value `none`.

There is little chance you need to use this attribute if you keep your SVG viewport in sync with its viewBox, however in more complex scenario, it can become handy to use them.

## Goint further with Layout
I hope the part above was enough to have a simple understanding of how SVG can behave. However I only scratch the surface. Fortunately, 
Sara Soueidan did an amazing job explaining in depth everything there is to know about the part I briefly mentioned above and you should definitively check her series ["Understanding SVG Coordinate Systems and Transformations"](https://www.sarasoueidan.com/blog/svg-coordinate-systems/) (All series in the resource at the end of this page)

## Clean an optimise the SVG syntax




## Other resources

### Specification and Documentation
- [Scalable Vector Graphics (SVG) 2 [CR], latest version](https://www.w3.org/TR/SVG2/)
- [MDN, SVG: Scalable Vector Graphics ](https://developer.mozilla.org/en-US/docs/Web/SVG)

### Articles
- [Understanding SVG Coordinate Systems and Transformations Part 1: The viewport, viewBox, and preserveAspectRatio - Sara Soueidan, 17.07.2014](https://www.sarasoueidan.com/blog/svg-coordinate-systems/)
- [Understanding SVG Coordinate Systems and Transformations Part 2: The transform Attribute, Sara Soueidan, 30.07.2014](https://www.sarasoueidan.com/blog/svg-coordinate-systems/)
- [Understanding SVG Coordinate Systems and Transformations Part 3: Establishing New Viewports, Sara Soueidan, 05.08.2014](https://www.sarasoueidan.com/blog/svg-coordinate-systems/)
- [Making SVGs Responsive With CSS, Sara Soueidan, 19.08.2014](https://www.sarasoueidan.com/blog/responsive-svgs/)
- [SVG & media queries, Jake Archibald, 10.10.2016](https://jakearchibald.com/2016/svg-media-queries/)

### Video and podcast
- [051: Styling SVG in CSS, The CSS Podcast, 07.2021](https://open.spotify.com/episode/0XTZOuRuQ5nSxTAUJ9H7AY?si=NOgZucQyQHONaSfTlh28FQ)
- [Lea Verou: The web design cheat code: Using SVG to bridge CSS’ gaps](https://www.youtube.com/watch?v=6qSN50Qk_54&ab_channel=FrontendUnited)

