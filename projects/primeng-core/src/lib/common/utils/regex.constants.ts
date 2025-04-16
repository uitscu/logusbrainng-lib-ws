export class RegexConstants {
  // === Regex Patterns ===

  /** Numéro de compte : commence par 1-8, suivi de 0 à 11 chiffres */
  static readonly ACCOUNT_NUMBER = '^([1-8]{1}[0-9]{0,11})$';

  /** Clé d'entrée (nom de paramètre technique) : lettres ou underscores, minimum 4 caractères */
  static readonly INPUT_KEY = '^([a-zA-Z_]{4,})?$';

  /** Valeur paramètre libre : lettres, chiffres, tirets, apostrophes, espaces, accents */
  static readonly INPUT_PARAM_VALUE = "^[\\w\\s'\\-éèêëâäãàáúùûüíìîïóòôöõ]{1,}$";

  /** Texte générique (avec minimum 3 caractères) */
  static readonly INPUT_TEXT = "^[\\w\\s'\\-éèêëâäãàáúùûüíìîïóòôöõ]{3,}$";
  static readonly REQUIRED_INPUT_TEXT = "^[\\w\\s'\\-]{3,}$";

  /** Email conforme RFC-5322 simplifié */
  static readonly INPUT_EMAIL = "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$";

  /** Numéro de téléphone international : commence par + ou 00, suivi d'au moins 7 chiffres ou symboles */
  static readonly INPUT_PHONE = "^(\\+|00)[1-9][0-9 \\-().]{7,}$";

  /** Adresse postale : lettres, chiffres, tirets, apostrophes, virgules, espaces, accents */
  static readonly INPUT_ADDRESS = "^[\\w\\s',\\-éèêëâäãàáúùûüíìîïóòôöõ]{3,}$";

  /** Date au format DD-MM-YYYY, DD/MM/YYYY ou DD.MM.YYYY */
  static readonly INPUT_DATETIME = '^(0[1-9]|[12][0-9]|3[01])[\\-\\/\\.](0[1-9]|1[0-2])[\\-\\/\\.](19|20)\\d{2}$';

  /** Numéro NIF (1 lettre, 7 chiffres, 1 lettre) */
  static readonly INPUT_NIF = '^([a-zA-Z]{1}[0-9]{7}[a-zA-Z]{1})$';
  static readonly PATTERN_INPUT_NIF = RegexConstants.INPUT_NIF;

  /** Champ numérique masqué : chiffres et espaces uniquement */
  static readonly INPUT_MASK = '^([\\d\\s]{1,20})$';

  /** URL ou site Web */
  static readonly INPUT_WEBSITE = '^([-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)?)$';

  /** Code bureau spécifique : 1 à 3 chiffres suivis d'une majuscule */
  static readonly CODE_BUREAU = '^([0-9]{1,3}[A-Z]{1})$';
}
