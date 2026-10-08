module.exports = {
  ci: {
    collect: {
      staticDistDir: "./platinum-site/dist",
      url: [
        "http://localhost/",
        "http://localhost/ecosystem.html",
        "http://localhost/how-it-works.html",
        "http://localhost/digital-trust.html",
        "http://localhost/command-center.html",
        "http://localhost/traceability.html",
        "http://localhost/smart-audit.html",
        "http://localhost/china-gcc.html",
        "http://localhost/partners.html",
        "http://localhost/manufacturers.html",
        "http://localhost/finance-takaful.html",
        "http://localhost/verify.html",
        "http://localhost/contact.html"
      ],
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
        "first-contentful-paint": ["error", { maxNumericValue: 2100 }],
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
