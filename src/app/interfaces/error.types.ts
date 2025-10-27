export interface IGenericErrorResponse {
    statusCode: number;
    message: string
    errorSources?: IErrorSources
}


export interface IErrorSources {
    path: string
    message: string
}