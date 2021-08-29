import "core-js/es";
import "zone.js/dist/zone";

(window as any).__Zone_disable_requestAnimationFrame = true; // disable patch requestAnimationFrame
(window as any).__Zone_disable_on_property = true; // disable patch onProperty such as onclick
(window as any).__zone_symbol__BLACK_LISTED_EVENTS = ['scroll', 'mousemove']; // disable patch specified eventNames

(window as any).__Zone_enable_cross_context_check = true;

(window as any)['global'] = window;

// Necessary for IE10
Object.setPrototypeOf =
    Object.setPrototypeOf ||
    function(obj, proto) {
        obj.__proto__ = proto;
        return obj;
    };

if (!Object.entries) {
    Object.entries = function(obj: any) {
        const ownProps = Object.keys(obj);
        let i = ownProps.length;
        const resArray = new Array(i); // preallocate the Array
        while (i--)
            resArray[i] = [ownProps[i], obj[ownProps[i]]];

        return resArray;
    };
}