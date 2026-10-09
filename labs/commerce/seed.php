<?php
if (!is_dir(WPMU_PLUGIN_DIR)) {
    wp_mkdir_p(WPMU_PLUGIN_DIR);
}
file_put_contents(WPMU_PLUGIN_DIR . '/qe-lab.php', file_get_contents('/lab/qe-lab.php'));
$upload = wp_upload_dir();
wp_mkdir_p($upload['basedir']);
file_put_contents($upload['basedir'] . '/qe-asset.txt', "QE synthetic asset\n");
update_option('woocommerce_currency', 'THB');
update_option('woocommerce_default_country', 'TH');
update_option('woocommerce_calc_taxes', 'no');
update_option('woocommerce_enable_guest_checkout', 'yes');
update_option('woocommerce_cod_settings', ['enabled' => 'yes', 'title' => 'LAB ONLY — no real payment', 'description' => 'Synthetic checkout. Do not pay or ship anything.']);
update_option('woocommerce_onboarding_profile', ['completed' => true]);
foreach (['shop' => '[products]', 'cart' => '[woocommerce_cart]', 'checkout' => '[woocommerce_checkout]', 'myaccount' => '[woocommerce_my_account]'] as $slug => $content) {
    $page = get_page_by_path($slug);
    $page_id = $page ? $page->ID : wp_insert_post(['post_title' => ucfirst($slug), 'post_name' => $slug, 'post_content' => $content, 'post_status' => 'publish', 'post_type' => 'page']);
    if ($page) {
        wp_update_post(['ID' => $page_id, 'post_content' => $content]);
    }
    update_option('woocommerce_' . $slug . '_page_id', $page_id);
}
$product_id = get_option('qe_fixture_product_id');
if (!$product_id || !wc_get_product($product_id)) {
    $product = new WC_Product_Simple();
    $product->set_name('Synthetic QE Notebook');
    $product->set_sku('QE-NOTEBOOK-001');
    $product->set_regular_price('199.00');
    $product->set_virtual(true);
    $product->set_status('publish');
    update_option('qe_fixture_product_id', $product->save());
}
update_option('permalink_structure', '/%postname%/');
flush_rewrite_rules();
echo "Synthetic product and offline checkout configured.\n";
