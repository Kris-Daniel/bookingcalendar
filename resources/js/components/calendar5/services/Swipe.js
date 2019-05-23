import Store from './Store';
export default function Swipable(box, drag, $) {
	// globals
	let cursorX = 0,
		cursorY = 0,
		indent;

	function setCursors() {
		var event = window.event;
		cursorX = event.touches[0].clientX;
		cursorY = event.touches[0].clientY;
	}
	// events
	$(box).on('touchstart', function() {
        setCursors();
		$(box).bind('touchmove', function(e) {
            e.preventDefault();
            cursorX = e.touches[0].clientX;
    		cursorY = e.touches[0].clientY;
		});

		let $drag = $(this).find(drag);
		indent = $drag.outerWidth();
        console.log($drag, indent);

		let swipe = new Swipe($drag);

		$(this).on('touchend', function() {
			$(box).off('touchmove');
			$(this).off('touchend');
			swipe.end();
		});
	});

	var Swipe = class {
		constructor($drag) {
			this.$drag = $drag;
			this.x1 = cursorX;
			this.y1 = cursorY;
			this.xDif = '';
			this.yDif = '';
			this.swipeIndent = 0;

			this.start();
		}

		reset() {
			let it = this;
			if(it.swipeIndent == indent || it.swipeIndent == -indent) {
				it.$drag.css({transform: ''});
			} else {
				it.$drag.css({transition: '0.3s all ease', transform: ''});
				this.resetTimeout = setTimeout(function() {
					it.$drag.css({
						transition: ''
					});
				}, 300);
			}
		}

		start() {
			let it = this;
			this.swipeInterval = setInterval(function() {
				it.xDif = cursorX - it.x1;
				it.yDif = cursorY - it.y1;
				it.swipeIndent = it.setIndent(it.xDif);

				it.$drag.css({'transform': 'translateX(' + it.swipeIndent + 'px)'});
			}, 0.0001);
		}

		end() {
			clearInterval(this.swipeInterval);
			if(this.$drag.hasClass('active')) {
				if(this.xDif < (-indent / 4))
					this.$drag.removeClass('active');
                    Store.showLS = false;
                    Store.overlay = false;
			} else {
				if(this.xDif > indent / 4)
					this.$drag.addClass('active');
                    Store.showLS = true;
                    Store.overlay = true;
			}
			this.reset();
		}

		setIndent(len) {
			if(this.$drag.hasClass('active')) {
				if(len < -indent) return -indent;
				if(len > 0) return 0;
				return len;
			} else {
				if(len > indent) return indent;
				if(len < 0) return 0;
				return len;
			}
		}
	}
}
