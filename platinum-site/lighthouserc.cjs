module.exports = {
  ci: {
    collect: {
      staticDistDir: "./platinum-site/dist",
      numberOfRuns: 1,
      settings: {
        chromeFlags: "--headless --no-sandbox --disable-dev-shm-usage",
        preset: "desktop"
      }
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.85 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.90 }],
        "categories:seo": ["error", { minScore: 0.90 }],
        "first-contentful-paint": ["error", { maxNumericValue: 2000 }],
        "largest-contentful-paint": ["error", { maxNumericValue: 2500 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.10 }]
      }
    },
    upload: {
      target: "filesystem",
      outputDir: "./platinum-site/lighthouse-results"
    }
  }
};
