export interface IjwtPayload{
    name: string,
    email: string,
    exp: number
}

export interface INotificatiion{
    type:"SUCCESS"|"WARN"|"ERROR",
    status:string,
    duration:number,
    timestamp:number
}