function formatMoney(money) {
  return parseFloat(money)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
