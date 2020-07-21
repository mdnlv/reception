import {format} from "date-fns";
import {ru} from 'date-fns/locale'

export default function (date: Date | number, formatStr: string) {
    return format(date, formatStr, {
        locale: ru
    })
}
