class Humanize {
  #idCurrencyFormatter: Intl.NumberFormat;

  constructor() {
    this.#idCurrencyFormatter = new Intl.NumberFormat('id', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });
  }

  currency(input: string | number) {
    if (input == null) {
      return '';
    }
    input = Number(input);
    return this.#idCurrencyFormatter.format(input);
  }
}

export default new Humanize();
