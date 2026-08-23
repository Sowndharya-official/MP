import API from "./api";

export async function uploadProject(file) {

    const formData = new FormData();

    formData.append("project", file);

    const response = await API.post(
        "/upload",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
}