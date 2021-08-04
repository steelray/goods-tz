export interface IPageableData<T> {
  options: {
    page: number,
    limit: number
  };
  params: T;
}

