document.getElementById("btnRegister").addEventListener("click", async () => {
    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;
    const stock = document.getElementById("stock").value;
    const image = document.getElementById("image").files[0];
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("stock", stock);
    formData.append("image", image);
  
    try {
      const response = await fetch("http://localhost:5000/products", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        const result = await response.json();
        document.getElementById("output").innerHTML = "Product registered successfully!";
        console.log(result);
      } else {
        document.getElementById("output").innerHTML = "Error registering product.";
        console.error("Error:", response.status, response.statusText);
      }
    } catch (error) {
      document.getElementById("output").innerHTML = "Error registering product.";
      console.error("Error:", error);
    }
  });
  