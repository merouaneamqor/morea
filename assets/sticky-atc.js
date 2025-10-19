(function(){
  function initStickyATC(root){
    var sectionId = root.dataset.section;
    var bar = root.querySelector('.sticky-atc');
    var atcButton = root.querySelector('#StickyATCButton-' + sectionId);
    var productInfo = document.querySelector('#ProductInfo-' + sectionId);
    if(!bar || !atcButton || !productInfo) return;

    // Observe main buy buttons visibility
    var buyButtons = productInfo.querySelector('.product-form__buttons');
    if(!buyButtons) return;

    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          bar.classList.remove('is-visible');
        } else {
          bar.classList.add('is-visible');
        }
      });
    }, { rootMargin: '0px 0px -40% 0px', threshold: [0, 1] });

    observer.observe(buyButtons);

    // Mirror click to the primary submit button inside the form
    atcButton.addEventListener('click', function(){
      var submit = productInfo.querySelector('.product-form [type="submit"]');
      if(submit){ submit.click(); }
    });

    // Update price in sticky bar on variant change
    document.addEventListener('product-info:loaded', function(){
      // noop for initial hook
    }, { once: true });

    subscribe && subscribe(PUB_SUB_EVENTS.variantChange, function({ data }){
      if(data.sectionId !== sectionId) return;
      var priceSource = data.html.getElementById('price-' + data.sectionId);
      var priceTarget = document.getElementById('StickyATC-Price-' + data.sectionId);
      if(priceSource && priceTarget){ priceTarget.innerHTML = priceSource.innerHTML; }
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('product-info').forEach(function(el){
      initStickyATC(el);
    });
  });
})();


