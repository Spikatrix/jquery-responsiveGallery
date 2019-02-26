/*
  jquery.responsiveGallery.js
  v 1.0
  David
  http://www.CodingSerf.com
*/

;(function($) {
  $.fn.responsiveGallery = function(option) {
    let opts = $.extend({}, $.fn.responsiveGallery.defaults, option);  // 配置选项
    let $rgWrapper = this;
    let $rgItems = $rgWrapper.find('li');  // .responsiveGallery-item
    let rgItemsLength = $rgItems.length;
    let support3d = Modernizr.csstransforms3d;
    let support2d = Modernizr.csstransforms;
    let rgCurrentIndex = 0;
    let rgShowCount = 5;
    let rgTransCSS = [];
    let animatDuration = opts.animatDuration;
    let isAnimating = false;
    let touchX = 0;

    console.log(opts);
    function getTransform3dCSS(tx, ty, ry, zIndex, opacity, visibility) {
      return {
        '-webkit-transform' : 'translateX('+tx+') translateZ('+ty+'px) rotateY('+ry+'deg)',
        '-moz-transform'    : 'translateX('+tx+') translateZ('+ty+'px) rotateY('+ry+'deg)',
        '-o-transform'      : 'translateX('+tx+') translateZ('+ty+'px) rotateY('+ry+'deg)',
        '-ms-transform'     : 'translateX('+tx+') translateZ('+ty+'px) rotateY('+ry+'deg)',
        'transform'         : 'translateX('+tx+') translateZ('+ty+'px) rotateY('+ry+'deg)',
        'z-index'           : zIndex,
        'opacity'           : opacity,
        'visibility'        : visibility
      };
    }

    function getTransform2dCSS(t, s, originX, originY, opacity, visibility) {
      return {
        '-webkit-transform'        : 'translate('+t+') scale('+s+')',
        '-moz-transform'           : 'translate('+t+') scale('+s+')',
        '-o-transform'             : 'translate('+t+') scale('+s+')',
        '-ms-transform'            : 'translate('+t+') scale('+s+')',
        'transform'                : 'translate('+t+') scale('+s+')',
        '-webkit-transform-origin' : originX+' '+originY,
        '-moz-transform-origin'    : originX+' '+originY,
        '-ms-transform-origin'     : originX+' '+originY,
        '-o-transform-origin'      : originX+' '+originY,
        'transform-origin'         : originX+' '+originY,
        'opacity'                  : opacity,
        'visibility'               : visibility
      };
    }

    function getTransitionCSS(time, ease) {
      return {
        '-webkit-transition' : 'all '+time+'s '+ease,
        '-moz-transition'    : 'all '+time+'s '+ease,
        '-ms-transition'     : 'all '+time+'s '+ease,
        '-o-transition'      : 'all '+time+'s '+ease,
        'transition'         : 'all '+time+'s '+ease
      };
    }

    function getTransform7CSS() {
      var cssArray;

      if (support3d) {
        cssArray = [
          getTransform3dCSS('-100%', -400,  40, -1, 0, 'hidden'),
          getTransform3dCSS(    '0', -350,  45, -1, 1, 'visible'),
          getTransform3dCSS( '100%', -300,  45,  0, 1, 'visible'),
          getTransform3dCSS( '200%', -200,  40,  1, 1, 'visible'),
          getTransform3dCSS( '300%',    0,   0,  2, 1, 'visible'),
          getTransform3dCSS( '400%', -200, -40,  1, 1, 'visible'),
          getTransform3dCSS( '500%', -300, -45,  0, 1, 'visible'),
          getTransform3dCSS( '600%', -350, -45, -1, 1, 'visible'),
          getTransform3dCSS( '700%', -400, -40, -1, 0, 'hidden')
        ];
      } else if (support2d) {
        cssArray = [
          getTransform2dCSS('-100%', 0.6, '100%', '50%', 0, 'hidden'),
          getTransform2dCSS(    '0', 0.6, '100%', '50%', 1, 'visible'),
          getTransform2dCSS( '100%', 0.7, '100%', '50%', 1, 'visible'),
          getTransform2dCSS( '200%', 0.8,  '50%', '50%', 1, 'visible'),
          getTransform2dCSS( '300%',   1,  '50%', '50%', 1, 'visible'),
          getTransform2dCSS( '400%', 0.8,  '50%', '50%', 1, 'visible'),
          getTransform2dCSS( '500%', 0.7,   '0%', '50%', 1, 'visible'),
          getTransform2dCSS( '600%', 0.6,   '0%', '50%', 1, 'visible'),
          getTransform2dCSS( '700%', 0.6,   '0%', '50%', 0, 'hidden')
        ];
      }

      return cssArray;
    }

    function getTransform5CSS() {
      var cssArray;

      if (support3d) {
        cssArray = [
          getTransform3dCSS('-100%', -400,  45, -1, 0, 'hidden'),
          getTransform3dCSS(    '0', -300,  45,  0, 1, 'visible'),
          getTransform3dCSS( '100%', -200,  45,  1, 1, 'visible'),
          getTransform3dCSS( '200%',    0,   0,  2, 1, 'visible'),
          getTransform3dCSS( '300%', -200, -45,  1, 1, 'visible'),
          getTransform3dCSS( '400%', -300, -45,  0, 1, 'visible'),
          getTransform3dCSS( '500%', -400, -45, -1, 0, 'hidden')
        ];
      } else if (support2d) {
        cssArray = [
          getTransform2dCSS('-100%', 0.6, '100%', '50%', 0, 'hidden'),
          getTransform2dCSS(    '0', 0.7, '100%', '50%', 1, 'visible'),
          getTransform2dCSS( '100%', 0.8,  '50%', '50%', 1, 'visible'),
          getTransform2dCSS( '200%',   1,  '50%', '50%', 1, 'visible'),
          getTransform2dCSS( '300%', 0.8,  '50%', '50%', 1, 'visible'),
          getTransform2dCSS( '400%', 0.7,   '0%', '50%', 1, 'visible'),
          getTransform2dCSS( '500%', 0.6,   '0%', '50%', 0, 'hidden')
        ];
      }

      return cssArray;
    }

    function getTransform3CSS() {
      var cssArray;

      if (support3d) {
        cssArray = [
          getTransform3dCSS('-100%', -400,  45, 0, 0, 'hidden'),
          getTransform3dCSS('-36px', -300,  45, 1, 1, 'visible'),
          getTransform3dCSS(  '94%',    0,   0, 2, 1, 'visible'),
          getTransform3dCSS( '199%', -300, -45, 1, 1, 'visible'),
          getTransform3dCSS( '300%', -400, -45, 0, 0, 'hidden')
        ];
      } else if (support2d){
        cssArray = [
          getTransform2dCSS('-100%', 0.65, '100%', '50%', 0, 'hidden'),
          getTransform2dCSS('-36px',  0.8,  '50%', '50%', 1, 'visible'),
          getTransform2dCSS(  '94%',    1,  '50%', '50%', 1, 'visible'),
          getTransform2dCSS( '199%',  0.8,  '50%', '50%', 1, 'visible'),
          getTransform2dCSS( '300%', 0.65,   '0%', '50%', 0, 'hidden')
        ];
      }

      return cssArray;
    }

    function getTransform1CSS() {
      var cssArray;

      if (support3d) {
        cssArray = [
          getTransform3dCSS('-100%', -300,  45, 0, 0, 'hidden'),
          getTransform3dCSS(   '0%',    0,   0, 2, 1, 'visible'),
          getTransform3dCSS( '100%', -300, -45, 0, 0, 'hidden')
        ];
      } else if (support2d) {
        cssArray = [
          getTransform2dCSS('-100%', 0.65, '100%', '50%', 0, 'hidden'),
          getTransform2dCSS(    '0',    1,  '50%', '50%', 1, 'visible'),
          getTransform2dCSS( '100%', 0.65,   '0%', '50%', 0, 'hidden')
        ];
      }

      return cssArray;
    }

    function setSectionItems(fun) {
      var $items = [];

      $items[0] = $rgItems.eq(rgCurrentIndex - 1);
      fun(0,$items[0]);
      for (var i = 1; i <= rgShowCount + 1; i++) {
        var next = rgCurrentIndex + i - 1;
        if (next >= rgItemsLength) {
          next = next - rgItemsLength;
        }
        $items[i] = $rgItems.eq(next);
        fun(i, $items[i]);
      }
    }

    function moveGallery(direction, distance) {
      let moveDistance = 1;
      if (distance !== undefined) {
        moveDistance = distance;
      }

      if (moveDistance === 0) {
        setSectionItems(function(i, $item) {
          $item.css(rgTransCSS[i]);
        });
      }

      for (let i = 0; i < moveDistance; i++) {
        isAnimating = true;

        rgCurrentIndex += direction;
        if (rgCurrentIndex < 0) {
          rgCurrentIndex = (rgCurrentIndex % rgItemsLength) + rgItemsLength;
        }
        if (rgCurrentIndex >= rgItemsLength) {
          rgCurrentIndex = rgCurrentIndex % rgItemsLength;
        }
        setSectionItems(function(i, $item) {
          $item.css(rgTransCSS[i]);
        });

        setTimeout(function() {
          isAnimating = false;
        }, animatDuration);  // 防止连击
      }
    }

    function getShortestMovement(from, to, len) {
      if (from === to) {
        return [0, 0];
      }
      const innerDistance = Math.max(from, to) - Math.min(from, to);
      const outerDistance = len- innerDistance;
      const shortestDistance = Math.min(innerDistance, outerDistance);
      const shortestDistanceIsInternal = innerDistance < len/ 2;
      if ((shortestDistanceIsInternal && from < to) ||
          (!shortestDistanceIsInternal && from > to)) {
        return [+1, shortestDistance];
      } else {
        return [-1, shortestDistance];
      }
    }

    function gotoGallery(index) {
      const [direction, distance] = getShortestMovement(rgCurrentIndex, index, rgItemsLength);
      moveGallery(direction, distance);
    }

    opts.$btn_next.on('click', function(e) {
      !isAnimating && moveGallery(+1);
    });

    opts.$btn_prev.on('click', function(e) {
      !isAnimating && moveGallery(-1);
    });

    opts.$btn_goto.on('click', function(e) {
      console.log(e);
      console.log(e.target.value);
      gotoGallery(e.target.value);
    });

    $rgWrapper.on('touchstart', function(e) {
      var touch = e.originalEvent.touches[0];
      touchX = touch.pageX;
    }).on('touchend touchcancel', function(e) {
      var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0],
        touchGap = touch.pageX - touchX;

      if (touchGap>5) {  // swipe right
        opts.$btn_prev.trigger('click');
      }
      if (touchGap<-5) {  // swipe left
        opts.$btn_next.trigger('click');
      }
    });

    $(window).on('resize', function(e) {
      $rgItems.removeAttr('style');  // 清除样式，否则在resize的时候不能正常取到下列元素的width

      let wrapperWidth = $rgWrapper.width();
      let itemWidth = $rgItems.eq(0).width();

      rgShowCount = Math.round(wrapperWidth / itemWidth);

      if (rgShowCount === 1) {  // 显示1个
        rgTransCSS = getTransform1CSS();
      } else if (rgShowCount === 3) {  // 显示3个
        rgTransCSS = getTransform3CSS();
      } else if (rgShowCount === 5) {  // 显示5个
        rgTransCSS = getTransform5CSS();
      } else if (rgShowCount === 7) {
        rgTransCSS = getTransform7CSS();
      } else {
        return;
      }

      rgCurrentIndex = 0;
      moveGallery(0, 0);
      setTimeout(function() {
        $rgItems.css(getTransitionCSS(animatDuration / 1000, 'ease-in-out'));
      }, 10);  // 等初始位置设置好后再添加动画

    }).trigger('resize');

    // 链式返回
    return this;
  };

  // FIXME: defaults don't work!
  $.fn.responsiveGallery.defaults = {
    animatDuration: 400,  // 动画时长 单位 ms
    $btn_prev: $('.responsiveGallery-btn_prev'),
    $btn_next: $('.responsiveGallery-btn_next'),
    $btn_goto: $('.responsiveGallery-btn_goto')
  };
})(jQuery);
