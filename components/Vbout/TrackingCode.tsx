import Script from 'next/script'

export default function TrackingCode() {
  return (
    <Script id="vbout-tracking-code" strategy="afterInteractive">{`
/* embed code starts */
var _vbset = _vbset || [];
_vbset.push(['_account', 'VBT-43304-6887']);
_vbset.push(['_domain', 'https://livehealthy.hk']);

(function() {
	var vbt = document.createElement('script'); vbt.type = 'text/javascript'; vbt.async = true; 
	vbt.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'www.vbt.io/tracker?_account='+_vbset[0][1]+'&_domain='+_vbset[1][1];var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(vbt, s);
})();
/* embed code ends */
    `}</Script>
  )
}
