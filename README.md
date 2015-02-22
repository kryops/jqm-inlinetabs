# jQuery Mobile InlineTabs Widget

by Michael Strobel  

Licensed under the [MIT License](http://opensource.org/licenses/MIT)

Demo page: <http://kryops.de/jqm/tabs/demo>


___________________________________


## !!! Can be replaced by the native jQuery Mobile tabs widget since 1.4 !!!

[jQuery Mobile demo page](http://demos.jquerymobile.com/1.4.5/tabs/)

To generate a similar look&feel like with the InlineTabs widget, just give the tabs container a custom class and play around with the CSS like that:

```html
<div data-role="tabs" id="tabs" class="inlinetabs">
```


```css
.inlinetabs .ui-navbar {
	padding: 0 8px;
}

.inlinetabs .ui-tabs-nav > li {
	margin: 0 2px;
	width: auto;
	clear: none;
}

.inlinetabs .ui-tabs-nav .ui-btn {
	border: 1px solid #ddd;
	border-bottom: none;
	border-top-left-radius: .6em;
	border-top-right-radius: .6em;
}

.inlinetabs .ui-tabs-panel {
	background: #fff;
	border-radius: .6em;
	border: 1px solid #ddd;
}
```

___________________________________



## About

The InlineTabs widget is an extension for the [jQuery Mobile Framework](http://jquerymobile.com).   
It is targeted for web applications specifically desgined for tablet devices.

Current version for jQuery Mobile 1.4

**Older versions**;

*   [jQuery Mobile 1.3 version](https://github.com/kryops/jqm-inlinetabs/tree/c89276c27ad56b9bcca64cdd5adae3c9d626613b)
*   [jQuery Mobile 1.2 version](https://github.com/kryops/jqm-inlinetabs/tree/8fce1603a8c7c2c20d9e4d20fe4e47a24187a351)


## Usage

The InlineTabs widget requires the jQuery and jQuery Mobile libraries to be included:

	<link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css" />
    	<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
    	<script src="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>


The widget itself consists of one JavaScript and one CSS file. The JavaScript file has to be included *after* the files for jQuery and jQuery Mobile, the CSS file is best put in the `<head>` of the document.
	
	<link rel="stylesheet" href="jqm-inlinetabs.min.css" />
	<script src="jqm-inlinetabs.min.js"></script>


The widget is invoked with `data-role="inlinetabs"` on a container element.

The first child element of the container becomes the tab navigation. You can choose any element types you want, but unordered lists with `<ul>` and `<li>` are recommended.  
All other child elements become the tabbed content. All but the active content element are hidden at page load.

The relationships between the tabs and their content elements are established with identical `data-tab` attributes.

	<div data-role="inlinetabs">
		<ul>
			<li data-tab="1">First tab</li>
			<li data-tab="2">Second tab</li>
		</ul>
		
		<div data-tab="1">
			Content of Tab 1
		</div>
		
		<div data-tab="2">
			Content of Tab 2
		</div>
	</div>



## Options / data-attributes

#### Options for container element

**data-theme**  
Set the theme for the tab bar background  
Default: *none*

**data-tab-theme**  
Set the theme for the tabs  
Default: c

**data-content-theme**  
Set the theme for the content area  
Default: *none*

**data-active-class**  
Set the class for the active tab  
Default: *jQuery Mobile default*

**data-mini="true"**  
The tabs are displayed smaller

**data-scroll="true"**  
Activate touch/mousewheel scrolling behaviour for the tab bar.

With the default settings the tabs will wrap around if the screen is too small and occupy multiple lines. With touch scrolling activated, the tab bar is cut off on the right. The tabs can be scrolled by dragging the tab bar horizontally.

If you include the [jQuery Mouse Wheel Plugin](https://github.com/brandonaaron/jquery-mousewheel) by Brandon Aaron, the tab bar will also be scrollable with the mouse wheel.


#### Options for tab elements

**data-tab**  
Link to the corresponding content element, has to be identical there

**data-active="true"**  
Marks the tab as active on page load

**data-theme**  
Sets the theme for the tab, overwrites the `data-tab-theme` attribute of the container element  
Default: inherited from container or *c* if container has none

**data-icon**  
Adds an icon to the tab from the standard jQuery Mobile icon set (see [here](http://jquerymobile.com/demos/1.2.0/docs/buttons/buttons-icons.html))

**data-iconpos**  
Sets the position of the specified icon.  
Possible values: left, right, top, bottom  
Default: left

**ui-disabled**  
By adding the CSS class `ui-disabled` to a tab element, it is displayed grey and has no functionality


#### Options for content elements

**data-tab**  
Identifier, has to be identical to the `data-tab` attribute in the corresponding tab element


#### Other options

**data-tab-ignore="true"**  
Leaves the element untouched at initialization. Useful for adding non-tab-elements to the tab bar.



## Methods

**.inlinetabs('refresh')**  
If you want to dynamically add tabs to the container, you have to call `inlinetabs('refresh')` on it afterwards to enhance the new markup.


**.inlinetabs('show', 'tab-id')**  
Sets the active tab. The second parameter is the `data-tab` value of the tab that shall be activated.


## Events

**tab-show**  
Fired when the active tab changes. The event is fired both on the tab and on the content element

-	fired on the tab element **before** the content is changed
-	fired on the content element **after** it is set visible


## Additional notes

If you leave white space between the tab elements in the source code, a blank will be inserted between the tabs. If you want to remove it without writing "ugly" HTML, you can add `display:block; float:left` to the CSS of the tab elements. **Please note that this will break the touch scroll functionality!**