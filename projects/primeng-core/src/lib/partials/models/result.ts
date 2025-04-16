export interface Result<T> {
  data?: T;
  message?: string;
  succeeded?: boolean;
  errors?: string[];
}

export interface ResultWrapper {
  message?: string;
  succeeded?: boolean;
  errors?: string[];
}
