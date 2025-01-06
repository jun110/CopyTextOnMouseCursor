let hoveredText = "";

// マウスが移動した際にホバー中の文字列を取得
document.addEventListener("mousemove", (event) => {
    const element = document.elementFromPoint(event.clientX, event.clientY);
    if (element) {
        hoveredText = element.innerText || "";
        // 背景スクリプトにテキストを送信
        chrome.runtime.sendMessage({
            type: "updateHoveredText",
            text: hoveredText.trim(),
        });
    }
});
