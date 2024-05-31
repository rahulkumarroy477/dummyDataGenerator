const customDataBtn = document.getElementById("custom-data");
const aiDataBtn = document.getElementById('ai-data');
const result_box = document.getElementById('result-box');
const downloder = document.getElementById('downloader');
const downloadLink = document.getElementById('download-btn');
const eye_btn = document.getElementById('eye-icon');
let jsonData = [];
async function handleSubmit(event) {
    const items = document.querySelectorAll('.items');
    const data = [];
    let isValid = true;

    items.forEach(item => {
        const input = item.querySelector('input').value;
        const val = item.querySelector('div.dropdown.box h4').textContent;

        if (input === '') {
            alert("Fill all inputs or delete empty ones");
            isValid = false;
        } else if (val === 'Value') {
            alert('Select empty values');
            isValid = false;
        } else {
            data.push(input);
        }
    });

    if (!isValid) return;

    console.log(data);
    const _type = event.target.id === 'custom-data' ? 'customData' : 'aiData';
    try {
        result_box.style.display = "block";
        const response = await fetch(`https://dummydatagenerator.onrender.com/${_type}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'row': 10,
                'data': data
            },
        });

        const responseData = await response.json();
        console.log(responseData.status);

        jsonData = responseData.receivedData;
        console.log(jsonData);
        result_box.style.display = "none";
        downloder.style.display = "flex";
    } catch (error) {
        console.error('Error:', error);
    }
}

customDataBtn.addEventListener('click', handleSubmit);
aiDataBtn.addEventListener('click', handleSubmit);


downloadLink.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'dummy-data.json';
    downloadLink.click();
    URL.revokeObjectURL(downloadLink.href); // Cleanup temporary URL
});

eye_btn.addEventListener('click', () => {
    const formattedData = JSON.stringify(jsonData, null, 2); // Formatted JSON output
    const blob = new Blob([formattedData], { type: 'text/plain' }); // Set content type to plain text
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.target = '_blank'; // Set target to _blank to open in new tab
    downloadLink.click();
    URL.revokeObjectURL(downloadLink.href);
});