const imageForm = document.querySelector("#imageForm")
const imageInput = document.querySelector("#imageInput")

imageForm.addEventListener("submit", async event => {
  event.preventDefault()
  const file = imageInput.files[0]

  try {
    // Fetch the secure URL from the backend server running on port 8080
    const res = await fetch("http://127.0.0.1:8080/s3Url")  // Correct the URL here

    // Check if the response is OK
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`)
    }

    const { url } = await res.json()  // Extract the URL from the response
    console.log(url)

    // Upload the file directly to the S3 bucket
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: file
    })

    const imageUrl = url.split('?')[0]  // Extract the base URL from the signed URL
    console.log(imageUrl)

    // Display the uploaded image
    const img = document.createElement("img")
    img.src = imageUrl
    document.body.appendChild(img)

  } catch (error) {
    console.error('Error:', error)
  }
})
