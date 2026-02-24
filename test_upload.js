const fs = require('fs');

async function test() {
  const loginRes = await fetch('http://localhost:5001/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'rupam@gmail.com', password: 'password123' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token;

  if (!token) {
    console.log("Login failed", loginData);
    return;
  }

  // Create a dummy image
  fs.writeFileSync('dummy.jpg', 'dummy image content');
  
  const formData = new FormData();
  formData.append("title", "Test Upload");
  formData.append("goal", "50000");
  
  const blob = new Blob([fs.readFileSync('dummy.jpg')], { type: 'image/jpeg' });
  formData.append("image", blob, "dummy.jpg");

  const res = await fetch('http://localhost:5001/api/campaign', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });
  
  const data = await res.json();
  console.log("Status:", res.status, data);
}
test();
