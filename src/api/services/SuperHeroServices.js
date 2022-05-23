import request from "../request";

export default class SuperHeroServices {
  static getAllSuperHeroes() {
    return request({
      url: "/superheroes",
      method: "GET",
    });
  }

  static search(pageIndex, pageSize, name, queryPageSort) {
    // const offset = pageIndex * pageSize;
    // console.log("queryPageSort", queryPageSort);
    if (queryPageSort && queryPageSort.length > 0) {
      return request({
        url: `/superheroes?name_like=${name}&_page=${
          pageIndex + 1
        }&_limit=${pageSize}&_sort=${queryPageSort[0].id}&_order=${
          queryPageSort[0].desc ? "desc" : "asc"
        }`,
        method: "GET",
      });
    } else {
      return request({
        url: `/superheroes?name_like=${name}&_page=${
          pageIndex + 1
        }&_limit=${pageSize}&_sort=id&_order=desc`,
        method: "GET",
      });
    }
  }

  static create(data) {
    return request({
      url: "/superheroes",
      method: "POST",
      data,
    });
  }
}
