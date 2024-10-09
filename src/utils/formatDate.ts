import { format, formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

// Formate la date du jour en français sous cette forme: 7 octobre 2024
// ===========================================================================================
export const formatDate = (date: Date): string =>
  format(date, 'd MMMM yyyy', { locale: fr });

// Formate le temps de la dernière mise à jour
// ===========================================================================================
export const timeAgo = (date: Date): string =>
  formatDistanceToNow(date, { addSuffix: false, locale: fr });
