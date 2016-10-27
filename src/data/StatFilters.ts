import {IFilters, IStats} from '../models';

export const statFilters : IFilters[] = [
  {
    heading: "Male",
    active: false,
    filterFunction: (user : IStats) : boolean => (user.gender === "male")
  },
  {
    heading: "Female",
    active: false,
    filterFunction: (user : IStats) : boolean => (user.gender === "female")
  },
  {
    heading: "Young",
    active: false,
    filterFunction: (user : IStats) : boolean => (user.age < 20)
  },
  {
    heading: "Old",
    active: false,
    filterFunction: (user : IStats) : boolean => (user.age > 20)
  }
]
