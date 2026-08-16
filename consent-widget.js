/*!
 * AI-Prowler SMS Consent Widget
 * ==============================
 * One embed script, used by every AI-Prowler customer on their OWN website.
 * Each customer's own AI-Prowler install handles its own consent capture --
 * this script never talks to any AI-Prowler LLC infrastructure. It only
 * POSTs to the endpoint URL the customer supplies (their own install's
 * /consent-signup route, copied from their AI-Prowler SMS settings).
 *
 * USAGE -- pick ONE of the two modes below.
 *
 * MODE 1: Auto-rendered default form (fastest to set up)
 * --------------------------------------------------------
 *   <div data-ai-prowler-consent-widget></div>
 *   <script src="https://ai-prowler.com/consent-widget.js"
 *           data-endpoint="https://YOUR-TUNNEL-DOMAIN.ai-prowler.com/consent-signup"></script>
 *
 * MODE 2: Your own custom-styled form
 * --------------------------------------------------------
 *   <form data-ai-prowler-consent-form>
 *     <input type="text" name="name" placeholder="Your name" required>
 *     <input type="tel"  name="phone" placeholder="Your phone number" required>
 *     <label><input type="checkbox" name="consent" value="on"> I agree to receive SMS</label>
 *     <button type="submit">Sign up</button>
 *   </form>
 *   <script src="https://ai-prowler.com/consent-widget.js"
 *           data-endpoint="https://YOUR-TUNNEL-DOMAIN.ai-prowler.com/consent-signup"></script>
 *
 * Both modes can appear multiple times on one page. Both read the endpoint
 * from data-endpoint on the <script> tag by default; a form can override
 * with its own data-endpoint attribute if a page needs more than one
 * AI-Prowler install (rare, but supported).
 *
 * Optional honeypot spam guard: add a field named "website" to a custom
 * form, hidden via CSS (not type="hidden" -- basic bots skip that). The
 * default auto-rendered form already includes one.
 */
(function () {
  "use strict";

  function findOwnScriptTag() {
    var scripts = document.querySelectorAll('script[src*="consent-widget.js"]');
    return scripts.length ? scripts[scripts.length - 1] : null;
  }

  var OWN_SCRIPT = findOwnScriptTag();
  var DEFAULT_ENDPOINT = OWN_SCRIPT ? (OWN_SCRIPT.getAttribute("data-endpoint") || "") : "";

  function setStatus(container, message, isError) {
    var status = container.querySelector(".aip-consent-status");
    if (!status) {
      status = document.createElement("div");
      status.className = "aip-consent-status";
      status.style.marginTop = "8px";
      status.style.fontSize = "14px";
      container.appendChild(status);
    }
    status.textContent = message;
    status.style.color = isError ? "#b00020" : "#1a7f37";
  }

  function submitConsent(form, endpoint, container) {
    if (!endpoint) {
      console.error("AI-Prowler consent widget: no data-endpoint configured.");
      setStatus(container, "This form isn't configured correctly. Please contact the site owner.", true);
      return;
    }

    var nameField  = form.querySelector('[name="name"]');
    var phoneField = form.querySelector('[name="phone"]');
    var name  = nameField  ? nameField.value.trim()  : "";
    var phone = phoneField ? phoneField.value.trim() : "";

    if (!name || !phone) {
      setStatus(container, "Please enter your name and phone number.", true);
      return;
    }

    var submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;
    setStatus(container, "Signing up\u2026", false);

    var body = new URLSearchParams();
    var formData = new FormData(form);
    formData.forEach(function (value, key) { body.append(key, value); });

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    })
      .then(function (resp) {
        return resp.text().then(function (text) {
          var ok = false;
          try { ok = JSON.parse(text).ok === true; } catch (e) { /* non-JSON response */ }
          if (resp.ok && ok) {
            setStatus(container, "Signed up \u2713", false);
            form.reset();
          } else {
            setStatus(container, "Something went wrong. Please try again.", true);
            if (submitBtn) submitBtn.disabled = false;
          }
        });
      })
      .catch(function () {
        setStatus(container, "Couldn't reach the server. Please try again.", true);
        if (submitBtn) submitBtn.disabled = false;
      });
  }

  function wireExistingForm(form) {
    var endpoint = form.getAttribute("data-endpoint") || DEFAULT_ENDPOINT;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      submitConsent(form, endpoint, form);
    });
  }

  function renderDefaultForm(container) {
    var endpoint = container.getAttribute("data-endpoint") || DEFAULT_ENDPOINT;

    container.innerHTML =
      '<form class="aip-consent-form" style="max-width:360px;font-family:inherit">' +
        '<div style="margin-bottom:8px">' +
          '<input type="text" name="name" placeholder="Your name" required ' +
                 'style="width:100%;box-sizing:border-box;padding:8px;font-size:14px;' +
                 'border:1px solid #ccc;border-radius:4px">' +
        '</div>' +
        '<div style="margin-bottom:8px">' +
          '<input type="tel" name="phone" placeholder="Your phone number" required ' +
                 'style="width:100%;box-sizing:border-box;padding:8px;font-size:14px;' +
                 'border:1px solid #ccc;border-radius:4px">' +
        '</div>' +
        '<div style="position:absolute;left:-9999px" aria-hidden="true">' +
          '<input type="text" name="website" tabindex="-1" autocomplete="off">' +
        '</div>' +
        '<label style="display:flex;align-items:flex-start;gap:6px;font-size:13px;margin-bottom:10px;cursor:pointer">' +
          '<input type="checkbox" name="consent" value="on" style="margin-top:2px">' +
          '<span>I agree to receive SMS messages. Msg &amp; data rates may apply. Reply STOP to unsubscribe.</span>' +
        '</label>' +
        '<button type="submit" style="padding:8px 16px;font-size:14px;border:none;' +
                'border-radius:4px;background:#1a1a1a;color:#fff;cursor:pointer">Sign up</button>' +
      '</form>';

    var form = container.querySelector("form");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      submitConsent(form, endpoint, container);
    });
  }

  function init() {
    document.querySelectorAll("form[data-ai-prowler-consent-form]").forEach(wireExistingForm);
    document.querySelectorAll("[data-ai-prowler-consent-widget]").forEach(renderDefaultForm);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
