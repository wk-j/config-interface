import axios from "axios"
// ประกาศstate
type ContentResult = {
    success: boolean;
    path: string;
    content: string;
  }
export default {

    getProjectNames() {
        return axios.get<string[]>(`https://localhost:5001/api/search/getProjectNames`)
    },
    getProjectSettings(projectName: string) {
        return axios.get<string[]>(`https://localhost:5001/api/search/getProjectSettings/?projectName=${projectName}`)
    },
    getSettingContent(projectPath: string) {
        return axios.get<ContentResult>(`https://localhost:5001/api/search/getSettingContent/?path=${projectPath}`)
    },
    saveSettingContent(projectPath: string, projectContent: string) {
        axios.post("https://localhost:5001/api/search/SaveSettingContent", {
        Content: projectContent
        })
    },
}
