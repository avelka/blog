---
layout: layouts/post.njk
title: Introduction to SVG | Preview
tags: ['draft','SVG', 'Icons', 'Ui/Ux', 'DeveloperExperience']
date:   2022-01-16
---

SVG is a very particular format for 2 main reasons: 
- It is written in `XML`: most of the time "human readable", just like our good ol' `HTML`.  
- It is a vector based graphic, which make it easily scalable (it is in the name: Scalable Vector Graphics)

For a bit more details, you can check out MDN Documentation page [SVG: Scalable Vector Graphics](https://developer.mozilla.org/en-US/docs/Web/SVG)https://www.w3.org/TR/2018/CR-SVG2-20181004/

Now let's have a look at how to integrate SVG documents into your dev workflow.

Most of the time, the developer is provided with either a raw SVG file or even have to make the export himself from the design app, Sketch, Figma, Adobe XD or Illustrator. In the latter case, we often need to extract part of the graphic, from a high fidelity mockup or from a icon collection board.

At this point, we need to make some contextual decisions: what will be the viewport of you image, how is it supposed to scale, and how flexible it must be ?

## Layout
  
### ViewBox

Check the documentation of the  [viewBox attribute on MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox)

This attribute is not exactly mandatory but there is only very few use cases where you would not want to set it (check Lea Verou talk in the resources at the end of this article). If no unit is provided the default is `px` or user units

I am referring here to the viewBox attribute on the `svg` element, but it is interesting to point out that there is other "non-root" element that can also make use of it, such as `view`, `marker`, `pattern` and `symbol`. Those elements are useful to define reusable part.

On a integration task specification, we will often get size requirements for our visual elements. The `viewBox` has no impact on this constraint. You can choose any suitable value but most of the time you will want it to respect the aspect ratio of the final result. The viewBox define which part of the SVG canvas can be visible. 

It is expressed as follow:
```svg
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">...</svg>
```
We have 4 values, `min-x min-y width height`.

`min-x` and `min-y` 
Describe the origin of the SVG grid. Most of the we want to keep them at `0` as it make math easier, but this can still be useful for animation or SVG *sprites*. Sara articles - linked at the end of this page - explore this aspect in depth.

`width` and `height`
They are pretty much what we can expect, with one important point: they are unitless, they are not related to any pixel convention. That said, they often use the sames value as the expected size in the final document. This is purely for convenience: you should choose the values for readability and making the math inside the SVG easier, in case you plan to animate the svg later. In most cases, for simple elements (ex: icons) you should keep the coordinate systems in sync with the design expectation. The lowest values that avoid floating numbers on the inner elements being optimal.

### Height and Width:

This pair of attributes is referred to as viewport, not to confuse with `viewBox` or the browser window viewport. The height and width attribute of the svg element define how the viewport will be sized on the screen: the size it will be drawn to. Contrary to the height and width values of the `viewBox` attribute, we are dealing with units here. You do not have to use one, in which case it will most probably resolve to `px`. Other possible values are the same as the one defined in CSS (em, ex, px, pt, pc, cm, mm, in and percentages).
Those attributes are not mandatory and will default to the value `auto`, which is equivalent to `100%` (when viewBox is defined, otherwise we have a special case, described later in this article). 

To keep thing generic you will probably skip those values when working with components and rely on CSS or props to suit your need depending on the context.

### preserveAspectRatio

[MDN, preserveAspectRatio](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio)
If you read the points above, you may have realized that it is possible that the ratio expressed by the `viewBox` is different from the one defined by the given `height` and `width` attributes. `preserveAspectRatio` let you define how the `viewBox` will fill the viewport (`height` and `width`, remember). It is kind of the older brother of the CSS `object-fit` property: the syntax is a bit more rough but also let you manage the origin of scaling transformation applied.

```svg
<svg preserveAspectRatio="<align> [<meetOrSlice>]">...</svg>

```
`<align>` is a string values compose of alignment type (Min, Mid, Max) for both axis (x, Y) like the following examples: `xMidYMax` or `xMaxYMin` or the value `none`.

There is little chance you need to use this attribute if you keep your SVG viewport in sync with its viewBox, however in more complex scenario, it can become handy to use them.




### Points of cautions:

SVG are scalable but it does not solve everything. 
- **Sometimes not precise enough:** since the elements must eventually be translated to pixel, the vectors will be rasterized just like how text font work. This can have unwanted side effect if some parts of the graphic are too close to the edge of a clipped area (like what `viewBox` create). This is especially frequent on curved elements. This must be taken into account when choosing the viewBox: the easiest way to solve this is to reserve a small **safe zone** around the elements you want to be displayed. **This is rarely simple to do directly in the code and you will either have to use a *GUI* SVG Editor application or ask your designer to take this into account when preparing the assets.**  

- Graphics are designed with a certain size in mind. Even if it can scale nicely and adapt to different resolution properly, deviating from the original intent can make it less relevant. If it is scaled down, some details may not be visible anymore. On the opposite side, a small and simple icon can be pertinent at small size, but be pretty boring if scaled too much. Do not expect miracle and use separate graphics when necessary. There is some smart solutions leveraging media-query that you could explore, you can find related links in the resources section.

- Not providing a `viewBox` property nor `width` and `height` will result in something similar to a `viewBox` of `0 0 300 150` and the same value for the `width` and `height` attributes. The svg will keep it size independently from the parent layout.
<div style="overflow: hidden; resize: both;">
<svg>
 <rect x="0" y="0" 
 width="600" 
 height="300" 
 style="fill: var(--ak-c-accent-1)"/>
 <circle cx="50" cy="50" r="50" style="fill: var(--ak-c-contrast-1)"/>
</svg>


<svg viewBox="0 0 300 150">
 <rect x="0" y="0" 
 width="600" 
 height="300" 
 style="fill: var(--ak-c-accent-1)"/>
 <circle cx="50" cy="50" r="50" style="fill: var(--ak-c-contrast-1)"/>
</svg>
</div>
<small> the above container is `resizable`</small>

Providing the same values directly will let the svg take all of its container available space: height and width default work in this situation like they were `100%`. 

### Going further with Layout
I hope the part above was enough to have a simple understanding of how SVG can behave. However I only scratched the surface. Fortunately, 
Sara Soueidan did an amazing job explaining in depth the theme in her article series ["Understanding SVG Coordinate Systems and Transformations"](https://www.sarasoueidan.com/blog/svg-coordinate-systems/) (All articles are listed separately at the end of this page)

## Manual optimizations

Now that we covered some basis, let's dive into SVG syntax.
The asset source play a important role in the state your file is when you receive it.
Each editor have their own quirks. I think especially about Inkscape where SVG is the raw format for working file. That may sound great, but it make the SVG bloated with Inkscape specific shenanigans (private namespaces). Other artefact may have been added by the designer for convenience but no longer useful on production ready assets.

### Namespaces

#### SVG

```svg
 <svg xmlns="http://www.w3.org/2000/svg">...</svg>
```

SVG is a namespaced XML format. This is an important part of the root element, as it define what will be possible to do within it.
The bare minimum namespace you should have is the SVG namespace itself. Just like HTML `doctype`, this namespace allow the engine to know how the syntax should be interpreted. There is only one value for it at the moment, therefore it has been made *optional* for **inline SVG**.
This is still *mandatory* when it is consumed another way, so I would recommend keeping it. If you really want too and you are confident it will always be used inline, you can strip it and save a few bytes.

#### xlink

SVG can do more than just static graphics so you may encounter other namespaces like **xlink**. It can be use to add hypertext feature inside the SVG itself.

```svg
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <a xlink:href="https://google.com">google</a>
  </svg>
```
As you can see in this example, we first declare the `xlink` namespace on the root element then we can use the prefixed attributes belonging to it. SVG2 deprecate the usage of this specific namespace but support may still be problematic: take your precaution in such case. Chris Coyier mentioned it briefly in his ["On xlink:href being deprecated in SVG"](https://css-tricks.com/on-xlinkhref-being-deprecated-in-svg/) article.

#### xml-events and others

XML being extensible (eXtensible Markup Language), you may encounter a large variety of exotic namespace in your journey. I will only mention a last one since it has a lot to do with interaction: `xml-events`. If you want to know more, you will find [the spec](https://www.w3.org/TR/2004/WD-SVG12-20041027/xmlevents.html) useful to start with.

### Useless elements

The `<g>` does not draw anything on the screen, but it is frequent to find it anyway. You have various reason for this situation:

- The designer could be organizing her workspace by grouping related elements together: it allow easier selection and manipulation.
- The tag is used to apply properties, a transformation or a filter to a group of children elements.

Depending on the situation, you can either optimise or remove those elements.
- The SVG root tag can also host some heritable properties,
- Maybe the grouped elements could be transformed in a single path elements
- A `<g>` tag can also be used for animation or event-handler at runtime, so it may be smart to keep them in there to make that simpler. In such case, you will probably attach a `class` or an `id` to it.


### Ignored attributes

Some artefact may be left over by the app or a fellow developer moving fragments around. 
Let's have a look at the following elements:

<div style="display: flex; flex-flow: raw wrap; gap: 1rem; justify-content: center;">
<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 20 20" fill="currentColor">
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M4.5 0H5.5V1H14.5V0H15.5V1H20V5V6V16H0V6V5V1H4.5V0ZM14.5 2V3H15.5V2H19V5H1.00263V2H4.5V3H5.5V2H14.5ZM1.00263 6V15H19V6H1.00263Z"
  />
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 20 20" fill="currentColor">
  <path
    fill-rule="evenodd"
    d="M4.5 0H5.5V1H14.5V0H15.5V1H20V5V6V16H0V6V5V1H4.5V0ZM14.5 2V3H15.5V2H19V5H1.00263V2H4.5V3H5.5V2H14.5ZM1.00263 6V15H19V6H1.00263Z"
  />
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 20 20" fill="currentColor">
  <path
    d="M4.5 0H5.5V1H14.5V0H15.5V1H20V5V6V16H0V6V5V1H4.5V0ZM14.5 2V3H15.5V2H19V5H1.00263V2H4.5V3H5.5V2H14.5ZM1.00263 6V15H19V6H1.00263Z"
  />
</svg>
</div>

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 20 20" fill="currentColor">
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M4.5 0H5.5V1H14.5V0H15.5V1H20V5V6V16H0V6V5V1H4.5V0ZM14.5 2V3H15.5V2H19V5H1.00263V2H4.5V3H5.5V2H14.5ZM1.00263 6V15H19V6H1.00263Z"
  />
</svg>

<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 20 20" fill="currentColor">
  <path
    fill-rule="evenodd"
    d="M4.5 0H5.5V1H14.5V0H15.5V1H20V5V6V16H0V6V5V1H4.5V0ZM14.5 2V3H15.5V2H19V5H1.00263V2H4.5V3H5.5V2H14.5ZM1.00263 6V15H19V6H1.00263Z"
  />
</svg>

<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 20 20" fill="currentColor">
  <path
    d="M4.5 0H5.5V1H14.5V0H15.5V1H20V5V6V16H0V6V5V1H4.5V0ZM14.5 2V3H15.5V2H19V5H1.00263V2H4.5V3H5.5V2H14.5ZM1.00263 6V15H19V6H1.00263Z"
  />
</svg>

```
Can you spot the issue? Yep that's right, `clip-rule` do not have any effect on this calendar icon. However, you can see on the third icon that the missing `fill-rule` attribute was *extruding* the shape: be cautious as this could be easy to miss.

- `fill-rule` allow you to control how self overlapping path behave, check it on [MDN: SVG Attribute `fill-rule`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill-rule)
- `clip-rule` does the same for every `<path>` grouped inside a `<clipPath>` element: we do not have that on the icon, so it can be safely removed. More about this here: [MDN: SVG Attributes `clip-rule`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/clip-rule)
 

### Inheritance conflict

```svg
<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
  <path
    d="M4.5 0H5.5V1H14.5V0H15.5V1H20V5V6V16H0V6V5V1H4.5V0ZM14.5 2V3H15.5V2H19V5H1.00263V2H4.5V3H5.5V2H14.5ZM1.00263 6V15H19V6H1.00263Z"
    fill="#333333"
  />
</svg>
```

In this example, we have a SVG root element using the `fill` attribute with the value `currentColor`. This CSS value let you use the value of the `color` property inherited from any previously set rule. Very convenient to adapt your icon to surrounding text. The markup above overwrite the attribute on the path tag, making the first one ineffective. In this situation, you should probably use the `fill` value only once on the SVG tag with the suiting value.  

Caution: `currentColor` will only work on inline SVG, if used in `background-image` or an `<img />` tag, `currentColor` wont be accessible and will default to `black`. This is easy to miss because often the text `color` will also be black or a dark grey shade.  

### Useless Clipping

<div style="display: flex; flex-flow: raw wrap; gap: 1rem; justify-content: center;">
<svg width="80" height="80" viewBox="0 0 20 20" fill="currentColor">
  <g clipPath="url(#clip0_example_1)">
    <path
      d="M14.8278 3.71094C14.3637 4.1239 14.0052 4.6659 13.8151 5.30283C13.4056 6.67501 13.8945 8.0969 14.9414 8.9447L12.5509 16.9549C12.2663 17.9087 12.8087 18.9075 13.7625 19.1858C14.7163 19.4642 15.7202 18.9166 16.0049 17.9628L16.3386 16.8447L16.6603 15.7667L18.5607 9.39863C19.4407 8.99718 20.1493 8.23355 20.4464 7.23803C20.9907 5.41392 19.9476 3.50199 18.1164 2.9676C17.4844 2.78317 16.8412 2.78692 16.2473 2.94592L16.4501 3.31292L17.8813 5.84925L17.4427 6.64917L16.508 6.60498L15.0732 4.15497L14.8278 3.71094ZM17.8683 8.68462C18.6579 8.44319 19.3145 7.82489 19.5663 6.9812C19.9647 5.64634 19.2021 4.24113 17.8538 3.84764C17.827 3.83984 17.8002 3.83249 17.7735 3.8256L18.8061 5.60961L18.935 5.83223L18.8107 6.05893L18.1089 7.33884L17.97 7.59214L17.6819 7.57852L16.2101 7.50895L15.9613 7.49718L15.8368 7.28241L14.7476 5.40282C14.7285 5.45418 14.7111 5.50647 14.6952 5.55966C14.3435 6.73794 14.8965 7.97104 15.9584 8.51473L15.9501 8.54239L16.0166 8.54732L13.431 17.2117C13.2914 17.6794 13.5574 18.1693 14.0251 18.3058C14.4929 18.4423 14.9852 18.1738 15.1248 17.706L15.7801 15.5103L17.0955 11.0913L17.7802 8.79121C17.7872 8.75376 17.7918 8.71633 17.7939 8.6791L17.8683 8.68462Z"
    />
    <path
      d="M13.4737 3.651C13.6054 3.36038 13.7674 3.09053 13.9546 2.84406C13.013 2.63484 11.8734 2.5 10.5 2.5C4.37434 2.5 2.9 5.18235 2.9 5.18235V7.86471C2.9 7.86471 1.60082 7.86414 1.475 7.86471C1.32614 7.86537 1 7.97726 1 8.31347V17.7H12.101C11.9916 17.4191 11.9327 17.1171 11.9319 16.8081C8.5082 16.8075 4.46306 16.8063 4.325 16.8061C4.2288 16.806 3.85 16.7296 3.85 16.3608V10.9961C3.85 10.6871 4.15108 10.5479 4.325 10.5473C4.44412 10.5469 10.1283 10.5477 13.7432 10.5483L14.0183 9.65534C10.4386 9.65502 4.49289 9.65323 4.325 9.65302C4.19482 9.65285 3.85 9.74589 3.85 10.1001V5.43046C3.85 5.43046 5.22455 3.39248 10.5 3.39248C11.6756 3.39248 12.6575 3.49369 13.4737 3.651ZM18.1 13.4028L16.8347 17.5093C16.8147 17.5743 16.7923 17.6379 16.7676 17.7H20V8.87849C19.8047 9.01539 19.5983 9.1356 19.3832 9.23788L19.05 10.3194V16.8056H18.1V13.4028ZM1.94999 8.7585H2.9V16.8056H1.94999V8.7585Z"
    />
  </g>
  <defs>
    <clipPath id="clip0_example_1">
        <rect width="20" height="20" fill="white" transform="matrix(-1 0 0 1 20.8799 0.803711)" />
    </clipPath>
  </defs>
</svg>

<svg width="80" height="80" viewBox="0 0 20 20" fill="currentColor">
    <path
      d="M14.8278 3.71094C14.3637 4.1239 14.0052 4.6659 13.8151 5.30283C13.4056 6.67501 13.8945 8.0969 14.9414 8.9447L12.5509 16.9549C12.2663 17.9087 12.8087 18.9075 13.7625 19.1858C14.7163 19.4642 15.7202 18.9166 16.0049 17.9628L16.3386 16.8447L16.6603 15.7667L18.5607 9.39863C19.4407 8.99718 20.1493 8.23355 20.4464 7.23803C20.9907 5.41392 19.9476 3.50199 18.1164 2.9676C17.4844 2.78317 16.8412 2.78692 16.2473 2.94592L16.4501 3.31292L17.8813 5.84925L17.4427 6.64917L16.508 6.60498L15.0732 4.15497L14.8278 3.71094ZM17.8683 8.68462C18.6579 8.44319 19.3145 7.82489 19.5663 6.9812C19.9647 5.64634 19.2021 4.24113 17.8538 3.84764C17.827 3.83984 17.8002 3.83249 17.7735 3.8256L18.8061 5.60961L18.935 5.83223L18.8107 6.05893L18.1089 7.33884L17.97 7.59214L17.6819 7.57852L16.2101 7.50895L15.9613 7.49718L15.8368 7.28241L14.7476 5.40282C14.7285 5.45418 14.7111 5.50647 14.6952 5.55966C14.3435 6.73794 14.8965 7.97104 15.9584 8.51473L15.9501 8.54239L16.0166 8.54732L13.431 17.2117C13.2914 17.6794 13.5574 18.1693 14.0251 18.3058C14.4929 18.4423 14.9852 18.1738 15.1248 17.706L15.7801 15.5103L17.0955 11.0913L17.7802 8.79121C17.7872 8.75376 17.7918 8.71633 17.7939 8.6791L17.8683 8.68462Z"
    />
    <path
      d="M13.4737 3.651C13.6054 3.36038 13.7674 3.09053 13.9546 2.84406C13.013 2.63484 11.8734 2.5 10.5 2.5C4.37434 2.5 2.9 5.18235 2.9 5.18235V7.86471C2.9 7.86471 1.60082 7.86414 1.475 7.86471C1.32614 7.86537 1 7.97726 1 8.31347V17.7H12.101C11.9916 17.4191 11.9327 17.1171 11.9319 16.8081C8.5082 16.8075 4.46306 16.8063 4.325 16.8061C4.2288 16.806 3.85 16.7296 3.85 16.3608V10.9961C3.85 10.6871 4.15108 10.5479 4.325 10.5473C4.44412 10.5469 10.1283 10.5477 13.7432 10.5483L14.0183 9.65534C10.4386 9.65502 4.49289 9.65323 4.325 9.65302C4.19482 9.65285 3.85 9.74589 3.85 10.1001V5.43046C3.85 5.43046 5.22455 3.39248 10.5 3.39248C11.6756 3.39248 12.6575 3.49369 13.4737 3.651ZM18.1 13.4028L16.8347 17.5093C16.8147 17.5743 16.7923 17.6379 16.7676 17.7H20V8.87849C19.8047 9.01539 19.5983 9.1356 19.3832 9.23788L19.05 10.3194V16.8056H18.1V13.4028ZM1.94999 8.7585H2.9V16.8056H1.94999V8.7585Z"
    />
</svg>
</div>

```svg
<svg width="80" height="80" viewBox="0 0 20 20" fill="currentColor">
  <g clipPath="url(#clip0_471_37763)">
    <path
      d="M14.8278 3.71094C14.3637 4.1239 14.0052 4.6659 13.8151 5.30283C13.4056 6.67501 13.8945 8.0969 14.9414 8.9447L12.5509 16.9549C12.2663 17.9087 12.8087 18.9075 13.7625 19.1858C14.7163 19.4642 15.7202 18.9166 16.0049 17.9628L16.3386 16.8447L16.6603 15.7667L18.5607 9.39863C19.4407 8.99718 20.1493 8.23355 20.4464 7.23803C20.9907 5.41392 19.9476 3.50199 18.1164 2.9676C17.4844 2.78317 16.8412 2.78692 16.2473 2.94592L16.4501 3.31292L17.8813 5.84925L17.4427 6.64917L16.508 6.60498L15.0732 4.15497L14.8278 3.71094ZM17.8683 8.68462C18.6579 8.44319 19.3145 7.82489 19.5663 6.9812C19.9647 5.64634 19.2021 4.24113 17.8538 3.84764C17.827 3.83984 17.8002 3.83249 17.7735 3.8256L18.8061 5.60961L18.935 5.83223L18.8107 6.05893L18.1089 7.33884L17.97 7.59214L17.6819 7.57852L16.2101 7.50895L15.9613 7.49718L15.8368 7.28241L14.7476 5.40282C14.7285 5.45418 14.7111 5.50647 14.6952 5.55966C14.3435 6.73794 14.8965 7.97104 15.9584 8.51473L15.9501 8.54239L16.0166 8.54732L13.431 17.2117C13.2914 17.6794 13.5574 18.1693 14.0251 18.3058C14.4929 18.4423 14.9852 18.1738 15.1248 17.706L15.7801 15.5103L17.0955 11.0913L17.7802 8.79121C17.7872 8.75376 17.7918 8.71633 17.7939 8.6791L17.8683 8.68462Z"
    />
    <path
      d="M13.4737 3.651C13.6054 3.36038 13.7674 3.09053 13.9546 2.84406C13.013 2.63484 11.8734 2.5 10.5 2.5C4.37434 2.5 2.9 5.18235 2.9 5.18235V7.86471C2.9 7.86471 1.60082 7.86414 1.475 7.86471C1.32614 7.86537 1 7.97726 1 8.31347V17.7H12.101C11.9916 17.4191 11.9327 17.1171 11.9319 16.8081C8.5082 16.8075 4.46306 16.8063 4.325 16.8061C4.2288 16.806 3.85 16.7296 3.85 16.3608V10.9961C3.85 10.6871 4.15108 10.5479 4.325 10.5473C4.44412 10.5469 10.1283 10.5477 13.7432 10.5483L14.0183 9.65534C10.4386 9.65502 4.49289 9.65323 4.325 9.65302C4.19482 9.65285 3.85 9.74589 3.85 10.1001V5.43046C3.85 5.43046 5.22455 3.39248 10.5 3.39248C11.6756 3.39248 12.6575 3.49369 13.4737 3.651ZM18.1 13.4028L16.8347 17.5093C16.8147 17.5743 16.7923 17.6379 16.7676 17.7H20V8.87849C19.8047 9.01539 19.5983 9.1356 19.3832 9.23788L19.05 10.3194V16.8056H18.1V13.4028ZM1.94999 8.7585H2.9V16.8056H1.94999V8.7585Z"
    />
  </g>
  <defs>
    <clipPath id="clip0_471_37763">
        <rect width="20" height="20" fill="white" transform="matrix(-1 0 0 1 20.8799 0.803711)" />
    </clipPath>
  </defs>
</svg>

<!-- //////////  -->

<svg width="80" height="80" viewBox="0 0 20 20" fill="currentColor">
    <path
      d="M14.8278 3.71094C14.3637 4.1239 14.0052 4.6659 13.8151 5.30283C13.4056 6.67501 13.8945 8.0969 14.9414 8.9447L12.5509 16.9549C12.2663 17.9087 12.8087 18.9075 13.7625 19.1858C14.7163 19.4642 15.7202 18.9166 16.0049 17.9628L16.3386 16.8447L16.6603 15.7667L18.5607 9.39863C19.4407 8.99718 20.1493 8.23355 20.4464 7.23803C20.9907 5.41392 19.9476 3.50199 18.1164 2.9676C17.4844 2.78317 16.8412 2.78692 16.2473 2.94592L16.4501 3.31292L17.8813 5.84925L17.4427 6.64917L16.508 6.60498L15.0732 4.15497L14.8278 3.71094ZM17.8683 8.68462C18.6579 8.44319 19.3145 7.82489 19.5663 6.9812C19.9647 5.64634 19.2021 4.24113 17.8538 3.84764C17.827 3.83984 17.8002 3.83249 17.7735 3.8256L18.8061 5.60961L18.935 5.83223L18.8107 6.05893L18.1089 7.33884L17.97 7.59214L17.6819 7.57852L16.2101 7.50895L15.9613 7.49718L15.8368 7.28241L14.7476 5.40282C14.7285 5.45418 14.7111 5.50647 14.6952 5.55966C14.3435 6.73794 14.8965 7.97104 15.9584 8.51473L15.9501 8.54239L16.0166 8.54732L13.431 17.2117C13.2914 17.6794 13.5574 18.1693 14.0251 18.3058C14.4929 18.4423 14.9852 18.1738 15.1248 17.706L15.7801 15.5103L17.0955 11.0913L17.7802 8.79121C17.7872 8.75376 17.7918 8.71633 17.7939 8.6791L17.8683 8.68462Z"
    />
    <path
      d="M13.4737 3.651C13.6054 3.36038 13.7674 3.09053 13.9546 2.84406C13.013 2.63484 11.8734 2.5 10.5 2.5C4.37434 2.5 2.9 5.18235 2.9 5.18235V7.86471C2.9 7.86471 1.60082 7.86414 1.475 7.86471C1.32614 7.86537 1 7.97726 1 8.31347V17.7H12.101C11.9916 17.4191 11.9327 17.1171 11.9319 16.8081C8.5082 16.8075 4.46306 16.8063 4.325 16.8061C4.2288 16.806 3.85 16.7296 3.85 16.3608V10.9961C3.85 10.6871 4.15108 10.5479 4.325 10.5473C4.44412 10.5469 10.1283 10.5477 13.7432 10.5483L14.0183 9.65534C10.4386 9.65502 4.49289 9.65323 4.325 9.65302C4.19482 9.65285 3.85 9.74589 3.85 10.1001V5.43046C3.85 5.43046 5.22455 3.39248 10.5 3.39248C11.6756 3.39248 12.6575 3.49369 13.4737 3.651ZM18.1 13.4028L16.8347 17.5093C16.8147 17.5743 16.7923 17.6379 16.7676 17.7H20V8.87849C19.8047 9.01539 19.5983 9.1356 19.3832 9.23788L19.05 10.3194V16.8056H18.1V13.4028ZM1.94999 8.7585H2.9V16.8056H1.94999V8.7585Z"
    />
</svg>
```
We probably have this situation because the designer defined the clipping on a larger document. Extracted, the clipping is now also handled by the `viewBox` attribute on the `<svg>` tag. Let's verify this hypothesis by slightly reducing the clipping rectangle area: 

<div style="display: flex; flex-flow: raw wrap; gap: 1rem; justify-content: center; align-items: center;">
<svg width="100" height="80" viewBox="0 0 25 20" fill="currentColor"> 
  <g opacity="0.25">
  <path
      d="M14.8278 3.71094C14.3637 4.1239 14.0052 4.6659 13.8151 5.30283C13.4056 6.67501 13.8945 8.0969 14.9414 8.9447L12.5509 16.9549C12.2663 17.9087 12.8087 18.9075 13.7625 19.1858C14.7163 19.4642 15.7202 18.9166 16.0049 17.9628L16.3386 16.8447L16.6603 15.7667L18.5607 9.39863C19.4407 8.99718 20.1493 8.23355 20.4464 7.23803C20.9907 5.41392 19.9476 3.50199 18.1164 2.9676C17.4844 2.78317 16.8412 2.78692 16.2473 2.94592L16.4501 3.31292L17.8813 5.84925L17.4427 6.64917L16.508 6.60498L15.0732 4.15497L14.8278 3.71094ZM17.8683 8.68462C18.6579 8.44319 19.3145 7.82489 19.5663 6.9812C19.9647 5.64634 19.2021 4.24113 17.8538 3.84764C17.827 3.83984 17.8002 3.83249 17.7735 3.8256L18.8061 5.60961L18.935 5.83223L18.8107 6.05893L18.1089 7.33884L17.97 7.59214L17.6819 7.57852L16.2101 7.50895L15.9613 7.49718L15.8368 7.28241L14.7476 5.40282C14.7285 5.45418 14.7111 5.50647 14.6952 5.55966C14.3435 6.73794 14.8965 7.97104 15.9584 8.51473L15.9501 8.54239L16.0166 8.54732L13.431 17.2117C13.2914 17.6794 13.5574 18.1693 14.0251 18.3058C14.4929 18.4423 14.9852 18.1738 15.1248 17.706L15.7801 15.5103L17.0955 11.0913L17.7802 8.79121C17.7872 8.75376 17.7918 8.71633 17.7939 8.6791L17.8683 8.68462Z"
    />
    <path
      d="M13.4737 3.651C13.6054 3.36038 13.7674 3.09053 13.9546 2.84406C13.013 2.63484 11.8734 2.5 10.5 2.5C4.37434 2.5 2.9 5.18235 2.9 5.18235V7.86471C2.9 7.86471 1.60082 7.86414 1.475 7.86471C1.32614 7.86537 1 7.97726 1 8.31347V17.7H12.101C11.9916 17.4191 11.9327 17.1171 11.9319 16.8081C8.5082 16.8075 4.46306 16.8063 4.325 16.8061C4.2288 16.806 3.85 16.7296 3.85 16.3608V10.9961C3.85 10.6871 4.15108 10.5479 4.325 10.5473C4.44412 10.5469 10.1283 10.5477 13.7432 10.5483L14.0183 9.65534C10.4386 9.65502 4.49289 9.65323 4.325 9.65302C4.19482 9.65285 3.85 9.74589 3.85 10.1001V5.43046C3.85 5.43046 5.22455 3.39248 10.5 3.39248C11.6756 3.39248 12.6575 3.49369 13.4737 3.651ZM18.1 13.4028L16.8347 17.5093C16.8147 17.5743 16.7923 17.6379 16.7676 17.7H20V8.87849C19.8047 9.01539 19.5983 9.1356 19.3832 9.23788L19.05 10.3194V16.8056H18.1V13.4028ZM1.94999 8.7585H2.9V16.8056H1.94999V8.7585Z"
    />
    </g>
  <g clip-path="url(#clip0_example_2)">
    <path
      d="M14.8278 3.71094C14.3637 4.1239 14.0052 4.6659 13.8151 5.30283C13.4056 6.67501 13.8945 8.0969 14.9414 8.9447L12.5509 16.9549C12.2663 17.9087 12.8087 18.9075 13.7625 19.1858C14.7163 19.4642 15.7202 18.9166 16.0049 17.9628L16.3386 16.8447L16.6603 15.7667L18.5607 9.39863C19.4407 8.99718 20.1493 8.23355 20.4464 7.23803C20.9907 5.41392 19.9476 3.50199 18.1164 2.9676C17.4844 2.78317 16.8412 2.78692 16.2473 2.94592L16.4501 3.31292L17.8813 5.84925L17.4427 6.64917L16.508 6.60498L15.0732 4.15497L14.8278 3.71094ZM17.8683 8.68462C18.6579 8.44319 19.3145 7.82489 19.5663 6.9812C19.9647 5.64634 19.2021 4.24113 17.8538 3.84764C17.827 3.83984 17.8002 3.83249 17.7735 3.8256L18.8061 5.60961L18.935 5.83223L18.8107 6.05893L18.1089 7.33884L17.97 7.59214L17.6819 7.57852L16.2101 7.50895L15.9613 7.49718L15.8368 7.28241L14.7476 5.40282C14.7285 5.45418 14.7111 5.50647 14.6952 5.55966C14.3435 6.73794 14.8965 7.97104 15.9584 8.51473L15.9501 8.54239L16.0166 8.54732L13.431 17.2117C13.2914 17.6794 13.5574 18.1693 14.0251 18.3058C14.4929 18.4423 14.9852 18.1738 15.1248 17.706L15.7801 15.5103L17.0955 11.0913L17.7802 8.79121C17.7872 8.75376 17.7918 8.71633 17.7939 8.6791L17.8683 8.68462Z"
    />
    <path
      d="M13.4737 3.651C13.6054 3.36038 13.7674 3.09053 13.9546 2.84406C13.013 2.63484 11.8734 2.5 10.5 2.5C4.37434 2.5 2.9 5.18235 2.9 5.18235V7.86471C2.9 7.86471 1.60082 7.86414 1.475 7.86471C1.32614 7.86537 1 7.97726 1 8.31347V17.7H12.101C11.9916 17.4191 11.9327 17.1171 11.9319 16.8081C8.5082 16.8075 4.46306 16.8063 4.325 16.8061C4.2288 16.806 3.85 16.7296 3.85 16.3608V10.9961C3.85 10.6871 4.15108 10.5479 4.325 10.5473C4.44412 10.5469 10.1283 10.5477 13.7432 10.5483L14.0183 9.65534C10.4386 9.65502 4.49289 9.65323 4.325 9.65302C4.19482 9.65285 3.85 9.74589 3.85 10.1001V5.43046C3.85 5.43046 5.22455 3.39248 10.5 3.39248C11.6756 3.39248 12.6575 3.49369 13.4737 3.651ZM18.1 13.4028L16.8347 17.5093C16.8147 17.5743 16.7923 17.6379 16.7676 17.7H20V8.87849C19.8047 9.01539 19.5983 9.1356 19.3832 9.23788L19.05 10.3194V16.8056H18.1V13.4028ZM1.94999 8.7585H2.9V16.8056H1.94999V8.7585Z"
    />
  </g>
  <defs>
    <clipPath id="clip0_example_2">
        <rect width="15" height="20"/>
    </clipPath>
  </defs>
</svg>

<svg width="80" height="80" viewBox="0 0 20 20" fill="currentColor">
    <path
      d="M14.8278 3.71094C14.3637 4.1239 14.0052 4.6659 13.8151 5.30283C13.4056 6.67501 13.8945 8.0969 14.9414 8.9447L12.5509 16.9549C12.2663 17.9087 12.8087 18.9075 13.7625 19.1858C14.7163 19.4642 15.7202 18.9166 16.0049 17.9628L16.3386 16.8447L16.6603 15.7667L18.5607 9.39863C19.4407 8.99718 20.1493 8.23355 20.4464 7.23803C20.9907 5.41392 19.9476 3.50199 18.1164 2.9676C17.4844 2.78317 16.8412 2.78692 16.2473 2.94592L16.4501 3.31292L17.8813 5.84925L17.4427 6.64917L16.508 6.60498L15.0732 4.15497L14.8278 3.71094ZM17.8683 8.68462C18.6579 8.44319 19.3145 7.82489 19.5663 6.9812C19.9647 5.64634 19.2021 4.24113 17.8538 3.84764C17.827 3.83984 17.8002 3.83249 17.7735 3.8256L18.8061 5.60961L18.935 5.83223L18.8107 6.05893L18.1089 7.33884L17.97 7.59214L17.6819 7.57852L16.2101 7.50895L15.9613 7.49718L15.8368 7.28241L14.7476 5.40282C14.7285 5.45418 14.7111 5.50647 14.6952 5.55966C14.3435 6.73794 14.8965 7.97104 15.9584 8.51473L15.9501 8.54239L16.0166 8.54732L13.431 17.2117C13.2914 17.6794 13.5574 18.1693 14.0251 18.3058C14.4929 18.4423 14.9852 18.1738 15.1248 17.706L15.7801 15.5103L17.0955 11.0913L17.7802 8.79121C17.7872 8.75376 17.7918 8.71633 17.7939 8.6791L17.8683 8.68462Z"
    />
    <path
      d="M13.4737 3.651C13.6054 3.36038 13.7674 3.09053 13.9546 2.84406C13.013 2.63484 11.8734 2.5 10.5 2.5C4.37434 2.5 2.9 5.18235 2.9 5.18235V7.86471C2.9 7.86471 1.60082 7.86414 1.475 7.86471C1.32614 7.86537 1 7.97726 1 8.31347V17.7H12.101C11.9916 17.4191 11.9327 17.1171 11.9319 16.8081C8.5082 16.8075 4.46306 16.8063 4.325 16.8061C4.2288 16.806 3.85 16.7296 3.85 16.3608V10.9961C3.85 10.6871 4.15108 10.5479 4.325 10.5473C4.44412 10.5469 10.1283 10.5477 13.7432 10.5483L14.0183 9.65534C10.4386 9.65502 4.49289 9.65323 4.325 9.65302C4.19482 9.65285 3.85 9.74589 3.85 10.1001V5.43046C3.85 5.43046 5.22455 3.39248 10.5 3.39248C11.6756 3.39248 12.6575 3.49369 13.4737 3.651ZM18.1 13.4028L16.8347 17.5093C16.8147 17.5743 16.7923 17.6379 16.7676 17.7H20V8.87849C19.8047 9.01539 19.5983 9.1356 19.3832 9.23788L19.05 10.3194V16.8056H18.1V13.4028ZM1.94999 8.7585H2.9V16.8056H1.94999V8.7585Z"
    />
</svg>

<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path
      d="M14.8278 3.71094C14.3637 4.1239 14.0052 4.6659 13.8151 5.30283C13.4056 6.67501 13.8945 8.0969 14.9414 8.9447L12.5509 16.9549C12.2663 17.9087 12.8087 18.9075 13.7625 19.1858C14.7163 19.4642 15.7202 18.9166 16.0049 17.9628L16.3386 16.8447L16.6603 15.7667L18.5607 9.39863C19.4407 8.99718 20.1493 8.23355 20.4464 7.23803C20.9907 5.41392 19.9476 3.50199 18.1164 2.9676C17.4844 2.78317 16.8412 2.78692 16.2473 2.94592L16.4501 3.31292L17.8813 5.84925L17.4427 6.64917L16.508 6.60498L15.0732 4.15497L14.8278 3.71094ZM17.8683 8.68462C18.6579 8.44319 19.3145 7.82489 19.5663 6.9812C19.9647 5.64634 19.2021 4.24113 17.8538 3.84764C17.827 3.83984 17.8002 3.83249 17.7735 3.8256L18.8061 5.60961L18.935 5.83223L18.8107 6.05893L18.1089 7.33884L17.97 7.59214L17.6819 7.57852L16.2101 7.50895L15.9613 7.49718L15.8368 7.28241L14.7476 5.40282C14.7285 5.45418 14.7111 5.50647 14.6952 5.55966C14.3435 6.73794 14.8965 7.97104 15.9584 8.51473L15.9501 8.54239L16.0166 8.54732L13.431 17.2117C13.2914 17.6794 13.5574 18.1693 14.0251 18.3058C14.4929 18.4423 14.9852 18.1738 15.1248 17.706L15.7801 15.5103L17.0955 11.0913L17.7802 8.79121C17.7872 8.75376 17.7918 8.71633 17.7939 8.6791L17.8683 8.68462Z"
    />
    <path
      d="M13.4737 3.651C13.6054 3.36038 13.7674 3.09053 13.9546 2.84406C13.013 2.63484 11.8734 2.5 10.5 2.5C4.37434 2.5 2.9 5.18235 2.9 5.18235V7.86471C2.9 7.86471 1.60082 7.86414 1.475 7.86471C1.32614 7.86537 1 7.97726 1 8.31347V17.7H12.101C11.9916 17.4191 11.9327 17.1171 11.9319 16.8081C8.5082 16.8075 4.46306 16.8063 4.325 16.8061C4.2288 16.806 3.85 16.7296 3.85 16.3608V10.9961C3.85 10.6871 4.15108 10.5479 4.325 10.5473C4.44412 10.5469 10.1283 10.5477 13.7432 10.5483L14.0183 9.65534C10.4386 9.65502 4.49289 9.65323 4.325 9.65302C4.19482 9.65285 3.85 9.74589 3.85 10.1001V5.43046C3.85 5.43046 5.22455 3.39248 10.5 3.39248C11.6756 3.39248 12.6575 3.49369 13.4737 3.651ZM18.1 13.4028L16.8347 17.5093C16.8147 17.5743 16.7923 17.6379 16.7676 17.7H20V8.87849C19.8047 9.01539 19.5983 9.1356 19.3832 9.23788L19.05 10.3194V16.8056H18.1V13.4028ZM1.94999 8.7585H2.9V16.8056H1.94999V8.7585Z"
    />
</svg>
</div>

Increasing a bit the width of the `viewBox` let us see that clipping was a bit extreme: a sensible resize of the element to fit all the picture in the `viewBox` would probably have better result. Unfortunately, on the original size of 20 by 20 it was not identified during review.


### Automatic or programmatic optimization
#### SVGO


<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 348.61 100">
  <defs>
    <linearGradient id="a" x1="263.36" y1="14.74" x2="333.47" y2="84.85" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#45afe4"/>
      <stop offset="1" stop-color="#364f9e"/>
    </linearGradient>
    <linearGradient id="b" x1="262.64" y1="15.46" x2="332.75" y2="85.57" xlink:href="#a"/>
    <style>
      .text {
        fill: currentColor;
      }
      .gear {
        fill: url(#a);
      }
      .dots {
        fill: url(#b);
      }
    </style>
  </defs>
  <path class="text" d="M0 78.14l9.77-12.25A54.83 54.83 0 0 0 23.6 75a35.07 35.07 0 0 0 14.07 2.9q7.65 0 12.25-2.82t4.59-7.54A7.79 7.79 0 0 0 51.39 61Q48.27 58.6 41 57.42l-16.39-2.83Q14 52.82 8.54 47.17T3.06 32.58q0-11.55 8.77-18.25t23.72-6.71a56.64 56.64 0 0 1 18.08 3.06 52.24 52.24 0 0 1 15.95 8.47l-9.19 12.72a51.59 51.59 0 0 0-13-7.48A36.66 36.66 0 0 0 34.38 22q-6.84 0-11 2.53t-4.12 6.77A7.06 7.06 0 0 0 22 37.17q2.7 2.11 9.06 3.06l15.54 2.59q12.24 2 18.43 7.83T71.23 66a22.85 22.85 0 0 1-9.48 19.2q-9.48 7.18-25.25 7.18A53 53 0 0 1 17 88.62 55.3 55.3 0 0 1 0 78.14zM106.49 91.21L73.05 8.79h18.49l25.19 65.11 25.78-65.11h17.66l-33.9 82.42z"/>
  <path class="gear" d="M340.15 39.88A43.42 43.42 0 0 0 335 28c1.72-2.41 3.36-4.89 4.89-7.49L328.08 8.75c-2.68 1.58-5.22 3.28-7.71 5.05a42.48 42.48 0 0 0-11.52-4.75c-.51-3-1.11-6-1.9-9h-16.67c-.78 3-1.37 5.92-1.87 8.88a42.9 42.9 0 0 0-11.85 4.7c-2.39-1.69-4.83-3.33-7.41-4.83l-11.78 11.73c1.42 2.43 2.94 4.74 4.53 7A43.1 43.1 0 0 0 256.39 40c-2.6.46-5.18 1-7.78 1.68v16.65c2.42.64 4.82 1.14 7.24 1.58a42.94 42.94 0 0 0 5.34 13.58 82.692 82.692 0 0 0-3.82 6l11.78 11.79c2-1.16 3.9-2.4 5.76-3.68a42.75 42.75 0 0 0 13.92 5.8c.4 2.22.88 4.42 1.45 6.63H307c.59-2.27 1.07-4.53 1.49-6.79A43.07 43.07 0 0 0 322 87.35c2 1.36 4 2.67 6.07 3.9l11.78-11.79a96.887 96.887 0 0 0-4.19-6.48 43.12 43.12 0 0 0 5-13c2.64-.47 5.28-1 7.92-1.7V41.67c-2.79-.74-5.58-1.31-8.43-1.79zm-29.22 40.05a31.54 31.54 0 0 1-24.77.23.13.13 0 0 0 0-.06 31.67 31.67 0 0 1-17.19-17.64l-.16-.42a31.47 31.47 0 0 1 .62-23.51c.18-.42.37-.84.58-1.26a31.74 31.74 0 0 1 15.89-15.16q1-.43 2.1-.81a31.5 31.5 0 0 1 10.28-1.72 31.12 31.12 0 0 1 10.79 1.91c.79.29 1.56.6 2.32 1a31.64 31.64 0 0 1 15.18 14.81q.45.91.84 1.86A31.4 31.4 0 0 1 328 61.5c-.12.35-.24.7-.38 1a31.69 31.69 0 0 1-16.48 17.29z"/>
  <path class="dots" d="M321 60.91a6.33 6.33 0 0 0-10.63-3.26l-5-3.72a8.63 8.63 0 0 0-2.28-11.3l4-6.93a4.34 4.34 0 1 0-2.8-2.7 4.27 4.27 0 0 0 1.08 1.66l-4 6.93a8.79 8.79 0 0 0-3.94-.72 8.65 8.65 0 0 0-7.2 4.66l-8.58-3.37v-.09a4 4 0 1 0-.75 1.95l8.58 3.37a8.67 8.67 0 0 0 2.92 8.84l-4 6.24a5.23 5.23 0 0 0-2.27-.38 5.33 5.33 0 1 0 4 1.45l4-6.22a8.67 8.67 0 0 0 10.07-1.82l5 3.73a6.33 6.33 0 1 0 11.8 1.68z"/>
  <path class="text" d="M198.38 43.21v13.57h25.1a1.89 1.89 0 0 1 0 .29 23.59 23.59 0 0 1-1.55 6 22 22 0 0 1-2 3.89l-.06.08a20.51 20.51 0 0 1-3.87 4.28q-.48.42-1 .81a22.55 22.55 0 0 1-5.41 3.08A25.51 25.51 0 0 1 200 77a26.61 26.61 0 0 1-10.4-2.1 25.32 25.32 0 0 1-13.95-14.19 25.23 25.23 0 0 1-1.08-3.32 28.72 28.72 0 0 1-.92-7.39 29.1 29.1 0 0 1 1.26-8.68 20.11 20.11 0 0 1 .68-2 26.59 26.59 0 0 1 2-4.1 24.35 24.35 0 0 1 3.41-4.35c.26-.27.53-.54.81-.8a25.06 25.06 0 0 1 7.43-4.85 25.58 25.58 0 0 1 10.3-2.07h1.8a27.4 27.4 0 0 1 10.11 2.54l.39.18a30.36 30.36 0 0 1 10.07 7.95l11.89-10.95a40.71 40.71 0 0 0-14.95-11.3 46.09 46.09 0 0 0-19.3-4.07h-1.65a44.14 44.14 0 0 0-15.42 3.26 42.71 42.71 0 0 0-13.83 9 40.48 40.48 0 0 0-5.28 6.34 42.34 42.34 0 0 0-3.91 7.14A41.82 41.82 0 0 0 156.11 50a43.83 43.83 0 0 0 .25 4.76c.09.89.21 1.76.37 2.63a39.93 39.93 0 0 0 2.79 9.32A43.45 43.45 0 0 0 166 77.23c.87 1 1.78 2 2.75 3a42.71 42.71 0 0 0 13.83 9 44.68 44.68 0 0 0 17.19 3.3 42.8 42.8 0 0 0 12.29-1.74 38.67 38.67 0 0 0 4.19-1.5 41 41 0 0 0 8.29-4.67 36.58 36.58 0 0 0 4.81-4.14A40.2 40.2 0 0 0 238 67a42.1 42.1 0 0 0 2.4-8.51 48 48 0 0 0 .72-8.39v-6.9z"/>
</svg>


Available as a *cli* and as node.js module on npm, svgo let you optimise svg, including math and transformation with several options, from light to strong gain. However some change can be destructive so be cautious and check the result!

[svgo on github](https://github.com/svg/svgo)
#### SVGOMG

<img src="/img/Introduction_to_SVG/svgomg.png" alt="using SVGOMG to optimise a SVG illustration"/>

Missing GUI interface of SVGO, SVGOMG was built by Jake Archibald. It give you direct feedback on the effect of the SVGO options chosen and a neat way of comparing the original and the optimized graphic.

#### SVGR

React tool that can be use manually or at buildtime 
https://react-svgr.com/

[to be done]

## Accessibility 
SVG being a structured document, there is a lot of possible accessibility improvement to consider.
As always, there is severals articles covering this subject extensively.

To get your basis cover you can start by treating SVG as images. That mean you should either provide a alternative description or indicate that it is a decorative element. 

- Providing a SVG with a description can be done by using the `<title>...</title>`  tag just after the `<svg>`. 
- If the svg is decorative, then the using `aria-hidden="true"` on the svg tag will ensure that it is properly ignored by assistive technologies.


## Conclusion

That's it, I shared a large overview of the points to look at when working with SVG. 
[to be done]


## Other resources

### Specification and Documentation
- [Scalable Vector Graphics (SVG) 2 [CR], latest version](https://www.w3.org/TR/SVG2/)
- [MDN, SVG: Scalable Vector Graphics ](https://developer.mozilla.org/en-US/docs/Web/SVG)

### Deep look at the Core
- [Understanding SVG Coordinate Systems and Transformations Part 1: The viewport, viewBox, and preserveAspectRatio - Sara Soueidan, 17.07.2014](https://www.sarasoueidan.com/blog/svg-coordinate-systems/)
- [Understanding SVG Coordinate Systems and Transformations Part 2: The transform Attribute, Sara Soueidan, 30.07.2014](https://www.sarasoueidan.com/blog/svg-coordinate-systems/)
- [Understanding SVG Coordinate Systems and Transformations Part 3: Establishing New Viewports, Sara Soueidan, 05.08.2014](https://www.sarasoueidan.com/blog/svg-coordinate-systems/)

### Clever tricks
- [Making SVGs Responsive With CSS, Sara Soueidan, 19.08.2014](https://www.sarasoueidan.com/blog/responsive-svgs/)
- [SVG & media queries, Jake Archibald, 10.10.2016](https://jakearchibald.com/2016/svg-media-queries/)

### Video and podcast
- [051: Styling SVG in CSS, The CSS Podcast, 07.2021](https://open.spotify.com/episode/0XTZOuRuQ5nSxTAUJ9H7AY?si=NOgZucQyQHONaSfTlh28FQ)
- [Lea Verou: The web design cheat code: Using SVG to bridge CSS‚Äô gaps](https://www.youtube.com/watch?v=6qSN50Qk_54&ab_channel=FrontendUnited)

### Compatibility
- [On xlink:href being deprecated in SVG, Chris Coyier, 30.07.2018](https://css-tricks.com/on-xlinkhref-being-deprecated-in-svg/)

### Performance
- [Which SVG technique performs best for way too many icons?, Tyler Sticka, 28.10.2021](https://cloudfour.com/thinks/svg-icon-stress-test/)
- [Tools for Optimizing SVG, Chris Coyier, 17.03.2020](https://css-tricks.com/tools-for-optimizing-svg/)

### Day to Day SVG usecases
- [Building UI Components With SVG and CSS, Ahmad Shadeed, 18.01.2022](https://ishadeed.com/article/building-components-svg-css)

### Accessibility
- [Accessible SVGs, Heather Migliorisi, 06.08.2016](https://css-tricks.com/accessible-svgs/)
- [Accessible SVGs: Perfect Patterns For Screen Reader Users, Carrie Fisher, 26.05.2021](https://www.smashingmagazine.com/2021/05/accessible-svg-patterns-comparison/)