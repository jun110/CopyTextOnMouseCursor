let lastHoveredText = "";

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "copyTextOnMouseCursor",
        title: "マウス カーソル上のテキストをコピー",
        contexts: ["all"],
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "copyTextOnMouseCursor") {
        if (lastHoveredText) {

            // アクティブなタブでクリップボードに書き込むスクリプトを実行
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: (text) => {
                    navigator.clipboard.writeText(text).then(() => {
                        console.log("Text copied to clipboard: ", text);
                    }).catch(err => {
                        console.error("Failed to copy text: ", err);
                    });
                },
                args: [lastHoveredText], // ホバー中のテキストを渡す
            });
        } else {
            console.log("No text found under hover.");
        }

    }
});

// content script からのメッセージ受信
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "updateHoveredText") {
        lastHoveredText = message.text;
    }
});