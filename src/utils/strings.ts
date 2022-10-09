export const urlRegex : RegExp = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
export const stringHelper : any = {
    http: "http://",
    delete: "There was an error when deleting url",
    notFound : "Not found",
    fetchUrl: "There was an error when fetching url",
    createUrl : "There was an error generating url",
    putUrl : "There was an error when updating url",
    jwtSecret : "XUsSwUsdaSfZdAd.Sdajd1643",
    expiresIn : "1h",
    codeChar : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    userNotFound: "A user with this email could not be found",
    wrongPassword: "Wrong password!"
}
export const HttpError : any ={
        http401 : "Unauthorized",
        http404 : "Not Found",
        http500 : "Internal Server Error"
}
