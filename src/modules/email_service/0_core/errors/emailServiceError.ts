export default class EmailServiceError extends Error {
  constructor(message?: string) {
    super(message);
  }
}
