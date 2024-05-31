const customDataBtn = document.getElementById("custom-data");
const aiDataBtn = document.getElementById('ai-data');

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
        const response = await fetch(`http://localhost:8000/${_type}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'data': data
            },
        });

        const responseData = await response.json();
        console.log(responseData.status);

        const resp_data = responseData.receivedData;

        // resp_data.forEach(val=>console.log(val));
        console.log(resp_data);

    } catch (error) {
        console.error('Error:', error);
    }
}


customDataBtn.addEventListener('click', handleSubmit);
aiDataBtn.addEventListener('click', handleSubmit);



