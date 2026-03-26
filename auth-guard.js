// FMH Auth Guard — requires Netlify Identity widget loaded before this script
(function () {
  function goLogin() {
    window.location.replace('/login.html?redirect=' + encodeURIComponent(window.location.pathname));
  }

  // Inject logout button into the nav
  function injectLogout(user) {
    var nav = document.getElementById('fmh-nav');
    if (!nav || document.getElementById('nav-logout')) return;
    var btn = document.createElement('button');
    btn.id = 'nav-logout';
    btn.title = 'Se déconnecter (' + (user.email || '') + ')';
    btn.textContent = '⏻';
    btn.style.cssText = 'margin-left:auto;background:none;border:none;color:rgba(255,255,255,0.4);font-size:16px;cursor:pointer;padding:4px 10px;border-radius:5px;transition:color .2s;';
    btn.onmouseover = function(){ btn.style.color = '#fff'; };
    btn.onmouseout  = function(){ btn.style.color = 'rgba(255,255,255,0.4)'; };
    btn.onclick = function(){ netlifyIdentity.logout(); };
    nav.appendChild(btn);
  }

  netlifyIdentity.on('init', function (user) {
    if (!user) { goLogin(); return; }
    injectLogout(user);
  });

  netlifyIdentity.on('logout', function () {
    goLogin();
  });
})();
