let sse = new EventSource("http://localhost:8080/conversion");
console.log(sse.onmessage)