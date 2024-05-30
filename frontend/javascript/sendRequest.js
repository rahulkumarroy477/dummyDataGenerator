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
                    data.push({
                        fieldName:input,
                        type:val
                    });
                }
            });

            if (!isValid) return;
            
            console.log(data);
            const _type = event.target.id === 'custom-data' ? 'customData' : 'aiData';

            try {
                const response = await fetch(`http://localhost:8000/${_type}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const responseData = await response.json();
                console.log(responseData.receivedData);
                alert(`Response from server:${responseData.status}`);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        customDataBtn.onclick = handleSubmit;
        aiDataBtn.onclick = handleSubmit;