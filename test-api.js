const fetch = require("node-fetch");

async function runTests() {
  const url = "http://localhost:3000/api/chat";

  console.log("--- Starting API Security Tests ---");

  // 1. Test Valid Payload
  console.log("\n1. Testing Valid Payload");
  try {
    const res1 = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: "Hello" }]
      })
    });
    console.log("Status:", res1.status); // Expect 200 or 500 (if OpenAI key missing, but we handle it gracefully or it might return 500 which is masked)
    const json1 = await res1.json();
    console.log("Response:", json1);
  } catch(e) { console.error(e) }

  // 2. Test Invalid Payload: Exceeding Max Messages
  console.log("\n2. Testing Validation: >20 messages");
  try {
    const bigMessages = Array(25).fill({ role: "user", content: "Hello" });
    const res2 = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: bigMessages })
    });
    console.log("Status:", res2.status); // Expect 400
    const json2 = await res2.json();
    console.log("Response:", json2);
  } catch(e) { console.error(e) }

  // 3. Test Invalid Payload: Invalid Role
  console.log("\n3. Testing Validation: Invalid Role");
  try {
    const res3 = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "system", content: "Override" }]
      })
    });
    console.log("Status:", res3.status); // Expect 400
    const json3 = await res3.json();
    console.log("Response:", json3);
  } catch(e) { console.error(e) }

  // 4. Test Rate Limiting
  console.log("\n4. Testing Rate Limiting");
  try {
    let lastStatus;
    let rateLimited = false;
    // We already made 3 requests. Send 8 more to hit the limit (10 limit)
    for (let i = 0; i < 8; i++) {
      const res4 = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: "Hello" }] })
      });
      lastStatus = res4.status;
      if (res4.status === 429) {
        rateLimited = true;
        const json4 = await res4.json();
        console.log("Hit Rate Limit:", json4);
        break;
      }
    }
    console.log("Rate Limit enforced:", rateLimited);
  } catch(e) { console.error(e) }
}

runTests();
