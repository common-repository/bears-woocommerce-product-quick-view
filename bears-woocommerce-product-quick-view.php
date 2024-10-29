<?php
/*
 * Plugin Name: Bears WooCommerce Product Quick View
 * Plugin URI: http://bearsthemes/
 * Description: Let customers quick view products and add them to their cart from a lightbox. Supports variations. Requires WC 3.0+
 * Version: 1.0.0
 * Author: Bearsthemes
 * Author URI: http://bearsthemes.com/
 * Text Domain: bwc_product_quick_view
 * WC tested up to: 3.2
 * WC requires at least: 3.0
 *
 * Copyright: © 2015-2017 Bearsthemes.
 * License: GNU General Public License v3.0
 * License URI: http://www.gnu.org/licenses/gpl-3.0.html
 */

 /**
  * Required functions
  */
 if ( ! function_exists( 'woothemes_queue_update' ) )
 	require_once( 'i/bwc-functions.php' );

/**
 * Plugin page links
 */
function bwc_product_quick_view_plugin_links( $links ) {

	$plugin_links = array(
		'<a href="#">' . __( 'Support', 'bwc_product_quick_view' ) . '</a>',
		'<a href="#">' . __( 'Docs', 'bwc_product_quick_view' ) . '</a>',
	);

	return array_merge( $plugin_links, $links );
}

add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), 'bwc_product_quick_view_plugin_links' );

if ( is_woocommerce_active() ) {

	/**
	 * Localisation
	 **/
	load_plugin_textdomain( 'bwc_product_quick_view', false, dirname( plugin_basename( __FILE__ ) ) . '/' );

	/**
	 * BWC_Product_Quick_View class
	 **/
	if ( ! class_exists( 'BWC_Product_Quick_View' ) ) {

		class BWC_Product_Quick_View {

			/**
			 * __construct function.
			 */
			public function __construct() {

        // defined
        $this->defined();

				// Scripts
				add_action( 'wp_enqueue_scripts', array( $this, 'scripts' ), 11 );

				// Settings
				add_filter( 'woocommerce_general_settings' , array( $this, 'settings' ) );

        add_action( 'wp_footer', array( $this, 'modal_template' ) );

        $this->woo_hooks();
			}

      /**
       * @since 1.0.0
       */
      public function defined() {
        define( "BWC_DIR_URL", plugin_dir_url( __FILE__ ) );
      }

      /**
       * @since 1.0.0
       */
      public function woo_hooks() {

      }

      /**
       * @since 1.0.0
       */
      public function modal_template() {
        wc_get_template(
					'modal-template.php',
					'',
					'bears-woocommerce-product-quick-view',
					untrailingslashit( plugin_dir_path( __FILE__ ) ) . '/templates/'
				);
      }

			/**
			 * settings function.
			 *
			 * @param array $settings
			 */
			public function settings( $settings ) {

				$settings[] = array(
					'name' => __( 'Quick View', 'bwc_product_quick_view' ),
					'type' => 'title',
					'desc' => 'The following options are used to configure the Bears Product Quick View extension. (version empty opts)',
					'id'   => 'bwc_product_quick_view'
				);

				// $settings[] = array(
				// 	'id'      => 'bears_quick_view_trigger',
				// 	'name'    => __( 'Quick View Trigger', 'bwc_product_quick_view' ),
				// 	'desc'    => __( 'Choose what event should trigger quick view', 'bwc_product_quick_view' ),
				// 	'type'    => 'select',
				// 	'options' => array(
				// 		'button'        => __( 'Quick View Button', 'bwc_product_quick_view' ),
				// 		//'thumbnail'     => __( 'Product Thumbnail', 'bwc_product_quick_view' ),
				// 		'non_ajax'      => __( 'Any non-ajax add to cart button', 'bwc_product_quick_view' )
				// 	)
				// );

				$settings[] = array(
					'type' => 'sectionend',
					'id'   => 'bwc_product_quick_view'
				);

				return $settings;
			}

			/**
			 * scripts function.
			 */
			public function scripts() {
				global $woocommerce;
				do_action( 'bwc_product_quick_view_enqueue_scripts' );

				wp_enqueue_script( 'wc-add-to-cart-variation' );
        wp_enqueue_script( 'anime', plugins_url( 'a/js/anime.min.js' , __FILE__ ), array(), '2.2.0', true );
        wp_enqueue_script( 'bwc_product_quick_view', plugins_url( 'a/js/bwc-quick-view.js' , __FILE__ ), array( 'jquery', 'anime', 'wc-add-to-cart-variation', 'wc-add-to-cart-bundle' ), '1.0.0', true );
        wp_enqueue_style( 'bwc_product_quick_view', plugins_url( 'a/css/bwc-quick-view.css' , __FILE__ ) );

				add_action( 'woocommerce_after_shop_loop_item', array( $this, 'quick_view_button' ), 5 );
			}

			/**
			 * get_quick_view_url function.
			 */
			public function get_quick_view_url() {
				global $product;
        $link = '#';
				return esc_url_raw( $link );
			}

			public function get_quick_view_url_for_product( $url, $product ) {
				$url = $this->get_quick_view_url();

				return $url;
			}

			/**
			 * quick_view function.
			 */
			public function quick_view() {
				global $woocommerce, $post;

				$product_id = absint( $_POST['pid'] );

				if ( $product_id ) {

					// Get product ready
					$post = get_post( $product_id );

					setup_postdata( $post );

					wc_get_template(
						'quick-view.php',
						array(),
						'bears-woocommerce-product-quick-view',
						untrailingslashit( plugin_dir_path( __FILE__ ) ) . '/templates/'
					);
				}

				exit;
			}

			/**
			 * quick_view_button function.
			 */
			public function quick_view_button() {
				wc_get_template(
					'loop/quick-view-button.php',
					array( 'link' => $this->get_quick_view_url() ),
					'bears-woocommerce-product-quick-view',
					untrailingslashit( plugin_dir_path( __FILE__ ) ) . '/templates/'
				);
			}
		}

		$GLOBALS['BWC_Product_Quick_View'] = new BWC_Product_Quick_View();
	}
}
