<?php
/**
 * Quick View Button
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly
global $product;

echo apply_filters(
  'bears_woocommerce_loop_product_quick_view_button',
  sprintf( '<a
    href="%s"
    title="%s"
    data-bma-pid=\'%s\'
    class="bwc-quick-view-button bma-handle button">
      <img style="width: 20px; display: inline-block; margin: 0 5px 0 0; vertical-align: top;" src="%s" alt="#"> %s
    </a>',
  esc_url( $link ),
  esc_attr( get_the_title() ),
  $product->get_id(),
  BWC_DIR_URL . '/a/images/eye.svg',
  __( 'Quick View', 'bwc_product_quick_view' ) ) );
