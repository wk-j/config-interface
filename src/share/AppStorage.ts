export default class AppStorage {

    public static accessToken = "accessToken"

    public static getAccessToken(): string {
        return sessionStorage.getItem(this.accessToken)
    }
    public static setAccessToken(value: string): void {
        sessionStorage.setItem(this.accessToken, value)
    }
}