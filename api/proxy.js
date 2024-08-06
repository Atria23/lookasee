export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
  
    // Gantilah 'https://api.example.com' dengan URL API sebenarnya
    fetch('https://api.openweathermap.org/data/2.5' + req.url)
      .then(response => response.json())
      .then(data => res.status(200).json(data))
      .catch(error => res.status(500).json({ error: 'Something went wrong' }));
  }
  