!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.VueNumberFormat={})}(this,function(t){"use strict";function e(t){return!!(t||"").match(/\d/)}function r(t){return t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}function n(t){var e="-"===t[0],r=(t=t.replace("-","")).split(".");return{beforeDecimal:r[0],afterDecimal:r[1]||"",hasNagation:e}}function i(t,e,r){for(var n="",i=r?"0":"",a=0;a<=e-1;a++)n+=t[a]||i;return n}function a(t,e){if(t.value=t.value,null!==t){if(t.createTextRange){var r=t.createTextRange();return r.move("character",e),r.select(),!0}return t.selectionStart||0===t.selectionStart?(t.focus(),t.setSelectionRange(e,e),!0):(t.focus(),!1)}}function o(t,e,r){return Math.min(Math.max(t,e),r)}var s={name:"NumberFormat",props:{thousandSeparator:{type:String,default:null},decimalSeparator:{type:String,default:null},decimalScale:{type:Number,default:null},fixedDecimalScale:{type:Boolean,default:!1},prefix:{type:String,default:""},suffix:{type:String,default:""},format:{type:[Function,String],default:null},mask:{type:[String,Array],default:null,validate:function(t){if(t&&("string"===t?t:t.toString()).match(/\d/g))throw new Error("Mask "+t+" should not contain numeric character")}},value:{type:String,default:""},isNumericString:{type:Boolean,default:!1},allowNegative:{type:Boolean,default:!0},allowEmptyFormatting:{type:Boolean,default:!1},isAllowed:{type:Function,default:function(){return!0}}},data:function(){return{rawValue:"",formattedValue:"",selectionBeforeInput:{selectionStart:0,selectionEnd:0}}},created:function(){var t=this.formatValueProp();this.setValues(t),this.selectionBeforeInput={selectionStart:0,selectionEnd:0}},methods:{setValues:function(t,e){void 0===e&&(e=null),this.formattedValue=t,this.rawValue=e||this.removeFormatting(t),this.$emit("input",{formattedValue:t,rawValue:this.rawValue})},getFloatString:function(t){void 0===t&&(t="");var e=this.decimalSeparator,n=this.decimalScale,i=this.getNumberRegex(!0),a="-"===t[0];a&&(t=t.replace("-","")),e&&0===n&&(t=t.split(e)[0]);var o=(t=(t.match(i)||[]).join("").replace(e,".")).indexOf(".");return-1!==o&&(t=t.substring(0,o)+"."+t.substring(o+1,t.length).replace(new RegExp(r(e),"g"),"")),a&&(t="-"+t),t},getNumberRegex:function(t,e){var n=this.decimalSeparator,i=this.format,a=this.decimalScale;return new RegExp("\\d"+(!n||0===a||e||i?"":"|"+r(n)),t?"g":void 0)},getMaskAtIndex:function(t){var e=this.mask;return void 0===e&&(e=" "),"string"==typeof e?e:e[t]||" "},setPatchedCaretPosition:function(t,e,r){a(t,e),setTimeout(function(){t.value===r&&a(t,e)},0)},correctCaretPosition:function(t,r,n){var i=this.prefix,a=this.suffix,s=this.format;if(""===t)return 0;if(r=o(r,0,t.length),!s){var u="-"===t[0];return o(r,i.length+(u?1:0),t.length-a.length)}if("function"==typeof s)return r;if("#"===s[r]&&e(t[r]))return r;if("#"===s[r-1]&&e(t[r-1]))return r;var f=s.indexOf("#");r=o(r,f,s.lastIndexOf("#")+1);for(var l=s.substring(r,s.length).indexOf("#"),c=r,h=r+(-1===l?0:l);c>f&&("#"!==s[c]||!e(t[c]));)c-=1;return!e(t[h])||"left"===n&&r!==f||r-c<h-r?e(t[c])?c+1:c:h},getCaretPosition:function(t,e,r){var n,i,a=this.format,o=this.formattedValue,s=this.getNumberRegex(!0),u=(t.match(s)||[]).join(""),f=(e.match(s)||[]).join("");for(n=0,i=0;i<r;i++){var l=t[i]||"",c=e[n]||"";if((l.match(s)||l===c)&&("0"!==l||!c.match(s)||"0"===c||u.length===f.length)){for(;l!==e[n]&&n<e.length;)n++;n++}}return"string"!=typeof a||o||(n=e.length),n=this.correctCaretPosition(e,n)},removePrefixAndSuffix:function(t){var e=this.format,r=this.prefix,n=this.suffix;if(!e&&t){var i="-"===t[0];i&&(t=t.substring(1,t.length));var a=(t=r&&0===t.indexOf(r)?t.substring(r.length,t.length):t).lastIndexOf(n);t=n&&-1!==a&&a===t.length-n.length?t.substring(0,a):t,i&&(t="-"+t)}return t},removePatternFormatting:function(t){for(var e=this.format.split("#").filter(function(t){return""!==t}),r=0,n="",i=0,a=e.length;i<=a;i++){var o=e[i]||"",s=i===a?t.length:t.indexOf(o,r);if(-1===s){n=t;break}n+=t.substring(r,s),r=s+o.length}return(n.match(/\d/g)||[]).join("")},removeFormatting:function(t){var e=this.format,r=this.removeFormatting;return t?(e?t="string"==typeof e?this.removePatternFormatting(t):"function"==typeof r?r(t):(t.match(/\d/g)||[]).join(""):(t=this.removePrefixAndSuffix(t),t=this.getFloatString(t)),t):t},formatWithPattern:function(t){for(var e=this.format,r=0,n=e.split(""),i=0,a=e.length;i<a;i++)"#"===e[i]&&(n[i]=t[r]||this.getMaskAtIndex(r),r+=1);return n.join("")},formatAsNumber:function(t){var e=this.thousandSeparator,r=this.decimalSeparator,a=this.decimalScale,o=this.fixedDecimalScale,s=this.prefix,u=this.suffix,f=(this.allowNegative,-1!==t.indexOf(".")||a&&o),l=n(t),c=l.beforeDecimal,h=l.afterDecimal,d=l.addNegation;return void 0!==a&&(h=i(h,a,o)),e&&(c=c.replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1"+e)),s&&(c=s+c),u&&(h+=u),d&&(c="-"+c),t=c+(f&&r||"")+h},formatNumString:function(t){void 0===t&&(t="");var e=this.format,r=this.allowEmptyFormatting,n=t;return""!==t||r?"-"!==t||e?n="string"==typeof e?this.formatWithPattern(n):"function"==typeof e?e(n):this.formatAsNumber(n):(n="-",t=""):n="",n},formatValueProp:function(){var t=this.format,e=this.decimalScale,r=this.fixedDecimalScale,a=this.allowEmptyFormatting,o=this.value,s=this.isNumericString;return void 0===o&&a&&(o=""),void 0!==o||a?("number"==typeof o&&(o=o.toString(),s=!0),s&&!t&&"number"==typeof e&&(o=function(t,e,r){if(""===t)return"";var a=-1!==t.indexOf(".")&&e,o=n(t),s=o.beforeDecimal,u=o.afterDecimal,f=o.hasNagation,l=parseFloat("0."+(u||"0")).toFixed(e).split("."),c=s.split("").reverse().reduce(function(t,e,r){return t.length>r?(Number(t[0])+Number(e)).toString()+t.substring(1,t.length):e+t},l[0]),h=i(l[1]||"",(u||"").length,r);return(f?"-":"")+c+(a?".":"")+h}(o,e,r)),s?this.formatNumString(o):this.formatInput(o)):""},formatNegation:function(t){void 0===t&&(t="");var e=this.allowNegative,r=new RegExp("(-)"),n=new RegExp("(-)(.)*(-)"),i=r.test(t),a=n.test(t);return t=t.replace(/-/g,""),i&&!a&&e&&(t="-"+t),t},formatInput:function(t){void 0===t&&(t="");return this.format||(t=this.formatNegation(t)),t=this.removeFormatting(t),this.formatNumString(t)},isCharacterAFormat:function(t,e){var r=this.decimalSeparator,n=this.format,i=this.prefix,a=this.suffix,o=this.decimalScale,s=this.fixedDecimalScale;return"string"==typeof n&&"#"!==n[t]||!(n||!(t<i.length||t>=e.length-a.length||o&&s&&e[t]===r))},checkIfFormatGotDeleted:function(t,e,r){for(var n=t;n<e;n++)if(this.isCharacterAFormat(n,r))return!0;return!1},correctInputValue:function(t,e,r){var i=this.format,a=this.decimalSeparator,o=(this.allowNegative,this.rawValue||""),s=this.selectionBeforeInput,u=s.selectionStart,f=s.selectionEnd,l=function(t,e){for(var r=0,n=0,i=t.length,a=e.length;t[r]===e[r]&&r<i;)r++;for(;t[i-1-n]===e[a-1-n]&&a-n>r&&i-n>r;)n++;return{start:r,end:i-n}}(e,r),c=l.start,h=l.end;if(r.length>e.length||!r.length||c===h||0===c&&h===e.length||0===u&&f===e.length)return r;if(this.checkIfFormatGotDeleted(c,h,e)&&(r=e),!i){var d=this.removeFormatting(r),m=n(d),g=m.beforeDecimal,v=m.afterDecimal,p=m.addNegation,_=t<r.indexOf(a)+1;if(d.length<o.length&&_&&""===g&&!parseFloat(v))return p?"-":""}return r},onChange:function(t){var e=t.target,r=e.value,n=this.isAllowed,i=this.formattedValue||"",a=Math.max(e.selectionStart,e.selectionEnd);r=this.correctInputValue(a,i,r);var o=this.formatInput(r)||"";n({formattedValue:o,rawValue:this.removeFormatting(o)})||(o=i);var s=this.getCaretPosition(r,o,a);this.setPatchedCaretPosition(e,s,o),this.setValues(o),this.$forceUpdate()},onBlur:function(t){var e=this.format,r=this.rawValue,n=this.formattedValue;if(!e){r=function(t){if(!t)return t;var e="-"===t[0];e&&(t=t.substring(1,t.length));var r=t.split("."),n=r[0].replace(/^0+/,"")||"0",i=r[1]||"";return(e?"-":"")+n+(i?"."+i:"")}(r);var i=this.formatNumString(r);i!==n&&this.setValues(i,r)}this.onEvent("blur",t)},onKeyDown:function(t){var e,r=t.target,n=t.key,i=r.selectionStart,a=r.selectionEnd,o=r.value;void 0===o&&(o="");var s=this.decimalScale,u=this.fixedDecimalScale,f=this.prefix,l=this.suffix,c=this.format,h=void 0!==s&&u,d=this.getNumberRegex(!1,h),m=new RegExp("-"),g="string"==typeof c;if(this.selectionBeforeInput={selectionStart:i,selectionEnd:a},"ArrowLeft"===n||"Backspace"===n?e=i-1:"ArrowRight"===n?e=i+1:"Delete"===n&&(e=i),void 0!==e&&i===a){var v=e,p=g?c.indexOf("#"):f.length,_=g?c.lastIndexOf("#")+1:o.length-l.length;if("ArrowLeft"===n||"ArrowRight"===n){var S="ArrowLeft"===n?"left":"right";v=this.correctCaretPosition(o,e,S)}else if("Delete"!==n||d.test(o[e])||m.test(o[e])){if("Backspace"===n&&!d.test(o[e])&&!m.test(o[e])){for(;!d.test(o[v-1])&&v>p;)v--;v=this.correctCaretPosition(o,v,"left")}}else for(;!d.test(o[v])&&v<_;)v++;(v!==e||e<p||e>_)&&(t.preventDefault(),this.setPatchedCaretPosition(r,v,o)),this.onEvent("keydown",t)}else this.onEvent("keydown",t)},onMouseUp:function(t){var e=t.target,r=e.selectionStart,n=e.selectionEnd,i=e.value;if(void 0===i&&(i=""),r===n){var a=this.correctCaretPosition(i,r);a!==r&&this.setPatchedCaretPosition(e,a,i)}this.onEvent("mouseup",t)},onFocus:function(t){var e=this;setTimeout(function(){var r=t.target,n=r.selectionStart,i=r.value;void 0===i&&(i="");var a=e.correctCaretPosition(i,n);a!==n&&e.setPatchedCaretPosition(r,a,i),e.onEvent("focus",t)},0)},onEvent:function(t,e){this.$listeners[t]&&this.$listeners[t](e)}},render:function(){return this.$scopedSlots.default({formattedValue:this.formattedValue,rawValue:this.rawValue,inputEvents:{input:this.onChange,keydown:this.onKeyDown,mouseup:this.onMouseUp,focus:this.onFocus,blur:this.onBlur}})}},u="undefined"!=typeof __vue_render__?{render:__vue_render__,staticRenderFns:__vue_staticRenderFns__}:{};var f,l,c,h,d=(f=u,l=void 0,c=void 0,"undefined"!=typeof __vue_create_injector_ssr__&&__vue_create_injector_ssr__,(h=(void 0===s?{}:s)||{}).render||(h.render=f.render,h.staticRenderFns=f.staticRenderFns,h._compiled=!0,c&&(h.functional=!0)),h._scopeId=l,h),m={name:"NumberFormatInput",components:{NumberFormat:d}},g=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("number-format",t._g(t._b({scopedSlots:t._u([{key:"default",fn:function(e){var n=e.formattedValue,i=e.inputEvents;return r("input",t._g({domProps:{value:n}},i))}}])},"number-format",t.$attrs,!1),t.$listeners))};var v=function(t,e,r,n,i,a,o,s){var u=r||{};return u.render||(u.render=t.render,u.staticRenderFns=t.staticRenderFns,u._compiled=!0,i&&(u.functional=!0)),u._scopeId=n,u}({render:g,staticRenderFns:[]},0,void 0===m?{}:m,void 0,!1,0,0,"undefined"!=typeof __vue_create_injector_ssr__&&__vue_create_injector_ssr__),p={name:"NumberFormatText",components:{NumberFormat:d},props:{tag:{type:String,default:"span"}}},_=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("number-format",t._b({scopedSlots:t._u([{key:"default",fn:function(e){var n=e.formattedValue;return r(t.tag,{tag:"component"},[t._v("\n    "+t._s(n)+"\n  ")])}}])},"number-format",t.$attrs,!1))};var S=function(t,e,r,n,i,a,o,s){var u=r||{};return u.render||(u.render=t.render,u.staticRenderFns=t.staticRenderFns,u._compiled=!0,i&&(u.functional=!0)),u._scopeId=n,u}({render:_,staticRenderFns:[]},0,void 0===p?{}:p,void 0,!1,0,0,"undefined"!=typeof __vue_create_injector_ssr__&&__vue_create_injector_ssr__);t.default=d,t.NumberFormatInput=v,t.NumberFormatText=S,Object.defineProperty(t,"__esModule",{value:!0})});
