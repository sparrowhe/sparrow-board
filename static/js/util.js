// 全局工具类

async function loadSetting(moduleName) {
    const setting = await $.ajax({
        url: `config/${moduleName}.json`,
        dataType: "json",
    });
    return setting;
}

async function loadTemplate(moduleName, config, render = true) {
    let template = await $.ajax({
        url: `cards/${moduleName}/template.html`,
        dataType: "html",
    });
    if (render) {
        for(let i in config) {
            template = template.replace(`{${i}}`, config[i]);
        }
    }
    return template;
}