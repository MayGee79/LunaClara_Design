(function () {
  const STORAGE_KEY = 'lc_analytics_consent';

  function grantAnalyticsConsent() {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
    });
  }

  function denyAnalyticsConsent() {
    window.gtag('consent', 'update', {
      analytics_storage: 'denied',
    });
  }

  function setConsent(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (_) {
      /* storage unavailable */
    }
  }

  function getConsent() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (_) {
      return null;
    }
  }

  function hideBanner(banner) {
    banner.hidden = true;
    banner.setAttribute('aria-hidden', 'true');
  }

  function createBanner() {
    const existing = document.getElementById('cookie-consent');
    if (existing) {
      existing.hidden = false;
      existing.setAttribute('aria-hidden', 'false');
      return existing;
    }

    const banner = document.createElement('div');
    banner.id = 'cookie-consent';
    banner.className = 'cookie-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-modal', 'false');
    banner.setAttribute('aria-labelledby', 'cookie-consent-title');
    banner.setAttribute('aria-describedby', 'cookie-consent-desc');
    banner.innerHTML =
      '<div class="cookie-consent-inner">' +
        '<p id="cookie-consent-title" class="cookie-consent-title">Cookies on this site</p>' +
        '<p id="cookie-consent-desc" class="cookie-consent-text">' +
          'I use optional analytics cookies (Google Analytics) to see how the site is used. ' +
          'You can accept or reject them — no pressure. ' +
          '<a href="privacy.html">Privacy &amp; cookies</a>' +
        '</p>' +
        '<div class="cookie-consent-actions">' +
          '<button type="button" class="btn btn-secondary cookie-consent-btn" data-cookie-reject>Reject analytics</button>' +
          '<button type="button" class="btn btn-primary cookie-consent-btn" data-cookie-accept>Accept analytics</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(banner);

    banner.querySelector('[data-cookie-accept]').addEventListener('click', function () {
      setConsent('accepted');
      grantAnalyticsConsent();
      hideBanner(banner);
    });

    banner.querySelector('[data-cookie-reject]').addEventListener('click', function () {
      setConsent('rejected');
      denyAnalyticsConsent();
      hideBanner(banner);
    });

    return banner;
  }

  function init() {
    document.addEventListener('click', function (event) {
      const trigger = event.target.closest('[data-cookie-settings]');
      if (trigger) {
        event.preventDefault();
        createBanner();
      }
    });

    const consent = getConsent();
    if (consent === 'accepted') {
      grantAnalyticsConsent();
      return;
    }
    if (consent === 'rejected') {
      denyAnalyticsConsent();
      return;
    }
    createBanner();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
