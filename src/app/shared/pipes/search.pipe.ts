import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args: any): unknown {
    let query: string
    let field: string
    if (typeof args === 'object') {
      query = args.query
      field = args.field
    } else {
      query = args
      field = 'name'
    }
    if (!value) { return null }
    if (!query) { return value }

    query = query.toLowerCase()

    return value.filter((item: any) => {
      return JSON.stringify(item[field]).toLowerCase().includes(query)
    })
  }
}
