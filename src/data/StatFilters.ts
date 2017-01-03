import {IFilters, IStats, IAlbum} from '../models';

export const statFilters : IFilters[] = [
  {
    heading: "album",
    active: false,
    filterFunction: (album : IAlbum) : boolean =>
      (album.album_type === "album")
  },
  {
    heading: "single",
    active: false,
    filterFunction: (album : IAlbum) : boolean =>
      (album.album_type === "single")
  },
  {
    heading: "compilation",
    active: false,
    filterFunction: (album : IAlbum) : boolean =>
      (album.album_type === "compilation")
  }
];
