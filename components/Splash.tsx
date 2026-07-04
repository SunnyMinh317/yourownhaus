const WORDS = ["YOUR", "OWN", "HAUS"];

/**
 * Runs synchronously before paint (raw inline script, so it executes during HTML
 * parsing — before #splash is painted). It:
 *   - shows the splash only once per browser session (sessionStorage), so a
 *     refresh or return visit skips it with no flash,
 *   - skips it entirely when the user prefers reduced motion,
 *   - unlocks scroll and removes the node after the animation finishes.
 */
const GATE = `(function(){try{var d=document.documentElement;var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(reduce||sessionStorage.getItem('yoh_splash')){d.classList.add('splash-seen');sessionStorage.setItem('yoh_splash','1');return;}sessionStorage.setItem('yoh_splash','1');d.classList.add('splash-active');setTimeout(function(){d.classList.remove('splash-active');var el=document.getElementById('splash');if(el&&el.parentNode)el.parentNode.removeChild(el);},3400);}catch(e){}})();`;

export default function Splash() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: GATE }} />
      <div id="splash" aria-hidden="true">
        <div className="splash-logo font-brasika text-theme select-none">
          {WORDS.map((word, i) => (
            <span key={word} className="splash-mask">
              <span
                className="splash-word"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                {word}
              </span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
