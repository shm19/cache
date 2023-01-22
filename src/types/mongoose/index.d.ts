declare module 'mongoose' {
  interface Query<T> {
    useCache: boolean;
    cache(): Query<T>;
  }
}
