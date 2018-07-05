import axios from "axios"
// ประกาศstate

export class SearchApi {
    public getProjectNames(): string {
        return axios.get(`https://localhost:5001/api/search/getProjectNames`)
    }
    public getProjectSettings(projectName: string): string {
        return axios.get(`https://localhost:5001/api/search/getProjectSettings/?projectName=${projectName}`)
    }
    public getSettingContent(projectPath: string): string {
        return axios.get(`https://localhost:5001/api/search/getSettingContent/?path=${projectPath}`)
    }
    public saveSettingContent(projectPath: string, projectContent: string): string {
        axios.post("https://localhost:5001/api/search/SaveSettingContent", {
        Content: projectContent
        })
    }
}
