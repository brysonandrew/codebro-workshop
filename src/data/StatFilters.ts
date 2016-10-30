import {IFilters, IStats} from '../models';

export const statFilters : IFilters[] = [
  {
    heading: "Male",
    active: false,
    filterFunction: (stat : IStats) : boolean => (stat.gender === "male")
  },
  {
    heading: "Female",
    active: false,
    filterFunction: (stat : IStats) : boolean => (stat.gender === "female")
  },
  {
    heading: "Young",
    active: false,
    filterFunction: (stat : IStats) : boolean => (stat.age < 20)
  },
  {
    heading: "Old",
    active: false,
    filterFunction: (stat : IStats) : boolean => (stat.age > 20)
  }
]
