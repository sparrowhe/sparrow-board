let contentFuncs = {};

function SetHeader(data) {
    $('#schoolName').text(data.schoolName);
    $('#className').text(data.className);
}

async function SetContents(data) {
    const contents = data.contents;
    for(let i in contents) {
        $('#content-list').append(`<div class="mdui-row" id="row-${i}"></div>`);
        for(j in contents[i]) {
            const content = contents[i][j];
            const contentTemplate = `<div class="${content.class}" id="content-${i}-${j}"></div>`
            $(`#row-${i}`).append(contentTemplate);
            // js lazyload
            $.getScript(`./cards/${content.component}/index.js`, function () {
                // DANGER! This is a eval function!
                eval(`contentFuncs["#content-${i}-${j}"] = new ${content.component}("#content-${i}-${j}");`);
                contentFuncs[`#content-${i}-${j}`].Init();
            });
        }
    }
}

function Init() {
    $.ajax({
        url: "config/mainBoard.json",
        dataType: "json",
        success: function (data) {
            const mainBoard = data;
            SetHeader(mainBoard);
            SetContents(mainBoard);
        }
    });
    setInterval(
        function () {
            for(let i in contentFuncs) {
                contentFuncs[i].Refresh();
            }
        },
        60*1000
    )
}

window.onload = Init;