export interface PizzaOption {
  id: string
  name: string
  icon: string
  price: number
  description: string
  color?: string
}

export interface PizzaState {
  size: PizzaOption | null
  dough: PizzaOption | null
  sauce: PizzaOption | null
  cheese: PizzaOption | null
  toppings: PizzaTopping[]
}

export interface PizzaTopping extends PizzaOption {
  x?: number
  y?: number
}

export interface PizzaConfig {
  sizes: PizzaOption[]
  doughs: PizzaOption[]
  sauces: PizzaOption[]
  cheeses: PizzaOption[]
  toppings: PizzaOption[]
}
