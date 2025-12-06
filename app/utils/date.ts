import { format } from 'date-fns'

export function formatDate(dateString: string, dateFormat = 'dd.MM.yyyy'): string {
  try {
    return format(dateString, dateFormat)
  }
  catch {
    return dateString
  }
}
