import axios from "axios"
import { getApiUrl } from "./Configuration"

// ประกาศstate
type ContentResult = {
    success: boolean;
    path: string;
    content: string;
}

const url = getApiUrl();

export class SearchApi {

    public getProjectNames() {
        return axios.get<string[]>(`${url}/api/search/getProjectNames`)
    }
    public getProjectSettings(projectName: string) {
        return axios.get<string[]>(`${url}/api/search/getProjectSettings/?projectName=${projectName}`)
    }
    public getSettingContent(projectPath: string) {
        return axios.get<ContentResult>(`${url}/api/search/getSettingContent/?path=${projectPath}`)
    }
    public saveSettingContent(projectPath: string, projectContent: string) {
        axios.post(`${url}/api/search/SaveSettingContent`, {
            path: projectPath,
            content: projectContent
        })
    }
}
