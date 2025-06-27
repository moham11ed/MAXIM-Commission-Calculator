document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculateBtn');
    const resultsDiv = document.getElementById('results');
    
    calculateBtn.addEventListener('click', calculatePercentages);
    
    function calculatePercentages() {
        // الحصول على القيم من المدخلات
        const sales = parseFloat(document.getElementById('sales').value);
        const startDate = new Date(document.getElementById('startDate').value);
        const endDate = new Date(document.getElementById('endDate').value);
        
        // التحقق من صحة المدخلات
        if (isNaN(sales) || isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            alert('الرجاء إدخال جميع البيانات بشكل صحيح');
            return;
        }
        
        if (startDate > endDate) {
            alert('تاريخ البداية يجب أن يكون قبل تاريخ النهاية');
            return;
        }
        
        if (sales < 0) {
            alert('المبيعات يجب أن تكون رقم موجب');
            return;
        }
        
        // حساب عدد الأيام
        const timeDiff = endDate - startDate;
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
        
        // حساب النسبة الكلية حسب شروط التدرج
        let totalPercentage = 0;
        
        if (sales/daysDiff > 2000) {
            totalPercentage = (daysDiff * 1000 * 0.01) + (daysDiff * 1000 * 0.02) + ((sales - 2000 *daysDiff) * 0.05);
        } else if (sales/daysDiff > 1000) {
            totalPercentage = (daysDiff * 1000 * 0.01) + ((sales - 1000 * daysDiff) * 0.02);
        } else {
            totalPercentage = sales * 0.01;
        }
        
        // حساب نسب الكابتن والمطبخ
        const captainPercentage = totalPercentage * 0.9;
        const kitchenPercentage = totalPercentage * 0.1;
        
        // عرض النتائج
        document.getElementById('daysCount').querySelector('span').textContent = daysDiff;
        document.getElementById('totalPercentage').querySelector('span').textContent = totalPercentage.toFixed(2);
        document.getElementById('captainPercentage').querySelector('span').textContent = captainPercentage.toFixed(2);
        document.getElementById('kitchenPercentage').querySelector('span').textContent = kitchenPercentage.toFixed(2);
        
        resultsDiv.style.display = 'block';
    }
});