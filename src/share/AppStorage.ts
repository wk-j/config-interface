export default class AppStorage {

    public static loggedIn = "loggedIn"

    public static getLoggedIn(): boolean {
        return JSON.parse(sessionStorage.getItem(this.loggedIn))
    }
    public static setLoggedIn(value): void {
        sessionStorage.setItem(this.loggedIn, value)
    }
}