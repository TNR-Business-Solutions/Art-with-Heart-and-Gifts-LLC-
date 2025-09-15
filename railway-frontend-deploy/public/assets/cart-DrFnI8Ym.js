class a{constructor(){this.items=[],this.loadFromStorage()}loadFromStorage(){try{const t=localStorage.getItem("artwithheartandgifts_cart");t&&(this.items=JSON.parse(t))}catch(t){console.error("Error loading cart from storage:",t),this.items=[]}}saveToStorage(){try{localStorage.setItem("artwithheartandgifts_cart",JSON.stringify(this.items))}catch(t){console.error("Error saving cart to storage:",t)}}addItem(t){const e=this.items.find(o=>o.id===t.id);e?e.quantity+=1:this.items.push({id:t.id,title:t.title,image:t.image,price:t.price,size:t.size,type:t.type,quantity:1}),this.saveToStorage(),this.updateCartUI(),this.showCartNotification()}removeItem(t){this.items=this.items.filter(e=>e.id!==t),this.saveToStorage(),this.updateCartUI()}updateQuantity(t,e){const o=this.items.find(n=>n.id===t);o&&(e<=0?this.removeItem(t):(o.quantity=e,this.saveToStorage(),this.updateCartUI()))}getSubtotal(){return this.items.reduce((t,e)=>t+e.price*e.quantity,0)}getTax(){return this.getSubtotal()*.06}getShipping(){const t=this.getSubtotal();return t>=100?0:t>=50?8.99:12.99}getTotal(){return this.getSubtotal()+this.getTax()+this.getShipping()}getCount(){return this.items.reduce((t,e)=>t+e.quantity,0)}clear(){this.items=[],this.saveToStorage(),this.updateCartUI()}showCartNotification(){const t=document.createElement("div");t.className="cart-notification",t.innerHTML=`
      <div class="cart-notification-content">
        <span>✓ Added to cart!</span>
        <button onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `,document.body.appendChild(t),setTimeout(()=>{t.parentElement&&t.remove()},3e3)}updateCartUI(){const t=document.getElementById("cart-count"),e=document.getElementById("cart-subtotal"),o=document.getElementById("cart-shipping"),n=document.getElementById("cart-tax"),i=document.getElementById("cart-total"),r=document.getElementById("cart-items");if(t&&(t.textContent=this.getCount(),t.style.display=this.getCount()>0?"block":"none"),e&&(e.textContent=`$${this.getSubtotal().toFixed(2)}`),o){const s=this.getShipping();o.textContent=s===0?"FREE":`$${s.toFixed(2)}`}n&&(n.textContent=`$${this.getTax().toFixed(2)}`),i&&(i.textContent=`$${this.getTotal().toFixed(2)}`),r&&this.renderCartItems(r)}renderCartItems(t){if(this.items.length===0){t.innerHTML='<p class="empty-cart">Your cart is empty</p>';return}t.innerHTML=this.items.map(e=>`
      <div class="cart-item">
        <img src="${e.image}" alt="${e.title}" class="cart-item-image">
        <div class="cart-item-details">
          <h4>${e.title}</h4>
          <p class="cart-item-meta">${e.size} • ${e.type}</p>
          <div class="cart-item-controls">
            <button onclick="window.cart.updateQuantity('${e.id}', ${e.quantity-1})">-</button>
            <span>${e.quantity}</span>
            <button onclick="window.cart.updateQuantity('${e.id}', ${e.quantity+1})">+</button>
            <button onclick="window.cart.removeItem('${e.id}')" class="remove-btn">Remove</button>
          </div>
        </div>
        <div class="cart-item-price">$${(e.price*e.quantity).toFixed(2)}</div>
      </div>
    `).join("")}async checkout(){if(this.items.length===0){alert("Your cart is empty!");return}try{const t=document.querySelector(".checkout-btn");t&&(t.textContent="Processing...",t.disabled=!0);const e=this.getCustomerInfo(),o={items:this.items,customer:e,shippingMethod:"standard"};console.log("Submitting order:",o);const i=await(await fetch("https://art-with-heart-and-gifts-llc-production.up.railway.app/api/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)})).json();if(i.success)console.log("Order created:",i),window.location.href="/checkout.html";else throw new Error(i.error||"Order creation failed")}catch(t){console.error("Checkout error:",t),alert(`Checkout failed: ${t.message}`);const e=document.querySelector(".checkout-btn");e&&(e.textContent="Checkout with Swipe Simple",e.disabled=!1)}}getCustomerInfo(){return{name:"Test Customer",email:"test@example.com",phone:"",address:{street:"123 Test St",city:"Zephyrhills",state:"FL",zip:"33540",country:"US"}}}showTestPayment(t){const e=`
      <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 10000; display: flex; align-items: center; justify-content: center;">
        <div style="background: white; padding: 30px; border-radius: 10px; max-width: 500px; text-align: center;">
          <h2>Test Payment</h2>
          <p><strong>Order ID:</strong> ${t.orderId}</p>
          <p><strong>Total:</strong> $${t.totals.total.toFixed(2)}</p>
          <p><strong>Subtotal:</strong> $${t.totals.subtotal.toFixed(2)}</p>
          <p><strong>Shipping:</strong> $${t.totals.shipping.toFixed(2)}</p>
          <p><strong>Tax:</strong> $${t.totals.tax.toFixed(2)}</p>
          <div style="margin: 20px 0;">
            <button onclick="window.cart.completeTestPayment('${t.orderId}', 'completed')" 
                    style="background: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px; margin: 5px; cursor: pointer;">
              Simulate Successful Payment
            </button>
            <button onclick="window.cart.completeTestPayment('${t.orderId}', 'failed')" 
                    style="background: #f44336; color: white; padding: 10px 20px; border: none; border-radius: 5px; margin: 5px; cursor: pointer;">
              Simulate Failed Payment
            </button>
          </div>
          <button onclick="document.body.removeChild(this.parentElement.parentElement)" 
                  style="background: #ccc; color: black; padding: 10px 20px; border: none; border-radius: 5px; margin: 5px; cursor: pointer;">
            Cancel
          </button>
        </div>
      </div>
    `;document.body.insertAdjacentHTML("beforeend",e)}async completeTestPayment(t,e){try{const n=await(await fetch("https://art-with-heart-and-gifts-llc-production.up.railway.app/api/payment/complete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({orderId:t,paymentStatus:e})})).json();if(n.success){this.clear(),alert(`Payment ${e==="completed"?"successful":"failed"}! Order ID: ${t}`);const i=document.querySelector('div[style*="position: fixed"]');i&&i.remove();const r=document.getElementById("cart-modal");r&&(r.style.display="none")}else throw new Error(n.error||"Payment completion failed")}catch(o){console.error("Payment completion error:",o),alert(`Payment completion failed: ${o.message}`)}}showCheckoutForm(){const t=document.createElement("div");t.className="checkout-modal",t.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
    `,t.innerHTML=`
      <div style="background: white; border-radius: 12px; width: 90%; max-width: 500px; max-height: 80vh; overflow-y: auto; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);">
        <div style="padding: 1.5rem; border-bottom: 2px solid #2c5530; display: flex; justify-content: space-between; align-items: center;">
          <h2 style="margin: 0; color: #2c5530;">Checkout</h2>
          <button onclick="this.closest('.checkout-modal').remove()" style="background: none; border: none; font-size: 2rem; cursor: pointer; color: #666;">&times;</button>
        </div>
        <div style="padding: 1.5rem;">
          <form id="checkoutForm">
            <div style="margin-bottom: 1rem;">
              <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Full Name *</label>
              <input type="text" id="checkoutName" required style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem;">
            </div>
            <div style="margin-bottom: 1rem;">
              <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Email Address *</label>
              <input type="email" id="checkoutEmail" required style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem;">
            </div>
            <div style="margin-bottom: 1rem;">
              <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Phone Number</label>
              <input type="tel" id="checkoutPhone" style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem;">
            </div>
            <div style="margin-bottom: 1rem;">
              <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Shipping Address</label>
              <textarea id="checkoutAddress" rows="3" style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem; resize: vertical;"></textarea>
            </div>
            <div style="margin-bottom: 1.5rem; padding: 1rem; background: #f8f9fa; border-radius: 4px;">
              <h4 style="margin: 0 0 0.5rem 0; color: #2c5530;">Order Summary</h4>
              <div id="checkoutItems"></div>
              <div style="margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid #ddd;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem; font-size: 0.9rem;">
                  <span>Subtotal:</span>
                  <span id="checkout-subtotal">$${this.getSubtotal().toFixed(2)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem; font-size: 0.9rem;">
                  <span>Shipping:</span>
                  <span id="checkout-shipping">${this.getShipping()===0?"FREE":"$"+this.getShipping().toFixed(2)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem; font-size: 0.9rem;">
                  <span>Tax (FL 6%):</span>
                  <span id="checkout-tax">$${this.getTax().toFixed(2)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid #ddd; font-weight: 600; font-size: 1.1rem;">
                  <span>Total:</span>
                  <span id="checkout-total">$${this.getTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div style="display: flex; gap: 1rem;">
              <button type="button" onclick="this.closest('.checkout-modal').remove()" style="flex: 1; padding: 0.75rem; background: #6b7280; color: white; border: none; border-radius: 4px; font-size: 1rem; cursor: pointer;">Cancel</button>
              <button type="submit" style="flex: 1; padding: 0.75rem; background: #2c5530; color: white; border: none; border-radius: 4px; font-size: 1rem; cursor: pointer;">Complete Order</button>
            </div>
          </form>
        </div>
      </div>
    `,document.body.appendChild(t);const e=document.getElementById("checkoutItems");e.innerHTML=this.items.map(o=>`
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
        <span>${o.title} x${o.quantity}</span>
        <span>$${(o.price*o.quantity).toFixed(2)}</span>
      </div>
    `).join(""),document.getElementById("checkoutForm").addEventListener("submit",async o=>{o.preventDefault(),await this.processOrder(t)})}async processOrder(t){try{const e={name:document.getElementById("checkoutName").value,email:document.getElementById("checkoutEmail").value,phone:document.getElementById("checkoutPhone").value,address:document.getElementById("checkoutAddress").value},n={id:"ORD-"+Date.now()+"-"+Math.random().toString(36).substr(2,9).toUpperCase(),items:this.items,customer:e,subtotal:this.getSubtotal(),shipping:this.getShipping(),tax:this.getTax(),total:this.getTotal(),paymentMethod:"swipe-simple",status:"pending",createdAt:new Date().toISOString()},i=JSON.parse(localStorage.getItem("orders")||"[]");i.push(n),localStorage.setItem("orders",JSON.stringify(i)),this.clear(),t.remove(),this.redirectToPaymentPortal(n)}catch(e){console.error("Error processing order:",e),alert("There was an error processing your order. Please try again.")}}redirectToPaymentPortal(t){const e=this.createPaymentPortalUrl(t),o=window.open(e,"payment","width=800,height=600,scrollbars=yes,resizable=yes");o?o.focus():window.location.href=e}createPaymentPortalUrl(t){t.id,t.items.map(i=>({name:i.title,quantity:i.quantity,price:i.price,total:i.price*i.quantity})),t.subtotal,t.shipping,t.tax,t.total,t.customer;const e=t.items.map(i=>`${i.title} (${i.size}) - Qty: ${i.quantity} - $${(i.price*i.quantity).toFixed(2)}`).join(`
`),o=`Payment Required - Order #${t.id} - $${t.total.toFixed(2)}`,n=`PAYMENT PORTAL - Order #${t.id}

ORDER SUMMARY:
${e}

PRICING BREAKDOWN:
Subtotal: $${t.subtotal.toFixed(2)}
Shipping: ${t.shipping===0?"FREE":"$"+t.shipping.toFixed(2)}
Tax (FL 6%): $${t.tax.toFixed(2)}
TOTAL: $${t.total.toFixed(2)}

CUSTOMER INFORMATION:
Name: ${t.customer.name}
Email: ${t.customer.email}
Phone: ${t.customer.phone||"Not provided"}
Address: ${t.customer.address||"Not provided"}

PAYMENT INSTRUCTIONS:
1. I will send you a Swipe Simple payment link via email
2. Click the link to complete your payment securely
3. Your prints will be processed and shipped within 3-5 business days
4. You will receive tracking information via email

Thank you for your order!`;return`/contact.html?subject=${encodeURIComponent(o)}&message=${encodeURIComponent(n)}`}showPaymentInstructions(t){const{orderDetails:e,instructions:o}=t,n=`
      <div style="max-width: 600px; margin: 50px auto; padding: 30px; background: white; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
        <h2 style="color: #2c5530; text-align: center; margin-bottom: 30px;">Order Confirmation</h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #2c5530; margin-top: 0;">Order Details</h3>
          <p><strong>Order ID:</strong> ${e.id}</p>
          <p><strong>Total Amount:</strong> $${e.total.toFixed(2)}</p>
          <p><strong>Customer:</strong> ${e.customer.name}</p>
          <p><strong>Email:</strong> ${e.customer.email}</p>
        </div>

        <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #2c5530; margin-top: 0;">Payment Instructions</h3>
          <p>Your order has been received! To complete your payment:</p>
          <ol>
            <li>I will create a secure payment link in Swipe Simple</li>
            <li>You will receive an email with the payment link</li>
            <li>Click the link to complete your payment securely</li>
            <li>Your artwork will be processed and shipped within 3-5 business days</li>
          </ol>
        </div>

        <div style="text-align: center;">
          <p style="color: #666;">You can also contact me directly at:</p>
          <p><strong>Email:</strong> artwithheartandgifts@yahoo.com</p>
          <p><strong>Phone:</strong> (239) 878-9849</p>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <button onclick="window.location.href='/'" style="background: #2c5530; color: white; padding: 12px 30px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
            Return to Home
          </button>
        </div>
      </div>
    `;document.body.innerHTML=n}}window.cart=new a;document.addEventListener("DOMContentLoaded",()=>{window.cart.updateCartUI()});
