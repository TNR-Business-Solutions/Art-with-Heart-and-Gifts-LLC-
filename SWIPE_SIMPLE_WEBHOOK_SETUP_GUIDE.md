# 🔗 Swipe Simple Webhook Configuration Guide

## 📋 **WEBHOOK DETAILS**

- **Webhook URL**: `https://art-with-heart-and-gifts-llc-production.up.railway.app/api/webhooks/swipe-simple`
- **Merchant ID**: `461682001808706`
- **Method**: `POST`
- **Content-Type**: `application/json`

## 🎯 **STEP-BY-STEP CONFIGURATION**

### 1. **Access Swipe Simple Dashboard**

1. Go to [Swipe Simple Dashboard](https://swipesimple.com)
2. Log in with your merchant credentials
3. Navigate to your account settings

### 2. **Find Webhook Settings**

Look for one of these sections:

- **Settings** → **Webhooks**
- **Account** → **Webhook Configuration**
- **Developer** → **API Settings**
- **Notifications** → **Webhook URLs**

### 3. **Configure Webhook**

Add the following webhook configuration:

```
Webhook URL: https://art-with-heart-and-gifts-llc-production.up.railway.app/api/webhooks/swipe-simple
Events to Subscribe To:
- Payment Completed
- Payment Failed
- Payment Refunded
- Order Status Changed
```

### 4. **Webhook Payload Format**

The webhook expects this data structure:

```json
{
  "order_id": "string",
  "status": "completed|failed|refunded",
  "transaction_id": "string",
  "amount": "number (in cents)",
  "customer_email": "string",
  "customer_name": "string"
}
```

## 🔧 **ALTERNATIVE CONFIGURATION METHODS**

### Method 1: Contact Swipe Simple Support

If you can't find webhook settings in the dashboard:

1. Contact Swipe Simple support
2. Provide them with:
   - Merchant ID: `461682001808706`
   - Webhook URL: `https://art-with-heart-and-gifts-llc-production.up.railway.app/api/webhooks/swipe-simple`
   - Request: Enable webhook notifications for payment events

### Method 2: API Configuration (if available)

Some Swipe Simple accounts have API access:

```bash
curl -X POST https://api.swipesimple.com/webhooks \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://art-with-heart-and-gifts-llc-production.up.railway.app/api/webhooks/swipe-simple",
    "events": ["payment.completed", "payment.failed"]
  }'
```

## 🧪 **TESTING THE WEBHOOK**

### Test Webhook Endpoint

```bash
curl -X POST https://art-with-heart-and-gifts-llc-production.up.railway.app/api/webhooks/swipe-simple \
  -H "Content-Type: application/json" \
  -d '{
    "order_id": "test-123",
    "status": "completed",
    "transaction_id": "txn_123456",
    "amount": 5350,
    "customer_email": "test@example.com",
    "customer_name": "Test Customer"
  }'
```

### Expected Response

```json
{
  "success": true,
  "processed": true
}
```

## 📊 **WEBHOOK MONITORING**

### Check Railway Logs

1. Go to [Railway Dashboard](https://railway.app)
2. Navigate to your project
3. Click on **Logs** tab
4. Look for webhook-related log entries

### Webhook Success Indicators

- ✅ `Order {order_id} status updated to paid`
- ✅ `Webhook processed successfully`
- ❌ `Invalid webhook signature`
- ❌ `Webhook processing failed`

## 🔒 **SECURITY CONSIDERATIONS**

### Webhook Signature Verification

The webhook endpoint verifies signatures using:

- Header: `x-swipe-signature`
- Payload: JSON string of webhook data

### HTTPS Requirement

- ✅ Webhook URL uses HTTPS
- ✅ Railway provides SSL certificate
- ✅ All data encrypted in transit

## 🚨 **TROUBLESHOOTING**

### Common Issues

#### 1. **Webhook Not Receiving Data**

- Verify webhook URL is correct
- Check Railway deployment is active
- Ensure webhook is enabled in Swipe Simple

#### 2. **Invalid Signature Errors**

- Check if Swipe Simple sends signature header
- Verify webhook secret configuration
- Contact Swipe Simple support for signature format

#### 3. **Timeout Errors**

- Railway has 30-second timeout
- Webhook processing is typically fast
- Check for infinite loops in processing

### Debug Commands

```bash
# Test webhook endpoint
curl -X POST https://art-with-heart-and-gifts-llc-production.up.railway.app/api/webhooks/swipe-simple \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'

# Check backend health
curl https://art-with-heart-and-gifts-llc-production.up.railway.app/api/health
```

## ✅ **VERIFICATION CHECKLIST**

- [ ] Webhook URL configured in Swipe Simple
- [ ] Payment events enabled (completed, failed, refunded)
- [ ] Webhook endpoint responding (tested)
- [ ] Railway logs showing webhook activity
- [ ] Order status updates working
- [ ] Email notifications functional (if configured)

## 🎉 **SUCCESS INDICATORS**

Once configured correctly, you should see:

1. **Payment notifications** in Railway logs
2. **Order status updates** in your system
3. **Customer confirmations** working
4. **Inventory updates** (if tracking enabled)

## 📞 **SUPPORT CONTACTS**

### Swipe Simple Support

- **Phone**: Check your Swipe Simple dashboard
- **Email**: Support contact in your account
- **Live Chat**: Available in dashboard

### Railway Support

- **Documentation**: [Railway Docs](https://docs.railway.app)
- **Community**: Railway Discord
- **Status**: [Railway Status](https://status.railway.app)

---

**Once the webhook is configured, your payment system will be 100% functional!** 🚀
