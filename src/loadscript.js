export function loadScript(urls, callback) {
    if (typeof urls === "function") return urls();
    if (typeof urls === "string") urls = [urls];

    const existedScripts =
        Array.from(document.getElementsByTagName('script'),
            elem => elem.src.replace(/^.*[\\\/]/, ''));
    //console.log(existedScripts);
    const promises = [];

    if (!Array.isArray(urls))
        throw new TypeError();

    urls.forEach(url => {
        // console.log(url);
        let urlname = url.replace(/^.*[\\\/]/, '');
        if (existedScripts.includes(urlname)) return;
        const element = document.createElement("script");
        element.type = "text/javascript";
        element.src = url;
        //promises.push(new Promise(resolve => {
        //    element.onload = resolve;
        //}));
        //console.log(element);
        // let prom = new Promise
        //     (function (resolve, reject) {
        //         // эта функция выполнится автоматически,  
        //         // при вызове new Promise
        //         // что задача выполнена с результатом "done"
        //         //resolve("done111");
        //         //console.log(resolve);
        //         //element.onload = resolve;
        //         element.onload = () => resolve(element);
        //     });
        // promises.push(new Promise(resolve => {
        //     element.onload = resolve;
        let prom = new Promise(
            function (resolve, reject) {
                return element.onload =
                    function () { resolve("ffeff") }
            }
        );
        promises.push(prom);
        // console.log(prom);
        // promises.push(prom);
        document.body.appendChild(element);
        // Promise.all(promises).then(element => alert(`${element.src} загружен!`));
    });
    //console.log(promises);
    //prom.then(callback(null, "sdfsd111"));
    Promise.all(promises).then(function temp1(result) { callback(null), console.log(result) }, function temp2(error) { callback("1") });
}