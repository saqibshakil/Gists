export default function download(filename, textInput, mimeType) {

    const element = document.createElement('a');
    element.setAttribute('href', `data:${mimeType};charset=utf-8, ${encodeURIComponent(textInput)}`);
    element.setAttribute('download', filename);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}