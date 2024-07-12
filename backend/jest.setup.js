global.console = {
    log: console.log,
    // Keep native behavior for other methods
    ...console,
  };

  