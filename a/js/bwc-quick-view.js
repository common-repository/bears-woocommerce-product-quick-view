/**
 * @package Bears WooCommerce Product Quick view
 * Version 1.0.0
 *
 */

/* Modal Lib Script */
!(function ($, w) {
  'use strict';

  var Bears_ModalAnime = function(opts) {
    this.opts = $.extend({
      wraper: 'body',
      handle: '.bma-handle',
      handleClickCallback: function() { return; },
      imageFollow: '.bma-image-follow',
      hasContent: false,
      ajaxContent: false,
      width: 900,
      sliderFinalWidth: 400,
    }, opts);

    var self = this,
        modalEl = $('.bwc-quick-view'),
        progressOpenContentAjax = true,
        $imgEl;

    /* modal event trigger */
    modalEl.on({
      '_init.bears-modal-anime' () {

      },
      '_reset.bears-modal-anime' () {
        progressOpenContentAjax = true;

        if($(this).find('.bwc-item-info').hasClass('bwc-active-anime-item')) {
          $(this).find('.bwc-item-info').removeClass('bwc-active-anime-item');
        }
      },
      '_is_animation.bears-modal-anime' (e, action) {
        if(action == true) $('body').addClass('bwc-is-animation')
        else $('body').removeClass('bwc-is-animation')
      },
      '_ajax_effect.bears-modal-anime' (e, action) {
        if(action == true) modalEl.addClass('bwc-ajax-load-enable')
        else modalEl.removeClass('bwc-ajax-load-enable')
      },
      '_set_open_pos.bears-modal-anime' (e, pos) {
        $(this).css({
          left: pos.left,
          top: pos.top,
          width: pos.cWidth,
        })

        modalEl.trigger('_reset.bears-modal-anime');
        $(this).trigger('_move_center.bears-modal-anime');
      },
      '_move_center.bears-modal-anime' (e) {
        var thisEl = this;
        anime({
          targets: thisEl,
          left: ($(w).width() / 2) - (self.opts.sliderFinalWidth / 2),
          /* calc top center: [BrowserWidth] - ([sliderFinalWidth](default 400) * [radio](imageFollowHeight / imageFollowWidth)) / 2 */
          top: ($(w).height() - (self.opts.sliderFinalWidth * (parseFloat($imgEl.css('height')) / parseFloat($imgEl.css('width'))))) / 2,
          width: self.opts.sliderFinalWidth,
          duration: 1000,
          begin (anim) {
            modalEl.trigger('_is_animation.bears-modal-anime', true);
          },
          update (anim) {

          },
          complete (anim) {
            modalEl.trigger('_is_animation.bears-modal-anime', false);

            if(self.opts.hasContent != true) return;

            if((typeof self.opts.ajaxContent === "function")) {
              $(thisEl).trigger('_ajax_content.bears-modal-anime');
            } else {
              $(thisEl).trigger('_open_content.bears-modal-anime');
            }

          }
        });
      },
      '_slider_width.bears-modal-anime' (e, action) {
        if(action == 'add') {
          $(this).find('.bwc-slider-wrapper').css({
            maxWidth: self.opts.sliderFinalWidth,
          })
        } else if( action == 'remove' ) {
          $(this).find('.bwc-slider-wrapper').css({
            maxWidth: '',
          })
        }
      },
      '_content_size.bears-modal-anime' (e, action) {
        if(action == 'add') {
          $(this).find('.bwc-item-info').css({
            maxWidth: self.opts.width - self.opts.sliderFinalWidth,
            maxHeight: modalEl.innerHeight(),
          })
        } else if( action == 'remove' ) {
          $(this).find('.bwc-item-info').css({
            maxWidth: '',
            maxHeight: '',
          })
        }
      },
      '_content_anime_item.bears-modal-anime' (e, action) {
        if(action == true) {
          $(this).find('.bwc-item-info').addClass('bwc-active-anime-item');
        } else {
          $(this).find('.bwc-item-info').removeClass('bwc-active-anime-item');
        }
      },
      '_update_content.bears-modal-anime' (e, content, callback) {
        $(this).find('.bwc-item-info').empty().append(content);
        if(callback) callback.call(this, self, modalEl);
      },
      '_ajax_content.bears-modal-anime' (e) {
        self.opts.ajaxContent.call(this, self, modalEl);
      },
      '_open_content.bears-modal-anime' (e) {
        var thisEl = this;
        if(progressOpenContentAjax == false) return;

        /* add maxWidth */
        $(this).trigger('_slider_width.bears-modal-anime', ['add']);
        $(this).trigger('_content_size.bears-modal-anime', ['add']);

        var open_content_anime = anime({
          targets: thisEl,
          left: ($(w).width() / 2) - (self.opts.width / 2),
          // top: 200,
          width: self.opts.width,
          duration: 800,
          easing: 'easeInOutExpo',
          begin (anim) {
            if(progressOpenContentAjax == false){
              open_content_anime.pause();
            }
            modalEl.trigger('_is_animation.bears-modal-anime', true);
          },
          update (anim) {

          },
          complete (anim) {
            if(progressOpenContentAjax == false){
              return;
            }

            modalEl.trigger('_is_animation.bears-modal-anime', false);
            modalEl.trigger('_content_anime_item.bears-modal-anime', true);
            modalEl.trigger('_responsive.bears-modal-anime');
          }
        });
      },
      '_update_image_slider.bears-modal-anime' (e, images, empty) {
        var liItems = [];
        images.forEach(function(url, index) {
          var li = $('<li>', {
            class: '',
            html: '<img src="'+ url +'" alt="#">',
          });

          liItems.push(li);
        })

        if(empty == true)
          $(this).find('.bwc-slider').empty().append(liItems);
        else
          $(this).find('.bwc-slider').append(liItems);
      },
      '_close_content.bears-modal-anime' (e, callback) {
        var thisEl = this;
        $(thisEl).trigger('_content_size.bears-modal-anime', ['remove']);
        modalEl.trigger('_content_anime_item.bears-modal-anime', false);

        anime({
          targets: thisEl,
          left: ($(w).width() / 2) - (self.opts.sliderFinalWidth / 2),
          // top: 200,
          width: self.opts.sliderFinalWidth,
          duration: 800,
          easing: 'easeInOutExpo',
          begin (anim) {
            modalEl.trigger('_is_animation.bears-modal-anime', true);
          },
          complete (anim) {
            modalEl.trigger('_is_animation.bears-modal-anime', false);

            /* add maxWidth for slider wrap */
            $(thisEl).trigger('_slider_width.bears-modal-anime', ['remove']);

            if(callback) callback.call(this);
          }
        });
      },
      '_return_pos_close.bears-modal-anime' (e, callback) {
        anime({
          targets: this,
          left: $imgEl.offset().left,
          top: $imgEl.offset().top - $(w).scrollTop(),
          width: parseFloat($imgEl.css('width')),
          duration: 800,
          easing: 'easeInOutExpo',
          begin (anim) {
            modalEl.trigger('_is_animation.bears-modal-anime', true);
          },
          complete (anim) {
            modalEl.trigger('_is_animation.bears-modal-anime', false);
            callback.call(this);
          }
        });
      },
      '_always_center.bears-modal-anime' (e) {
        $(this).css({
          left: ($(w).width() - $(this).innerWidth()) / 2,
        })
      },
      '_responsive.bears-modal-anime' (e) {
        var responsive = ($(w).width() <= self.opts.width);
        
        if(responsive == true) {
          $('body').addClass('bwc-is-responsive');
        } else {
          $('body').removeClass('bwc-is-responsive');
        }
      }
    }).trigger('_init.bears-modal-anime')

    var setPos = function($imgEl) {
      var pos = {
        top: $imgEl.offset().top - $(w).scrollTop(),
        left: $imgEl.offset().left,
        cWidth: parseFloat($imgEl.css('width')),
      };

      modalEl.trigger('_set_open_pos.bears-modal-anime', [pos]);
    }

    /* Open */
    this.open = function($imgEl) {
      var imageUrl = $imgEl.attr('src');
      modalEl.trigger('_update_image_slider.bears-modal-anime', [[imageUrl], true]);
    }

    $(this.opts.wraper).on('click.bears-modal-anime', this.opts.handle, function(event) {
      event.preventDefault();

      /* handle click callback action */
      self.opts.handleClickCallback.call(this, self, modalEl);

      $imgEl = $(this).closest('li').find(self.opts.imageFollow);
      $('body').addClass('bma-dark-overlay bma-active');

      setPos($imgEl);
      self.open($imgEl);
    });

    var _close = function() {
      progressOpenContentAjax = false;

      $('body').removeClass('bma-dark-overlay');
      modalEl.trigger('_return_pos_close.bears-modal-anime', function() {
        $('body').removeClass('bma-active');
      })
    }

    $('body')
    .off('.bears-modal-anime-close-dark-overlay')
    .on('click.bears-modal-anime-close-dark-overlay', function(e) {
      if( $(e.target).hasClass('bwc-quick-view-wrap') ){
        if(self.opts.hasContent == true) {
          modalEl.trigger('_close_content.bears-modal-anime', _close);
        } else {
          _close();
        }
      }
    })

    $('body').on('click.bears-modal-anime-close', '.bwc-close', function() {
      progressOpenContentAjax = false;

      if(self.opts.hasContent == true) {
        modalEl.trigger('_close_content.bears-modal-anime', _close);
      } else {
        _close();
      }
    });

    /* reponsive */
    $(w)
    .off('.bears-modal-anime-reponsive')
    .on('resize.bears-modal-anime-reponsive', function(e) {
      modalEl.trigger('_responsive.bears-modal-anime');

      if(! $('body').hasClass('bma-active')) return;
      modalEl.trigger('_always_center.bears-modal-anime');
    }).trigger('resize.bears-modal-anime-reponsive');

    return this;
  }

  w.Bears_ModalAnime = w.Bears_ModalAnime || Bears_ModalAnime;
})(jQuery, window)

/* Main Script */
!(function($, w) {
  'use strict';
  var wp_api = w.wp,
      wp_ajax_url = wp_api.ajax.settings.url;
      w.bwc_content_trigger_list = [];

  $(function() {

    /* trigger product variations form */
    var bwc_content_trigger__variations_form = function(_modalObj, _modalEl) {
      _modalEl.find('.bwc-item-info .variations_form').wc_variation_form();
      _modalEl.find('.bwc-item-info .variations_form').trigger( 'wc_variation_form' );
      _modalEl.find('.bwc-item-info .variations_form').change();
    }

    /* woo bundle trigger */
    var bwc_content_trigger__bundle_form = function(_modalObj, _modalEl) {
      _modalEl.find('.bwc-item-info .bundle_form .bundle_data').each(function() {
        var $bundle_data = $( this ),
            $composite_form = $bundle_data.closest('.composite_form');

        // If part of a composite, let the composite initialize it.
        if ( $composite_form.length === 0 ) {
          $bundle_data.wc_pb_bundle_form();
        }
      });
    }

    /* add trigger func */
    w.bwc_content_trigger_list.push(bwc_content_trigger__variations_form, bwc_content_trigger__bundle_form);

    new window.Bears_ModalAnime({
      hasContent: true,
      imageFollow: '.wp-post-image',
      handleClickCallback (modalObj, modalEl) {
        /* set product id */
        modalObj._pid = $(this).data('bma-pid');
      },
      ajaxContent (modalObj, modalEl) {
        /* enable ajax effect */
        modalEl.trigger('_ajax_effect', true);
        var productID = modalObj._pid;

        /* ajax load product content */
        $.ajax({
          type: 'POST',
          url: wp_ajax_url,
          data: {action: 'bwc_ajaxload_content_product', pid: productID},
          success (result) {
            /* disable ajax effect */
            modalEl.trigger('_ajax_effect', false);

            /* update content */
            modalEl.trigger('_update_content', [result, function(_modalObj, _modalEl) {

              if(w.bwc_content_trigger_list.length > 0) {
                w.bwc_content_trigger_list.forEach(function(func, index) {
                  func.call(this, _modalObj, _modalEl);
                })
              }

              /* open content */
              _modalEl.trigger('_open_content');
            }])
          },
          error (e) {
            console.log(e);
          }
        })
      }
    });
  })
})(jQuery, window)
