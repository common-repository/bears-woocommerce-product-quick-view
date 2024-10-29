<?php
/**
 * Quick view template
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

global $product, $post, $woocommerce;

do_action( 'bwc_product_quick_view_before_single_product' );
?>
<div class="woocommerce quick-view">

	<div class="product">

		<div class="entry-summary">

      <div class="bwc-anime-item" style="transition-delay: 0s;">
  			<?php woocommerce_template_single_title(); ?>
      </div>

      <div class="bwc-anime-item" style="transition-delay: .2s;">
  			<?php woocommerce_template_single_price(); ?>
      </div>

      <div class="bwc-anime-item" style="transition-delay: .4s;">
  			<?php woocommerce_template_single_excerpt(); ?>
      </div>

      <div class="bwc-anime-item" style="transition-delay: .6s;">
  			<?php woocommerce_template_single_add_to_cart(); ?>
      </div>

  	</div>

	</div>
	
</div>
<?php do_action( 'bwc_product_quick_view_after_single_product' ); ?>
