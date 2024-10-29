=== Bears WooCommerce Product Quick View ===
Contributors: (this should be a list of wordpress.org userid's)
Donate link: #
Tags: get more sales, product quick view, quick view, woocommerce quick view
Requires at least: 4.7
Tested up to: 4.8.4
Requires PHP: 5.5.6
Stable tag: 4.7
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

This plugin is a addon of WooCommerce. Display button quick view on shop page allows users to get a quick look of products without opening the product page.

== Description ==
Bears WooCommerce Quick View allows users to get a quick look of products without opening the product page.

## Quick View Modal
[WordPress how to install plugin](https://codex.wordpress.org/Managing_Plugins "WP turorial install plugin")
The modal window shows the product’s:

1. Main featured image
2. Title
3. Price
4. Short description
5. View button
6. Cart buttons

## Compatible
1. WooCommerce 3.x
2. WooCommerce Variation Swatches and Photos
3. WooCommerce Product Bundles

## Changing Template
To customize template, create a folder 'bears-woocommerce-product-quick-view' on your theme:
Example (custom layout quick view button):
`
copy file: plugins/bears-woocommerce-product-quick-view/templates/loop/quick-view-button.php
to your theme: your-theme/bears-woocommerce-product-quick-view/loop/quick-view-button.php
-> edit the file.
`

---

Remove button quick view:
`
add_action('wp_head', 'remove_button_quick_view');
function remove_button_quick_view() {
  global $BWC_Product_Quick_View;
  remove_action('woocommerce_after_shop_loop_item', array($BWC_Product_Quick_View, 'quick_view_button'), 5);
}
`

---

Move button quick view:
`
global $BWC_Product_Quick_View;
add_action('name action ...', array($BWC_Product_Quick_View, 'quick_view_button'), 15);
`

## Hooks
1. add_action('bwc_product_quick_view_before_single_product', ...);
2. add_action('bwc_product_quick_view_after_single_product', ...);

== Installation ==
This section describes how to install the plugin and get it working.

e.g.

1. Upload the plugin files to the `/wp-content/plugins/plugin-name` directory, or install the plugin through the WordPress plugins screen directly.
1. Activate the plugin through the 'Plugins' screen in WordPress
1. Use the Settings->Plugin Name screen to configure the plugin
1. (Make your instructions match the desired user flow for activating and installing your plugin. Include any steps that might be needed for explanatory purposes)

== Screenshots ==
screenshot-1.(png|jpg|jpeg|gif)

== Changelog ==
= 1.0 =
* First released version 1.0
