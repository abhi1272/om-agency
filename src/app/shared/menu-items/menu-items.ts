import { Injectable } from '@angular/core'
import { UsersService } from 'app/core/services/users.service'

export interface Menu {
  state: string
  name: string
  type: string
  icon: string
}

const MENUITEMS = [
  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'dashboard' },
  { state: 'report', name: 'Report', type: 'link', icon: 'summarize' },
  {
    state: 'customer', name: 'Sale', type: 'link', icon: 'sell', subMenu: [
      { state: 'customer', name: 'Customer', type: 'link', icon: 'person' },
      { state: 'bill', name: 'Bill', type: 'link', icon: 'receipt' },
      { state: 'payment', name: 'Payment', type: 'link', icon: 'payment' },
    ]
  },
  {
    state: 'company', name: 'Purchase', type: 'link', icon: 'shopping_basket', subMenu: [
      { state: 'company', name: 'Company', type: 'link', icon: 'store' },
      { state: 'company-bill', name: 'Bill', type: 'link', icon: 'receipt' },
      { state: 'company-payment', name: 'Payment', type: 'link', icon: 'payment' },
    ]
  },
  { state: 'expense', name: 'Expense', type: 'link', icon: 'money' },
  {
    state: 'manage', name: 'Manage', type: 'link', icon: 'manage_accounts', subMenu: [
      { state: 'places', name: 'Place', type: 'link', icon: 'home' },
      { state: 'category', name: 'Category', type: 'link', icon: 'category' },
      { state: 'users', name: 'User', type: 'link', icon: 'person' }
    ]
  },
  // { state: 'entity/expense', name: 'Expense', type: 'link', icon: 'money' },
  // { state: 'places', name: 'Place', type: 'link', icon: 'home' },
  // { state: 'users', name: 'User', type: 'link', icon: 'person' }
]
// { state: 'entity/place', name: 'Place', type: 'link', icon: 'home' },

const USERMENUITEMS = [
  { state: 'customer', name: 'Customer', type: 'link', icon: 'person' },
  { state: 'bill', name: 'Bill', type: 'link', icon: 'receipt' },
  { state: 'payment', name: 'Payment', type: 'link', icon: 'payment' },
]

@Injectable()
export class MenuItems {

  constructor(public userService: UsersService) { }

  getMenuitem(): Menu[] {
    if (this.userService.getUser().roleName === 'User') {
      return USERMENUITEMS
    } else {
      return MENUITEMS
    }
  }
}
