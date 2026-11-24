/* Branding Bots — small site-wide helpers. Loaded before main.js on every page. */
(function () {
    "use strict";

    // Counters ship with the real number in the HTML (so they never render blank
    // without JS). Reset them to 0 here so the odometer can still animate up.
    document.querySelectorAll(".odometer[data-count]").forEach(function (el) {
        el.textContent = "0";
    });

    // Keep the copyright year current; the static "2026" is the no-JS fallback.
    var year = document.getElementById("bb-year");
    if (year) year.textContent = new Date().getFullYear();

    // Newsletter / "get update" forms open the visitor's mail app with the address.
    document.querySelectorAll("form[data-bb-subscribe]").forEach(function (form) {
        form.addEventListener("submit", function (e) {
            var input = form.querySelector("input[type='email']");
            var email = (input && input.value ? input.value : "").trim();
            if (!email) return;
            e.preventDefault();
            var subject = encodeURIComponent("New Email Subscription from Branding Bots");
            var body = encodeURIComponent("A user subscribed with this email:\n\n" + email);
            window.location.href = "mailto:connect@brandingbots.in?subject=" + subject + "&body=" + body;
        });
    });

    // Analytics events for Google Tag Manager (GTM-MX6MW2GW).
    // In GTM, create a GA4 Event tag per event name below with a Custom Event trigger.
    window.dataLayer = window.dataLayer || [];
    function track(eventName, extra) {
        var data = { event: eventName, page_path: location.pathname };
        if (extra) for (var k in extra) data[k] = extra[k];
        window.dataLayer.push(data);
    }
    document.addEventListener("click", function (e) {
        var a = e.target.closest ? e.target.closest("a[href]") : null;
        if (!a) return;
        var href = a.getAttribute("href") || "";
        var label = (a.textContent || "").trim().slice(0, 60);
        if (href.indexOf("calendar.app.google") !== -1) track("book_audit_click", { link_text: label });
        else if (href.indexOf("wa.me/") !== -1) track("whatsapp_click", { link_text: label });
        else if (href.indexOf("tel:") === 0) track("phone_click", { link_text: label });
    }, true);
    document.querySelectorAll("form[data-bb-enquiry]").forEach(function (form) {
        form.addEventListener("submit", function () {
            var service = form.querySelector("[name='service']");
            var budget = form.querySelector("[name='budget']");
            track("enquiry_form_submit", {
                service: service ? service.value : "",
                budget: budget ? budget.value : ""
            });
        });
    });

    // Portfolio filter (portfolio.html).
    document.addEventListener("DOMContentLoaded", function () {
        var bar = document.querySelector(".bb-filter");
        if (!bar) return;
        var items = document.querySelectorAll("[data-cat]");
        bar.addEventListener("click", function (e) {
            var btn = e.target.closest("button[data-filter]");
            if (!btn) return;
            var filter = btn.getAttribute("data-filter");
            bar.querySelectorAll("button").forEach(function (b) {
                var on = b === btn;
                b.classList.toggle("is-active", on);
                b.setAttribute("aria-pressed", on ? "true" : "false");
            });
            items.forEach(function (item) {
                var cats = item.getAttribute("data-cat").split(" ");
                item.style.display = filter === "all" || cats.indexOf(filter) !== -1 ? "" : "none";
            });
            if (window.ScrollTrigger) window.ScrollTrigger.refresh();
        });
    });
})();
