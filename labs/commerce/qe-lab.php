<?php
add_filter('woocommerce_cod_process_payment_order_status', function () { return 'completed'; });
add_filter('pre_wp_mail', function () { return true; });
add_action('wp_footer', function () {
    $event = null;
    if (function_exists('is_order_received_page') && is_order_received_page()) {
        $order_id = absint(get_query_var('order-received'));
        $order = wc_get_order($order_id);
        $key = isset($_GET['key']) ? wc_clean(wp_unslash($_GET['key'])) : '';
        if ($order && hash_equals($order->get_order_key(), $key) && $order->get_status() === 'completed') {
            $items = [];
            foreach ($order->get_items() as $item) {
                $items[] = ['itemId' => (string) $item->get_product_id(), 'quantity' => $item->get_quantity()];
            }
            $event = ['eventId' => 'purchase-' . $order_id, 'schemaVersion' => 1, 'eventName' => 'purchase', 'transactionId' => (string) $order_id, 'valueMinor' => (int) round((float) $order->get_total() * 100), 'currency' => $order->get_currency(), 'items' => $items, 'occurredAt' => gmdate('Y-m-d\TH:i:s', $order->get_date_created()->getTimestamp()) . '.000Z', 'consentState' => 'granted', 'source' => 'browser'];
        }
    }
    echo '<div id="qe-consent"><button type="button" id="qe-allow">Allow lab analytics</button><button type="button" id="qe-deny">Deny lab analytics</button></div>';
    echo '<script>window.qePurchase=' . wp_json_encode($event) . ';</script>';
    ?>
    <script>
    (() => {
        let pending = null;
        const send = async () => {
            if (localStorage.getItem('qe-consent') !== 'granted' || !pending) return;
            const payload = pending;
            try {
                const response = await fetch('/lab-events', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload)});
                if (response.ok && pending === payload) pending = null;
            } catch {}
        };
        document.getElementById('qe-allow').onclick = () => {localStorage.setItem('qe-consent', 'granted'); pending = window.qePurchase; void send();};
        document.getElementById('qe-deny').onclick = () => {localStorage.setItem('qe-consent', 'denied'); pending = null;};
        if (localStorage.getItem('qe-consent') === 'granted') {pending = window.qePurchase; void send();}
        window.addEventListener('online', () => {void send();});
    })();
    </script>
    <?php
});
