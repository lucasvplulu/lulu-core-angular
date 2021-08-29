export class StringMethods {

  constructor() {
    this.addStringFormat();
  }

  addStringFormat() {
    if (!String.prototype.hasOwnProperty('format')) {
      const format = {
        format: function () {
          let formatted = this;
          for (let i = 0; i < arguments.length; i++) {
            const regexp = new RegExp('\\{' + i + '\\}', 'gi');
            formatted = formatted.replace(regexp, arguments[i]);
          }
          return formatted;
        }
      };
      Object.assign(String.prototype, format);
    }
  }
}

export const stringMethods = new StringMethods();
