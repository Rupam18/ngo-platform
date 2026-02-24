const http = require('http');

async function test() {
  const loginRes = await fetch('http://localhost:5001/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@example.com', password: 'password123' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token;

  if (!token) {
    console.log("Login failed", loginData);
    return;
  }

  const res = await fetch('http://localhost:5001/api/campaign', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      title: "Test Campaign",
      goal: 50000,
      description: "Test description",
      image: "Test image"
    })
  });
  
  const text = await res.text();
  console.log("Create Campaign Response:", res.status, text);
}

test();
