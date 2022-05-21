const PROXY_CONFIG = [
  {
    context: [
      "/APIGateWay/Order",
    ],
    target: "https://localhost:5010",
    secure: false
  }
  
]

module.exports = PROXY_CONFIG;
