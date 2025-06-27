document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculateBtn');
    const resultsDiv = document.getElementById('results');
    
    calculateBtn.addEventListener('click', calculatePercentages);
    
    function calculatePercentages() {
        // Get input values
        const sales = parseFloat(document.getElementById('sales').value);
        const waiters = parseInt(document.getElementById('waiters').value);
        const startDate = new Date(document.getElementById('startDate').value);
        const endDate = new Date(document.getElementById('endDate').value);
        
        // Validate inputs
        if (isNaN(sales) || isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || isNaN(waiters)) {
            alert('Please enter all data correctly');
            return;
        }
        
        if (startDate > endDate) {
            alert('Start date must be before end date');
            return;
        }
        
        if (sales < 0) {
            alert('Sales must be a positive number');
            return;
        }
        
        if (waiters < 0 || waiters > 2) {
            alert('Number of waiters must be 0, 1, or 2');
            return;
        }
        
        // Calculate number of days
        const timeDiff = endDate - startDate;
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
        
        // Calculate total percentage based on tiered conditions
        let totalPercentage = 0;
        
        if (sales/daysDiff > 2000) {
            totalPercentage = (daysDiff * 1000 * 0.01) + (daysDiff * 1000 * 0.02) + ((sales - 2000 * daysDiff) * 0.05);
        } else if (sales/daysDiff > 1000) {
            totalPercentage = (daysDiff * 1000 * 0.01) + ((sales - 1000 * daysDiff) * 0.02);
        } else {
            totalPercentage = sales * 0.01;
        }
        
        // Calculate shares based on number of waiters
        let captainPercentage = totalPercentage * 0.9;
        let waiter1Percentage = 0;
        let waiter2Percentage = 0;
        
        // Show/hide waiter result fields based on selection
        const waiter1El = document.getElementById('waiter1Percentage');
        const waiter1Label = document.getElementById('waiter1PercentageLabel');
        const waiter2El = document.getElementById('waiter2Percentage');
        const waiter2Label = document.getElementById('waiter2PercentageLabel');
        
        if (waiters === 1) {
            waiter1Percentage = captainPercentage * 0.3;
            captainPercentage = captainPercentage * 0.7;
            
            waiter1El.style.display = 'block';
            waiter1Label.style.display = 'block';
            waiter2El.style.display = 'none';
            waiter2Label.style.display = 'none';
        } 
        else if (waiters === 2) {
            waiter1Percentage = captainPercentage * 0.2;
            waiter2Percentage = captainPercentage * 0.2;
            captainPercentage = captainPercentage * 0.6;
            
            waiter1El.style.display = 'none';
            waiter1Label.style.display = 'none';
            waiter2El.style.display = 'block';
            waiter2Label.style.display = 'block';
        } 
        else {
            waiter1El.style.display = 'none';
            waiter1Label.style.display = 'none';
            waiter2El.style.display = 'none';
            waiter2Label.style.display = 'none';
        }
        
        const kitchenPercentage = totalPercentage * 0.1;
        
        // Display results
        document.getElementById('daysCount').querySelector('span').textContent = daysDiff;
        document.getElementById('totalPercentage').querySelector('span').textContent = totalPercentage.toFixed(2);
        document.getElementById('captainPercentage').querySelector('span').textContent = captainPercentage.toFixed(2);
        document.getElementById('waiter1Percentage').querySelector('span').textContent = waiter1Percentage.toFixed(2);
        document.getElementById('waiter2Percentage').querySelector('span').textContent = waiter2Percentage.toFixed(2);
        document.getElementById('kitchenPercentage').querySelector('span').textContent = kitchenPercentage.toFixed(2);
        
        resultsDiv.style.display = 'block';
    }
});