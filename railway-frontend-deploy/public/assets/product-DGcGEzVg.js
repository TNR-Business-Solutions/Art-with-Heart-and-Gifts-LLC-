import"./app-E9zu1n74.js";class s{constructor(){this.isInitialized=!1,this.swipeSimpleConfig={merchantId:"YOUR_MERCHANT_ID",apiKey:"YOUR_API_KEY",baseUrl:"https://api.swipesimple.com"}}async initialize(){this.isInitialized||(this.isInitialized=!0,console.log("Swipe Simple payment processor initialized"))}async createPaymentLink(t,i){try{const e={amount:t,description:i.title,productId:i.id,merchantId:this.swipeSimpleConfig.merchantId};return sessionStorage.setItem("pendingPayment",JSON.stringify(e)),e}catch(e){throw console.error("Error creating payment link:",e),e}}async setupPaymentForm(t,i,e){const a=document.getElementById(t);if(!a)throw new Error(`Container ${t} not found`);try{const n=await this.createPaymentLink(i,e);a.innerHTML=`
        <div class="payment-form">
          <h3>Complete Your Purchase</h3>
          <div class="product-summary">
            <h4>${e.title}</h4>
            <p class="price">$${i.toFixed(2)}</p>
          </div>
          <div class="swipe-simple-payment">
            <p>You'll be redirected to Swipe Simple to complete your secure payment.</p>
            <div class="payment-options">
              <button id="swipe-simple-pay" class="btn primary">
                Pay $${i.toFixed(2)} with Swipe Simple
              </button>
              <p class="payment-note">
                <small>Secure payment processing by Swipe Simple</small>
              </p>
            </div>
          </div>
          <div id="payment-message" class="payment-message"></div>
        </div>
      `,document.getElementById("swipe-simple-pay").addEventListener("click",()=>this.handleSwipeSimplePayment(i,e))}catch(n){console.error("Error setting up payment form:",n),a.innerHTML=this.showAlternativePayment(e)}}async handleSwipeSimplePayment(t,i){const e=document.getElementById("swipe-simple-pay"),a=document.getElementById("payment-message");e.disabled=!0,e.textContent="Redirecting to Swipe Simple...";try{const n={product:i.title,amount:t,description:`Purchase: ${i.title} - $${t.toFixed(2)}`};sessionStorage.setItem("paymentInquiry",JSON.stringify(n)),window.location.href=`/contact.html?subject=Payment Inquiry: ${encodeURIComponent(i.title)}&amount=${t}`}catch(n){console.error("Swipe Simple payment error:",n),a.innerHTML='<p class="error">Unable to process payment. Please contact us directly.</p>',e.disabled=!1,e.textContent="Try Again"}}showAlternativePayment(t){return`
      <div class="alternative-payment">
        <h3>Purchase: ${t.title}</h3>
        <p class="price">$${t.price}</p>
        <div class="payment-options">
          <div class="payment-option">
            <h4>PayPal</h4>
            <p>Pay securely with PayPal</p>
            <button class="btn secondary" onclick="window.open('https://paypal.me/artwithheartandgifts', '_blank')">
              Pay with PayPal
            </button>
          </div>
          <div class="payment-option">
            <h4>Venmo</h4>
            <p>Send payment via Venmo</p>
            <button class="btn secondary" onclick="window.open('https://venmo.com/artwithheartandgifts', '_blank')">
              Pay with Venmo
            </button>
          </div>
          <div class="payment-option">
            <h4>Contact for Payment</h4>
            <p>We'll send you payment instructions</p>
            <a href="/contact.html?subject=Purchase: ${encodeURIComponent(t.title)}" class="btn primary">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    `}}window.PaymentProcessor=s;document.addEventListener("DOMContentLoaded",()=>{window.paymentProcessor=new s,window.paymentProcessor.initialize()});
