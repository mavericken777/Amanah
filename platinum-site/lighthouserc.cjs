module.exports = {
  ci: {
    collect: {
      staticDistDir: "./platinum-site/dist",
      numberOfRuns: 1,
      settings: {
        chromeFlags: "--headless --no-sandbox --disable-dev-shm-usage"
      }
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.90 }],
        "categories:accessibility": ["error", { minScore: 1.00 }],
        "categories:best-practices": ["error", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 1.00 }],
        "first-contentful-paint": ["error", { maxNumericValue: 2000 }],
        "largest-contentful-paint": ["error", { maxNumericValue: 2500 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.10 }],
        "total-blocking-time": ["error", { maxNumericValue: 200 }]
      }
    },
    upload: {
      target: "filesystem",
      outputDir: "./platinum-site/lighthouse-results"
    }
  }
};
