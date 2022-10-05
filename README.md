# App Academy Times

Often when working as a frontend developer you'll be collaborating with a
designer. Most likely they will provide you with a sequence of screenshots and
specifications for you to convert into neat, maintainable HTML and CSS. Like so:

![aa-times][aa-times-example]

Clone the starter repo at the `Download Project` button below to
get started on making an App Academy clone of [The New York Times
homepage][NYT]! (NOTE: The NYT link takes you to an archived version of what
nytimes.com looked like when this project was originally written. Because it is
an archived version, it may load somewhat slowly, and some assets may not load
correctly.)

[NYT]: https://web.archive.org/web/20161017001435/http://www.nytimes.com/
[aa-times-example]: https://assets.aaonline.io/fullstack/html-css/projects/aa_times/solution/docs/screenshots/overall.png

## Learning goals

By the end of this project, you should be able to

- Reason about styling approaches from screenshots of a design
- Lay out elements using CSS `grid` properties
- Create interactive elements such as sidebars and dropdowns
- Implement media queries and responsive design
- Use an icon font system
- Organize stylesheets in a Rails Application

## Phase 0: Setup

- Navigate to the root directory and `bundle install`.
- Run `chmod +x bin/dev` in your terminal to make `bin/dev` executable.
- Run `bin/dev` in your terminal.
- Open [`localhost:3000`] to see the site you're working on.

The `bin/dev` command uses [`foreman`] to run your Rails server and
`dartsass:watch` with a single command. (These commands are specified in the
__Procfile.dev__ file.) As you might expect, `dartsass:watch` essentially
watches your __.scss__ files. It also updates the __application.css__ in your
__app/assets/builds__ folder whenever they change.

Updating your build file on any change is great, but you'd probably also like to
see the changes appear in your browser. To make that happen, the project uses
the [`rails_live_reload`] gem, which triggers a (full) refresh in the browser
whenever your __application.css__ build file or any of the partials in
__views/shared__ change. Unfortunately, this gem also comes with a
potential issue.

The `rails_live_reload` gem creates a socket connection with the browser. If
your project's path is too long--the full socket file path cannot be more than
104 characters--you will get a `too long unix socket path` error and your
project will exit. If you get this error, you have 2 potential ways forward:

1. Copy the project folder to a higher-level directory so that the path is
   shorter and do your work there.
2. Remove the `rails_live_reload` gem from your __Gemfile__ and `bundle
   install`. Note that if you choose this option, you will have to refresh your
   browser manually to see any changes.

[`localhost:3000`]: http://localhost:3000
[`foreman`]: https://github.com/ddollar/foreman
[`rails_live_reload`]: https://github.com/railsjazz/rails_live_reload

### Stylesheets file structure

Begin by familiarizing yourself with the stylesheets file structure. The
__base__ directory in __app/assets/stylesheets__ holds styles that should apply
to the app globally and be accessible to component styles. The __components__
directory holds styles for specific components. This will help you maintain your
sanity as more styles are added over the app's lifespan.

```text
/app/assets/stylesheets
+-- base
|   +-- layout.scss
|   +-- reset.scss
+-- components
|   +-- _gear_dropdown.scss
|   +-- _index.scss
|   +-- _main_content.scss
|   +-- _main_nav.scss
|   +-- _masthead.scss
|   +-- _search_modal.scss
|   +-- _sections_nav.scss
|   +-- _sections_sidebar.scss
+-- variables
|   +-- colors.scss
|   +-- fonts.scss
|   +-- index.scss
+-- application.scss
```

These are all Sass (SCSS) files rather than straight-up CSS. The `build` and
`watch` commands in the [`dartsass-rails`] gem compile these Sass files into a
single CSS file--__app/assets/builds/application.css__--that your app can then
use. As designated in __assets/config/manifest.js__, this CSS file is
then what the [Rails Asset Pipeline] serves up.

Next, take a look at the __app/assets/stylesheets/application.scss__ file:

```scss
// CSS Reset
@use "base/reset";

// Core
@use "base/layout";

// Components
@use "components";
```

This file uses SCSS's [`@use`] to define all the styles that will apply to your
entire application and enforce the importing of these stylesheets in a
particular order. You can think of __application.scss__ as building all the
imported files into one giant SCSS file.

The file imports all of the components by referencing the directory name: `@use
"components";`. When given a directory to `use`, Sass will look for an
__index.scss__  (or __\_index.scss__) inside that directory to import. In the
case of __components__, the __\_index.scss__ simply `forward`s all of the
different components. [`@forward`] works similarly to `@use` except that it
makes the module being imported into __\_index.scss__ available to files that
`use` __\_index.scss__ as well.

(As in Rails, an `_` at the beginning of a Sass filename indicates a partial
file. In many projects, you will accordingly see all Sass files but the main
compilation beginning with an underscore. The convention adopted in this
project, however, uses the `_` to designate files that do not apply to the
project as a whole. Note that, also as in Rails, you do not include the `_` when
referencing the file in your code, as, e.g., in a `@use` statement.)

Inside the __stylesheets/variables__ folder, you will find two main files:
__colors.scss__ and __fonts.scss__. These files define SCSS variables that you
should use when defining any fonts or color values throughout the project.
Defining SCSS variables for an app's fonts and colors in this way makes it easy
to change them at any point. It also promotes maintainability and consistency.

The __colors.scss__ and __fonts.scss__ files do not appear in
__application.scss__; they are instead imported directly into the files that
need them. You can see an example of how to import them in
__\_gear_dropdown.scss__:

```scss
@use '../variables' as *;
```

As noted above, the use of the directory name in this `@use` statement will pull
in the index file. The `as *` explicitly sets the namespace for the imported
module explicitly, with the `*` signifying that no namespace should be used.
This allows you to use the variables coming from this directory directly:
`$serif`, `$gray`, and so on. That works in this case because there is little
chance of colors and fonts having the same name, and it is fairly clear which
file each variable is coming from.

If a `use` statement has no `as` clause, then the namespace will be based on the
last word of the file/folder name. So, e.g., `@use '../variables'` would import
the variables under the namespace `variables`. Whenever a namespace exists, you
have to access the imported variables (functions, mix-ins, etc.) through the
namespace: `variables.$serif`, `variables.$gray`.

> **Note:** You won't dive any deeper into SCSS for this project, but it does
> provide a couple more cool features! Read about them [here][sass-features] if
> you're interested.

[`@use`]: https://sass-lang.com/documentation/at-rules/use
[`@forward`]: https://sass-lang.com/documentation/at-rules/forward
[sass-features]: https://sass-lang.com/documentation/

## A few things before you start...

- The project is provided as a Rails application to give you practice working
  with the [Rails Asset Pipeline] and navigating file structure.
- Sometimes the HTML will be given and you will need to style with CSS;
  sometimes the styles will be given and you will need to define the HTML
  structure; and sometimes you will be required to code both.
- The __docs__ folder contains two directories: __screenshots__ and __copy__.
  You'll use the images found in __screenshots__ for your mockups as you are
  styling. __copy__ contains the text you'll copy and paste for the app's
  content.
- **Pro Tip:** Keep each mockup open and use it for reference as you're styling
  a component.
- HTML is rendered using Rails partials in the
  __app/views/static_pages/index.html.erb__ file, allowing for the styling of
  each component separately.
- The images you will use to style your app are located in the
  __app/assets/images__ folder.
- Javascript files are provided in the __app/javascript__ folder.
- A script tag in the __application.html.erb__ loads [Font
  Awesome's][font-awesome] icon classes. For your app's icons, you will use ones
  imported from Font Awesome's list of icons and apply them to elements using
  classes.

[Rails Asset Pipeline]: https://guides.rubyonrails.org/asset_pipeline.html
[font-awesome]: https://fontawesome.com/v6/icons

## Phase 1: Reset

Always begin styling an app with a clean slate by "resetting" the user agent
stylesheet provided by the browser in your __stylesheets/base/reset.scss__ file.

To speed things up, you have been provided with some tag selectors to get you
started.

- Be wise about which properties to inherit, and which to hard-code.
- After you've set the other properties, set the `box-sizing` property to
  `inherit` to have all elements behave the same by default (they will all have
  their property set to `content-box`).
- Remove the bullets from list items.
- Make all images `block` elements. Each image's width should be equal to its
  parent's width (`100%`) and its height should grow proportionally (`auto`).
  Set `img`, `width`, and `height` properties accordingly.
- Set the `cursor` to be the pointer hand on `button`s to make it obvious for
  users to click.
- Lastly, define clearfix.

## Phase 2: The Layout

Study the mockup to get an idea of the app's overall design.

- [Layout Mockup][layout-mock]

In order to write "cascading" style sheets, it is important to pick out
common design elements and essential layout features. Use the
__layout.scss__ file when styling aspects common to the entire application.

Notice that all of the app's content is styled in a defined block away from the
edges of the screen. Each component is also contained within regions with clean
margins. This is essential for user experience because it makes content easier
to read.

In __stylesheets/base/layout.scss__, style the `body`:

- Apply a width of `80%`.
- Center using `margin: 0 auto;`.
- Set the base font to `font-family: $serif`.
- Set `12px` as the default `font-size`.

---

## Phase 3: The Header

With your layout styling started you can now begin focusing on each component,
like the header. You can break the header down further into smaller components:
`main_nav` (with a `masthead` component containing your logo) and `sections_nav`
(with a `gear_dropdown` component).

- [Main Nav Mockup][main-nav-mock]
- [Masthead Mockup][masthead-mock]
- [Sections Nav Mockup][sectionsnav-mock]
- [Gear Dropdown Mockup][gear-mock]

You will style each one of these components in its own stylesheet. **N.B.:**
Breaking down stylesheets into each component is key to writing maintainable and
modular stylesheets.

### Main Nav

[Main Nav Mockup][main-nav-mock]

Compare the provided HTML structure in __views/shared/_main_nav.html.erb__ to
the mockup. Notice that you are missing the HTML for the right-side navigation.
It's time to add it!

In __views/shared/_main_nav.html.erb__:

- Add a `<nav>` with the class `"right-nav"`. Make sure it's contained within
  the `"main-nav"` element.
- Add a `ul` element to your new `nav`. Make the buttons and gear icon list
  items of this unordered list.
- Add "Subscribe Now" and "Log In" buttons. (Note: use HTML button tags for
  these elements)
- Add the gear icon.
  - Use [this list of Font Awesome icon classes][font-awesome-solid] to find an
    appropriate gear image. Match the gear as closely as you can, but don't
    worry if it's not identical. (**Note:** Although Font Awesome v6 offers
    several different versions of each icon, the free FA account your site is
    using requires that you use the `fa-solid` version.)
  - Use the "Sections" and "Search" buttons defined in the `left-nav` as guides.

A great use for the __layout.scss__ stylesheet is to define styling shared by
multiple elements. For example, the styling for the "Subscribe Now" button is
identical to the styling for the "Log In" button. **N.B.**: Using the same
styling on buttons makes it easier for users to know where to click throughout
your app.

In __stylesheets/base/layout.scss__:

- Style the buttons to look like the buttons in the mockup.
- Each CSS property has been provided as a comment.

Now it is time to style the __components/_main_nav.scss__ stylesheet. The
selectors have been provided for you. Here are some guidelines:

- Add `display: flex` to the `.main-nav` and use `justify-content` for
  horizontal spacing.
- Add `padding` to the `.main-nav` for vertical spacing.
- Flex the unordered lists to keep their children horizontally aligned and use
  the `align-items` property to vertically align them.
- Apply `font-family`, `font-size`, and `text-transform` properties to the list
  elements themselves.
- Use the `$lightest-gray` hover for the list elements without buttons.
- Style the necessary `margin` spacing between the texts and the icons.
- Use `font-size` to make the gear icon bigger.

[font-awesome-solid]: https://fontawesome.com/v6/icons?s=solid

### Masthead

[Masthead Mockup][masthead-mock]

Open up __views/shared/_masthead.html.erb__. Pull up the provided
__components/_masthead.scss__ stylesheet next to it using split screen.

Copy and paste all of the text content from __docs/copy/masthead.txt__ into the
HTML file. You will build the HTML structure around the content. Here are some
guidelines:

- Notice that the `.masthead` is a flex-parent which means it will be used as an
  HTML container element and all of its immediate child elements will be
  flex-children.
- Set the `align-items` property to center the flex-children horizontally.
- The Rails Asset Pipeline takes care of precompiling your assets, so the
  correct file path for images in the __assets/images__ folder is
  __assets/example_image.jpg__.
- Images that are important to a website's search engine optimization (SEO)
  should be image tags rather than background images, as image tags are parsed
  by search engines.
- Only list elements should be present within unordered lists, but list elements
  may contain other elements such as anchor tags or buttons.

After some HTML structuring you will notice some problems with the styling.
Refer to the masthead mock up and edit the stylesheet to fix the following
things:

- Remove the last border-right from `.masthead-links`.
- Make the first link in the `.language-nav` bold.
- Add application styling for anchor tags using the __layout.scss__ file.

### Sections Nav

[Sections Nav Mockup][sectionsnav-mock]

Follow the patterns and coding patterns described above to style the Sections
Nav component. Define its styles in
__stylesheets/components/_sections_nav.scss__ and HTML in
__views/shared/_sections_nav.html.erb__ file. Copy and paste the text content
from __docs/copy/sections_nav.txt__. Once you have fully completed the Sections
Nav bar **call over a TA to code review your Header**!

### Gear Dropdown

[Gear Dropdown Mockup][gear-mock]

- Add the necessary `id` attribute to the gear icon's `li` (lives in
  __\_main_nav.html.erb__).

Open the __\_gear_dropdown.html.erb__ file that defines the HTML structure
for the dropdown. Notice the classes used to divide the different unordered
lists and the span elements for the subtitles.

- Render the partial as a child of the list element with the gear icon using
  `<%= render partial: 'shared/gear_dropdown' %>`

Style the dropdown in __\_gear_dropdown.scss__ according to the mockup:

- Style its position:
  - Position the icon's `li` relatively.
    - This will allow the absolutely positioned dropdown to use this element as
      a reference point.
  - Position `.gear-dropdown` absolutely and use `top` and `right` to adjust.
    - Give the dropdown `display: none` and have it `display: block` only when
      you hover over its parent `li`.
- Give the dropdown some background, padding, and a border.
- Use a defined px `width` for this dropdown.
  - Using px widths for HTML elements can be dangerous, as a page's styling can
    be ruined if either the window size or the content inside that element
    changes size drastically. For smaller elements with minimal content inside
    them, like this dropdown, there is less of a danger of that happening.
- Set the `z-index`. Remember the `z-index` property is used on positioned
  elements to place them in front of or behind other elements with the largest
  `z-index` being in front.
- Style the remaining fonts and margins being sure to use proper selectors.

For a final touch apply some `box-shadow` styling to the dropdown to give it a
bit more dimension. Box shadows are highly customizable with values for the
`x-offset`, `y-offset`, `blur-radius`, `spread-radius` and `color`. Here is an
example using `rgba` colors. Set the `rgba` values like so:
`rgba(Red, Green, Blue, Alpha)`. The `Alpha` value controls the transparency.
Let's make this shadow very transparent.

```css
box-shadow: -1px 4px 6px 1px rgba(0, 0, 0, 0.09);
```

---

## Head to Part 2!

Once you have finished Phases 1-3, **commit your code** and continue on to
Phases 4-6 in Part 2.

[layout-mock]: https://assets.aaonline.io/fullstack/html-css/projects/aa_times/solution/docs/screenshots/main_content.jpg
[main-nav-mock]:https://assets.aaonline.io/fullstack/html-css/projects/aa_times/solution/docs/screenshots/main_nav.jpg
[masthead-mock]:https://assets.aaonline.io/fullstack/html-css/projects/aa_times/solution/docs/screenshots/masthead.jpg
[sectionsnav-mock]:https://assets.aaonline.io/fullstack/html-css/projects/aa_times/solution/docs/screenshots/sections_nav.jpg
[gear-mock]: https://assets.aaonline.io/fullstack/html-css/projects/aa_times/solution/docs/screenshots/gear_dropdown.jpg