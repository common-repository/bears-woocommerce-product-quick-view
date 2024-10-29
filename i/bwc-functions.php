<?php
/**
 * Functions used by plugins
 */
if ( ! class_exists( 'BWC_Dependencies' ) )
	require_once 'class-bwc-dependencies.php';

/**
 * WC Detection
 */
if ( ! function_exists( 'is_woocommerce_active' ) ) {
	function is_woocommerce_active() {
		return BWC_Dependencies::woocommerce_active_check();
	}
}

if(! function_exists('bwc_ajaxload_content_product')) {
  /**
   * @since 1.0.0
   */
  function bwc_ajaxload_content_product() {
    global $BWC_Product_Quick_View;

    $BWC_Product_Quick_View->quick_view();
    exit();
  }
  add_action( 'wp_ajax_bwc_ajaxload_content_product', 'bwc_ajaxload_content_product' );
  add_action( 'wp_ajax_nopriv_bwc_ajaxload_content_product', 'bwc_ajaxload_content_product' );
}
