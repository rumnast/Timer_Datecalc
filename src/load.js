export function loadScript(url, callback) {
    let list = document.getElementsByTagName("script");
    let i = list.length, flag = false;
    while (i--) {
        let filename = list[i].src.replace(/^.*[\\\/]/, '');
        let urlname = url.replace(/^.*[\\\/]/, '');
        //console.log("filename ", filename)
        //console.log("urlname ", urlname)
        if (filename === urlname) {
            flag = true;
            //const tag = list[i];
            const tag = "ddfgdgdg"
            console.log(tag);
            callback(null, tag);
            break;
        }
    }

    if (!flag) {
        const tag = document.createElement('script');
        tag.src = url;
        tag.type = "text/javascript";
        tag.onload = () => callback(null, tag);
        tag.onerror = () => callback(new Error(`Не удалось загрузить скрипт ${src}`));
        document.getElementsByTagName('body')[0].appendChild(tag);
    }

}