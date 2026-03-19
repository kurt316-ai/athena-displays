/*
 * Athena Display System — Shared JavaScript
 * Auto-refresh: checks version.txt every 60 seconds, reloads if changed.
 * Owner: Archimedes.
 */

(function() {
  let currentVersion = null;
  const REFRESH_INTERVAL = 60000; // 60 seconds

  // Render last-refreshed timestamp
  function updateTimestamp() {
    const el = document.getElementById('last-refreshed');
    if (el) {
      const now = new Date();
      const opts = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
                     hour: '2-digit', minute: '2-digit', hour12: false, timeZoneName: 'short' };
      el.textContent = 'Refreshed: ' + now.toLocaleString('en-US', opts);
    }
  }

  // Check for version changes
  async function checkVersion() {
    try {
      const resp = await fetch('version.txt?t=' + Date.now());
      if (resp.ok) {
        const version = (await resp.text()).trim();
        if (currentVersion === null) {
          currentVersion = version;
        } else if (version !== currentVersion) {
          location.reload();
        }
      }
    } catch (e) {
      // Silently fail — offline or version.txt not deployed yet
    }
  }

  // Init
  updateTimestamp();
  checkVersion();
  setInterval(checkVersion, REFRESH_INTERVAL);
})();
