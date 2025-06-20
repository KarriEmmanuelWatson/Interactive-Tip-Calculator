const billInput = document.getElementById('bill-input');
const tipButtons = document.querySelectorAll('.tip-percent-btn');
const customTipInput = document.getElementById('custom-tip-input');
const peopleInput = document.getElementById('people-input');
const tipAmountDisplay = document.getElementById('tip-amount-display');
const totalAmountDisplay = document.getElementById('total-amount-display');
const resetButton = document.getElementById('reset-button');

function calculateTip() {
  const bill = parseFloat(billInput.value);
  const people = parseInt(peopleInput.value);
  const customTip = parseFloat(customTipInput.value);
  let tipPercent = 0;

  if (!isNaN(customTip)) {
    tipPercent = customTip;
  } else {
    const activeBtn = document.querySelector('.tip-percent-btn.active');
    if (activeBtn) {
      tipPercent = parseFloat(activeBtn.dataset.tip);
    }
  }

  const isValid = !isNaN(bill) && bill >= 0 && !isNaN(people) && people > 0;

  if (isValid) {
    const tipAmount = (bill * tipPercent) / 100 / people;
    const totalAmount = (bill + (bill * tipPercent) / 100) / people;

    tipAmountDisplay.textContent = `₹${tipAmount.toFixed(2)}`;
    totalAmountDisplay.textContent = `₹${totalAmount.toFixed(2)}`;
  } else {
    tipAmountDisplay.textContent = '₹0.00';
    totalAmountDisplay.textContent = '₹0.00';
  }

  billInput.classList.toggle('error', isNaN(bill) || bill < 0);
  peopleInput.classList.toggle('error', isNaN(people) || people <= 0);
  customTipInput.classList.toggle('error', isNaN(tipPercent));
}

function resetCalculator() {
  billInput.value = '';
  peopleInput.value = '';
  customTipInput.value = '';
  tipButtons.forEach(btn => btn.classList.remove('active'));
  tipAmountDisplay.textContent = '₹0.00';
  totalAmountDisplay.textContent = '₹0.00';
  [billInput, peopleInput, customTipInput].forEach(input => input.classList.remove('error'));
}

tipButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tipButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    customTipInput.value = '';
    calculateTip();
  });
});

[billInput, peopleInput].forEach(input => {
  input.addEventListener('input', calculateTip);
});

customTipInput.addEventListener('input', () => {
  tipButtons.forEach(btn => btn.classList.remove('active'));
  calculateTip();
});

resetButton.addEventListener('click', () => {
  resetCalculator();
});

document.addEventListener('DOMContentLoaded', calculateTip);
