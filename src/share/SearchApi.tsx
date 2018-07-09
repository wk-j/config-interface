import axios from "axios"

// ประกาศstate
type ContentResult = {
    success: boolean;
    path: string;
    content: string;
}

export class SearchApi {
    constructor(private url: string) {

    }

    public getProjectNames() {
        return axios.get<string[]>(`${this.url}/api/search/getProjectNames`)
    }
    public getProjectSettings(projectName: string) {
        return axios.get<string[]>(`${this.url}/api/search/getProjectSettings/?projectName=${projectName}`)
    }
    public getSettingContent(projectPath: string) {
        return axios.get<ContentResult>(`${this.url}/api/search/getSettingContent/?path=${projectPath}`)
    }
    public saveSettingContent(projectPath: string, projectContent: string) {
        axios.post(`${this.url}/api/search/SaveSettingContent`, {
            path: projectPath,
            content: projectContent
        }).then((response) => {
            console.log(response.data)
        }).catch((error) => {
            console.log("AXIOS ERROR: ", error)
        })
    }
}
