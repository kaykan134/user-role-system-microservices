import axios from "axios"

export default function ExportData() {
    async function exportAsJSON() {
        const res = (await axios.get("http://localhost:5004/export/json", {
            withCredentials: true
        })).data

        let blobdtMIME =
            new Blob([JSON.stringify(res, null, 4)], { type: "text/json" })
        let url = URL.createObjectURL(blobdtMIME)
        let link = document.createElement("a")
        link.setAttribute("download", "export.json");
        link.href = url;
        link.click();
    }

    async function exportAsCSV() {
        const res = (await axios.get("http://localhost:5004/export/csv", {
            withCredentials: true
        })).data

        let blobdtMIME =
            new Blob([res], { type: "text/csv" })
        let url = URL.createObjectURL(blobdtMIME)
        let link = document.createElement("a")
        link.setAttribute("download", "export.csv");
        link.href = url;
        link.click();
    }

    return (
        <div>
            <button onClick={() => exportAsJSON()}>Export as JSON</button>
            <button onClick={() => exportAsCSV()}>Export as CSV</button>
        </div>
    )
}