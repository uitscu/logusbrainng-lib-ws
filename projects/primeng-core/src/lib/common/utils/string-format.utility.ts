export function ucfirst(value: string) {
  const words = value.split(' ');
  return words.map((word) => {
    return word[0].toUpperCase() + word.substring(1);
  }).join(' ');
}

export function pluriel(tab?: any[], value?: string) {
  if (tab && tab.length <= 1) {
    return value;
  }

  const mots = value?.split(' ');

  return mots?.map((mot) => {
    if (!mot.endsWith('s') && !mot.endsWith('x') && !mot.endsWith('z')) {

      if (mot.endsWith('al')) {
        return mot.substring(0, mot.lastIndexOf('al')) + 'aux';
      }

      if (mot.endsWith('eau') || mot.endsWith('au')) {
        return mot + 'x';
      }

      return mot + 's';
    }

    return mot;
  }).join(" ");
}
