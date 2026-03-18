/**
 * HM BIOVITAL – Cookie Consent Management
 * DSGVO-konform: Kein Tracking ohne ausdrückliche Einwilligung
 */
(function () {
  'use strict';

  var CONSENT_KEY = 'hm_cookie_consent';

  function getConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }

  function setConsent(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch (e) {}
  }

  function loadMetaPixel() {
    if (window._hmPixelLoaded) return;
    window._hmPixelLoaded = true;
    /* eslint-disable */
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window,document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '186671389072607');
    fbq('track', 'PageView');
    /* eslint-enable */
  }

  function applyConsent(consent) {
    if (consent === 'all') {
      loadMetaPixel();
    }
  }

  function showBanner() {
    var banner = document.getElementById('hm-cookie-banner');
    if (banner) {
      banner.style.display = 'flex';
      // Kurze Verzögerung für CSS-Transition
      setTimeout(function () { banner.classList.add('hm-cb--visible'); }, 20);
    }
  }

  function hideBanner() {
    var banner = document.getElementById('hm-cookie-banner');
    if (banner) {
      banner.classList.remove('hm-cb--visible');
      setTimeout(function () { banner.style.display = 'none'; }, 400);
    }
  }

  function init() {
    var consent = getConsent();

    if (consent) {
      applyConsent(consent);
    } else {
      showBanner();
    }

    // Accept-Button
    var acceptBtn = document.getElementById('hm-cookie-accept');
    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        setConsent('all');
        applyConsent('all');
        hideBanner();
      });
    }

    // Ablehnen-Button
    var declineBtn = document.getElementById('hm-cookie-decline');
    if (declineBtn) {
      declineBtn.addEventListener('click', function () {
        setConsent('necessary');
        hideBanner();
      });
    }

    // Cookie-Einstellungen zurücksetzen (Footer-Link)
    var settingsLink = document.getElementById('hm-cookie-settings');
    if (settingsLink) {
      settingsLink.addEventListener('click', function (e) {
        e.preventDefault();
        try { localStorage.removeItem(CONSENT_KEY); } catch (ex) {}
        showBanner();
      });
    }
  }

  // Warten bis DOM bereit
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
