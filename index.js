(function() {
  var revealTimeout = null;

  function spawnCitrusBurst(pageEl) {
    if (!pageEl) return;

    // 5Alive Brand Colors: Citrus Orange, Sun Yellow, Fresh Lime, Pearl White
    var colors = ['#FF7A00', '#FFD200', '#76C043', '#FFFFFF', '#FFA500'];
    var count = 35;

    for (var i = 0; i < count; i++) {
      var bubble = document.createElement('div');
      var size = Math.floor(Math.random() * 12) + 6; // 6px - 18px

      bubble.style.position = 'absolute';
      bubble.style.width = size + 'px';
      bubble.style.height = size + 'px';
      bubble.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      bubble.style.borderRadius = '50%';
      bubble.style.boxShadow = '0 0 8px ' + bubble.style.backgroundColor;
      bubble.style.top = (Math.random() * 260 + 150) + 'px';
      bubble.style.left = (Math.random() * 280 + 20) + 'px';
      bubble.style.zIndex = '90';
      bubble.style.pointerEvents = 'none';
      bubble.style.opacity = '0.95';
      bubble.style.transition = 'transform 1.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 1.8s linear';

      pageEl.appendChild(bubble);

      (function(b) {
        var moveY = -(Math.random() * 120 + 80);
        var moveX = (Math.random() - 0.5) * 60;
        var scale = Math.random() * 0.8 + 0.6;

        requestAnimationFrame(function() {
          setTimeout(function() {
            b.style.transform = 'translate3d(' + moveX + 'px, ' + moveY + 'px, 0) scale(' + scale + ')';
            b.style.opacity = '0';
          }, 30);
        });

        setTimeout(function() {
          if (b && b.parentNode) {
            b.parentNode.removeChild(b);
          }
        }, 2000);
      })(bubble);
    }
  }

  function initPageAnimations() {
    var resultPageIds = ['page1_1', 'page1_2', 'page1_3', 'page1_4'];

    resultPageIds.forEach(function(pageId) {
      var pageEl = document.getElementById(pageId);
      if (pageEl) {
        pageEl.addEventListener('pageactivated', function() {
          // 1. Trigger citrus particle burst
          spawnCitrusBurst(pageEl);

          // 2. Clear any active timeout
          if (revealTimeout) {
            clearTimeout(revealTimeout);
            revealTimeout = null;
          }

          // 3. Allow user to enjoy reveal animation and food pairing (3.0s), then navigate to page1_5
          revealTimeout = setTimeout(function() {
            if (typeof gwd !== 'undefined' && gwd.actions && gwd.actions.gwdPagedeck) {
              gwd.actions.gwdPagedeck.goToPage('pagedeck', 'page1_5', 'fade', 1000, 'linear', 'top');
            }
          }, 3000);
        });
      }
    });

    var page1 = document.getElementById('page1');
    if (page1) {
      page1.addEventListener('pageactivated', function() {
        if (revealTimeout) {
          clearTimeout(revealTimeout);
          revealTimeout = null;
        }
        var pulpy = document.getElementById('pulpy');
        if (pulpy) {
          pulpy.style.transition = 'none';
          pulpy.style.transform = '';
          pulpy.style.animation = '';
          pulpy.classList.add('gwd-gen-198agwdanimation');
        }
        if (typeof isSpinning !== 'undefined') {
          isSpinning = false;
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPageAnimations);
  } else {
    initPageAnimations();
  }
})();