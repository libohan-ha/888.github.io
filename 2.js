// 保存笔记到localStorage
function saveText() {
    const text = document.getElementById("notebook").value;
    localStorage.setItem("notebook", text);
    alert("笔记已保存");
}

// 从localStorage加载笔记
function loadText() {
    const savedText = localStorage.getItem("notebook");
    if (savedText) {
        document.getElementById("notebook").value = savedText;
        alert("笔记已加载");
    } else {
        alert("没有保存的笔记");
    }
}

// 调用GPT
async function callGPT() {
    const textArea = document.getElementById("notebook");
    const selectedText = textArea.value.substring(textArea.selectionStart, textArea.selectionEnd);
    
    if (!selectedText) {
        alert("请先选择文本");
        return;
    }

    try {
        console.log("正在发送请求...");
        
        const response = await fetch("https://xiaoai.plus/v1/chat/completions", {  // 使用你的API URL
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer sk-0LQap8Tmit6KDtIrDc8a4221Ca804b748aF39e4642152c53`  // 使用你的API密钥
            },
            body: JSON.stringify({
                model: "GPT-3.5 Turbo",
                prompt: selectedText,
                max_tokens: 150
            })
        });

        console.log("请求已发送，正在处理响应...");

        if (!response.ok) {
            const errorMessage = `错误: ${response.status} ${response.statusText}`;
            console.error(errorMessage);
            alert(errorMessage);
            return;
        }

        const data = await response.json();
        console.log("响应数据:", data);

        const gptText = data.choices[0].text.trim();
        alert(`GPT结果: ${gptText}`);
    } catch (error) {
        console.error("请求失败:", error);
        alert(`请求失败: ${error.message}`);
    }
}

// 上传文件
function uploadFiles() {
    const files = document.getElementById('fileInput').files;
    if (files.length === 0) {
        alert('请选择文件后再上传');
        return;
    }

    for (const file of files) {
        const reader = new FileReader();
        
        reader.onload = function(event) {
            const fileContent = event.target.result;
            console.log(`文件内容: ${fileContent}`); // 你可以在这里处理文件内容，例如上传到服务器
        };

        reader.readAsText(file);
    }

    alert('文件已上传');
}