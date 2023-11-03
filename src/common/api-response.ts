export const ApiResponse = <T>(res: any, message: string, statusCode: number, data: T): void => {
  res.status(statusCode).json({ message, statusCode, data });
};
