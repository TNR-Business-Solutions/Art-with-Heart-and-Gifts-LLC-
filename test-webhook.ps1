# Test Swipe Simple Webhook Endpoint
$webhookUrl = "https://art-with-heart-and-gifts-llc-production.up.railway.app/api/webhooks/swipe-simple"
$testData = @{
    order_id = "test-123"
    status = "completed"
    transaction_id = "txn_123456"
    amount = 5350
    customer_email = "test@example.com"
    customer_name = "Test Customer"
} | ConvertTo-Json

Write-Host "🧪 Testing Swipe Simple Webhook Endpoint"
Write-Host "URL: $webhookUrl"
Write-Host "Data: $testData"

try {
    $response = Invoke-RestMethod -Uri $webhookUrl -Method POST -Body $testData -ContentType "application/json"
    Write-Host "✅ Webhook Response: $($response | ConvertTo-Json)"
} catch {
    Write-Host "❌ Webhook Error: $($_.Exception.Message)"
    Write-Host "Status Code: $($_.Exception.Response.StatusCode)"
}
