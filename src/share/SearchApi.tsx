import axios from "axios"

// ประกาศstate
type ContentResult = {
    success: boolean;
    path: string;
    content: string;
}
export type Node = {
    id: number
    name: string
    isRoot: boolean
    isFile: boolean
    parent: number
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
        return axios.post(`${this.url}/api/search/SaveSettingContent`, {
            path: projectPath,
            content: projectContent
        })
    }
    public getFolderAll(projectPath: string) {
        return axios.get<string>(`${this.url}/api/Search/GetFolderAll?Pathz=${projectPath}`)
    }
    public getNode(path: string) {
        return axios.get<Node[]>(`${this.url}/api/Search/GetNodes?path=${path}`)
    }
}