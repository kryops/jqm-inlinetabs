/*
 * jQuery Mobile InlineTabs
 * (c) 2012 Michael Strobel
 * Licensed under MIT
 * 
 * https://github.com/kryops/jqm-inlinetabs
 */

(function( $, undefined ) {

$.widget( "mobile.inlinetabs", $.mobile.widget, {
	
	options: {
		iconpos: "left",
		scroll: null,
		theme: null,
		tabTheme: null,
		contentTheme: null,
		activeClass: $.mobile.activeBtnClass,
		mini: null,
		initSelector: ":jqmData(role='inlinetabs')"
	},

	_create: function() {
		
		this.refresh(true);
		
	},
	
	refresh: function(create) {
		
		if(!create) {
			this.element.find('.ui-inlinetabs-content').unwrap();
		}
		
		var $element =  this.element,
			$tabbar = $element.children(':not(:jqmData(tab-ignore))').first(),
			$tabs = $tabbar.children(':not(:jqmData(tab-ignore))'),
			$content = $element.children(':gt(0):not(:jqmData(tab-ignore))'),
			$container = $content.wrapAll('<div class="ui-inlinetabs-container" />').parent(),
			o = this.options,
			$activeTab = $tabs.filter(create ? ":jqmData(active)" : "." + o.activeClass).first();
		
		/*
		 * CSS enhancement
		 */
		 
		// Tabbar
		$tabbar.addClass('ui-inlinetabs-bar ui-corner-all');
		
		if(o.theme) {
			$tabbar.addClass('ui-bar-' + o.theme);
		}
		if(o.mini) {
			$tabbar.addClass('ui-mini');
		}
		if(o.scroll) {
			$tabbar.addClass('ui-inlinetabs-scroll');
		}
		if(o.contentTheme) {
			$tabbar.addClass('ui-inlinetabs-corner-top');
		}
		
		// Tabs
		if(!$activeTab.length) {
			$activeTab = $tabs.first();
		}
		
		$tabs.each(function() {
			
			$this = $(this);
			
			if(create || !$this.hasClass('ui-inlinetabs-tab')) {
				$this.buttonMarkup({
					corners: false,
					shadow: false,
					inline: true,
					theme: $this.jqmData('theme') || o.tabTheme,
					iconpos: $this.jqmData('icon') ? ($this.jqmData('iconpos') || o.iconpos) : undefined,
					mini: o.mini
				})
				.addClass('ui-corner-all ui-inlinetabs-tab');
			}
		});
		
		if(!create) {
			$tabs.removeClass(o.activeClass);
		}
		
		$activeTab.addClass(o.activeClass);
		
		// Tabbed Content
		var $activeContent = $activeTab.jqmData('tab') ? $content.filter(":jqmData(tab='" + $activeTab.jqmData('tab') + "')") : null;
		
		if(o.contentTheme) {
			$container.addClass('ui-corner-all ui-body-' + o.contentTheme);
			
			if(o.theme) {
				$container.addClass('ui-inlinetabs-container-top');
			}
		}
		
		$content.addClass('ui-inlinetabs-content')
				.hide();
		if($activeContent) {
			$activeContent.show();
		}
		
		/*
		 * Event Handling
		 */
		
		// remove previously attached event handlers
		if(!create) {
			$tabbar.off("vclick.inlinetabs", ".ui-inlinetabs-tab");
		}
		
		// change tabs on click/tap event
		$tabbar.on("vclick.inlinetabs", ".ui-inlinetabs-tab", function( event ) {
			if ( !$(event.target).hasClass( "ui-disabled" ) ) {
				
				$this = $(this);
				
				$tabs.removeClass(o.activeClass);
				
				$this.addClass(o.activeClass)
					.trigger('tab-show');
				
				$content.hide();
				
				var activeContent = $this.jqmData('tab');
				
				if(activeContent) {
					$content.filter(":jqmData(tab='" + activeContent + "')")
						.show()
						.trigger('tab-show');
				}
			}
		});
		
		// touch+mousewheel tab scrolling
		if(create && o.scroll) {
			$tabbar.on("vmousedown", function(e) {
				$(this).jqmData('scrollpos', e.pageX);
			})
			.on("vmousemove", function(e) {
				var $this = $(this),
					x = e.pageX,
					originalX = $this.jqmData('scrollpos');
				
				if(!originalX) {
					return;
				}
				
				var newScroll = $this.scrollLeft()-x+originalX,
					maxScroll = $this[0].scrollWidth-$element.width();
				
				if(maxScroll < 0) {
					maxScroll = 0;
				}
				
				if(newScroll < 0) {
					newScroll = 0;
				}
				else if(newScroll >= maxScroll) {
					newScroll = maxScroll-1;
				}
				
				$this.scrollLeft(newScroll);
				$this.jqmData('scrollpos', x);
				
				e.preventDefault();
			})
			.on("mousewheel", function(event, delta, deltaX, deltaY) {
						
				// 2-finger drag bugfix
				if(typeof(delta) == 'undefined' || delta == 0) {
					return;
				}
				
				var $this = $(this);
				
				$this.scrollLeft($this.scrollLeft() - delta*50);
				event.preventDefault();
			});
			
			$.mobile.document.on("vmouseup", function() {
				$tabbar.jqmRemoveData('scrollpos');
			});
		}
	},
	
	show: function(tab) {
		this.element.find(".ui-inlinetabs-tab:jqmData(tab='" + tab + "')").trigger('vclick');
	}
});

//auto self-init widgets
$.mobile.document.bind( "pagecreate create", function( e ) {
	$.mobile.inlinetabs.prototype.enhanceWithin( e.target );
});

})( jQuery );
