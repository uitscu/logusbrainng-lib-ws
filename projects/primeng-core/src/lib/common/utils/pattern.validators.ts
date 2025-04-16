export class PatternValidators {

  public static minLength(input: any, length: number): boolean {
    const pattern = new RegExp('^[\\w\\s\'-]{' + length + ',32}$', 'g');
    return pattern.test(input);
  }

  public static maxLength(input: any, length: number): boolean {
    const pattern = new RegExp('^[\\w\\s\'-]{3,' + length + '}$', 'g');
    return pattern.test(input);
  }

  public static pattern(input: any, regex: string): boolean {
    const pattern = new RegExp(regex, 'g');
    return pattern.test(input);
  }

  public static required(input: any): boolean {
    return input != null && input.toString().length > 0;
  }

  public static validateInputText(text: string, regex: string, maxlength: number): boolean {
    return this.required(text) && this.pattern(text, regex) && this.maxLength(text, maxlength);
  }

  public static validateInputTextFull(text: string, regex: string, minlength: number, maxlength: number): boolean {
    return this.required(text) && this.pattern(text, regex) && this.minLength(text, minlength) && this.maxLength(text, maxlength);
  }

}
