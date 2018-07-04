import axios from "axios"
// ประกาศstate

export class SearchApi {
    public getProjectNames(): any {
        return axios.get(`https://localhost:5001/api/search/getProjectNames`)
    }
    public getProjectSettings(projectName): any {
        return axios.get(`https://localhost:5001/api/search/getProjectSettings/?projectName=${projectName}`)
    }
    public getSettingContent(projectPath: string): any {
        return axios.get(`https://localhost:5001/api/search/getSettingContent/?path=${projectPath}`)
    }
    public saveSettingContent(projectPath: string, projectContent: string): any {
        axios.post("https://localhost:5001/api/search/SaveSettingContent", {
            Path: projectPath,
            Content: projectContent
        })
    }
}
