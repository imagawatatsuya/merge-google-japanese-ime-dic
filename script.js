document.getElementById('merge-button').addEventListener('click', mergeDictionaries);
document.getElementById('download-button').addEventListener('click', downloadDictionary);

function mergeDictionaries() {
    const fileInput1 = document.getElementById('file1');
    const fileInput2 = document.getElementById('file2');
    const commentHandling = document.getElementById('comment-handling').value;

    if (!fileInput1.files[0] || !fileInput2.files[0]) {
        alert('両方の辞書ファイルを選択してください。');
        return;
    }

    const reader1 = new FileReader();
    reader1.onload = function (event1) {
        const reader2 = new FileReader();
        reader2.onload = function (event2) {
            const dictionary1 = parseDictionary(event1.target.result);
            const dictionary2 = parseDictionary(event2.target.result);

            // 辞書1と辞書2の単語数を表示
            document.getElementById('dict1-count').textContent = Object.keys(dictionary1).length;
            document.getElementById('dict2-count').textContent = Object.keys(dictionary2).length;

            // 辞書内容と差分を表示
            displayDictionaries(dictionary1, dictionary2);

            // 差分のみ表示
            displayDiffOnly(dictionary1, dictionary2);

            const mergedDictionary = merge(dictionary1, dictionary2, commentHandling);
            displayMergedDictionary(mergedDictionary);

            // 統合後の単語数を表示
            document.getElementById('merged-count').textContent = Object.keys(mergedDictionary).length;
        };
        reader2.readAsText(fileInput2.files[0]);
    };
    reader1.readAsText(fileInput1.files[0]);
}

function parseDictionary(text) {
    const lines = text.split('\n');
    const dictionary = {}; // { "単語\tよみ": { pos: "品詞", comment: "コメント" } } の形式

    for (const line of lines) {
        const parts = line.trim().split('\t');
        if (parts.length >= 3) { // 単語、よみ、品詞は最低限必要
            const word = parts[0];
            const reading = parts[1];
            const pos = parts[2];
            const comment = parts.length > 3 ? parts[3] : '';

            dictionary[`${word}\t${reading}`] = { pos: pos, comment: comment };
        }
    }
    return dictionary;
}

function merge(dict1, dict2, commentHandling) {
    const merged = { ...dict1 }; // dict1 をベースにする

    for (const key in dict2) {
        if (merged.hasOwnProperty(key)) {
            // 重複がある場合
            if (commentHandling === 'combine') {
                merged[key].comment = `${merged[key].comment} ${dict2[key].comment}`.trim(); // コメントを結合
            } else if (commentHandling === 'keep-second') {
                merged[key].comment = dict2[key].comment; // ファイル2のコメントで上書き
            } // keep-first の場合は何もしない (dict1 が優先)
        } else {
            // 重複がない場合
            merged[key] = dict2[key];
        }
    }

    return merged;
}

function displayMergedDictionary(dictionary) {
    const textarea = document.getElementById('merged-dictionary');
    let text = '';
    for (const key in dictionary) {
        const entry = dictionary[key];
        text += `${key}\t${entry.pos}\t${entry.comment}\n`;
    }
    textarea.value = text;
}

function downloadDictionary() {
    const textarea = document.getElementById('merged-dictionary');
    const text = textarea.value;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;

    // 現在日時を取得してフォーマット (YYYYMMDD-HHMMSS)
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 月は0から始まるので+1、2桁で0埋め
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timestamp = `${year}${month}${day}-${hours}${minutes}${seconds}`;

    a.download = `merged_dictionary_${timestamp}.txt`; // ファイル名にタイムスタンプを追加
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function displayDictionaries(dict1, dict2) {
    const display1 = document.getElementById('dictionary1-display');
    const display2 = document.getElementById('dictionary2-display');
    display1.innerHTML = ''; // Clear previous content
    display2.innerHTML = '';

    // 辞書1の内容を表示 (差分クラス付き)
    for (const key in dict1) {
        const entry1 = dict1[key];
        let classes = 'common';
        if (!dict2.hasOwnProperty(key)) {
            classes = 'removed';
        } else if (dict2[key].comment !== entry1.comment) {
            classes += ' modified';
        }
        const line = `<div class="${classes}">${key}\t${entry1.pos}\t${entry1.comment}</div>`;
        display1.innerHTML += line;
    }

    // 辞書2の内容を表示 (差分クラス付き)
    for (const key in dict2) {
        const entry2 = dict2[key];
        let classes = 'common';
        if (!dict1.hasOwnProperty(key)) {
            classes = 'added';
        } // modified クラスは辞書1のループで既にチェック済み
        const line = `<div class="${classes}">${key}\t${entry2.pos}\t${entry2.comment}</div>`;
        display2.innerHTML += line;
    }
}

function displayDiffOnly(dict1, dict2) {
    const diffOnlyDisplay = document.getElementById('diff-only');
    diffOnlyDisplay.innerHTML = ''; // Clear previous content

    let diffCount = 0; // 差分があったエントリの数

    // 辞書1を基準に差分をチェック
    for (const key in dict1) {
        if (!dict2.hasOwnProperty(key) || dict2[key].comment !== dict1[key].comment) {
            const entry1 = dict1[key];
            const line1 = `<div class="removed">${key}\t${entry1.pos}\t${entry1.comment} (ファイル1)</div>`; // removedクラス
            diffOnlyDisplay.innerHTML += line1;
            diffCount++;

            if (dict2.hasOwnProperty(key)) {
                const entry2 = dict2[key];
                const line2 = `<div class="added">${key}\t${entry2.pos}\t${entry2.comment} (ファイル2)</div>`;   // addedクラス
                diffOnlyDisplay.innerHTML += line2;
            }
            diffOnlyDisplay.innerHTML += '<hr>'; // エントリ間に区切り線
        }
    }

    // 辞書2を基準に、辞書1に存在しないエントリをチェック
    for (const key in dict2) {
        if (!dict1.hasOwnProperty(key)) {
            const entry2 = dict2[key];
            const line2 = `<div class="added">${key}\t${entry2.pos}\t${entry2.comment} (ファイル2)</div>`;
            diffOnlyDisplay.innerHTML += line2;
            diffCount++;
        }
    }

    if (diffCount === 0) {
        diffOnlyDisplay.innerHTML = '<div>差分はありません</div>';
    }
}