module.exports = {
  ci: {
    collect: {
      staticDistDir: "./platinum-site/dist",
      url: ["http://localhost/"],
      numberOfRuns: 1,
      settings: {
        formFactor: "mobile",
        screenEmulation: {
          mobile: true,
          width: 375,
          height: 812,
          deviceScaleFactor: 2,
          disabled: false
        },
        throttlingMethod: "simulate",
        chromeFlags: "--headless --no-sandbox --disable-dev-shm-usage"
      }
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.80 }],
        "categories:accessibility": ["error", { minScore: 1.00 }],
        "categories:best-practices": ["error", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 1.00 }],
        "first-contentful-paint": ["error", { maxNumericValue: 3000 }],
        "largest-contentful-paint": ["error", { maxNumericValue: 4000 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.10 }],
        "total-blocking-time": ["error", { maxNumericValue: 300 }]
      }
    },
    upload: {
      target: "filesystem",
      outputDir: "./platinum-site/lighthouse-mobile-results"
    }
  }
};
