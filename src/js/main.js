// --- Camping Trip Cost Calculator ---
const budgetForm = document.getElementById('budget-form');
const totalOutput = document.getElementById('total-output');

if (budgetForm) {
  budgetForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const days = parseFloat(document.getElementById('days').value) || 0;
    const people = parseFloat(document.getElementById('people').value) || 0;
    const gearRental = parseFloat(document.getElementById('gear-rental').value) || 0;

    // Simple estimated camping cost calculation ($15 per person/day + extra gear rental)
    const dailyCostPerPerson = 15; 
    const totalCost = (days * people * dailyCostPerPerson) + gearRental;

    if (totalOutput) {
      totalOutput.textContent = `Estimated Trip Cost: $${totalCost.toFixed(2)}`;
      totalOutput.style.color = '#d97706';
    }
  });
}

// --- Newsletter Subscription Form ---
const newsletterForm = document.getElementById('newsletter-form');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('email');
    if (emailInput && emailInput.value) {
      alert(`Thank you for subscribing with: ${emailInput.value}`);
      newsletterForm.reset();
    }
  });
}