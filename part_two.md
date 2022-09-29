# AA Times Continued (Phases 4-6)

**Make sure you finish Phases 1-3 before continuing!**

## Phase 4: The main content

For the next phase you will add the latest App Academy Times news using a
flexible grid system. The __docs/copy__ folder contains the content for each
section, which you will copy and paste. You will be building the HTML structure
around the content, like you did for the Masthead. But first let's make sure you
have a flexible application by implementing a custom grid system.

### Custom flexible grid news content

Grids are much less complicated than they sound and are commonly used throughout
the web. Popular style frameworks like `bootstrap` by Twitter and `material-ui`
inspired by Google all use flexible grid systems. For App Academy Times, you
will be using the CSS grid property to build a grid system. Please use the
Chrome DevTools to hover over elements so that you may visualize the grid
as you construct it. Below you can see an example of what you are trying to
accomplish:

![custom-grid][custom-grid-link]

If either pair or both pairs have not done the [CSS Grid Garden][grid-garden]
game, go ahead and take some time now to play it.  Finish all levels and then
return to complete this part of the project.

Before adding CSS properties, copy and paste the following HTML into the
__\_main_content.html.erb__ view and replace it with whatever is in that file.

[_main_content.html.erb template][main-content-erb-template]

Notice this line of code from the template:

```html
<iframe width="560" height="315" src="https://www.youtube.com/embed/ARe9FupzuOA" frameborder="0" allowfullscreen></iframe>
```

Since you probably haven't seen this HTML element before, here's an explanation.
Iframes define a frame that contains another website's content. They allow
you to put that other site's content on your website. Many content services want
other sites to use iframes to present their information because they allow them
to maintain control over access to their content. That's all you need to know
about iframe elements for now.

Make sure that your layout is correctly formatted by replacing what you've
written out in __layout.scss__ with the following template:

[layout.scss template][layout-scss]

Finally, make sure that you have a CSS template for your main content so
that you can implement your grid.  Paste the following CSS in
__\_main_content.scss__:

[_main_content.scss template][main_content_template]

Now you can begin implementing the grid.

First, add grid properties to the main-content, main-story, and opinion
classes. Now, create two columns for the main-content class that are sized
at 66.66% and 33.33% respectively.

Next, create two columns for the main-story class that are sized at 33.33%
and 66.66% respectively. Also, add a 20px padding-right to the main-story
class and its child element which is labeled `col-1-3`. Give the child
element a bottom margin of 20px.

Next, give the opinion class a top margin of 10px and a right padding of
20px.  Now create a grid with three rows and two columns where the first
row is 5px high, the third row is 60% of the height, the second row fills the
rest of the space, and the two columns split the graph in half.  

> **Hint:** Look into `fr` to fill the rest of the space for when you're
> creating rows. (`fr` is short for "fraction" of the available space;
> `grid-template-columns: 1fr 1fr 1fr` would create three evenly-spaced
> columns.) Then give the first child labeled `col-1-2` a padding on its right
> side of 20px. Make sure that the first anchor tag child of the opinion class
> spans the two columns. Finally, make sure that the class labeled
> `.opinion-sign-up` also spans the first two columns.

**Get a TA to review your page before continuing.**

### Media queries

Now try resizing the window. Notice that your flexible website breaks a bit
because you don't have flexible fonts. Let's leave this discussion for another
time and instead use media queries to complete your responsive design. Notice
how the number of links in the Sections Nav is too big for smaller screen sizes
(i.e., mobile screens). Let's adjust for mobile!

[Mobile Mockup][mobile-mock]

- Write a media query similar to the one used in the `grid.scss` to hide the
  Sections Nav at the same viewport width that the columns convert to `100%`.
- Write a similar media query to hide the Language Nav.
- Finally, hide the "Subscribe" and "Login" buttons, and take the margin off
  the `.left-nav` in the `main_nav` styles. Add a bit of padding as well.

**N.B.** With just these few media queries and a flexible grid system, you have
a completely responsive website!

[custom-grid-link]: https://assets.aaonline.io/fullstack/html-css/projects/aa_times/solution/docs/screenshots/grid.gif
[grid-garden]: https://cssgridgarden.com/
[main_content_template]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/fullstack/html-css/assets/main_content_css_template.css
[layout-scss]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/fullstack/html-css/assets/layout_css_template.css
[main-content-erb-template]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/fullstack/html-css/assets/main_content_html_template.txt

---

## Phase 5: The sections sidebar

Now code a Sections Sidebar so that mobile users still have a way of
navigating all of the different App Academy Times sections. Style it according
to the mockup.

[Sections Sidebar Mockup][sectionssidebar-mock]

- Copy and paste the HTML from the __\_sections_nav.html.erb__ file into the
  __\_sections_sidebar.html.erb__ file to use as a skeleton and guide.
- In __\_main_nav.html.erb__, add `<%= render partial: 'shared/sections_sidebar'
   %>` as a child of the corresponding list element alongside the
   `sections-sidebar-btn` `div`.
- Take a look at the
  __app/javascript/controllers/sections_sidebar_controller.js__ to see how the
  Sidebar functions. These two toggle methods are tied to the HTML through the
  `data-controller` and `data-action` attributes in __\_main_nav.html.erb__.
  (Rails uses [Stimulus] to do this, but you don't need to know the details
  right now.)
- On the outermost element in __\_sections_sidebar.html.erb__, add the following
  `data-action` attribute:
  
  ```html
  data-action="pointerleave->sections-sidebar#toggleSidebarIfExpanded"
  ```

  This will ensure that `toggleSidebarIfExpanded` gets called whenever the
  mouse/pointer leaves the element. **Note:** `data-action` only works in a
  context where `data-controller` has been set; here it has already been set on
  the encompassing `li` in __\_main_nav.html.erb__.
- In __\_sections_sidebar.scss__, start with a selector to style the `opacity:
  0` normally and `opacity: 1` when it has the additional `.expand` class.

**N.B.:** You should use `opacity` here instead of `display` because it is
transition-able.

This is the effect you are going for:

![Sidebar Example][sidebar-ex]

- Copy and paste the content from __docs/copy/sidebar\_submenus.txt__ into
  __\_sections_sidebar.html.erb__.
- Add the remaining HTML to the `sections_sidebar` by nesting `ul` elements
  within the `li` elements that require an additional dropdown.

Create pure CSS dropdowns with the following example code:

```html
<section class="dropdown">
  <ul>
    <li>lorem ipsum</li>
    <li>Lorem ipsum dolor</li>
  </ul>
</section>
```

```css
.dropdown {
  position: relative;
}
.dropdown > ul {
  display: none;
  position: absolute;
  /* use top, left, right, bottom to position */
}
.dropdown:hover > ul {
  /* applies the following style to uls inside .dropdown */
  /* but only when .dropdown is being hovered over */
  display: block;
}
```

Use pseudo-element [CSS triangles][triangles] to create the arrows for the menu
items as well as the submenu dropdown triangles. This code could apply right
arrows to the list items in the dropdown HTML from above:

```css
.dropdown li {
  position: relative;
}
.dropdown li:after,
.dropdown li:before {
  content: "";
  position: absolute;
  right: 0;
  top: 25%;
  border-left: 5px solid gray;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  width: 0;
  height: 0;
}
.dropdown li:after {
  right: 2px;
  border-left: 5px solid white;
  z-index: 1;
}
```

[Stimulus]: https://stimulus.hotwired.dev/handbook/origin
[mobile-mock]: https://assets.aaonline.io/fullstack/html-css/projects/aa_times/solution/docs/screenshots/mobile.png
[triangles]: https://css-tricks.com/snippets/css/css-triangle/
[sidebar-ex]: https://assets.aaonline.io/fullstack/html-css/projects/aa_times/solution/docs/screenshots/sidebar.gif
[sectionssidebar-mock]: https://assets.aaonline.io/fullstack/html-css/projects/aa_times/solution/docs/screenshots/sections_sidebar.jpg

---

## Phase 6: Search modal

[Search Modal Mockup][search-mock]

Modals are distinct from dropdowns because they appear to float independently
over the application. A common characteristic of a modal is also that the app
beneath becomes more opaque, and clicking away from the modal will close it.

Take a look at the __search-modal.png__ screenshot to get a better idea of what
this is supposed to look like. Use the __modal.js__ file to get the necessary
ids for the search button, modal, and overlay.

Create the HTML in the __\_search_modal.html.erb__ file and style in
__\_search_modal.scss__. There is already a 

```html
<section id="overlay"
         class="overlay hidden"
         data-controller="modal"
         data-action="click->modal#toggleModal"
></section>
```

at the bottom of the `main_content` section.

On your outermost element in __\_search_modal.html.erb__, add
`data-controller="modal"`. Then on whatever element you use for a close button,
add `data-action="modal#toggleModal"`. This will toggle--i.e., close--the modal
whenever a user pushes the close button.

Here is a trick to make content take up the full width of the viewport even when
inside of a smaller container by using viewport units (`vw` = viewport width,
`vh` = viewport height). You can read more about viewport units and full-width
containers in limited-width parents [here][css-tricks-containers].

```css
  position: absolute;
  width: 100vw;
  left: calc(-50vw + 50%);
```

- You can use this trick to make both the full width search modal and the
  overlay
- `height: 100%` is not transitionable...use `max-height` instead
- Inset box shadows with `box-shadow: inset 2px 3px 3px rgba(0,0,0,0.07);`

Before continuing, **call a TA for review**.

[search-mock]:https://assets.aaonline.io/fullstack/html-css/projects/aa_times/solution/docs/screenshots/search_modal.jpg
[css-tricks-containers]: https://css-tricks.com/full-width-containers-limited-width-parents/

## Bonus: A fixed header

Use what you have learned to create a Fixed Header. When scrolling past the
`sections_nav` a `fixed_sections_nav` should appear. Use the [NYTimes][nyt] as
an example.

[nyt]: http://nytimes.com

## Additional reading

Additional reading related to today's project:

- [guard][guard-livereload]
- [sass][sass-features]

[guard-livereload]: https://mattbrictson.com/lightning-fast-sass-reloading-in-rails
[sass-features]: https://github.com/rails/sass-rails#features