document.getElementById("uploadBtn").addEventListener("click", function() {
    document.getElementById("userImg").click();
});

document.getElementById("URL").addEventListener("click", function() {
    prompt("paste image URL").click();
});

document.addEventListener('DOMContentLoaded', function () {
    const inputField = document.getElementById('userImg');
    const bgRemove = document.getElementById('bgRemove');

    inputField.addEventListener('change', async function () {
        const file = this.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image_file', file);

        try {
            const response = await fetch('https://api.remove.bg/v1.0/removebg', {
                method: 'POST',
                headers: {
                    'X-Api-Key': 'MN9fy9ZPdFLepNTK9yzbK7MZ', // Replace with your actual API key
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error removing background');
            }

            const result = await response.blob();
            const imgUrl = URL.createObjectURL(result);
            bgRemove.innerHTML = `<img src="${imgUrl}" alt="Removed Background">`;

            // Ask the user if they want to download the image
            if (confirm('Do you want to download the image?')) {
                a = document.createElement('a');
                a.href = imgUrl;
                a.download = 'background_removed_image.png';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
                
        }

        catch (error) {
            console.error('Error:', error)}
        
    });
});
