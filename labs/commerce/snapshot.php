<?php
$orders = wc_get_orders(['limit' => -1]);
$total_minor = 0;
foreach ($orders as $order) {
    $total_minor += (int) round((float) $order->get_total() * 100);
}
echo count($orders) . ':' . $total_minor . "\n";
