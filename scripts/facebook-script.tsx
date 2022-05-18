import Script from 'next/script'
import React from 'react'

export default function FacebookScript() {
  return (
    <>
      <Script id="facebook-script" strategy="afterInteractive">
        {`
          function statusChangeCallback(response) {  
            console.log('statusChangeCallback');
            console.log('response-fb',response);                   
            if (response.status === 'connected') {   
              testAPI();  
            } else {                                
              document.getElementById('status').innerHTML = 'Please log ' +
                'into this webpage.';
            }
          }

          window.fbAsyncInit = function() {
          FB.init({
            appId            : ${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID},
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v13.0'
          });

          FB.logout(function(response) {
              // Person is now logged out
          });

          FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
          });

        };`}
      </Script>
      <Script
        id="facebook-script-connect"
        strategy="afterInteractive"
        defer={true}
        crossOrigin="anonymous"
        src="https://connect.facebook.net/en_US/sdk.js"
      />
    </>
  )
}

export function FacebookButton() {
  return (
    <div
      className="fb-login-button"
      data-width=""
      data-size="medium"
      data-button-type="continue_with"
      data-layout="rounded"
      data-auto-logout-link="true"
      data-use-continue-as="true"
    ></div>
  )
}

export function FacebookButtonScript() {
  return (
    <>
      <div id="fb-root"></div>
      <Script
        strategy="afterInteractive"
        id="facebook-button-login-script"
        crossOrigin="anonymous"
        src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v13.0&appId=460321535860137&autoLogAppEvents=1"
        nonce="0OkFS2FQ"
      />
    </>
  )
}
